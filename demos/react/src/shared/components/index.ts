import { resolveComponentDescriptors } from 'handie-react-starter-umi';

import * as controls from './control';
import * as widgets from './widget';
import * as renderers from './renderer';

export default resolveComponentDescriptors({ controls, widgets, renderers });
