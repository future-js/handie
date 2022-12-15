import type { ListViewContext, ObjectViewContext } from 'handie-vue';

function isOpenerInlineObjectView(opener: ListViewContext | ObjectViewContext): boolean {
  return opener.getView().category === 'object' && !!(opener as ObjectViewContext).getParent();
}

export { isOpenerInlineObjectView };
