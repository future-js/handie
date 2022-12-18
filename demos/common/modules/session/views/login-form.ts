import type { ComponentCtor, ObjectViewContextDescriptor } from '@handie/runtime-core';

import { DEMO_USER } from '../helper';

function getLoginFormView<WidgetCtor extends ComponentCtor = ComponentCtor>(
  LoginFormViewWidget: WidgetCtor,
): ObjectViewContextDescriptor {
  return {
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
        placeholder: `请输入「${DEMO_USER.username}」`,
      },
      {
        name: 'password',
        label: '密码',
        dataType: 'string',
        renderType: 'password',
        required: true,
        placeholder: `请输入「${DEMO_USER.password}」`,
      },
    ],
    validate: 'submit',
  };
}

export { getLoginFormView };
