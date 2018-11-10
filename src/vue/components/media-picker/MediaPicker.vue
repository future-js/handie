<template>
  <div class="ImagePicker">
    <MediaItem
      class="ImagePicker-item"
      :class="{'is-empty': !hasMedia}"
      :caption="mediaOption.caption"
      :url="mediaUrl"
      @click="$emit('clickMedia', $event)">
      <button
        class="ImageItem-button"
        @click="removeMedia"
        slot="extra"><Icon type="cross" /></button>
    </MediaItem>
    <MediaItemPicker
      class="ImagePicker-picker"
      :type="type"
      :url="url"
      :size="size"
      :provider="provider"
      @beforeUpload="$emit('beforeUpload', $event)"
      @upload="uploadMedia"
      @fail="$emit('fail', $event)" />
  </div>
</template>

<script>
  import { isString, mixin } from "../../utils/common/helper";
  import { Icon } from "../icon";
  import { MediaItem, MediaItemPicker } from "../media-item";

  export default {
    name: "MediaPicker",
    components: {
      Icon,
      MediaItem, MediaItemPicker
    },
    props: {
      media: [String, Object],
      type: String,
      url: String,
      size: [Number, String],
      provider: Object
    },
    data() {
      return {
        mediaUrl: ""
      }
    },
    computed: {
      mediaOption() {
        let opts = this.media;

        if ( isString(opts) ) {
          opts = {url: opts};
        }

        return mixin({url: "", caption: ""}, opts);
      },
      hasMedia() {
        return this.mediaUrl !== "";
      }
    },
    methods: {
      removeMedia() {
        const url = this.mediaUrl;

        this.mediaUrl = "";
        this.$emit("remove", url);
      },
      uploadMedia( urls ) {
        const url = urls.pop();

        this.mediaUrl = url;
        this.$emit("upload", url);
      }
    },
    created() {
      this.mediaUrl = this.mediaOption.url;
    }
  }
</script>
