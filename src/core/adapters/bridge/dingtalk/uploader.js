import { invokeDingTalkApi } from './helper';

export default {
  image( opts ) {
    const {
      multiple, max, camera,
      success: onSuccess, fail: onFail } = opts;

    if ( camera === true ) {
      return invokeDingTalkApi('biz.util.uploadImageFromCamera', {onSuccess, onFail});
    }

    return invokeDingTalkApi('biz.util.uploadImage', {
      multiple,
      max,
      onSuccess,
      onFail
    });
  }
}
