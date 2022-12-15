import { resolveComponentDescriptors } from 'handie-vue';

import * as controls from './control';
import * as widgets from './widget';
import * as renderers from './renderer';

export default resolveComponentDescriptors({ controls, widgets, renderers });
