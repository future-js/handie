<template>
  <figure class="ImageItem">
    <div>
      <a :href="url || 'javascript:void(0);'" @click.prevent="clickMedia" v-if="isImage">
        <img :src="url" :alt="caption" :title="caption" />
      </a>
      <div @click="clickMedia" v-else>
        <video :src="url" v-if="isVideo" />
        <audio :src="url" v-else-if="isAudio" />
        <p class="ImageItem-placeholder" v-else-if="ext">.{{ ext.toUpperCase() }}</p>
        <Icon type="right" v-if="showIcon" />
      </div>
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
    <slot name="extra" v-if="hasExtra"></slot>
  </figure>
</template>

<script>
  import { Icon } from '../icon';

  import {
    IMAGE_EXTENSION_WHITELIST,
    VIDEO_EXTENSION_WHITELIST,
    AUDIO_EXTENSION_WHITELIST } from '../../utils/common/constants';
  import { includes } from '../../utils/common/helper';
  import { pathname } from '../../utils/url';

  import slot from '../../mixins/slot';

  export default {
    name: 'MediaItem',
    mixins: [slot],
    components: {
      Icon
    },
    props: {
      caption: String,
      url: String
    },
    computed: {
      type() {
        return this.isImage ? 'image' : this.isVideo ? 'video' : this.isAudio ? 'audio' : '';
      },
      ext() {
        return this.url ? pathname(this.url).split('.').pop().toLowerCase() : '';
      },
      isImage() {
        return this.isSpecificMedia(IMAGE_EXTENSION_WHITELIST);
      },
      isVideo() {
        return this.isSpecificMedia(VIDEO_EXTENSION_WHITELIST);
      },
      isAudio() {
        return this.isSpecificMedia(AUDIO_EXTENSION_WHITELIST);
      },
      showIcon() {
        return this.isVideo || this.isAudio;
      }
    },
    methods: {
      isSpecificMedia( exts ) {
        return includes(this.ext, exts);
      },
      clickMedia() {
        this.$emit('click', {url: this.url, caption: this.caption, type: this.type});
      }
    }
  }
</script>
