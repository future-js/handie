import { invokeDingTalkApi } from './helper';

export default {
  open( opts: any ): void {
    invokeDingTalkApi('biz.util.openLink', {url: opts.url || ''});
  },
  close(): void {
    invokeDingTalkApi('biz.navigation.close');
  }
}
