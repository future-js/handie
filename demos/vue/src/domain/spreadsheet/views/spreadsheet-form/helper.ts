import Spreadsheet from '@wotaware/x-spreadsheet';

function initSpreadsheet(el: HTMLDivElement): any {
  const s = new Spreadsheet('#spreadsheetDemo', {
    mode: 'read',
    showToolbar: false,
    showBottomBar: false,
    contextMenuItems: [
      {
        key: 'insert-row-above',
        title: () => 'Insert row above',
        available: mode => mode === 'row-title',
        handler: data => {
          const { range } = data.selector;
          console.log('Insert row above', range);
          data.insertTo('row', range, 1);
        },
      },
      {
        key: 'insert-row-below',
        title: () => 'Insert row below',
        available: mode => mode === 'row-title',
        handler: data => {
          const { range } = data.selector;
          const realRange = { sci: range.sci, sri: range.sri + 1 };
          console.log('Insert row below', realRange);
          data.insertTo('row', realRange, 1);
        },
      },
      {
        key: 'delete-selected-rows',
        title: () => 'Delete selected row(s)',
        available: mode => mode === 'row-title',
        handler: data => {
          console.log('Delete selected row(s)', data);
          data.delete('row');
        },
      },
      {
        key: 'insert-column-left',
        title: () => 'Insert column left',
        available: mode => mode === 'col-title',
        handler: data => {
          const { range } = data.selector;
          console.log('Insert column left', range);
          data.insertTo('column', range, 1);
        },
      },
      {
        key: 'insert-column-right',
        title: () => 'Insert column right',
        available: mode => mode === 'col-title',
        handler: data => {
          const { range } = data.selector;
          const realRange = { sci: range.sci + 1, sri: range.sri };
          console.log('Insert column right', realRange);
          data.insertTo('column', realRange, 1);
        },
      },
      {
        key: 'delete-selected-columns',
        title: () => 'Delete selected column(s)',
        available: mode => mode === 'col-title',
        handler: data => {
          console.log('Delete selected column(s)', data);
          data.delete('column');
        },
      },
    ],
    view: {
      width: () => el.clientWidth,
      height: () => el.clientHeight,
    },
    row: {
      len: 15,
      height: 25,
    },
    col: {
      len: 10,
      width: 100,
      indexWidth: 60,
      minWidth: 60,
    },
  } as any);

  s.on('cell-selected', (...args) => {
    console.log('cell-selected', ...args);
  });

  return s;
}

export { initSpreadsheet };
