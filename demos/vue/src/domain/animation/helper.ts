import { getComponents as _getComponents } from '@/utils';

const MODULE_NAME = 'animation';

const getComponents = _getComponents.bind(null, MODULE_NAME);

function testUtil(): string {
  return 'You are great!';
}

export { MODULE_NAME, getComponents, testUtil };
