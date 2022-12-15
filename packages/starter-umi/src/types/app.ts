import { AppDescriptor as _AppDescriptor } from 'handie-react-starter-antd';

interface AppDescriptor extends Omit<_AppDescriptor, 'creators'> {
  routes: Record<string, any>[];
}

export { AppDescriptor };
