import { isString, isFunction, isPlainObject, includes, mixin, clone } from '../common/helper';
import { getDefaults } from '../storage/helper';
import { resolveFileExtension } from '../url/helper';

function refillImageItem( $img, url ) {
  const $item = $img.closest('.ImageItem');

  if ( $item.length > 0 ) {
    let ext;

    if ( isString(url) ) {
      ext = resolveFileExtension(url);
    }

    const $link = $img.closest('a');
    
    if ( url ) {
      $link.attr('href', url);
      $item.removeClass('is-empty');

      if ( ext && !includes(ext.toLowerCase(), getDefaults('uploader.extension.image').split(',')) ) {
        $item.addClass('is-nongraphic');
      }
      else {
        $item.removeClass('is-nongraphic');
      }
    }
    else {
      $link.attr('href', 'javascript:void(0);');
      $item.addClass('is-empty');
    }

    $link.attr('data-file-ext', ext);
  }
}

export function fill( $container, data, callback ) {
  if ( !isPlainObject(data) ) {
    return;
  }

  $('[data-field]', $container).each(function() {
    const $f = $(this);
    const val = data[$f.attr('data-field')];

    if ( $f.is('img') ) {
      $f.attr('src', val || '');

      refillImageItem($f, val);
    }
    else {
      $f.text(val || '-');
    }

    if ( isFunction(callback) ) {
      callback.apply(this, [$f.attr('data-field'), val]);
    }
  });
}

export function datepicker( $picker = $('.js-pickDate'), opts ) {
  $picker.each(function() {
    const $p = $(this);
    const $ipt = $(`[name="${$p.attr('data-to')}"]`, $p.closest('form'));

    $p.datepicker(mixin({
      language: 'zh-CN',
      autohide: true
    }, ($ipt.length ? {
      pick: () => $ipt.val(moment($(this).datepicker('getDate')).format())
    } : null), opts));

    if ( $ipt.length ) {
      $p.on('change', function() {
        if ( $(this).val() === '' ) {
          $ipt.val('');
        }
      });
    }
  });
}

export function datetimepicker( $picker, opts = {} ) {
  if ( isPlainObject($picker) ) {
    opts = $picker;
    $picker = null;
  }

  $picker = $picker == null ? $('.js-pickDateTime') : $($picker);
  opts = clone(opts);

  $picker.each(function() {
    const $p = $(this);

    // 时间段
    if ( $p.is('.js-pickDatePeriod') ) {
      const selector = 'input:not([type="hidden"])';
      const $ipts = $(selector, $p);

      if ( $ipts.length === 2 ) {
        $ipts.each(function( idx ) {
          const $ipt = $(this);

          let method;

          if ( idx === 0 ) {
            method = 'minDate';
          }
          else {
            method = 'maxDate';
            // 请看 https://github.com/Eonasdan/bootstrap-datetimepicker/issues/1075
            opts.useCurrent = false;
          }

          $ipt
            .datetimepicker(opts)
            .on('dp.change', function( evt ) {
              const $dt = $(this);
              const date = evt.date;

              $dt.siblings(selector).data('DateTimePicker')[method](date);
              $(`input[name='${$dt.attr('data-to')}']`, $dt.closest('form')).val(moment(date).format());
            });
        });
      }
    }
    // 时间点
    else {
      $p.datetimepicker(opts);
    }
  });
}
