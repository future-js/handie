<template>
  <FilePicker
    class="ImageItem ImageItem--add"
    :url="url"
    :multiple="multiple"
    :size="size"
    :max="max"
    :extensions="extensions"
    :provider="provider"
    :type="type"
    @beforeUpload="$emit('beforeUpload', $event)"
    @upload="$emit('upload', $event)"
    @complete="$emit('complete', $event)"
    @fail="$emit('fail', $event)">
    <div>
      <span><Icon type="plus" /></span>
    </div>
  </FilePicker>
</template>

<script>
  import { Icon } from '../icon';
  import { FilePicker } from '../file-picker';

  import { includes } from '../../utils/common/helper';
  
  export default {
    name: 'MediaItemPicker',
    components: {
      Icon,
      FilePicker
    },
    props: {
      url: String,
      extensions: [String, Array],
      multiple: Boolean,
      size: [Number, String],
      max: Number,
      type: String,
      provider: Object
    }
  }
</script>
