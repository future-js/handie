<template>
  <button type="button" @click="upload">
    <slot></slot>
  </button>
</template>

<script>
  import {
    IMAGE_EXTENSION_WHITELIST,
    VIDEO_EXTENSION_WHITELIST,
    AUDIO_EXTENSION_WHITELIST } from '../../utils/common/constants';
  import {
    isArray, isPlainObject, isDingTalk,
    hasOwnProp, mixin, each, clone } from '../../utils/common/helper';
  
  import { init as initUploader } from '../../utils/uploader';
  import { invoke } from '../../adapters/bridge';

  export default {
    name: "FilePicker",
    props: {
      url: String,
      extensions: [String, Array],
      multiple: Boolean,
      size: {
        type: [Number, String],
        default: 0
      },
      max: {
        type: Number,
        default: 1
      },
      type: [String, Array],
      provider: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    data() {
      return {
        uploader: null,
        uploading: 0,
        urls: []
      }
    },
    computed: {
      uploadApproach() {
        if ( this.provider.type === 'native' ) {
          if ( isDingTalk() ) {
            return 'dingtalk'
          }
        }

        return 'html';
      },
      providerOpts() {
        const opts = clone(this.provider);

        delete opts.type;

        return opts;
      },
      bridgeRef() {
        return `upload.${this.type}`;
      },
      pickerTypes() {
        return this.type ? [].concat(this.type) : [];
      },
      mimeTypes() {
        let exts = this.extensions;

        if ( isArray(exts) ) {
          exts = exts.length > 0 ? exts.join(',') : '';
        }

        if ( exts ) {
          return [this.resolveMeta('自定义文件', exts)];
        }

        const types = [];

        each(this.pickerTypes, type => {
          switch( type ) {
            case 'image':
              types.push(this.resolveMeta('图片文件', IMAGE_EXTENSION_WHITELIST.join(',')));
              break;
            case 'video':
              types.push(this.resolveMeta('视频文件', VIDEO_EXTENSION_WHITELIST.join(',')));
              break;
            case 'audio':
              types.push(this.resolveMeta('音频文件', AUDIO_EXTENSION_WHITELIST.join(',')));
              break;
          }
        });

        return types;
      }
    },
    methods: {
      resolveMeta( title, extensions ) {
        return {title, extensions};
      },
      resolveError( err ) {
        let { code, message } = err;

        switch( code ) {
          case plupload.FILE_SIZE_ERROR:
            message = `文件大小不能超过${this.uploader.getOption('filters').max_file_size}`;
            break;
          case plupload.FILE_EXTENSION_ERROR:
            message = '文件格式错误';
            break;
          case plupload.FILE_DUPLICATE_ERROR:
            message = '不能添加重复文件';
            break;
        }

        return mixin({}, err, {code, message});
      },
      upload( evt ) {
        const { type, multiple, max, providerOpts, uploadApproach } = this;

        if ( uploadApproach === 'html' ) {
          return;
        }

        this.$emit('beforeUpload');

        invoke(this.bridgeRef, mixin({
          multiple,
          max,
          native: true,
          success: urls => {
            each(urls, url => this.$emit('upload', url));
            
            this.$emit('complete', urls);
          },
          fail: err => this.$emit('fail', err)
        }, providerOpts));
      }
    },
    mounted() {
      const {
          url, multiple, size, max, providerOpts, $el,
          uploadApproach, mimeTypes
        } = this;
      
      if ( uploadApproach !== 'html' ) {
        return;
      }

      const uploader = initUploader(mixin(true, {
          el: $el,
          hooks: {
            upload: url => {
              this.uploading--;
              this.urls.push(url);

              this.$emit('upload', url);

              if ( this.uploading === 0 ) {
                this.$emit('complete', [].concat(this.urls));
                this.urls = [];
              }
            }
          },
          settings: {
            container: $el.parentNode,
            url,
            filters: {
              mime_types: mimeTypes,
              max_file_size: size
            },
            multi_selection: multiple
          }
        }, providerOpts));
      
      if ( !uploader ) {
        return;
      }

      // 修复 iOS 中无法触发文件选择
      uploader.bind('PostInit', () => ($el.parentNode.querySelector('.moxie-shim').style.zIndex = Number(window.getComputedStyle($el).zIndex || '0') + 1));

      uploader.bind('BeforeUpload', ( up, file ) => this.$emit('beforeUpload', file));

      uploader.bind('UploadFile', () => ++this.uploading);

      uploader.bind('Error', ( up, err ) => this.$emit('fail', this.resolveError(err)));
      
      this.uploader = uploader;
    },
    beforeDestroy() {
      this.uploader && this.uploader.destroy();
    }
  }
</script>
