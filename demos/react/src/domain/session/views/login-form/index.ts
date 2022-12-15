import { ObjectViewContextDescriptor } from '@/shared/types';
import { createView } from '@/shared/utils';

import context from '../../context';
import LoginFormViewWidget from './LoginForm';

export default createView(context, {
  name: 'LoginFormView',
  category: 'object',
  widget: LoginFormViewWidget,
  config: { formControlLabelWidth: 80 },
  fields: [
    {
      name: 'username',
      label: '用户名',
      dataType: 'string',
      required: true,
      placeholder: '请输入「admin」',
    },
    {
      name: 'password',
      label: '密码',
      dataType: 'string',
      renderType: 'password',
      required: true,
      placeholder: '请输入「handie」',
    },
  ],
  validate: 'submit',
} as ObjectViewContextDescriptor);
