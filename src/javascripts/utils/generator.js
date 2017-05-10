utils.generate = {
  image: function( url, alt ) {
    let caption = "";

    alt = alt || "";

    if ( alt ) {
      caption = `<figcaption class="u-textTruncate" title="${alt}">${alt}</figcaption>`;
    }

    return `<figure class="ImageItem"><div><a href="${url}" target="_blank"><img src="${url}" alt="${alt}" title="${alt}"></a></div>${caption}</figure>`
  },
  action: function( actions, wrapped ) {
    if ( $.isPlainObject(actions) ) {
      actions = [actions];
    }

    actions = actions.concat(defaults.table.rowActions);

    if ( !Array.isArray(actions) ) {
      return false;
    }

    let html = actions.map(function( a ) {
      if ( $.isPlainObject(a) ) {
        let btnHtml = [];
        let btnCls = `btn btn-${a.isPrimary === true ? "primary" : a.isDelete === true ? "danger" : "default"} btn-xs js-${a.action}`;
        let isLink = $.type(a.url) === "string";

        if ( isLink ) {
          btnHtml.push(`<a href="${a.url}" class="${btnCls}" title="${a.text}">`);
        }
        else {
          btnHtml.push(`<button type="button" class="${btnCls}" title="${a.text}">`);
        }

        btnHtml.push($.type(a.icon) === "string" ? `<i class="fa fa-${a.icon}"></i><span class="sr-only">${a.text}</span>` : a.text);
        btnHtml.push(`</${isLink ? "a" : "button"}>`);

        return btnHtml.join("");
      }
      else {
        return "";
      }
    });

    if ( actions.length > 1 || wrapped === true ) {
      html.unshift(`<div class="OperationGroup">`);
      html.push("</div>");
    }

    return html.join("");
  }
};
