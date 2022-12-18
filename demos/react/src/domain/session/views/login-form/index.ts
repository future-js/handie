import { getLoginFormView } from '@_/modules/session/views';

import { createView } from '@/shared/utils';

import context from '../../context';
import LoginFormViewWidget from './LoginForm';

export default createView(context, getLoginFormView(LoginFormViewWidget));
