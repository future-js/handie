<template>
  <Group class="ImageList" :size="cols" className="ImageList-group">
    <MediaListItem
      type="picker"
      :picker="pickerOpts"
      @beforeUpload="$emit('beforeUpload', $event)"
      @upload="mediaUploaded($event)"
      @complete="mediaCompleted"
      @fail="$emit('fail', $event)"
      v-if="showAtFirst" />
    <MediaListItem
      :media="m"
      :removable="pickable"
      @remove="removeMedia(idx)"
      @clickMedia="$emit('clickMedia', $event)"
      v-for="(m, idx) in mediaList"
      :key="idx" />
    <MediaListItem
      type="picker"
      :picker="pickerOpts"
      @upload="mediaUploaded($event)"
      v-if="showAtLast" />
  </Group>
</template>

<script>
  import { isFunction, isArray, mixin, filter, map } from "../../utils/common/helper";
  import { Group } from "../group";
  import MediaListItem from "./MediaListItem.vue";

  export default {
    name: "MediaList",
    components: {
      Group,
      MediaListItem
    },
    props: {
      media: {
        type: Array,
        default() {
          return [];
        }
      },
      max: {
        type: Number,
        default: 9
      },
      cols: {
        type: Number,
        default: 3
      },
      picker: {
        type: Object,
        default: function() {
          return {};
        }
      },
      pickable: Boolean
    },
    data() {
      return {
        mediaList: []
      }
    },
    computed: {
      pickerOpts() {
        return mixin({}, {
          position: 'first',
          extensions: '',
          multiple: true,
          max: this.max === -1 ? -1 : this.max - this.mediaList.length
        }, this.picker)
      },
      showPicker() {
        return this.pickable && this.mediaList.length < this.max;
      },
      showAtFirst() {
        return this.showPicker && this.pickerOpts.position === "first";
      },
      showAtLast() {
        return this.showPicker && this.pickerOpts.position === "last";
      }
    },
    methods: {
      mediaUploaded( urls ) {
        if ( isFunction(this.picker.resolver) ) {
          urls = map(isArray(urls) ? urls : [urls], url => this.picker.resolver(url));
        }
        else {
          urls = [].concat(urls);
        }

        this.mediaList = [].concat(this.mediaList, urls);
        
        this.$emit('upload', urls);
      },
      mediaCompleted() {
        this.$emit('complete', [].concat(this.mediaList));
      },
      removeMedia( idx ) {
        let media = {};

        this.mediaList = filter(this.mediaList, ( v, i ) => {
          if ( i === idx ) {
            mixin(media, v, {index: i});
          }

          return i !== idx
        });
        
        this.$emit("remove", media);
      }
    },
    watch: {
      media: {
        handler( val ) {
          this.mediaList = val;
        },
        immediate: true
      }
    }
  }
</script>
