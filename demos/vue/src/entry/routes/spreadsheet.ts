import { RouteConfig } from '@/types';

import AdminLayout from '../layouts/admin';

export default {
  name: 'spreadsheet',
  path: '/spreadsheet',
  component: AdminLayout,
  meta: { text: '电子表格', auth: 'spreadsheet' },
  redirect: '/spreadsheet/new',
  children: [
    {
      name: 'spreadsheetNewForm',
      path: 'new',
      component: 'spreadsheet.views.SpreadsheetForm',
      meta: { text: '新建电子表格', auth: 'spreadsheet:edit' },
    },
  ],
} as RouteConfig;
