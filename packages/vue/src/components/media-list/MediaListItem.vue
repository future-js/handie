<template>
  <div class="ImageList-item">
    <MediaItemPicker
      :url="picker.url"
      :extensions="picker.extensions"
      :multiple="picker.multiple"
      :size="picker.size"
      :max="picker.max"
      :type="picker.type"
      :provider="picker.provider"
      @beforeUpload="$emit('beforeUpload', $event)"
      @upload="$emit('upload', $event)"
      @complete="$emit('complete', $event)"
      @fail="$emit('fail', $event)"
      v-if="type === 'picker'" />
    <MediaItem
      :caption="media.caption"
      :url="media.url"
      @click="$emit('clickMedia', $event)"
      v-else>
      <button
        class="ImageItem-button"
        @click="$emit('remove', $event)"
        slot="extra"
        v-if="removable"><Icon type="cross" /></button>
    </MediaItem>
  </div>
</template>

<script>
  import { Icon } from "../icon";
  import { MediaItem, MediaItemPicker } from "../media-item";

  export default {
    name: "MediaListItem",
    components: {
      Icon,
      MediaItem, MediaItemPicker
    },
    props: {
      type: String,
      media: Object,
      picker: Object,
      removable: Boolean
    }
  }
</script>
