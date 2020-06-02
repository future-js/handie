import { isNumeric } from '@ntks/toolbox';
import { invokeDingTalkApi } from './helper';

export default {
  image(opts: any): void {
    const { urls = [], current = 0 } = opts;

    invokeDingTalkApi('biz.util.previewImage', {
      urls,
      current: isNumeric(current) ? urls[current * 1] : current,
    });
  },
};
