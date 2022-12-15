import { RenderTypeDescriptor, registerRenderType } from '../vendors/organik';

const viewRenderTypeDescriptors: RenderTypeDescriptor[] = [
  // List view
  { name: 'list' },
  { name: 'table' },
  // Object view
  { name: 'form' },
];

const inputRenderTypeDescriptors: RenderTypeDescriptor[] = [
  { name: 'input' },
  { name: 'textarea' },
  { name: 'radio' },
  { name: 'checkbox' },
  { name: 'switch' },
  { name: 'select' },
];

const actionRenderTypeDescriptors: RenderTypeDescriptor[] = [{ name: 'button' }, { name: 'link' }];

[
  ...viewRenderTypeDescriptors,
  ...inputRenderTypeDescriptors,
  ...actionRenderTypeDescriptors,
].forEach(registerRenderType);
