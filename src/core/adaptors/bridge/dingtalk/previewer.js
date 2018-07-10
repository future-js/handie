import { isNumeric } from '../../../utils/is/type';
import { invokeDingTalkApi } from './helper';

export default {
  image( opts ) {
    const { urls = [], current = 0 } = opts;

    invokeDingTalkApi('biz.util.previewImage', {
      urls,
      current: isNumeric(current) ? urls[current * 1] : current
    });
  }
}
