import { invokeDingTalkApi } from './helper';

export default {
  open( opts ) {
    invokeDingTalkApi('biz.util.openLink', {url: opts.url || ''});
  },
  close() {
    invokeDingTalkApi('biz.navigation.close');
  }
}
