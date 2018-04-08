/*!
 * MUU v1.6.8
 * Unified UI framework for admin websites of MaiHaoChe.com
 * http://doc.haimaiche.net/muu/
 *
 * Copyright 2017, Ourai Lin <ourairyu@gmail.com> (http://ourai.ws/)
 * Released under the MIT license.
 *
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@8888888888888888888888888888888888@@@@@@@@@@
 * @@@@@@@@@0LffffffffffffffffffffffffffffffffL0@@@@@@@@@
 * @@@@@@@@8LffffffffffffffffffffffffffffffffffL8@@@@@@@@
 * @@@@@@@8LfffffGGGGGGGGGGGGGGGGGGGGGGGGGGfffffL8@@@@@@@
 * @@@@@@@Cfffff0@@@@@@@@@@@@@@@@@@@@@@@@@@0fffffC@@@@@@@
 * @@@@@@GLffffG@@@@@@@@@@.880088.@@@@@@@@@@GffffLG@@@@@@
 * @@@@@0LffffC@@@@@@@@80CLLffffLLC08@@@@@@@@CffffL0@@@@@
 * @@@@@Cfffff8@@@@@@@0LffffffffffffL0@@@@@@@8fffffC@@@@@
 * @@@@8LffffG@@@@@@@GffffffLCCLffffffG@@@@@@@GffffL8@@@@
 * @@@@8fffff0@@@@@@0LffffC8@@@@8CffffL0@@@@@@0fffff8@@@@
 * @@@@8ffffL8@@@@@@Cfffff0@@@@@@0fffffC@@@@@@8Lffff8@@@@
 * @@@@0ffffL8@@@@@@GLffffG8@@@@8GffffLG@@@@@@8Lffff0@@@@
 * @@@@0ffffL8@@@@@@@GfffffLC8@@8LffffG@@@@@@@8Lffff0@@@@
 * @@@@0ffffL8@@@@@@@8GLfttttLC8@@0CLG@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@@@@@8GLfttttfC8@@8@@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@@@@@@@8GLftttffC0@@@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@80GCLG8@80LtttttffCG08@@@@@8Ltttt0@@@@
 * @@@@0ttttfffffffftttttLG@@:GLftttttttfffffffftttt0@@@@
 * @@@@0tttttttttttttttffLG8@@@@8GLffttttttttttttttt0@@@@
 * @@@@8LLLLLLLLLLCCGG00@@@@@@@@@@@@00GGCCLLLLLLLLLL8@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

window.JSCompiler_renameProperty = function (prop, obj) {
  return prop;
};

var CSS_URL_RX = /(url\()([^)]*)(\))/g;
var workingURL = void 0;
var resolveDoc = void 0;
/**
 * Resolves the given URL against the provided `baseUri'.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to resolve
 * @param {?string=} baseURI Base URI to resolve the URL against
 * @return {string} resolved URL
 */
function resolveUrl(url, baseURI) {
  // Lazy feature detection.
  if (workingURL === undefined) {
    workingURL = false;
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      workingURL = u.href === 'http://a/c%20d';
    } catch (e) {
      // silently fail
    }
  }
  if (!baseURI) {
    baseURI = document.baseURI || window.location.href;
  }
  if (workingURL) {
    return new URL(url, baseURI).href;
  }
  // Fallback to creating an anchor into a disconnected document.
  if (!resolveDoc) {
    resolveDoc = document.implementation.createHTMLDocument('temp');
    resolveDoc.base = resolveDoc.createElement('base');
    resolveDoc.head.appendChild(resolveDoc.base);
    resolveDoc.anchor = resolveDoc.createElement('a');
    resolveDoc.body.appendChild(resolveDoc.anchor);
  }
  resolveDoc.base.href = baseURI;
  resolveDoc.anchor.href = url;
  return resolveDoc.anchor.href || url;
}

/**
 * Resolves any relative URL's in the given CSS text against the provided
 * `ownerDocument`'s `baseURI`.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} cssText CSS text to process
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Processed CSS text with resolved URL's
 */
function resolveCss(cssText, baseURI) {
  return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
    return pre + '\'' + resolveUrl(url.replace(/["']/g, ''), baseURI) + '\'' + post;
  });
}

/**
 * Returns a path from a given `url`. The path includes the trailing
 * `/` from the url.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to transform
 * @return {string} resolved path
 */
function pathFromUrl(url) {
  return url.substring(0, url.lastIndexOf('/') + 1);
}

var useShadow = !window.ShadyDOM;
var useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
var useNativeCustomElements = !window.customElements.polyfillWrapFlushCallback;

/**
 * Globally settable property that is automatically assigned to
 * `Polymer.ElementMixin` instances, useful for binding in templates to
 * make URL's relative to an application's root.  Defaults to the main
 * document URL, but can be overridden by users.  It may be useful to set
 * `Polymer.rootPath` to provide a stable application mount path when
 * using client side routing.
 *
 * @memberof Polymer
 */
var rootPath = undefined || pathFromUrl(document.baseURI || window.location.href);



/**
 * A global callback used to sanitize any value before inserting it into the DOM. The callback signature is:
 *
 *     Polymer = {
 *       sanitizeDOMValue: function(value, name, type, node) { ... }
 *     }
 *
 * Where:
 *
 * `value` is the value to sanitize.
 * `name` is the name of an attribute or property (for example, href).
 * `type` indicates where the value is being inserted: one of property, attribute, or text.
 * `node` is the node where the value is being inserted.
 *
 * @type {(function(*,string,string,Node):*)|undefined}
 * @memberof Polymer
 */
var sanitizeDOMValue = undefined;

// unique global id for deduping mixins.
var dedupeId = 0;

var dedupingMixin = function dedupingMixin(mixin) {
  var mixinApplications = /** @type {!MixinFunction} */mixin.__mixinApplications;
  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    /** @type {!MixinFunction} */mixin.__mixinApplications = mixinApplications;
  }
  // maintain a unique id for each mixin
  var mixinDedupeId = dedupeId++;
  function dedupingMixin(base) {
    var baseSet = /** @type {!MixinFunction} */base.__mixinSet;
    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }
    var map = mixinApplications;
    var extended = map.get(base);
    if (!extended) {
      extended = /** @type {!Function} */mixin(base);
      map.set(base, extended);
    }
    // copy inherited mixin set from the extended class, or the base class
    // NOTE: we avoid use of Set here because some browser (IE11)
    // cannot extend a base Set via the constructor.
    var mixinSet = Object.create( /** @type {!MixinFunction} */extended.__mixinSet || baseSet || null);
    mixinSet[mixinDedupeId] = true;
    /** @type {!MixinFunction} */extended.__mixinSet = mixinSet;
    return extended;
  }

  return (/** @type {T} */dedupingMixin
  );
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
var INCLUDE_ATTR = 'include';
var SHADY_UNSCOPED_ATTR = 'shady-unscoped';

function importModule(moduleId) {
  var /** Polymer.DomModule */PolymerDomModule = customElements.get('dom-module');
  if (!PolymerDomModule) {
    return null;
  }
  return PolymerDomModule.import(moduleId);
}

function styleForImport(importDoc) {
  // NOTE: polyfill affordance.
  // under the HTMLImports polyfill, there will be no 'body',
  // but the import pseudo-doc can be used directly.
  var container = importDoc.body ? importDoc.body : importDoc;
  var importCss = resolveCss(container.textContent, importDoc.baseURI);
  var style = document.createElement('style');
  style.textContent = importCss;
  return style;
}

function stylesFromModules(moduleIds) {
  var modules = moduleIds.trim().split(/\s+/);
  var styles = [];
  for (var i = 0; i < modules.length; i++) {
    styles.push.apply(styles, _toConsumableArray(stylesFromModule(modules[i])));
  }
  return styles;
}

function stylesFromModule(moduleId) {
  var m = importModule(moduleId);
  if (m && m._styles === undefined) {
    var styles = [];
    // module imports: <link rel="import" type="css">
    styles.push.apply(styles, _toConsumableArray(_stylesFromModuleImports(m)));
    // include css from the first template in the module
    var template = m.querySelector('template');
    if (template) {
      styles.push.apply(styles, _toConsumableArray(stylesFromTemplate(template,
      /** @type {templateWithAssetPath} */m.assetpath)));
    }
    m._styles = styles;
  }
  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
  }
  return m ? m._styles : [];
}

function stylesFromTemplate(template, baseURI) {
  if (!template._styles) {
    var styles = [];
    // if element is a template, get content from its .content
    var e$ = template.content.querySelectorAll('style');
    for (var i = 0; i < e$.length; i++) {
      var e = e$[i];
      // support style sharing by allowing styles to "include"
      // other dom-modules that contain styling
      var include = e.getAttribute(INCLUDE_ATTR);
      if (include) {
        styles.push.apply(styles, _toConsumableArray(stylesFromModules(include)));
      }
      if (baseURI) {
        e.textContent = resolveCss(e.textContent, baseURI);
      }
      styles.push(e);
    }
    template._styles = styles;
  }
  return template._styles;
}

function stylesFromModuleImports(moduleId) {
  var m = importModule(moduleId);
  return m ? _stylesFromModuleImports(m) : [];
}

function _stylesFromModuleImports(module) {
  var styles = [];
  var p$ = module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
  for (var i = 0; i < p$.length; i++) {
    var p = p$[i];
    if (p.import) {
      var importDoc = p.import;
      var unscoped = p.hasAttribute(SHADY_UNSCOPED_ATTR);
      if (unscoped && !importDoc._unscopedStyle) {
        var style = styleForImport(importDoc);
        style.setAttribute(SHADY_UNSCOPED_ATTR, '');
        importDoc._unscopedStyle = style;
      } else if (!importDoc._style) {
        importDoc._style = styleForImport(importDoc);
      }
      styles.push(unscoped ? importDoc._unscopedStyle : importDoc._style);
    }
  }
  return styles;
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var modules = {};
var lcModules = {};
function findModule(id) {
  return modules[id] || lcModules[id.toLowerCase()];
}

function styleOutsideTemplateCheck(inst) {
  if (inst.querySelector('style')) {
    console.warn('dom-module %s has style outside template', inst.id);
  }
}

/**
 * The `dom-module` element registers the dom it contains to the name given
 * by the module's id attribute. It provides a unified database of dom
 * accessible via its static `import` API.
 *
 * A key use case of `dom-module` is for providing custom element `<template>`s
 * via HTML imports that are parsed by the native HTML parser, that can be
 * relocated during a bundling pass and still looked up by `id`.
 *
 * Example:
 *
 *     <dom-module id="foo">
 *       <img src="stuff.png">
 *     </dom-module>
 *
 * Then in code in some other location that cannot access the dom-module above
 *
 *     let img = customElements.get('dom-module').import('foo', 'img');
 *
 * @customElement
 * @extends HTMLElement
 * @memberof Polymer
 * @summary Custom element that provides a registry of relocatable DOM content
 *   by `id` that is agnostic to bundling.
 * @unrestricted
 */

var DomModule = function (_HTMLElement) {
  _inherits(DomModule, _HTMLElement);

  function DomModule() {
    _classCallCheck(this, DomModule);

    return _possibleConstructorReturn(this, (DomModule.__proto__ || Object.getPrototypeOf(DomModule)).apply(this, arguments));
  }

  _createClass(DomModule, [{
    key: 'attributeChangedCallback',


    /**
     * @param {string} name Name of attribute.
     * @param {?string} old Old value of attribute.
     * @param {?string} value Current value of attribute.
     * @return {void}
     */
    value: function attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this.register();
      }
    }

    /**
     * The absolute URL of the original location of this `dom-module`.
     *
     * This value will differ from this element's `ownerDocument` in the
     * following ways:
     * - Takes into account any `assetpath` attribute added during bundling
     *   to indicate the original location relative to the bundled location
     * - Uses the HTMLImports polyfill's `importForElement` API to ensure
     *   the path is relative to the import document's location since
     *   `ownerDocument` is not currently polyfilled
     */

  }, {
    key: 'register',


    /**
     * Registers the dom-module at a given id. This method should only be called
     * when a dom-module is imperatively created. For
     * example, `document.createElement('dom-module').register('foo')`.
     * @param {string=} id The id at which to register the dom-module.
     * @return {void}
     */
    value: function register(id) {
      id = id || this.id;
      if (id) {
        this.id = id;
        // store id separate from lowercased id so that
        // in all cases mixedCase id will stored distinctly
        // and lowercase version is a fallback
        modules[id] = this;
        lcModules[id.toLowerCase()] = this;
        styleOutsideTemplateCheck(this);
      }
    }
  }, {
    key: 'assetpath',
    get: function get() {
      // Don't override existing assetpath.
      if (!this.__assetpath) {
        // note: assetpath set via an attribute must be relative to this
        // element's location; accomodate polyfilled HTMLImports
        var owner = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument;
        var url = resolveUrl(this.getAttribute('assetpath') || '', owner.baseURI);
        this.__assetpath = pathFromUrl(url);
      }
      return this.__assetpath;
    }
  }], [{
    key: 'import',


    /**
     * Retrieves the element specified by the css `selector` in the module
     * registered by `id`. For example, this.import('foo', 'img');
     * @param {string} id The id of the dom-module in which to search.
     * @param {string=} selector The css selector by which to find the element.
     * @return {Element} Returns the element which matches `selector` in the
     * module registered at the specified `id`.
     */
    value: function _import(id, selector) {
      if (id) {
        var m = findModule(id);
        if (m && selector) {
          return m.querySelector(selector);
        }
        return m;
      }
      return null;
    }
  }, {
    key: 'observedAttributes',
    get: function get() {
      return ['id'];
    }
  }]);

  return DomModule;
}(HTMLElement);

DomModule.prototype['modules'] = modules;

customElements.define('dom-module', DomModule);

function isPath(path) {
  return path.indexOf('.') >= 0;
}

function root(path) {
  var dotIndex = path.indexOf('.');
  if (dotIndex === -1) {
    return path;
  }
  return path.slice(0, dotIndex);
}

function isAncestor(base, path) {
  //     base.startsWith(path + '.');
  return base.indexOf(path + '.') === 0;
}

function isDescendant(base, path) {
  //     path.startsWith(base + '.');
  return path.indexOf(base + '.') === 0;
}

function translate(base, newBase, path) {
  return newBase + path.slice(base.length);
}



function normalize(path) {
  if (Array.isArray(path)) {
    var parts = [];
    for (var i = 0; i < path.length; i++) {
      var args = path[i].toString().split('.');
      for (var j = 0; j < args.length; j++) {
        parts.push(args[j]);
      }
    }
    return parts.join('.');
  } else {
    return path;
  }
}

function split(path) {
  if (Array.isArray(path)) {
    return normalize(path).split('.');
  }
  return path.toString().split('.');
}

function get(root, path, info) {
  var prop = root;
  var parts = split(path);
  // Loop over path parts[0..n-1] and dereference
  for (var i = 0; i < parts.length; i++) {
    if (!prop) {
      return;
    }
    var part = parts[i];
    prop = prop[part];
  }
  if (info) {
    info.path = parts.join('.');
  }
  return prop;
}

function set(root, path, value) {
  var prop = root;
  var parts = split(path);
  var last = parts[parts.length - 1];
  if (parts.length > 1) {
    // Loop over path parts[0..n-2] and dereference
    for (var i = 0; i < parts.length - 1; i++) {
      var part = parts[i];
      prop = prop[part];
      if (!prop) {
        return;
      }
    }
    // Set value to object at end of path
    prop[last] = value;
  } else {
    // Simple property set
    prop[path] = value;
  }
  return parts.join('.');
}

var caseMap = {};
var DASH_TO_CAMEL = /-[a-z]/g;
var CAMEL_TO_DASH = /([A-Z])/g;

function dashToCamelCase(dash) {
  return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, function (m) {
    return m[1].toUpperCase();
  }));
}

function camelToDashCase(camel) {
  return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
}

var caseMap$1 = Object.freeze({
	dashToCamelCase: dashToCamelCase,
	camelToDashCase: camelToDashCase
});

// Microtask implemented using Mutation Observer
var microtaskCurrHandle = 0;
var microtaskLastHandle = 0;
var microtaskCallbacks = [];
var microtaskNodeContent = 0;
var microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });

function microtaskFlush() {
  var len = microtaskCallbacks.length;
  for (var i = 0; i < len; i++) {
    var cb = microtaskCallbacks[i];
    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
  }
  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}







var microTask = {

  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof Polymer.Async.microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run: function run(callback) {
    microtaskNode.textContent = microtaskNodeContent++;
    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },


  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof Polymer.Async.microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel: function cancel(handle) {
    var idx = handle - microtaskLastHandle;
    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }
      microtaskCallbacks[idx] = null;
    }
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @const {!AsyncInterface} */
var microtask = microTask;

var PropertiesChanged = dedupingMixin(function (superClass) {

  /**
   * @polymer
   * @mixinClass
   * @extends {superClass}
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   */
  var PropertiesChanged = function (_superClass) {
    _inherits$1(PropertiesChanged, _superClass);

    _createClass$1(PropertiesChanged, [{
      key: '_createPropertyAccessor',
      //eslint-disable-line no-unused-vars

      /**
       * Creates a setter/getter pair for the named property with its own
       * local storage.  The getter returns the value in the local storage,
       * and the setter calls `_setProperty`, which updates the local storage
       * for the property and enqueues a `_propertiesChanged` callback.
       *
       * This method may be called on a prototype or an instance.  Calling
       * this method may overwrite a property value that already exists on
       * the prototype/instance by creating the accessor.
       *
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created; the
       *   protected `_setProperty` function must be used to set the property
       * @return {void}
       * @protected
       */
      value: function _createPropertyAccessor(property, readOnly) {
        if (!this.hasOwnProperty('__dataHasAccessor')) {
          this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
        }
        if (!this.hasOwnProperty('__dataAttributes')) {
          this.__dataAttributes = Object.assign({}, this.__dataAttributes);
        }
        if (!this.__dataHasAccessor[property]) {
          this.__dataHasAccessor[property] = true;
          var attr = this.constructor.attributeNameForProperty(property);
          this.__dataAttributes[attr] = property;
          this._definePropertyAccessor(property, readOnly);
        }
      }

      /**
       * Defines a property accessor for the given property.
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created
       * @return {void}
       */

    }, {
      key: '_definePropertyAccessor',
      value: function _definePropertyAccessor(property, readOnly) {
        Object.defineProperty(this, property, {
          /* eslint-disable valid-jsdoc */
          /** @this {PropertiesChanged} */
          get: function get() {
            return this.__data[property];
          },

          /** @this {PropertiesChanged} */
          set: readOnly ? function () {} : function (value) {
            this._setProperty(property, value);
          }
          /* eslint-enable */
        });
      }
    }], [{
      key: 'createProperties',


      /**
       * Creates property accessors for the given property names.
       * @param {!Object} props Object whose keys are names of accessors.
       * @return {void}
       * @protected
       */
      value: function createProperties(props) {
        var proto = this.prototype;
        for (var prop in props) {
          // don't stomp an existing accessor
          if (!(prop in proto)) {
            proto._createPropertyAccessor(prop);
          }
        }
      }

      /**
       * Returns an attribute name that corresponds to the given property.
       * The attribute name is the lowercased property name. Override to
       * customize this mapping.
       * @param {string} property Property to convert
       * @return {string} Attribute name corresponding to the given property.
       *
       * @protected
       */

    }, {
      key: 'attributeNameForProperty',
      value: function attributeNameForProperty(property) {
        return property.toLowerCase();
      }

      /**
       * Override point to provide a type to which to deserialize a value to
       * a given property.
       * @param {string} name Name of property
       *
       * @protected
       */

    }, {
      key: 'typeForProperty',
      value: function typeForProperty(name) {}
    }]);

    function PropertiesChanged() {
      _classCallCheck$1(this, PropertiesChanged);

      var _this = _possibleConstructorReturn$1(this, (PropertiesChanged.__proto__ || Object.getPrototypeOf(PropertiesChanged)).call(this));

      _this.__dataEnabled = false;
      _this.__dataReady = false;
      _this.__dataInvalid = false;
      _this.__data = {};
      _this.__dataPending = null;
      _this.__dataOld = null;
      _this.__dataInstanceProps = null;
      _this.__serializing = false;
      _this._initializeProperties();
      return _this;
    }

    /**
     * Lifecycle callback called when properties are enabled via
     * `_enableProperties`.
     *
     * Users may override this function to implement behavior that is
     * dependent on the element having its property data initialized, e.g.
     * from defaults (initialized from `constructor`, `_initializeProperties`),
     * `attributeChangedCallback`, or values propagated from host e.g. via
     * bindings.  `super.ready()` must be called to ensure the data system
     * becomes enabled.
     *
     * @return {void}
     * @public
     */


    _createClass$1(PropertiesChanged, [{
      key: 'ready',
      value: function ready() {
        this.__dataReady = true;
        this._flushProperties();
      }

      /**
       * Initializes the local storage for property accessors.
       *
       * Provided as an override point for performing any setup work prior
       * to initializing the property accessor system.
       *
       * @return {void}
       * @protected
       */

    }, {
      key: '_initializeProperties',
      value: function _initializeProperties() {
        // Capture instance properties; these will be set into accessors
        // during first flush. Don't set them here, since we want
        // these to overwrite defaults/constructor assignments
        for (var p in this.__dataHasAccessor) {
          if (this.hasOwnProperty(p)) {
            this.__dataInstanceProps = this.__dataInstanceProps || {};
            this.__dataInstanceProps[p] = this[p];
            delete this[p];
          }
        }
      }

      /**
       * Called at ready time with bag of instance properties that overwrote
       * accessors when the element upgraded.
       *
       * The default implementation sets these properties back into the
       * setter at ready time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @return {void}
       * @protected
       */

    }, {
      key: '_initializeInstanceProperties',
      value: function _initializeInstanceProperties(props) {
        Object.assign(this, props);
      }

      /**
       * Updates the local storage for a property (via `_setPendingProperty`)
       * and enqueues a `_proeprtiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {void}
       * @protected
       */

    }, {
      key: '_setProperty',
      value: function _setProperty(property, value) {
        if (this._setPendingProperty(property, value)) {
          this._invalidateProperties();
        }
      }

      /**
       * Returns the value for the given property.
       * @param {string} property Name of property
       * @return {*} Value for the given property
       * @protected
       */

    }, {
      key: '_getProperty',
      value: function _getProperty(property) {
        return this.__data[property];
      }

      /* eslint-disable no-unused-vars */
      /**
       * Updates the local storage for a property, records the previous value,
       * and adds it to the set of "pending changes" that will be passed to the
       * `_propertiesChanged` callback.  This method does not enqueue the
       * `_propertiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @param {boolean=} ext Not used here; affordance for closure
       * @return {boolean} Returns true if the property changed
       * @protected
       */

    }, {
      key: '_setPendingProperty',
      value: function _setPendingProperty(property, value, ext) {
        var old = this.__data[property];
        var changed = this._shouldPropertyChange(property, value, old);
        if (changed) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (this.__dataOld && !(property in this.__dataOld)) {
            this.__dataOld[property] = old;
          }
          this.__data[property] = value;
          this.__dataPending[property] = value;
        }
        return changed;
      }
      /* eslint-enable */

      /**
       * Marks the properties as invalid, and enqueues an async
       * `_propertiesChanged` callback.
       *
       * @return {void}
       * @protected
       */

    }, {
      key: '_invalidateProperties',
      value: function _invalidateProperties() {
        var _this2 = this;

        if (!this.__dataInvalid && this.__dataReady) {
          this.__dataInvalid = true;
          microtask.run(function () {
            if (_this2.__dataInvalid) {
              _this2.__dataInvalid = false;
              _this2._flushProperties();
            }
          });
        }
      }

      /**
       * Call to enable property accessor processing. Before this method is
       * called accessor values will be set but side effects are
       * queued. When called, any pending side effects occur immediately.
       * For elements, generally `connectedCallback` is a normal spot to do so.
       * It is safe to call this method multiple times as it only turns on
       * property accessors once.
       *
       * @return {void}
       * @protected
       */

    }, {
      key: '_enableProperties',
      value: function _enableProperties() {
        if (!this.__dataEnabled) {
          this.__dataEnabled = true;
          if (this.__dataInstanceProps) {
            this._initializeInstanceProperties(this.__dataInstanceProps);
            this.__dataInstanceProps = null;
          }
          this.ready();
        }
      }

      /**
       * Calls the `_propertiesChanged` callback with the current set of
       * pending changes (and old values recorded when pending changes were
       * set), and resets the pending set of changes. Generally, this method
       * should not be called in user code.
       *
       * @return {void}
       * @protected
       */

    }, {
      key: '_flushProperties',
      value: function _flushProperties() {
        if (this.__dataPending && this.__dataOld) {
          var changedProps = this.__dataPending;
          this.__dataPending = null;
          this._propertiesChanged(this.__data, changedProps, this.__dataOld);
        }
      }

      /**
       * Callback called when any properties with accessors created via
       * `_createPropertyAccessor` have been set.
       *
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {!Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {!Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @return {void}
       * @protected
       */

    }, {
      key: '_propertiesChanged',
      value: function _propertiesChanged(currentProps, changedProps, oldProps) {} // eslint-disable-line no-unused-vars


      /**
       * Method called to determine whether a property value should be
       * considered as a change and cause the `_propertiesChanged` callback
       * to be enqueued.
       *
       * The default implementation returns `true` if a strict equality
       * check fails. The method always returns false for `NaN`.
       *
       * Override this method to e.g. provide stricter checking for
       * Objects/Arrays when using immutable patterns.
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       *   and enqueue a `_proeprtiesChanged` callback
       * @protected
       */

    }, {
      key: '_shouldPropertyChange',
      value: function _shouldPropertyChange(property, value, old) {
        return (
          // Strict equality check
          old !== value && (
          // This ensures (old==NaN, value==NaN) always returns false
          old === old || value === value)
        );
      }

      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       * @return {void}
       * @suppress {missingProperties} Super may or may not implement the callback
       */

    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this._attributeToProperty(name, value);
        }
        if (_get(PropertiesChanged.prototype.__proto__ || Object.getPrototypeOf(PropertiesChanged.prototype), 'attributeChangedCallback', this)) {
          _get(PropertiesChanged.prototype.__proto__ || Object.getPrototypeOf(PropertiesChanged.prototype), 'attributeChangedCallback', this).call(this, name, old, value);
        }
      }

      /**
       * Deserializes an attribute to its associated property.
       *
       * This method calls the `_deserializeValue` method to convert the string to
       * a typed value.
       *
       * @param {string} attribute Name of attribute to deserialize.
       * @param {?string} value of the attribute.
       * @param {*=} type type to deserialize to, defaults to the value
       * returned from `typeForProperty`
       * @return {void}
       */

    }, {
      key: '_attributeToProperty',
      value: function _attributeToProperty(attribute, value, type) {
        if (!this.__serializing) {
          var map = this.__dataAttributes;
          var property = map && map[attribute] || attribute;
          this[property] = this._deserializeValue(value, type || this.constructor.typeForProperty(property));
        }
      }

      /**
       * Serializes a property to its associated attribute.
       *
       * @suppress {invalidCasts} Closure can't figure out `this` is an element.
       *
       * @param {string} property Property name to reflect.
       * @param {string=} attribute Attribute name to reflect to.
       * @param {*=} value Property value to refect.
       * @return {void}
       */

    }, {
      key: '_propertyToAttribute',
      value: function _propertyToAttribute(property, attribute, value) {
        this.__serializing = true;
        value = arguments.length < 3 ? this[property] : value;
        this._valueToNodeAttribute( /** @type {!HTMLElement} */this, value, attribute || this.constructor.attributeNameForProperty(property));
        this.__serializing = false;
      }

      /**
       * Sets a typed value to an HTML attribute on a node.
       *
       * This method calls the `_serializeValue` method to convert the typed
       * value to a string.  If the `_serializeValue` method returns `undefined`,
       * the attribute will be removed (this is the default for boolean
       * type `false`).
       *
       * @param {Element} node Element to set attribute to.
       * @param {*} value Value to serialize.
       * @param {string} attribute Attribute name to serialize to.
       * @return {void}
       */

    }, {
      key: '_valueToNodeAttribute',
      value: function _valueToNodeAttribute(node, value, attribute) {
        var str = this._serializeValue(value);
        if (str === undefined) {
          node.removeAttribute(attribute);
        } else {
          node.setAttribute(attribute, str);
        }
      }

      /**
       * Converts a typed JavaScript value to a string.
       *
       * This method is called when setting JS property values to
       * HTML attributes.  Users may override this method to provide
       * serialization for custom types.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided
       * property  value.
       */

    }, {
      key: '_serializeValue',
      value: function _serializeValue(value) {
        switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
          case 'boolean':
            return value ? '' : undefined;
          default:
            return value != null ? value.toString() : undefined;
        }
      }

      /**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called when reading HTML attribute values to
       * JS properties.  Users may override this method to provide
       * deserialization for custom `type`s. Types for `Boolean`, `String`,
       * and `Number` convert attributes to the expected types.
       *
       * @param {?string} value Value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       */

    }, {
      key: '_deserializeValue',
      value: function _deserializeValue(value, type) {
        switch (type) {
          case Boolean:
            return value !== null;
          case Number:
            return Number(value);
          default:
            return value;
        }
      }
    }]);

    return PropertiesChanged;
  }(superClass);

  return PropertiesChanged;
});

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$1 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var caseMap$2 = caseMap$1;

// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
var nativeProperties = {};
var proto = HTMLElement.prototype;
while (proto) {
  var props = Object.getOwnPropertyNames(proto);
  for (var i = 0; i < props.length; i++) {
    nativeProperties[props[i]] = true;
  }
  proto = Object.getPrototypeOf(proto);
}

/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @return {void}
 * @private
 */
function saveAccessorValue(model, property) {
  // Don't read/store value for any native properties since they could throw
  if (!nativeProperties[property]) {
    var value = model[property];
    if (value !== undefined) {
      if (model.__data) {
        // Adding accessor to instance; update the property
        // It is the user's responsibility to call _flushProperties
        model._setPendingProperty(property, value);
      } else {
        // Adding accessor to proto; save proto's value for instance-time use
        if (!model.__dataProto) {
          model.__dataProto = {};
        } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
          model.__dataProto = Object.create(model.__dataProto);
        }
        model.__dataProto[property] = value;
      }
    }
  }
}

var PropertyAccessors = dedupingMixin(function (superClass) {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   */
  var base = PropertiesChanged(superClass);

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyAccessors}
   * @extends {base}
   * @unrestricted
   */

  var PropertyAccessors = function (_base) {
    _inherits$2(PropertyAccessors, _base);

    function PropertyAccessors() {
      _classCallCheck$2(this, PropertyAccessors);

      return _possibleConstructorReturn$2(this, (PropertyAccessors.__proto__ || Object.getPrototypeOf(PropertyAccessors)).apply(this, arguments));
    }

    _createClass$2(PropertyAccessors, [{
      key: '_initializeProperties',


      /**
       * Overrides PropertiesChanged implementation to initialize values for
       * accessors created for values that already existed on the element
       * prototype.
       *
       * @return {void}
       * @protected
       */
      value: function _initializeProperties() {
        if (this.__dataProto) {
          this._initializeProtoProperties(this.__dataProto);
          this.__dataProto = null;
        }
        _get$1(PropertyAccessors.prototype.__proto__ || Object.getPrototypeOf(PropertyAccessors.prototype), '_initializeProperties', this).call(this);
      }

      /**
       * Called at instance time with bag of properties that were overwritten
       * by accessors on the prototype when accessors were created.
       *
       * The default implementation sets these properties back into the
       * setter at instance time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @return {void}
       * @protected
       */

    }, {
      key: '_initializeProtoProperties',
      value: function _initializeProtoProperties(props) {
        for (var p in props) {
          this._setProperty(p, props[p]);
        }
      }

      /**
       * Ensures the element has the given attribute. If it does not,
       * assigns the given value to the attribute.
       *
       * @suppress {invalidCasts} Closure can't figure out `this` is infact an element
       *
       * @param {string} attribute Name of attribute to ensure is set.
       * @param {string} value of the attribute.
       * @return {void}
       */

    }, {
      key: '_ensureAttribute',
      value: function _ensureAttribute(attribute, value) {
        var el = /** @type {!HTMLElement} */this;
        if (!el.hasAttribute(attribute)) {
          this._valueToNodeAttribute(el, value, attribute);
        }
      }

      /**
       * Overrides PropertiesChanged implemention to serialize objects as JSON.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided property value.
       */

    }, {
      key: '_serializeValue',
      value: function _serializeValue(value) {
        /* eslint-disable no-fallthrough */
        switch (typeof value === 'undefined' ? 'undefined' : _typeof$1(value)) {
          case 'object':
            if (value instanceof Date) {
              return value.toString();
            } else if (value) {
              try {
                return JSON.stringify(value);
              } catch (x) {
                return '';
              }
            }

          default:
            return _get$1(PropertyAccessors.prototype.__proto__ || Object.getPrototypeOf(PropertyAccessors.prototype), '_serializeValue', this).call(this, value);
        }
      }

      /**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called by Polymer when reading HTML attribute values to
       * JS properties.  Users may override this method on Polymer element
       * prototypes to provide deserialization for custom `type`s.  Note,
       * the `type` argument is the value of the `type` field provided in the
       * `properties` configuration object for a given property, and is
       * by convention the constructor for the type to deserialize.
       *
       *
       * @param {?string} value Attribute value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       */

    }, {
      key: '_deserializeValue',
      value: function _deserializeValue(value, type) {
        /**
         * @type {*}
         */
        var outValue = void 0;
        switch (type) {
          case Object:
            try {
              outValue = JSON.parse( /** @type {string} */value);
            } catch (x) {
              // allow non-JSON literals like Strings and Numbers
              outValue = value;
            }
            break;
          case Array:
            try {
              outValue = JSON.parse( /** @type {string} */value);
            } catch (x) {
              outValue = null;
              console.warn('Polymer::Attributes: couldn\'t decode Array as JSON: ' + value);
            }
            break;
          case Date:
            outValue = isNaN(value) ? String(value) : Number(value);
            outValue = new Date(outValue);
            break;
          default:
            outValue = _get$1(PropertyAccessors.prototype.__proto__ || Object.getPrototypeOf(PropertyAccessors.prototype), '_deserializeValue', this).call(this, value, type);
            break;
        }
        return outValue;
      }
      /* eslint-enable no-fallthrough */

      /**
       * Overrides PropertiesChanged implementation to save existing prototype
       * property value so that it can be reset.
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created
       *
       * When calling on a prototype, any overwritten values are saved in
       * `__dataProto`, and it is up to the subclasser to decide how/when
       * to set those properties back into the accessor.  When calling on an
       * instance, the overwritten value is set via `_setPendingProperty`,
       * and the user should call `_invalidateProperties` or `_flushProperties`
       * for the values to take effect.
       * @protected
       * @return {void}
       */

    }, {
      key: '_definePropertyAccessor',
      value: function _definePropertyAccessor(property, readOnly) {
        saveAccessorValue(this, property);
        _get$1(PropertyAccessors.prototype.__proto__ || Object.getPrototypeOf(PropertyAccessors.prototype), '_definePropertyAccessor', this).call(this, property, readOnly);
      }

      /**
       * Returns true if this library created an accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if an accessor was created
       */

    }, {
      key: '_hasAccessor',
      value: function _hasAccessor(property) {
        return this.__dataHasAccessor && this.__dataHasAccessor[property];
      }

      /**
       * Returns true if the specified property has a pending change.
       *
       * @param {string} prop Property name
       * @return {boolean} True if property has a pending change
       * @protected
       */

    }, {
      key: '_isPropertyPending',
      value: function _isPropertyPending(prop) {
        return Boolean(this.__dataPending && prop in this.__dataPending);
      }
    }], [{
      key: 'createPropertiesForAttributes',


      /**
       * Generates property accessors for all attributes in the standard
       * static `observedAttributes` array.
       *
       * Attribute names are mapped to property names using the `dash-case` to
       * `camelCase` convention
       *
       * @return {void}
       */
      value: function createPropertiesForAttributes() {
        var a$ = this.observedAttributes;
        for (var _i = 0; _i < a$.length; _i++) {
          this.prototype._createPropertyAccessor(caseMap$2.dashToCamelCase(a$[_i]));
        }
      }

      /**
       * Returns an attribute name that corresponds to the given property.
       * By default, converts camel to dash case, e.g. `fooBar` to `foo-bar`.
       * @param {string} property Property to convert
       * @return {string} Attribute name corresponding to the given property.
       *
       * @protected
       */

    }, {
      key: 'attributeNameForProperty',
      value: function attributeNameForProperty(property) {
        return caseMap$2.camelToDashCase(property);
      }
    }]);

    return PropertyAccessors;
  }(base);

  return PropertyAccessors;
});

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 1.x backwards-compatible auto-wrapper for template type extensions
// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
var templateExtensions = {
  'dom-if': true,
  'dom-repeat': true
};
function wrapTemplateExtension(node) {
  var is = node.getAttribute('is');
  if (is && templateExtensions[is]) {
    var t = node;
    t.removeAttribute('is');
    node = t.ownerDocument.createElement(is);
    t.parentNode.replaceChild(node, t);
    node.appendChild(t);
    while (t.attributes.length) {
      node.setAttribute(t.attributes[0].name, t.attributes[0].value);
      t.removeAttribute(t.attributes[0].name);
    }
  }
  return node;
}

function findTemplateNode(root, nodeInfo) {
  // recursively ascend tree until we hit root
  var parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
  // unwind the stack, returning the indexed node at each level
  if (parent) {
    // note: marginally faster than indexing via childNodes
    // (http://jsperf.com/childnodes-lookup)
    for (var n = parent.firstChild, i = 0; n; n = n.nextSibling) {
      if (nodeInfo.parentIndex === i++) {
        return n;
      }
    }
  } else {
    return root;
  }
}

// construct `$` map (from id annotations)
function applyIdToMap(inst, map, node, nodeInfo) {
  if (nodeInfo.id) {
    map[nodeInfo.id] = node;
  }
}

// install event listeners (from event annotations)
function applyEventListener(inst, node, nodeInfo) {
  if (nodeInfo.events && nodeInfo.events.length) {
    for (var j = 0, e$ = nodeInfo.events, e; j < e$.length && (e = e$[j]); j++) {
      inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
    }
  }
}

// push configuration references at configure time
function applyTemplateContent(inst, node, nodeInfo) {
  if (nodeInfo.templateInfo) {
    node._templateInfo = nodeInfo.templateInfo;
  }
}

function createNodeEventHandler(context, eventName, methodName) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  context = context._methodHost || context;
  var handler = function handler(e) {
    if (context[methodName]) {
      context[methodName](e, e.detail);
    } else {
      console.warn('listener method `' + methodName + '` not defined');
    }
  };
  return handler;
}

var TemplateStamp = dedupingMixin(function (superClass) {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_TemplateStamp}
   */
  var TemplateStamp = function (_superClass) {
    _inherits$3(TemplateStamp, _superClass);

    function TemplateStamp() {
      _classCallCheck$3(this, TemplateStamp);

      return _possibleConstructorReturn$3(this, (TemplateStamp.__proto__ || Object.getPrototypeOf(TemplateStamp)).apply(this, arguments));
    }

    _createClass$3(TemplateStamp, [{
      key: '_stampTemplate',


      /**
       * Clones the provided template content and returns a document fragment
       * containing the cloned dom.
       *
       * The template is parsed (once and memoized) using this library's
       * template parsing features, and provides the following value-added
       * features:
       * * Adds declarative event listeners for `on-event="handler"` attributes
       * * Generates an "id map" for all nodes with id's under `$` on returned
       *   document fragment
       * * Passes template info including `content` back to templates as
       *   `_templateInfo` (a performance optimization to avoid deep template
       *   cloning)
       *
       * Note that the memoized template parsing process is destructive to the
       * template: attributes for bindings and declarative event listeners are
       * removed after being noted in notes, and any nested `<template>.content`
       * is removed and stored in notes as well.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       */
      value: function _stampTemplate(template) {
        // Polyfill support: bootstrap the template if it has not already been
        if (template && !template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
          HTMLTemplateElement.decorate(template);
        }
        var templateInfo = this.constructor._parseTemplate(template);
        var nodeInfo = templateInfo.nodeInfoList;
        var content = templateInfo.content || template.content;
        var dom = /** @type {DocumentFragment} */document.importNode(content, true);
        // NOTE: ShadyDom optimization indicating there is an insertion point
        dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
        var nodes = dom.nodeList = new Array(nodeInfo.length);
        dom.$ = {};
        for (var i = 0, l = nodeInfo.length, info; i < l && (info = nodeInfo[i]); i++) {
          var node = nodes[i] = findTemplateNode(dom, info);
          applyIdToMap(this, dom.$, node, info);
          applyTemplateContent(this, node, info);
          applyEventListener(this, node, info);
        }
        dom = /** @type {!StampedTemplate} */dom; // eslint-disable-line no-self-assign
        return dom;
      }

      /**
       * Adds an event listener by method name for the event provided.
       *
       * This method generates a handler function that looks up the method
       * name at handling time.
       *
       * @param {!Node} node Node to add listener on
       * @param {string} eventName Name of event
       * @param {string} methodName Name of method
       * @param {*=} context Context the method will be called on (defaults
       *   to `node`)
       * @return {Function} Generated handler function
       */

    }, {
      key: '_addMethodEventListenerToNode',
      value: function _addMethodEventListenerToNode(node, eventName, methodName, context) {
        context = context || node;
        var handler = createNodeEventHandler(context, eventName, methodName);
        this._addEventListenerToNode(node, eventName, handler);
        return handler;
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {!Node} node Node to add event listener to
       * @param {string} eventName Name of event
       * @param {function(!Event):void} handler Listener function to add
       * @return {void}
       */

    }, {
      key: '_addEventListenerToNode',
      value: function _addEventListenerToNode(node, eventName, handler) {
        node.addEventListener(eventName, handler);
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {Node} node Node to remove event listener from
       * @param {string} eventName Name of event
       * @param {function(!Event):void} handler Listener function to remove
       * @return {void}
       */

    }, {
      key: '_removeEventListenerFromNode',
      value: function _removeEventListenerFromNode(node, eventName, handler) {
        node.removeEventListener(eventName, handler);
      }
    }], [{
      key: '_parseTemplate',


      /**
       * Scans a template to produce template metadata.
       *
       * Template-specific metadata are stored in the object returned, and node-
       * specific metadata are stored in objects in its flattened `nodeInfoList`
       * array.  Only nodes in the template that were parsed as nodes of
       * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
       * contains an `index` (`childNodes` index in parent) and optionally
       * `parent`, which points to node info of its parent (including its index).
       *
       * The template metadata object returned from this method has the following
       * structure (many fields optional):
       *
       * ```js
       *   {
       *     // Flattened list of node metadata (for nodes that generated metadata)
       *     nodeInfoList: [
       *       {
       *         // `id` attribute for any nodes with id's for generating `$` map
       *         id: {string},
       *         // `on-event="handler"` metadata
       *         events: [
       *           {
       *             name: {string},   // event name
       *             value: {string},  // handler method name
       *           }, ...
       *         ],
       *         // Notes when the template contained a `<slot>` for shady DOM
       *         // optimization purposes
       *         hasInsertionPoint: {boolean},
       *         // For nested `<template>`` nodes, nested template metadata
       *         templateInfo: {object}, // nested template metadata
       *         // Metadata to allow efficient retrieval of instanced node
       *         // corresponding to this metadata
       *         parentInfo: {number},   // reference to parent nodeInfo>
       *         parentIndex: {number},  // index in parent's `childNodes` collection
       *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
       *       },
       *       ...
       *     ],
       *     // When true, the template had the `strip-whitespace` attribute
       *     // or was nested in a template with that setting
       *     stripWhitespace: {boolean},
       *     // For nested templates, nested template content is moved into
       *     // a document fragment stored here; this is an optimization to
       *     // avoid the cost of nested template cloning
       *     content: {DocumentFragment}
       *   }
       * ```
       *
       * This method kicks off a recursive treewalk as follows:
       *
       * ```
       *    _parseTemplate <---------------------+
       *      _parseTemplateContent              |
       *        _parseTemplateNode  <------------|--+
       *          _parseTemplateNestedTemplate --+  |
       *          _parseTemplateChildNodes ---------+
       *          _parseTemplateNodeAttributes
       *            _parseTemplateNodeAttribute
       *
       * ```
       *
       * These methods may be overridden to add custom metadata about templates
       * to either `templateInfo` or `nodeInfo`.
       *
       * Note that this method may be destructive to the template, in that
       * e.g. event annotations may be removed after being noted in the
       * template metadata.
       *
       * @param {!HTMLTemplateElement} template Template to parse
       * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
       *   template, for parsing nested templates
       * @return {!TemplateInfo} Parsed template metadata
       */
      value: function _parseTemplate(template, outerTemplateInfo) {
        // since a template may be re-used, memo-ize metadata
        if (!template._templateInfo) {
          var templateInfo = template._templateInfo = {};
          templateInfo.nodeInfoList = [];
          templateInfo.stripWhiteSpace = outerTemplateInfo && outerTemplateInfo.stripWhiteSpace || template.hasAttribute('strip-whitespace');
          this._parseTemplateContent(template, templateInfo, { parent: null });
        }
        return template._templateInfo;
      }
    }, {
      key: '_parseTemplateContent',
      value: function _parseTemplateContent(template, templateInfo, nodeInfo) {
        return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
      }

      /**
       * Parses template node and adds template and node metadata based on
       * the current node, and its `childNodes` and `attributes`.
       *
       * This method may be overridden to add custom node or template specific
       * metadata based on this node.
       *
       * @param {Node} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */

    }, {
      key: '_parseTemplateNode',
      value: function _parseTemplateNode(node, templateInfo, nodeInfo) {
        var noted = void 0;
        var element = /** @type {Element} */node;
        if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
          noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
        } else if (element.localName === 'slot') {
          // For ShadyDom optimization, indicating there is an insertion point
          templateInfo.hasInsertionPoint = true;
        }
        if (element.firstChild) {
          noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
        }
        if (element.hasAttributes && element.hasAttributes()) {
          noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
        }
        return noted;
      }

      /**
       * Parses template child nodes for the given root node.
       *
       * This method also wraps whitelisted legacy template extensions
       * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
       * wrappers, collapses text nodes, and strips whitespace from the template
       * if the `templateInfo.stripWhitespace` setting was provided.
       *
       * @param {Node} root Root node whose `childNodes` will be parsed
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {void}
       */

    }, {
      key: '_parseTemplateChildNodes',
      value: function _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
        if (root.localName === 'script' || root.localName === 'style') {
          return;
        }
        for (var node = root.firstChild, parentIndex = 0, next; node; node = next) {
          // Wrap templates
          if (node.localName == 'template') {
            node = wrapTemplateExtension(node);
          }
          // collapse adjacent textNodes: fixes an IE issue that can cause
          // text nodes to be inexplicably split =(
          // note that root.normalize() should work but does not so we do this
          // manually.
          next = node.nextSibling;
          if (node.nodeType === Node.TEXT_NODE) {
            var /** Node */n = next;
            while (n && n.nodeType === Node.TEXT_NODE) {
              node.textContent += n.textContent;
              next = n.nextSibling;
              root.removeChild(n);
              n = next;
            }
            // optionally strip whitespace
            if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
              root.removeChild(node);
              continue;
            }
          }
          var childInfo = { parentIndex: parentIndex, parentInfo: nodeInfo };
          if (this._parseTemplateNode(node, templateInfo, childInfo)) {
            childInfo.infoIndex = templateInfo.nodeInfoList.push( /** @type {!NodeInfo} */childInfo) - 1;
          }
          // Increment if not removed
          if (node.parentNode) {
            parentIndex++;
          }
        }
      }

      /**
       * Parses template content for the given nested `<template>`.
       *
       * Nested template info is stored as `templateInfo` in the current node's
       * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
       * It will then be the responsibility of the host to set it back to the
       * template and for users stamping nested templates to use the
       * `_contentForTemplate` method to retrieve the content for this template
       * (an optimization to avoid the cost of cloning nested template content).
       *
       * @param {HTMLTemplateElement} node Node to parse (a <template>)
       * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
       *   that includes the template `node`
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */

    }, {
      key: '_parseTemplateNestedTemplate',
      value: function _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
        var templateInfo = this._parseTemplate(node, outerTemplateInfo);
        var content = templateInfo.content = node.content.ownerDocument.createDocumentFragment();
        content.appendChild(node.content);
        nodeInfo.templateInfo = templateInfo;
        return true;
      }

      /**
       * Parses template node attributes and adds node metadata to `nodeInfo`
       * for nodes of interest.
       *
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */

    }, {
      key: '_parseTemplateNodeAttributes',
      value: function _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
        // Make copy of original attribute list, since the order may change
        // as attributes are added and removed
        var noted = false;
        var attrs = Array.from(node.attributes);
        for (var i = attrs.length - 1, a; a = attrs[i]; i--) {
          noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
        }
        return noted;
      }

      /**
       * Parses a single template node attribute and adds node metadata to
       * `nodeInfo` for attributes of interest.
       *
       * This implementation adds metadata for `on-event="handler"` attributes
       * and `id` attributes.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */

    }, {
      key: '_parseTemplateNodeAttribute',
      value: function _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        // events (on-*)
        if (name.slice(0, 3) === 'on-') {
          node.removeAttribute(name);
          nodeInfo.events = nodeInfo.events || [];
          nodeInfo.events.push({
            name: name.slice(3),
            value: value
          });
          return true;
        }
        // static id
        else if (name === 'id') {
            nodeInfo.id = value;
            return true;
          }
        return false;
      }

      /**
       * Returns the `content` document fragment for a given template.
       *
       * For nested templates, Polymer performs an optimization to cache nested
       * template content to avoid the cost of cloning deeply nested templates.
       * This method retrieves the cached content for a given template.
       *
       * @param {HTMLTemplateElement} template Template to retrieve `content` for
       * @return {DocumentFragment} Content fragment
       */

    }, {
      key: '_contentForTemplate',
      value: function _contentForTemplate(template) {
        var templateInfo = /** @type {HTMLTemplateElementWithInfo} */template._templateInfo;
        return templateInfo && templateInfo.content || template.content;
      }
    }]);

    return TemplateStamp;
  }(superClass);

  return TemplateStamp;
});

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$2 = function get$$1(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get$$1(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @const {Object} */
var CaseMap = caseMap$1;

// Monotonically increasing unique ID used for de-duping effects triggered
// from multiple properties in the same turn
var dedupeId$1 = 0;

/**
 * Property effect types; effects are stored on the prototype using these keys
 * @enum {string}
 */
var TYPES = {
  COMPUTE: '__computeEffects',
  REFLECT: '__reflectEffects',
  NOTIFY: '__notifyEffects',
  PROPAGATE: '__propagateEffects',
  OBSERVE: '__observeEffects',
  READ_ONLY: '__readOnly'
};

/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @return {Object} The own-property map of effects for the given type
 * @private
 */
function ensureOwnEffectMap(model, type) {
  var effects = model[type];
  if (!effects) {
    effects = model[type] = {};
  } else if (!model.hasOwnProperty(type)) {
    effects = model[type] = Object.create(model[type]);
    for (var p in effects) {
      var protoFx = effects[p];
      var instFx = effects[p] = Array(protoFx.length);
      for (var i = 0; i < protoFx.length; i++) {
        instFx[i] = protoFx[i];
      }
    }
  }
  return effects;
}

// -- effects ----------------------------------------------

/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {Object} props Bag of current property changes
 * @param {Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
  if (effects) {
    var ran = false;
    var id = dedupeId$1++;
    for (var prop in props) {
      if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
        ran = true;
      }
    }
    return ran;
  }
  return false;
}

/**
 * Runs a list of effects for a given property.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {number} dedupeId Counter used for de-duping effects
 * @param {string} prop Name of changed property
 * @param {*} props Changed properties
 * @param {*} oldProps Old properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
  var ran = false;
  var rootProperty = hasPaths ? root(prop) : prop;
  var fxs = effects[rootProperty];
  if (fxs) {
    for (var i = 0, l = fxs.length, fx; i < l && (fx = fxs[i]); i++) {
      if ((!fx.info || fx.info.lastRun !== dedupeId) && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
        if (fx.info) {
          fx.info.lastRun = dedupeId;
        }
        fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
        ran = true;
      }
    }
  }
  return ran;
}

/**
 * Determines whether a property/path that has changed matches the trigger
 * criteria for an effect.  A trigger is a descriptor with the following
 * structure, which matches the descriptors returned from `parseArg`.
 * e.g. for `foo.bar.*`:
 * ```
 * trigger: {
 *   name: 'a.b',
 *   structured: true,
 *   wildcard: true
 * }
 * ```
 * If no trigger is given, the path is deemed to match.
 *
 * @param {string} path Path or property that changed
 * @param {DataTrigger} trigger Descriptor
 * @return {boolean} Whether the path matched the trigger
 */
function pathMatchesTrigger(path, trigger) {
  if (trigger) {
    var triggerPath = trigger.name;
    return triggerPath == path || trigger.structured && isAncestor(triggerPath, path) || trigger.wildcard && isDescendant(triggerPath, path);
  } else {
    return true;
  }
}

/**
 * Implements the "observer" effect.
 *
 * Calls the method with `info.methodName` on the instance, passing the
 * new and old values.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runObserverEffect(inst, property, props, oldProps, info) {
  var fn = typeof info.method === "string" ? inst[info.method] : info.method;
  var changedProp = info.property;
  if (fn) {
    fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
  } else if (!info.dynamicFn) {
    console.warn('observer method `' + info.method + '` not defined');
  }
}

/**
 * Runs "notify" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * will dispatch path notification events in the case that the property
 * changed was a path and the root property for that path didn't have a
 * "notify" effect.  This is to maintain 1.0 behavior that did not require
 * `notify: true` to ensure object sub-property notifications were
 * sent.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} notifyProps Bag of properties to notify
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
  // Notify
  var fxs = inst[TYPES.NOTIFY];
  var notified = void 0;
  var id = dedupeId$1++;
  // Try normal notify effects; if none, fall back to try path notification
  for (var prop in notifyProps) {
    if (notifyProps[prop]) {
      if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
        notified = true;
      } else if (hasPaths && notifyPath(inst, prop, props)) {
        notified = true;
      }
    }
  }
  // Flush host if we actually notified and host was batching
  // And the host has already initialized clients; this prevents
  // an issue with a host observing data changes before clients are ready.
  var host = void 0;
  if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
    host._invalidateProperties();
  }
}

/**
 * Dispatches {property}-changed events with path information in the detail
 * object to indicate a sub-path of the property was changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} path The path that was changed
 * @param {Object} props Bag of current property changes
 * @return {boolean} Returns true if the path was notified
 * @private
 */
function notifyPath(inst, path, props) {
  var rootProperty = root(path);
  if (rootProperty !== path) {
    var eventName = camelToDashCase(rootProperty) + '-changed';
    dispatchNotifyEvent(inst, eventName, props[path], path);
    return true;
  }
  return false;
}

/**
 * Dispatches {property}-changed events to indicate a property (or path)
 * changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} eventName The name of the event to send ('{property}-changed')
 * @param {*} value The value of the changed property
 * @param {string | null | undefined} path If a sub-path of this property changed, the path
 *   that changed (optional).
 * @return {void}
 * @private
 * @suppress {invalidCasts}
 */
function dispatchNotifyEvent(inst, eventName, value, path) {
  var detail = {
    value: value,
    queueProperty: true
  };
  if (path) {
    detail.path = path;
  }
  /** @type {!HTMLElement} */inst.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
}

/**
 * Implements the "notify" effect.
 *
 * Dispatches a non-bubbling event named `info.eventName` on the instance
 * with a detail object containing the new `value`.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
  var rootProperty = hasPaths ? root(property) : property;
  var path = rootProperty != property ? property : null;
  var value = path ? get(inst, path) : inst.__data[property];
  if (path && value === undefined) {
    value = props[property]; // specifically for .splices
  }
  dispatchNotifyEvent(inst, info.eventName, value, path);
}

/**
 * Handler function for 2-way notification events. Receives context
 * information captured in the `addNotifyListener` closure from the
 * `__notifyListeners` metadata.
 *
 * Sets the value of the notified property to the host property or path.  If
 * the event contained path information, translate that path to the host
 * scope's name for that path first.
 *
 * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
 * @param {!PropertyEffectsType} inst Host element instance handling the notification event
 * @param {string} fromProp Child element property that was bound
 * @param {string} toPath Host property/path that was bound
 * @param {boolean} negate Whether the binding was negated
 * @return {void}
 * @private
 */
function handleNotification(event, inst, fromProp, toPath, negate) {
  var value = void 0;
  var detail = /** @type {Object} */event.detail;
  var fromPath = detail && detail.path;
  if (fromPath) {
    toPath = translate(fromProp, toPath, fromPath);
    value = detail && detail.value;
  } else {
    value = event.target[fromProp];
  }
  value = negate ? !value : value;
  if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
    if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath)) && (!detail || !detail.queueProperty)) {
      inst._invalidateProperties();
    }
  }
}

/**
 * Implements the "reflect" effect.
 *
 * Sets the attribute named `info.attrName` to the given property value.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runReflectEffect(inst, property, props, oldProps, info) {
  var value = inst.__data[property];
  if (sanitizeDOMValue) {
    value = sanitizeDOMValue(value, info.attrName, 'attribute', /** @type {Node} */inst);
  }
  inst._propertyToAttribute(property, info.attrName, value);
}

/**
 * Runs "computed" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * continues to run computed effects based on the output of each pass until
 * there are no more newly computed properties.  This ensures that all
 * properties that will be computed by the initial set of changes are
 * computed before other effects (binding propagation, observers, and notify)
 * run.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {!Object} changedProps Bag of changed properties
 * @param {!Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
  var computeEffects = inst[TYPES.COMPUTE];
  if (computeEffects) {
    var inputProps = changedProps;
    while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
      Object.assign(oldProps, inst.__dataOld);
      Object.assign(changedProps, inst.__dataPending);
      inputProps = inst.__dataPending;
      inst.__dataPending = null;
    }
  }
}

/**
 * Implements the "computed property" effect by running the method with the
 * values of the arguments specified in the `info` object and setting the
 * return value to the computed property specified.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runComputedEffect(inst, property, props, oldProps, info) {
  var result = runMethodEffect(inst, property, props, oldProps, info);
  var computedProp = info.methodInfo;
  if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
    inst._setPendingProperty(computedProp, result, true);
  } else {
    inst[computedProp] = result;
  }
}

/**
 * Computes path changes based on path links set up using the `linkPaths`
 * API.
 *
 * @param {!PropertyEffectsType} inst The instance whose props are changing
 * @param {string | !Array<(string|number)>} path Path that has changed
 * @param {*} value Value of changed path
 * @return {void}
 * @private
 */
function computeLinkedPaths(inst, path, value) {
  var links = inst.__dataLinkedPaths;
  if (links) {
    var link = void 0;
    for (var a in links) {
      var b = links[a];
      if (isDescendant(a, path)) {
        link = translate(a, b, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      } else if (isDescendant(b, path)) {
        link = translate(b, a, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      }
    }
  }
}

// -- bindings ----------------------------------------------

/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @return {void}
 * @private
 */
function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
  // Create binding metadata and add to nodeInfo
  nodeInfo.bindings = nodeInfo.bindings || [];
  var /** Binding */binding = { kind: kind, target: target, parts: parts, literal: literal, isCompound: parts.length !== 1 };
  nodeInfo.bindings.push(binding);
  // Add listener info to binding metadata
  if (shouldAddListener(binding)) {
    var _binding$parts$ = binding.parts[0],
        event = _binding$parts$.event,
        negate = _binding$parts$.negate;

    binding.listenerEvent = event || CaseMap.camelToDashCase(target) + '-changed';
    binding.listenerNegate = negate;
  }
  // Add "propagate" property effects to templateInfo
  var index = templateInfo.nodeInfoList.length;
  for (var i = 0; i < binding.parts.length; i++) {
    var part = binding.parts[i];
    part.compoundIndex = i;
    addEffectForBindingPart(constructor, templateInfo, binding, part, index);
  }
}

/**
 * Adds property effects to the given `templateInfo` for the given binding
 * part.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {number} index Index into `nodeInfoList` for this node
 * @return {void}
 */
function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
  if (!part.literal) {
    if (binding.kind === 'attribute' && binding.target[0] === '-') {
      console.warn('Cannot set attribute ' + binding.target + ' because "-" is not a valid attribute starting character');
    } else {
      var dependencies = part.dependencies;
      var info = { index: index, binding: binding, part: part, evaluator: constructor };
      for (var j = 0; j < dependencies.length; j++) {
        var trigger = dependencies[j];
        if (typeof trigger == 'string') {
          trigger = parseArg(trigger);
          trigger.wildcard = true;
        }
        constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
          fn: runBindingEffect,
          info: info, trigger: trigger
        });
      }
    }
  }
}

/**
 * Implements the "binding" (property/path binding) effect.
 *
 * Note that binding syntax is overridable via `_parseBindings` and
 * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
 * non-literal parts returned from `_parseBindings`.  However,
 * there is no support for _path_ bindings via custom binding parts,
 * as this is specific to Polymer's path binding syntax.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} path Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
 *   metadata
 * @return {void}
 * @private
 */
function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
  var node = nodeList[info.index];
  var binding = info.binding;
  var part = info.part;
  // Subpath notification: transform path and set to client
  // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
  if (hasPaths && part.source && path.length > part.source.length && binding.kind == 'property' && !binding.isCompound && node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
    var value = props[path];
    path = translate(part.source, binding.target, path);
    if (node._setPendingPropertyOrPath(path, value, false, true)) {
      inst._enqueueClient(node);
    }
  } else {
    var _value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
    // Propagate value to child
    applyBindingValue(inst, node, binding, part, _value);
  }
}

/**
 * Sets the value for an "binding" (binding) effect to a node,
 * either as a property or attribute.
 *
 * @param {!PropertyEffectsType} inst The instance owning the binding effect
 * @param {Node} node Target node for binding
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {*} value Value to set
 * @return {void}
 * @private
 */
function applyBindingValue(inst, node, binding, part, value) {
  value = computeBindingValue(node, value, binding, part);
  if (sanitizeDOMValue) {
    value = sanitizeDOMValue(value, binding.target, binding.kind, node);
  }
  if (binding.kind == 'attribute') {
    // Attribute binding
    inst._valueToNodeAttribute( /** @type {Element} */node, value, binding.target);
  } else {
    // Property binding
    var prop = binding.target;
    if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
      if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
        if (node._setPendingProperty(prop, value)) {
          inst._enqueueClient(node);
        }
      }
    } else {
      inst._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
}

/**
 * Transforms an "binding" effect value based on compound & negation
 * effect metadata, as well as handling for special-case properties
 *
 * @param {Node} node Node the value will be set to
 * @param {*} value Value to set
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @return {*} Transformed value to set
 * @private
 */
function computeBindingValue(node, value, binding, part) {
  if (binding.isCompound) {
    var storage = node.__dataCompoundStorage[binding.target];
    storage[part.compoundIndex] = value;
    value = storage.join('');
  }
  if (binding.kind !== 'attribute') {
    // Some browsers serialize `undefined` to `"undefined"`
    if (binding.target === 'textContent' || binding.target === 'value' && (node.localName === 'input' || node.localName === 'textarea')) {
      value = value == undefined ? '' : value;
    }
  }
  return value;
}

/**
 * Returns true if a binding's metadata meets all the requirements to allow
 * 2-way binding, and therefore a `<property>-changed` event listener should be
 * added:
 * - used curly braces
 * - is a property (not attribute) binding
 * - is not a textContent binding
 * - is not compound
 *
 * @param {!Binding} binding Binding metadata
 * @return {boolean} True if 2-way listener should be added
 * @private
 */
function shouldAddListener(binding) {
  return Boolean(binding.target) && binding.kind != 'attribute' && binding.kind != 'text' && !binding.isCompound && binding.parts[0].mode === '{';
}

/**
 * Setup compound binding storage structures, notify listeners, and dataHost
 * references onto the bound nodeList.
 *
 * @param {!PropertyEffectsType} inst Instance that bas been previously bound
 * @param {TemplateInfo} templateInfo Template metadata
 * @return {void}
 * @private
 */
function setupBindings(inst, templateInfo) {
  // Setup compound storage, dataHost, and notify listeners
  var nodeList = templateInfo.nodeList,
      nodeInfoList = templateInfo.nodeInfoList;

  if (nodeInfoList.length) {
    for (var i = 0; i < nodeInfoList.length; i++) {
      var info = nodeInfoList[i];
      var node = nodeList[i];
      var bindings = info.bindings;
      if (bindings) {
        for (var _i = 0; _i < bindings.length; _i++) {
          var binding = bindings[_i];
          setupCompoundStorage(node, binding);
          addNotifyListener(node, inst, binding);
        }
      }
      node.__dataHost = inst;
    }
  }
}

/**
 * Initializes `__dataCompoundStorage` local storage on a bound node with
 * initial literal data for compound bindings, and sets the joined
 * literal parts to the bound property.
 *
 * When changes to compound parts occur, they are first set into the compound
 * storage array for that property, and then the array is joined to result in
 * the final value set to the property/attribute.
 *
 * @param {Node} node Bound node to initialize
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */
function setupCompoundStorage(node, binding) {
  if (binding.isCompound) {
    // Create compound storage map
    var storage = node.__dataCompoundStorage || (node.__dataCompoundStorage = {});
    var parts = binding.parts;
    // Copy literals from parts into storage for this binding
    var literals = new Array(parts.length);
    for (var j = 0; j < parts.length; j++) {
      literals[j] = parts[j].literal;
    }
    var target = binding.target;
    storage[target] = literals;
    // Configure properties with their literal parts
    if (binding.literal && binding.kind == 'property') {
      node[target] = binding.literal;
    }
  }
}

/**
 * Adds a 2-way binding notification event listener to the node specified
 *
 * @param {Object} node Child element to add listener to
 * @param {!PropertyEffectsType} inst Host element instance to handle notification event
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */
function addNotifyListener(node, inst, binding) {
  if (binding.listenerEvent) {
    var part = binding.parts[0];
    node.addEventListener(binding.listenerEvent, function (e) {
      handleNotification(e, inst, binding.target, part.source, part.negate);
    });
  }
}

// -- for method-based effects (complexObserver & computed) --------------

/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @return {void}
 * @private
 */
function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
  dynamicFn = sig.static || dynamicFn && ((typeof dynamicFn === 'undefined' ? 'undefined' : _typeof$2(dynamicFn)) !== 'object' || dynamicFn[sig.methodName]);
  var info = {
    methodName: sig.methodName,
    args: sig.args,
    methodInfo: methodInfo,
    dynamicFn: dynamicFn
  };
  for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
    if (!arg.literal) {
      model._addPropertyEffect(arg.rootProperty, type, {
        fn: effectFn, info: info, trigger: arg
      });
    }
  }
  if (dynamicFn) {
    model._addPropertyEffect(sig.methodName, type, {
      fn: effectFn, info: info
    });
  }
}

/**
 * Calls a method with arguments marshaled from properties on the instance
 * based on the method signature contained in the effect metadata.
 *
 * Multi-property observers, computed properties, and inline computing
 * functions call this function to invoke the method, then use the return
 * value accordingly.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {*} Returns the return value from the method invocation
 * @private
 */
function runMethodEffect(inst, property, props, oldProps, info) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  var context = inst._methodHost || inst;
  var fn = context[info.methodName];
  if (fn) {
    var args = marshalArgs(inst.__data, info.args, property, props);
    return fn.apply(context, args);
  } else if (!info.dynamicFn) {
    console.warn('method `' + info.methodName + '` not defined');
  }
}

var emptyArray = [];

// Regular expressions used for binding
var IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
var ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' + STRING + ')\\s*' + ')';
var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
var ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
var CLOSE_BRACKET = '(?:]]|}})';
var NEGATE = '(?:(!)\\s*)?'; // Group 2
var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
var bindingRegex = new RegExp(EXPRESSION, "g");

/**
 * Create a string from binding parts of all the literal parts
 *
 * @param {!Array<BindingPart>} parts All parts to stringify
 * @return {string} String made from the literal parts
 */
function literalFromParts(parts) {
  var s = '';
  for (var i = 0; i < parts.length; i++) {
    var literal = parts[i].literal;
    s += literal || '';
  }
  return s;
}

/**
 * Parses an expression string for a method signature, and returns a metadata
 * describing the method in terms of `methodName`, `static` (whether all the
 * arguments are literals), and an array of `args`
 *
 * @param {string} expression The expression to parse
 * @return {?MethodSignature} The method metadata object if a method expression was
 *   found, otherwise `undefined`
 * @private
 */
function parseMethod(expression) {
  // tries to match valid javascript property names
  var m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (m) {
    var methodName = m[1];
    var sig = { methodName: methodName, static: true, args: emptyArray };
    if (m[2].trim()) {
      // replace escaped commas with comma entity, split on un-escaped commas
      var args = m[2].replace(/\\,/g, '&comma;').split(',');
      return parseArgs(args, sig);
    } else {
      return sig;
    }
  }
  return null;
}

/**
 * Parses an array of arguments and sets the `args` property of the supplied
 * signature metadata object. Sets the `static` property to false if any
 * argument is a non-literal.
 *
 * @param {!Array<string>} argList Array of argument names
 * @param {!MethodSignature} sig Method signature metadata object
 * @return {!MethodSignature} The updated signature metadata object
 * @private
 */
function parseArgs(argList, sig) {
  sig.args = argList.map(function (rawArg) {
    var arg = parseArg(rawArg);
    if (!arg.literal) {
      sig.static = false;
    }
    return arg;
  }, this);
  return sig;
}

/**
 * Parses an individual argument, and returns an argument metadata object
 * with the following fields:
 *
 *   {
 *     value: 'prop',        // property/path or literal value
 *     literal: false,       // whether argument is a literal
 *     structured: false,    // whether the property is a path
 *     rootProperty: 'prop', // the root property of the path
 *     wildcard: false       // whether the argument was a wildcard '.*' path
 *   }
 *
 * @param {string} rawArg The string value of the argument
 * @return {!MethodArg} Argument metadata object
 * @private
 */
function parseArg(rawArg) {
  // clean up whitespace
  var arg = rawArg.trim()
  // replace comma entity with comma
  .replace(/&comma;/g, ',')
  // repair extra escape sequences; note only commas strictly need
  // escaping, but we allow any other char to be escaped since its
  // likely users will do this
  .replace(/\\(.)/g, '\$1');
  // basic argument descriptor
  var a = {
    name: arg,
    value: '',
    literal: false
  };
  // detect literal value (must be String or Number)
  var fc = arg[0];
  if (fc === '-') {
    fc = arg[1];
  }
  if (fc >= '0' && fc <= '9') {
    fc = '#';
  }
  switch (fc) {
    case "'":
    case '"':
      a.value = arg.slice(1, -1);
      a.literal = true;
      break;
    case '#':
      a.value = Number(arg);
      a.literal = true;
      break;
  }
  // if not literal, look for structured path
  if (!a.literal) {
    a.rootProperty = root(arg);
    // detect structured path (has dots)
    a.structured = isPath(arg);
    if (a.structured) {
      a.wildcard = arg.slice(-2) == '.*';
      if (a.wildcard) {
        a.name = arg.slice(0, -2);
      }
    }
  }
  return a;
}

/**
 * Gather the argument values for a method specified in the provided array
 * of argument metadata.
 *
 * The `path` and `value` arguments are used to fill in wildcard descriptor
 * when the method is being called as a result of a path notification.
 *
 * @param {Object} data Instance data storage object to read properties from
 * @param {!Array<!MethodArg>} args Array of argument metadata
 * @param {string} path Property/path name that triggered the method effect
 * @param {Object} props Bag of current property changes
 * @return {Array<*>} Array of argument values
 * @private
 */
function marshalArgs(data, args, path, props) {
  var values = [];
  for (var i = 0, l = args.length; i < l; i++) {
    var arg = args[i];
    var name = arg.name;
    var v = void 0;
    if (arg.literal) {
      v = arg.value;
    } else {
      if (arg.structured) {
        v = get(data, name);
        // when data is not stored e.g. `splices`
        if (v === undefined) {
          v = props[name];
        }
      } else {
        v = data[name];
      }
    }
    if (arg.wildcard) {
      // Only send the actual path changed info if the change that
      // caused the observer to run matched the wildcard
      var baseChanged = name.indexOf(path + '.') === 0;
      var matches$$1 = path.indexOf(name) === 0 && !baseChanged;
      values[i] = {
        path: matches$$1 ? path : name,
        value: matches$$1 ? props[path] : v,
        base: v
      };
    } else {
      values[i] = v;
    }
  }
  return values;
}

// data api

/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @return {void}
 * @private
 */
function _notifySplices(inst, array, path, splices) {
  var splicesPath = path + '.splices';
  inst.notifyPath(splicesPath, { indexSplices: splices });
  inst.notifyPath(path + '.length', array.length);
  // Null here to allow potentially large splice records to be GC'ed.
  inst.__data[splicesPath] = { indexSplices: null };
}

/**
 * Creates a splice record and sends an array splice notification for
 * the described mutation
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {number} index Index at which the array mutation occurred
 * @param {number} addedCount Number of added items
 * @param {Array} removed Array of removed items
 * @return {void}
 * @private
 */
function notifySplice(inst, array, path, index, addedCount, removed) {
  _notifySplices(inst, array, path, [{
    index: index,
    addedCount: addedCount,
    removed: removed,
    object: array,
    type: 'splice'
  }]);
}

/**
 * Returns an upper-cased version of the string.
 *
 * @param {string} name String to uppercase
 * @return {string} Uppercased string
 * @private
 */
function upper(name) {
  return name[0].toUpperCase() + name.substring(1);
}

var PropertyEffects = dedupingMixin(function (superClass) {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertyAccessors}
   * @implements {Polymer_TemplateStamp}
   * @unrestricted
   */
  var propertyEffectsBase = TemplateStamp(PropertyAccessors(superClass));

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyEffects}
   * @extends {propertyEffectsBase}
   * @unrestricted
   */

  var PropertyEffects = function (_propertyEffectsBase) {
    _inherits$4(PropertyEffects, _propertyEffectsBase);

    function PropertyEffects() {
      _classCallCheck$4(this, PropertyEffects);

      /** @type {number} */
      // NOTE: used to track re-entrant calls to `_flushProperties`
      // path changes dirty check against `__dataTemp` only during one "turn"
      // and are cleared when `__dataCounter` returns to 0.
      var _this = _possibleConstructorReturn$4(this, (PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects)).call(this));

      _this.__dataCounter = 0;
      /** @type {boolean} */
      _this.__dataClientsReady;
      /** @type {Array} */
      _this.__dataPendingClients;
      /** @type {Object} */
      _this.__dataToNotify;
      /** @type {Object} */
      _this.__dataLinkedPaths;
      /** @type {boolean} */
      _this.__dataHasPaths;
      /** @type {Object} */
      _this.__dataCompoundStorage;
      /** @type {Polymer_PropertyEffects} */
      _this.__dataHost;
      /** @type {!Object} */
      _this.__dataTemp;
      /** @type {boolean} */
      _this.__dataClientsInitialized;
      /** @type {!Object} */
      _this.__data;
      /** @type {!Object} */
      _this.__dataPending;
      /** @type {!Object} */
      _this.__dataOld;
      /** @type {Object} */
      _this.__computeEffects;
      /** @type {Object} */
      _this.__reflectEffects;
      /** @type {Object} */
      _this.__notifyEffects;
      /** @type {Object} */
      _this.__propagateEffects;
      /** @type {Object} */
      _this.__observeEffects;
      /** @type {Object} */
      _this.__readOnly;
      /** @type {!TemplateInfo} */
      _this.__templateInfo;
      return _this;
    }

    _createClass$4(PropertyEffects, [{
      key: '_initializeProperties',


      /**
       * @return {void}
       */
      value: function _initializeProperties() {
        _get$2(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_initializeProperties', this).call(this);
        hostStack.registerHost(this);
        this.__dataClientsReady = false;
        this.__dataPendingClients = null;
        this.__dataToNotify = null;
        this.__dataLinkedPaths = null;
        this.__dataHasPaths = false;
        // May be set on instance prior to upgrade
        this.__dataCompoundStorage = this.__dataCompoundStorage || null;
        this.__dataHost = this.__dataHost || null;
        this.__dataTemp = {};
        this.__dataClientsInitialized = false;
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to provide a
       * more efficient implementation of initializing properties from
       * the prototype on the instance.
       *
       * @override
       * @param {Object} props Properties to initialize on the prototype
       * @return {void}
       */

    }, {
      key: '_initializeProtoProperties',
      value: function _initializeProtoProperties(props) {
        this.__data = Object.create(props);
        this.__dataPending = Object.create(props);
        this.__dataOld = {};
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
       * `_setProperty`'s `shouldNotify: true`.
       *
       * @override
       * @param {Object} props Properties to initialize on the instance
       * @return {void}
       */

    }, {
      key: '_initializeInstanceProperties',
      value: function _initializeInstanceProperties(props) {
        var readOnly = this[TYPES.READ_ONLY];
        for (var prop in props) {
          if (!readOnly || !readOnly[prop]) {
            this.__dataPending = this.__dataPending || {};
            this.__dataOld = this.__dataOld || {};
            this.__data[prop] = this.__dataPending[prop] = props[prop];
          }
        }
      }

      // Prototype setup ----------------------------------------

      /**
       * Equivalent to static `addPropertyEffect` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @return {void}
       * @protected
       */

    }, {
      key: '_addPropertyEffect',
      value: function _addPropertyEffect(property, type, effect) {
        this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
        // effects are accumulated into arrays per property based on type
        var effects = ensureOwnEffectMap(this, type)[property];
        if (!effects) {
          effects = this[type][property] = [];
        }
        effects.push(effect);
      }

      /**
       * Removes the given property effect.
       *
       * @param {string} property Property the effect was associated with
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object to remove
       * @return {void}
       */

    }, {
      key: '_removePropertyEffect',
      value: function _removePropertyEffect(property, type, effect) {
        var effects = ensureOwnEffectMap(this, type)[property];
        var idx = effects.indexOf(effect);
        if (idx >= 0) {
          effects.splice(idx, 1);
        }
      }

      /**
       * Returns whether the current prototype/instance has a property effect
       * of a certain type.
       *
       * @param {string} property Property name
       * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */

    }, {
      key: '_hasPropertyEffect',
      value: function _hasPropertyEffect(property, type) {
        var effects = this[type];
        return Boolean(effects && effects[property]);
      }

      /**
       * Returns whether the current prototype/instance has a "read only"
       * accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */

    }, {
      key: '_hasReadOnlyEffect',
      value: function _hasReadOnlyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.READ_ONLY);
      }

      /**
       * Returns whether the current prototype/instance has a "notify"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */

    }, {
      key: '_hasNotifyEffect',
      value: function _hasNotifyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.NOTIFY);
      }

      /**
       * Returns whether the current prototype/instance has a "reflect to attribute"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */

    }, {
      key: '_hasReflectEffect',
      value: function _hasReflectEffect(property) {
        return this._hasPropertyEffect(property, TYPES.REFLECT);
      }

      /**
       * Returns whether the current prototype/instance has a "computed"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */

    }, {
      key: '_hasComputedEffect',
      value: function _hasComputedEffect(property) {
        return this._hasPropertyEffect(property, TYPES.COMPUTE);
      }

      // Runtime ----------------------------------------

      /**
       * Sets a pending property or path.  If the root property of the path in
       * question had no accessor, the path is set, otherwise it is enqueued
       * via `_setPendingProperty`.
       *
       * This function isolates relatively expensive functionality necessary
       * for the public API (`set`, `setProperties`, `notifyPath`, and property
       * change listeners via {{...}} bindings), such that it is only done
       * when paths enter the system, and not at every propagation step.  It
       * also sets a `__dataHasPaths` flag on the instance which is used to
       * fast-path slower path-matching code in the property effects host paths.
       *
       * `path` can be a path string or array of path parts as accepted by the
       * public API.
       *
       * @param {string | !Array<number|string>} path Path to set
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify Set to true if this change should
       *  cause a property notification event dispatch
       * @param {boolean=} isPathNotification If the path being set is a path
       *   notification of an already changed value, as opposed to a request
       *   to set and notify the change.  In the latter `false` case, a dirty
       *   check is performed and then the value is set to the path before
       *   enqueuing the pending property change.
       * @return {boolean} Returns true if the property/path was enqueued in
       *   the pending changes bag.
       * @protected
       */

    }, {
      key: '_setPendingPropertyOrPath',
      value: function _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
        if (isPathNotification || root(Array.isArray(path) ? path[0] : path) !== path) {
          // Dirty check changes being set to a path against the actual object,
          // since this is the entry point for paths into the system; from here
          // the only dirty checks are against the `__dataTemp` cache to prevent
          // duplicate work in the same turn only. Note, if this was a notification
          // of a change already set to a path (isPathNotification: true),
          // we always let the change through and skip the `set` since it was
          // already dirty checked at the point of entry and the underlying
          // object has already been updated
          if (!isPathNotification) {
            var old = get(this, path);
            path = /** @type {string} */set(this, path, value);
            // Use property-accessor's simpler dirty check
            if (!path || !_get$2(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_shouldPropertyChange', this).call(this, path, value, old)) {
              return false;
            }
          }
          this.__dataHasPaths = true;
          if (this._setPendingProperty( /**@type{string}*/path, value, shouldNotify)) {
            computeLinkedPaths(this, path, value);
            return true;
          }
        } else {
          if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
            return this._setPendingProperty( /**@type{string}*/path, value, shouldNotify);
          } else {
            this[path] = value;
          }
        }
        return false;
      }

      /**
       * Applies a value to a non-Polymer element/node's property.
       *
       * The implementation makes a best-effort at binding interop:
       * Some native element properties have side-effects when
       * re-setting the same value (e.g. setting `<input>.value` resets the
       * cursor position), so we do a dirty-check before setting the value.
       * However, for better interop with non-Polymer custom elements that
       * accept objects, we explicitly re-set object changes coming from the
       * Polymer world (which may include deep object changes without the
       * top reference changing), erring on the side of providing more
       * information.
       *
       * Users may override this method to provide alternate approaches.
       *
       * @param {!Node} node The node to set a property on
       * @param {string} prop The property to set
       * @param {*} value The value to set
       * @return {void}
       * @protected
       */

    }, {
      key: '_setUnmanagedPropertyToNode',
      value: function _setUnmanagedPropertyToNode(node, prop, value) {
        // It is a judgment call that resetting primitives is
        // "bad" and resettings objects is also "good"; alternatively we could
        // implement a whitelist of tag & property values that should never
        // be reset (e.g. <input>.value && <select>.value)
        if (value !== node[prop] || (typeof value === 'undefined' ? 'undefined' : _typeof$2(value)) == 'object') {
          node[prop] = value;
        }
      }

      /**
       * Overrides the `PropertiesChanged` implementation to introduce special
       * dirty check logic depending on the property & value being set:
       *
       * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
       *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
       * 2. Object set to simple property (e.g. 'prop': {...})
       *    Stored in `__dataTemp` and `__data`, dirty checked against
       *    `__dataTemp` by default implementation of `_shouldPropertyChange`
       * 3. Primitive value set to simple property (e.g. 'prop': 42)
       *    Stored in `__data`, dirty checked against `__data`
       *
       * The dirty-check is important to prevent cycles due to two-way
       * notification, but paths and objects are only dirty checked against any
       * previous value set during this turn via a "temporary cache" that is
       * cleared when the last `_propertiesChanged` exits. This is so:
       * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
       *    due to array mutations like shift/unshift/splice; this is fine
       *    since path changes are dirty-checked at user entry points like `set`
       * b. dirty-checking for objects only lasts one turn to allow the user
       *    to mutate the object in-place and re-set it with the same identity
       *    and have all sub-properties re-propagated in a subsequent turn.
       *
       * The temp cache is not necessarily sufficient to prevent invalid array
       * paths, since a splice can happen during the same turn (with pathological
       * user code); we could introduce a "fixup" for temporarily cached array
       * paths if needed: https://github.com/Polymer/polymer/issues/4227
       *
       * @override
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify True if property should fire notification
       *   event (applies only for `notify: true` properties)
       * @return {boolean} Returns true if the property changed
       */

    }, {
      key: '_setPendingProperty',
      value: function _setPendingProperty(property, value, shouldNotify) {
        var isPath$$1 = this.__dataHasPaths && isPath(property);
        var prevProps = isPath$$1 ? this.__dataTemp : this.__data;
        if (this._shouldPropertyChange(property, value, prevProps[property])) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (!(property in this.__dataOld)) {
            this.__dataOld[property] = this.__data[property];
          }
          // Paths are stored in temporary cache (cleared at end of turn),
          // which is used for dirty-checking, all others stored in __data
          if (isPath$$1) {
            this.__dataTemp[property] = value;
          } else {
            this.__data[property] = value;
          }
          // All changes go into pending property bag, passed to _propertiesChanged
          this.__dataPending[property] = value;
          // Track properties that should notify separately
          if (isPath$$1 || this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property]) {
            this.__dataToNotify = this.__dataToNotify || {};
            this.__dataToNotify[property] = shouldNotify;
          }
          return true;
        }
        return false;
      }

      /**
       * Overrides base implementation to ensure all accessors set `shouldNotify`
       * to true, for per-property notification tracking.
       *
       * @override
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {void}
       */

    }, {
      key: '_setProperty',
      value: function _setProperty(property, value) {
        if (this._setPendingProperty(property, value, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Overrides `PropertyAccessor`'s default async queuing of
       * `_propertiesChanged`: if `__dataReady` is false (has not yet been
       * manually flushed), the function no-ops; otherwise flushes
       * `_propertiesChanged` synchronously.
       *
       * @override
       * @return {void}
       */

    }, {
      key: '_invalidateProperties',
      value: function _invalidateProperties() {
        if (this.__dataReady) {
          this._flushProperties();
        }
      }

      /**
       * Enqueues the given client on a list of pending clients, whose
       * pending property changes can later be flushed via a call to
       * `_flushClients`.
       *
       * @param {Object} client PropertyEffects client to enqueue
       * @return {void}
       * @protected
       */

    }, {
      key: '_enqueueClient',
      value: function _enqueueClient(client) {
        this.__dataPendingClients = this.__dataPendingClients || [];
        if (client !== this) {
          this.__dataPendingClients.push(client);
        }
      }

      /**
       * Overrides superclass implementation.
       *
       * @return {void}
       * @protected
       */

    }, {
      key: '_flushProperties',
      value: function _flushProperties() {
        this.__dataCounter++;
        _get$2(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_flushProperties', this).call(this);
        this.__dataCounter--;
      }

      /**
       * Flushes any clients previously enqueued via `_enqueueClient`, causing
       * their `_flushProperties` method to run.
       *
       * @return {void}
       * @protected
       */

    }, {
      key: '_flushClients',
      value: function _flushClients() {
        if (!this.__dataClientsReady) {
          this.__dataClientsReady = true;
          this._readyClients();
          // Override point where accessors are turned on; importantly,
          // this is after clients have fully readied, providing a guarantee
          // that any property effects occur only after all clients are ready.
          this.__dataReady = true;
        } else {
          this.__enableOrFlushClients();
        }
      }

      // NOTE: We ensure clients either enable or flush as appropriate. This
      // handles two corner cases:
      // (1) clients flush properly when connected/enabled before the host
      // enables; e.g.
      //   (a) Templatize stamps with no properties and does not flush and
      //   (b) the instance is inserted into dom and
      //   (c) then the instance flushes.
      // (2) clients enable properly when not connected/enabled when the host
      // flushes; e.g.
      //   (a) a template is runtime stamped and not yet connected/enabled
      //   (b) a host sets a property, causing stamped dom to flush
      //   (c) the stamped dom enables.

    }, {
      key: '__enableOrFlushClients',
      value: function __enableOrFlushClients() {
        var clients = this.__dataPendingClients;
        if (clients) {
          this.__dataPendingClients = null;
          for (var i = 0; i < clients.length; i++) {
            var client = clients[i];
            if (!client.__dataEnabled) {
              client._enableProperties();
            } else if (client.__dataPending) {
              client._flushProperties();
            }
          }
        }
      }

      /**
       * Perform any initial setup on client dom. Called before the first
       * `_flushProperties` call on client dom and before any element
       * observers are called.
       *
       * @return {void}
       * @protected
       */

    }, {
      key: '_readyClients',
      value: function _readyClients() {
        this.__enableOrFlushClients();
      }

      /**
       * Sets a bag of property changes to this instance, and
       * synchronously processes all effects of the properties as a batch.
       *
       * Property names must be simple properties, not paths.  Batched
       * path propagation is not supported.
       *
       * @param {Object} props Bag of one or more key-value pairs whose key is
       *   a property and value is the new value to set for that property.
       * @param {boolean=} setReadOnly When true, any private values set in
       *   `props` will be set. By default, `setProperties` will not set
       *   `readOnly: true` root properties.
       * @return {void}
       * @public
       */

    }, {
      key: 'setProperties',
      value: function setProperties(props, setReadOnly) {
        for (var path in props) {
          if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
            //TODO(kschaaf): explicitly disallow paths in setProperty?
            // wildcard observers currently only pass the first changed path
            // in the `info` object, and you could do some odd things batching
            // paths, e.g. {'foo.bar': {...}, 'foo': null}
            this._setPendingPropertyOrPath(path, props[path], true);
          }
        }
        this._invalidateProperties();
      }

      /**
       * Overrides `PropertyAccessors` so that property accessor
       * side effects are not enabled until after client dom is fully ready.
       * Also calls `_flushClients` callback to ensure client dom is enabled
       * that was not enabled as a result of flushing properties.
       *
       * @override
       * @return {void}
       */

    }, {
      key: 'ready',
      value: function ready() {
        // It is important that `super.ready()` is not called here as it
        // immediately turns on accessors. Instead, we wait until `readyClients`
        // to enable accessors to provide a guarantee that clients are ready
        // before processing any accessors side effects.
        this._flushProperties();
        // If no data was pending, `_flushProperties` will not `flushClients`
        // so ensure this is done.
        if (!this.__dataClientsReady) {
          this._flushClients();
        }
        // Before ready, client notifications do not trigger _flushProperties.
        // Therefore a flush is necessary here if data has been set.
        if (this.__dataPending) {
          this._flushProperties();
        }
      }

      /**
       * Implements `PropertyAccessors`'s properties changed callback.
       *
       * Runs each class of effects for the batch of changed properties in
       * a specific order (compute, propagate, reflect, observe, notify).
       *
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {!Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {!Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @return {void}
       */

    }, {
      key: '_propertiesChanged',
      value: function _propertiesChanged(currentProps, changedProps, oldProps) {
        // ----------------------------
        // let c = Object.getOwnPropertyNames(changedProps || {});
        // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
        // if (window.debug) { debugger; }
        // ----------------------------
        var hasPaths = this.__dataHasPaths;
        this.__dataHasPaths = false;
        // Compute properties
        runComputedEffects(this, changedProps, oldProps, hasPaths);
        // Clear notify properties prior to possible reentry (propagate, observe),
        // but after computing effects have a chance to add to them
        var notifyProps = this.__dataToNotify;
        this.__dataToNotify = null;
        // Propagate properties to clients
        this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
        // Flush clients
        this._flushClients();
        // Reflect properties
        runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
        // Observe properties
        runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
        // Notify properties to host
        if (notifyProps) {
          runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
        }
        // Clear temporary cache at end of turn
        if (this.__dataCounter == 1) {
          this.__dataTemp = {};
        }
        // ----------------------------
        // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
        // ----------------------------
      }

      /**
       * Called to propagate any property changes to stamped template nodes
       * managed by this element.
       *
       * @param {Object} changedProps Bag of changed properties
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @return {void}
       * @protected
       */

    }, {
      key: '_propagatePropertyChanges',
      value: function _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
        if (this[TYPES.PROPAGATE]) {
          runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
        }
        var templateInfo = this.__templateInfo;
        while (templateInfo) {
          runEffects(this, templateInfo.propertyEffects, changedProps, oldProps, hasPaths, templateInfo.nodeList);
          templateInfo = templateInfo.nextTemplateInfo;
        }
      }

      /**
       * Aliases one data path as another, such that path notifications from one
       * are routed to the other.
       *
       * @param {string | !Array<string|number>} to Target path to link.
       * @param {string | !Array<string|number>} from Source path to link.
       * @return {void}
       * @public
       */

    }, {
      key: 'linkPaths',
      value: function linkPaths(to, from) {
        to = normalize(to);
        from = normalize(from);
        this.__dataLinkedPaths = this.__dataLinkedPaths || {};
        this.__dataLinkedPaths[to] = from;
      }

      /**
       * Removes a data path alias previously established with `_linkPaths`.
       *
       * Note, the path to unlink should be the target (`to`) used when
       * linking the paths.
       *
       * @param {string | !Array<string|number>} path Target path to unlink.
       * @return {void}
       * @public
       */

    }, {
      key: 'unlinkPaths',
      value: function unlinkPaths(path) {
        path = normalize(path);
        if (this.__dataLinkedPaths) {
          delete this.__dataLinkedPaths[path];
        }
      }

      /**
       * Notify that an array has changed.
       *
       * Example:
       *
       *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
       *     ...
       *     this.items.splice(1, 1, {name: 'Sam'});
       *     this.items.push({name: 'Bob'});
       *     this.notifySplices('items', [
       *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, object: this.items, type: 'splice' },
       *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
       *     ]);
       *
       * @param {string} path Path that should be notified.
       * @param {Array} splices Array of splice records indicating ordered
       *   changes that occurred to the array. Each record should have the
       *   following fields:
       *    * index: index at which the change occurred
       *    * removed: array of items that were removed from this index
       *    * addedCount: number of new items added at this index
       *    * object: a reference to the array in question
       *    * type: the string literal 'splice'
       *
       *   Note that splice records _must_ be normalized such that they are
       *   reported in index order (raw results from `Object.observe` are not
       *   ordered and must be normalized/merged before notifying).
       * @return {void}
       * @public
      */

    }, {
      key: 'notifySplices',
      value: function notifySplices(path, splices) {
        var info = { path: '' };
        var array = /** @type {Array} */get(this, path, info);
        _notifySplices(this, array, info.path, splices);
      }

      /**
       * Convenience method for reading a value from a path.
       *
       * Note, if any part in the path is undefined, this method returns
       * `undefined` (this method does not throw when dereferencing undefined
       * paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `users.12.name` or `['users', 12, 'name']`).
       * @param {Object=} root Root object from which the path is evaluated.
       * @return {*} Value at the path, or `undefined` if any part of the path
       *   is undefined.
       * @public
       */

    }, {
      key: 'get',
      value: function get$$1(path, root$$1) {
        return get(root$$1 || this, path);
      }

      /**
       * Convenience method for setting a value to a path and notifying any
       * elements bound to the same path.
       *
       * Note, if any part in the path except for the last is undefined,
       * this method does nothing (this method does not throw when
       * dereferencing undefined paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
       * @param {*} value Value to set at the specified path.
       * @param {Object=} root Root object from which the path is evaluated.
       *   When specified, no notification will occur.
       * @return {void}
       * @public
      */

    }, {
      key: 'set',
      value: function set$$1(path, value, root$$1) {
        if (root$$1) {
          set(root$$1, path, value);
        } else {
          if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */path]) {
            if (this._setPendingPropertyOrPath(path, value, true)) {
              this._invalidateProperties();
            }
          }
        }
      }

      /**
       * Adds items onto the end of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string | !Array<string|number>} path Path to array.
       * @param {...*} items Items to push onto array
       * @return {number} New length of the array.
       * @public
       */

    }, {
      key: 'push',
      value: function push(path) {
        var info = { path: '' };
        var array = /** @type {Array}*/get(this, path, info);
        var len = array.length;

        for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          items[_key - 1] = arguments[_key];
        }

        var ret = array.push.apply(array, items);
        if (items.length) {
          notifySplice(this, array, info.path, len, items.length, []);
        }
        return ret;
      }

      /**
       * Removes an item from the end of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string | !Array<string|number>} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */

    }, {
      key: 'pop',
      value: function pop(path) {
        var info = { path: '' };
        var array = /** @type {Array} */get(this, path, info);
        var hadLength = Boolean(array.length);
        var ret = array.pop();
        if (hadLength) {
          notifySplice(this, array, info.path, array.length, 0, [ret]);
        }
        return ret;
      }

      /**
       * Starting from the start index specified, removes 0 or more items
       * from the array and inserts 0 or more new items in their place.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.splice`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string | !Array<string|number>} path Path to array.
       * @param {number} start Index from which to start removing/inserting.
       * @param {number} deleteCount Number of items to remove.
       * @param {...*} items Items to insert into array.
       * @return {Array} Array of removed items.
       * @public
       */

    }, {
      key: 'splice',
      value: function splice(path, start, deleteCount) {
        var info = { path: '' };
        var array = /** @type {Array} */get(this, path, info);
        // Normalize fancy native splice handling of crazy start values
        if (start < 0) {
          start = array.length - Math.floor(-start);
        } else {
          start = Math.floor(start);
        }
        if (!start) {
          start = 0;
        }

        for (var _len2 = arguments.length, items = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
          items[_key2 - 3] = arguments[_key2];
        }

        var ret = array.splice.apply(array, [start, deleteCount].concat(items));
        if (items.length || ret.length) {
          notifySplice(this, array, info.path, start, items.length, ret);
        }
        return ret;
      }

      /**
       * Removes an item from the beginning of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string | !Array<string|number>} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */

    }, {
      key: 'shift',
      value: function shift(path) {
        var info = { path: '' };
        var array = /** @type {Array} */get(this, path, info);
        var hadLength = Boolean(array.length);
        var ret = array.shift();
        if (hadLength) {
          notifySplice(this, array, info.path, 0, 0, [ret]);
        }
        return ret;
      }

      /**
       * Adds items onto the beginning of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string | !Array<string|number>} path Path to array.
       * @param {...*} items Items to insert info array
       * @return {number} New length of the array.
       * @public
       */

    }, {
      key: 'unshift',
      value: function unshift(path) {
        var info = { path: '' };
        var array = /** @type {Array} */get(this, path, info);

        for (var _len3 = arguments.length, items = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          items[_key3 - 1] = arguments[_key3];
        }

        var ret = array.unshift.apply(array, items);
        if (items.length) {
          notifySplice(this, array, info.path, 0, items.length, []);
        }
        return ret;
      }

      /**
       * Notify that a path has changed.
       *
       * Example:
       *
       *     this.item.user.name = 'Bob';
       *     this.notifyPath('item.user.name');
       *
       * @param {string} path Path that should be notified.
       * @param {*=} value Value at the path (optional).
       * @return {void}
       * @public
      */

    }, {
      key: 'notifyPath',
      value: function notifyPath(path, value) {
        /** @type {string} */
        var propPath = void 0;
        if (arguments.length == 1) {
          // Get value if not supplied
          var info = { path: '' };
          value = get(this, path, info);
          propPath = info.path;
        } else if (Array.isArray(path)) {
          // Normalize path if needed
          propPath = normalize(path);
        } else {
          propPath = /** @type{string} */path;
        }
        if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Equivalent to static `createReadOnlyProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @return {void}
       * @protected
       */

    }, {
      key: '_createReadOnlyProperty',
      value: function _createReadOnlyProperty(property, protectedSetter) {
        this._addPropertyEffect(property, TYPES.READ_ONLY);
        if (protectedSetter) {
          this['_set' + upper(property)] = /** @this {PropertyEffects} */function (value) {
            this._setProperty(property, value);
          };
        }
      }

      /**
       * Equivalent to static `createPropertyObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {string|function(*,*)} method Function or name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @return {void}
       * @protected
       */

    }, {
      key: '_createPropertyObserver',
      value: function _createPropertyObserver(property, method, dynamicFn) {
        var info = { property: property, method: method, dynamicFn: Boolean(dynamicFn) };
        this._addPropertyEffect(property, TYPES.OBSERVE, {
          fn: runObserverEffect, info: info, trigger: { name: property }
        });
        if (dynamicFn) {
          this._addPropertyEffect( /** @type {string} */method, TYPES.OBSERVE, {
            fn: runObserverEffect, info: info, trigger: { name: method }
          });
        }
      }

      /**
       * Equivalent to static `createMethodObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @return {void}
       * @protected
       */

    }, {
      key: '_createMethodObserver',
      value: function _createMethodObserver(expression, dynamicFn) {
        var sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed observer expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
      }

      /**
       * Equivalent to static `createNotifyingProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @return {void}
       * @protected
       */

    }, {
      key: '_createNotifyingProperty',
      value: function _createNotifyingProperty(property) {
        this._addPropertyEffect(property, TYPES.NOTIFY, {
          fn: runNotifyEffect,
          info: {
            eventName: CaseMap.camelToDashCase(property) + '-changed',
            property: property
          }
        });
      }

      /**
       * Equivalent to static `createReflectedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @return {void}
       * @protected
       */

    }, {
      key: '_createReflectedProperty',
      value: function _createReflectedProperty(property) {
        var attr = this.constructor.attributeNameForProperty(property);
        if (attr[0] === '-') {
          console.warn('Property ' + property + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.');
        } else {
          this._addPropertyEffect(property, TYPES.REFLECT, {
            fn: runReflectEffect,
            info: {
              attrName: attr
            }
          });
        }
      }

      /**
       * Equivalent to static `createComputedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @return {void}
       * @protected
       */

    }, {
      key: '_createComputedProperty',
      value: function _createComputedProperty(property, expression, dynamicFn) {
        var sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed computed expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
      }

      // -- static class methods ------------

      /**
       * Ensures an accessor exists for the specified property, and adds
       * to a list of "property effects" that will run when the accessor for
       * the specified property is set.  Effects are grouped by "type", which
       * roughly corresponds to a phase in effect processing.  The effect
       * metadata should be in the following form:
       *
       *     {
       *       fn: effectFunction, // Reference to function to call to perform effect
       *       info: { ... }       // Effect metadata passed to function
       *       trigger: {          // Optional triggering metadata; if not provided
       *         name: string      // the property is treated as a wildcard
       *         structured: boolean
       *         wildcard: boolean
       *       }
       *     }
       *
       * Effects are called from `_propertiesChanged` in the following order by
       * type:
       *
       * 1. COMPUTE
       * 2. PROPAGATE
       * 3. REFLECT
       * 4. OBSERVE
       * 5. NOTIFY
       *
       * Effect functions are called with the following signature:
       *
       *     effectFunction(inst, path, props, oldProps, info, hasPaths)
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @return {void}
       * @protected
       */

    }, {
      key: '_bindTemplate',


      // -- binding ----------------------------------------------

      /**
       * Equivalent to static `bindTemplate` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * This method may be called on the prototype (for prototypical template
       * binding, to avoid creating accessors every instance) once per prototype,
       * and will be called with `runtimeBinding: true` by `_stampTemplate` to
       * create and link an instance of the template metadata associated with a
       * particular stamping.
       *
       * @param {!HTMLTemplateElement} template Template containing binding
       *   bindings
       * @param {boolean=} instanceBinding When false (default), performs
       *   "prototypical" binding of the template and overwrites any previously
       *   bound template for the class. When true (as passed from
       *   `_stampTemplate`), the template info is instanced and linked into
       *   the list of bound templates.
       * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
       *   this is an instance of the prototypical template info
       * @protected
       */
      value: function _bindTemplate(template, instanceBinding) {
        var templateInfo = this.constructor._parseTemplate(template);
        var wasPreBound = this.__templateInfo == templateInfo;
        // Optimization: since this is called twice for proto-bound templates,
        // don't attempt to recreate accessors if this template was pre-bound
        if (!wasPreBound) {
          for (var prop in templateInfo.propertyEffects) {
            this._createPropertyAccessor(prop);
          }
        }
        if (instanceBinding) {
          // For instance-time binding, create instance of template metadata
          // and link into list of templates if necessary
          templateInfo = /** @type {!TemplateInfo} */Object.create(templateInfo);
          templateInfo.wasPreBound = wasPreBound;
          if (!wasPreBound && this.__templateInfo) {
            var last = this.__templateInfoLast || this.__templateInfo;
            this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
            templateInfo.previousTemplateInfo = last;
            return templateInfo;
          }
        }
        return this.__templateInfo = templateInfo;
      }

      /**
       * Adds a property effect to the given template metadata, which is run
       * at the "propagate" stage of `_propertiesChanged` when the template
       * has been bound to the element via `_bindTemplate`.
       *
       * The `effect` object should match the format in `_addPropertyEffect`.
       *
       * @param {Object} templateInfo Template metadata to add effect to
       * @param {string} prop Property that should trigger the effect
       * @param {Object=} effect Effect metadata object
       * @return {void}
       * @protected
       */

    }, {
      key: '_stampTemplate',


      /**
       * Stamps the provided template and performs instance-time setup for
       * Polymer template features, including data bindings, declarative event
       * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
       * is returned containing the stamped DOM, ready for insertion into the
       * DOM.
       *
       * This method may be called more than once; however note that due to
       * `shadycss` polyfill limitations, only styles from templates prepared
       * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
       * to the shadow root and support CSS custom properties), and note that
       * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
       * any styles required by in runtime-stamped templates must be included
       * in the main element template.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       * @override
       * @protected
       */
      value: function _stampTemplate(template) {
        // Ensures that created dom is `_enqueueClient`'d to this element so
        // that it can be flushed on next call to `_flushProperties`
        hostStack.beginHosting(this);
        var dom = _get$2(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_stampTemplate', this).call(this, template);
        hostStack.endHosting(this);
        var templateInfo = /** @type {!TemplateInfo} */this._bindTemplate(template, true);
        // Add template-instance-specific data to instanced templateInfo
        templateInfo.nodeList = dom.nodeList;
        // Capture child nodes to allow unstamping of non-prototypical templates
        if (!templateInfo.wasPreBound) {
          var nodes = templateInfo.childNodes = [];
          for (var n = dom.firstChild; n; n = n.nextSibling) {
            nodes.push(n);
          }
        }
        dom.templateInfo = templateInfo;
        // Setup compound storage, 2-way listeners, and dataHost for bindings
        setupBindings(this, templateInfo);
        // Flush properties into template nodes if already booted
        if (this.__dataReady) {
          runEffects(this, templateInfo.propertyEffects, this.__data, null, false, templateInfo.nodeList);
        }
        return dom;
      }

      /**
       * Removes and unbinds the nodes previously contained in the provided
       * DocumentFragment returned from `_stampTemplate`.
       *
       * @param {!StampedTemplate} dom DocumentFragment previously returned
       *   from `_stampTemplate` associated with the nodes to be removed
       * @return {void}
       * @protected
       */

    }, {
      key: '_removeBoundDom',
      value: function _removeBoundDom(dom) {
        // Unlink template info
        var templateInfo = dom.templateInfo;
        if (templateInfo.previousTemplateInfo) {
          templateInfo.previousTemplateInfo.nextTemplateInfo = templateInfo.nextTemplateInfo;
        }
        if (templateInfo.nextTemplateInfo) {
          templateInfo.nextTemplateInfo.previousTemplateInfo = templateInfo.previousTemplateInfo;
        }
        if (this.__templateInfoLast == templateInfo) {
          this.__templateInfoLast = templateInfo.previousTemplateInfo;
        }
        templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
        // Remove stamped nodes
        var nodes = templateInfo.childNodes;
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          node.parentNode.removeChild(node);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */

    }, {
      key: 'PROPERTY_EFFECT_TYPES',
      get: function get$$1() {
        return TYPES;
      }
    }], [{
      key: 'addPropertyEffect',
      value: function addPropertyEffect(property, type, effect) {
        this.prototype._addPropertyEffect(property, type, effect);
      }

      /**
       * Creates a single-property observer for the given property.
       *
       * @param {string} property Property name
       * @param {string|function(*,*)} method Function or name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @return {void}
       * @protected
       */

    }, {
      key: 'createPropertyObserver',
      value: function createPropertyObserver(property, method, dynamicFn) {
        this.prototype._createPropertyObserver(property, method, dynamicFn);
      }

      /**
       * Creates a multi-property "method observer" based on the provided
       * expression, which should be a string in the form of a normal JavaScript
       * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
       * should correspond to a property or path in the context of this
       * prototype (or instance), or may be a literal string or number.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       * @return {void}
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */

    }, {
      key: 'createMethodObserver',
      value: function createMethodObserver(expression, dynamicFn) {
        this.prototype._createMethodObserver(expression, dynamicFn);
      }

      /**
       * Causes the setter for the given property to dispatch `<property>-changed`
       * events to notify of changes to the property.
       *
       * @param {string} property Property name
       * @return {void}
       * @protected
       */

    }, {
      key: 'createNotifyingProperty',
      value: function createNotifyingProperty(property) {
        this.prototype._createNotifyingProperty(property);
      }

      /**
       * Creates a read-only accessor for the given property.
       *
       * To set the property, use the protected `_setProperty` API.
       * To create a custom protected setter (e.g. `_setMyProp()` for
       * property `myProp`), pass `true` for `protectedSetter`.
       *
       * Note, if the property will have other property effects, this method
       * should be called first, before adding other effects.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @return {void}
       * @protected
       */

    }, {
      key: 'createReadOnlyProperty',
      value: function createReadOnlyProperty(property, protectedSetter) {
        this.prototype._createReadOnlyProperty(property, protectedSetter);
      }

      /**
       * Causes the setter for the given property to reflect the property value
       * to a (dash-cased) attribute of the same name.
       *
       * @param {string} property Property name
       * @return {void}
       * @protected
       */

    }, {
      key: 'createReflectedProperty',
      value: function createReflectedProperty(property) {
        this.prototype._createReflectedProperty(property);
      }

      /**
       * Creates a computed property whose value is set to the result of the
       * method described by the given `expression` each time one or more
       * arguments to the method changes.  The expression should be a string
       * in the form of a normal JavaScript function signature:
       * `'methodName(arg1, [..., argn])'`
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
       *   method names should be included as a dependency to the effect.
       * @return {void}
       * @protected
       */

    }, {
      key: 'createComputedProperty',
      value: function createComputedProperty(property, expression, dynamicFn) {
        this.prototype._createComputedProperty(property, expression, dynamicFn);
      }

      /**
       * Parses the provided template to ensure binding effects are created
       * for them, and then ensures property accessors are created for any
       * dependent properties in the template.  Binding effects for bound
       * templates are stored in a linked list on the instance so that
       * templates can be efficiently stamped and unstamped.
       *
       * @param {!HTMLTemplateElement} template Template containing binding
       *   bindings
       * @return {!TemplateInfo} Template metadata object
       * @protected
       */

    }, {
      key: 'bindTemplate',
      value: function bindTemplate(template) {
        return this.prototype._bindTemplate(template);
      }
    }, {
      key: '_addTemplatePropertyEffect',
      value: function _addTemplatePropertyEffect(templateInfo, prop, effect) {
        var hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
        hostProps[prop] = true;
        var effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
        var propEffects = effects[prop] = effects[prop] || [];
        propEffects.push(effect);
      }
    }, {
      key: '_parseTemplateNode',
      value: function _parseTemplateNode(node, templateInfo, nodeInfo) {
        var noted = _get$2(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNode', this).call(this, node, templateInfo, nodeInfo);
        if (node.nodeType === Node.TEXT_NODE) {
          var parts = this._parseBindings(node.textContent, templateInfo);
          if (parts) {
            // Initialize the textContent with any literal parts
            // NOTE: default to a space here so the textNode remains; some browsers
            // (IE) omit an empty textNode following cloneNode/importNode.
            node.textContent = literalFromParts(parts) || ' ';
            addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
            noted = true;
          }
        }
        return noted;
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from attributes.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */

    }, {
      key: '_parseTemplateNodeAttribute',
      value: function _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        var parts = this._parseBindings(value, templateInfo);
        if (parts) {
          // Attribute or property
          var origName = name;
          var kind = 'property';
          if (name[name.length - 1] == '$') {
            name = name.slice(0, -1);
            kind = 'attribute';
          }
          // Initialize attribute bindings with any literal parts
          var literal = literalFromParts(parts);
          if (literal && kind == 'attribute') {
            node.setAttribute(name, literal);
          }
          // Clear attribute before removing, since IE won't allow removing
          // `value` attribute if it previously had a value (can't
          // unconditionally set '' before removing since attributes with `$`
          // can't be set using setAttribute)
          if (node.localName === 'input' && origName === 'value') {
            node.setAttribute(origName, '');
          }
          // Remove annotation
          node.removeAttribute(origName);
          // Case hackery: attributes are lower-case, but bind targets
          // (properties) are case sensitive. Gambit is to map dash-case to
          // camel-case: `foo-bar` becomes `fooBar`.
          // Attribute bindings are excepted.
          if (kind === 'property') {
            name = dashToCamelCase(name);
          }
          addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
          return true;
        } else {
          return _get$2(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNodeAttribute', this).call(this, node, templateInfo, nodeInfo, name, value);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * binding the properties that a nested template depends on to the template
       * as `_host_<property>`.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */

    }, {
      key: '_parseTemplateNestedTemplate',
      value: function _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
        var noted = _get$2(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNestedTemplate', this).call(this, node, templateInfo, nodeInfo);
        // Merge host props into outer template and add bindings
        var hostProps = nodeInfo.templateInfo.hostProps;
        var mode = '{';
        for (var source in hostProps) {
          var parts = [{ mode: mode, source: source, dependencies: [source] }];
          addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
        }
        return noted;
      }

      /**
       * Called to parse text in a template (either attribute values or
       * textContent) into binding metadata.
       *
       * Any overrides of this method should return an array of binding part
       * metadata  representing one or more bindings found in the provided text
       * and any "literal" text in between.  Any non-literal parts will be passed
       * to `_evaluateBinding` when any dependencies change.  The only required
       * fields of each "part" in the returned array are as follows:
       *
       * - `dependencies` - Array containing trigger metadata for each property
       *   that should trigger the binding to update
       * - `literal` - String containing text if the part represents a literal;
       *   in this case no `dependencies` are needed
       *
       * Additional metadata for use by `_evaluateBinding` may be provided in
       * each part object as needed.
       *
       * The default implementation handles the following types of bindings
       * (one or more may be intermixed with literal strings):
       * - Property binding: `[[prop]]`
       * - Path binding: `[[object.prop]]`
       * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
       * - Two-way property or path bindings (supports negation):
       *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
       * - Inline computed method (supports negation):
       *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
       *
       * @param {string} text Text to parse from attribute or textContent
       * @param {Object} templateInfo Current template metadata
       * @return {Array<!BindingPart>} Array of binding part metadata
       * @protected
       */

    }, {
      key: '_parseBindings',
      value: function _parseBindings(text, templateInfo) {
        var parts = [];
        var lastIndex = 0;
        var m = void 0;
        // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
        // Regex matches:
        //        Iteration 1:  Iteration 2:
        // m[1]: '{{'          '[['
        // m[2]: ''            '!'
        // m[3]: 'prop'        'compute(foo,bar)'
        while ((m = bindingRegex.exec(text)) !== null) {
          // Add literal part
          if (m.index > lastIndex) {
            parts.push({ literal: text.slice(lastIndex, m.index) });
          }
          // Add binding part
          var mode = m[1][0];
          var negate = Boolean(m[2]);
          var source = m[3].trim();
          var customEvent = false,
              notifyEvent = '',
              colon = -1;
          if (mode == '{' && (colon = source.indexOf('::')) > 0) {
            notifyEvent = source.substring(colon + 2);
            source = source.substring(0, colon);
            customEvent = true;
          }
          var signature = parseMethod(source);
          var dependencies = [];
          if (signature) {
            // Inline computed function
            var args = signature.args,
                methodName = signature.methodName;

            for (var i = 0; i < args.length; i++) {
              var arg = args[i];
              if (!arg.literal) {
                dependencies.push(arg);
              }
            }
            var dynamicFns = templateInfo.dynamicFns;
            if (dynamicFns && dynamicFns[methodName] || signature.static) {
              dependencies.push(methodName);
              signature.dynamicFn = true;
            }
          } else {
            // Property or path
            dependencies.push(source);
          }
          parts.push({
            source: source, mode: mode, negate: negate, customEvent: customEvent, signature: signature, dependencies: dependencies,
            event: notifyEvent
          });
          lastIndex = bindingRegex.lastIndex;
        }
        // Add a final literal part
        if (lastIndex && lastIndex < text.length) {
          var literal = text.substring(lastIndex);
          if (literal) {
            parts.push({
              literal: literal
            });
          }
        }
        if (parts.length) {
          return parts;
        } else {
          return null;
        }
      }

      /**
       * Called to evaluate a previously parsed binding part based on a set of
       * one or more changed dependencies.
       *
       * @param {this} inst Element that should be used as scope for
       *   binding dependencies
       * @param {BindingPart} part Binding part metadata
       * @param {string} path Property/path that triggered this effect
       * @param {Object} props Bag of current property changes
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @return {*} Value the binding part evaluated to
       * @protected
       */

    }, {
      key: '_evaluateBinding',
      value: function _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
        var value = void 0;
        if (part.signature) {
          value = runMethodEffect(inst, path, props, oldProps, part.signature);
        } else if (path != part.source) {
          value = get(inst, part.source);
        } else {
          if (hasPaths && isPath(path)) {
            value = get(inst, path);
          } else {
            value = inst.__data[path];
          }
        }
        if (part.negate) {
          value = !value;
        }
        return value;
      }
    }]);

    return PropertyEffects;
  }(propertyEffectsBase);

  // make a typing for closure :P


  return PropertyEffects;
});

/**
 * Helper api for enqueuing client dom created by a host element.
 *
 * By default elements are flushed via `_flushProperties` when
 * `connectedCallback` is called. Elements attach their client dom to
 * themselves at `ready` time which results from this first flush.
 * This provides an ordering guarantee that the client dom an element
 * creates is flushed before the element itself (i.e. client `ready`
 * fires before host `ready`).
 *
 * However, if `_flushProperties` is called *before* an element is connected,
 * as for example `Templatize` does, this ordering guarantee cannot be
 * satisfied because no elements are connected. (Note: Bound elements that
 * receive data do become enqueued clients and are properly ordered but
 * unbound elements are not.)
 *
 * To maintain the desired "client before host" ordering guarantee for this
 * case we rely on the "host stack. Client nodes registers themselves with
 * the creating host element when created. This ensures that all client dom
 * is readied in the proper order, maintaining the desired guarantee.
 *
 * @private
 */
var hostStack = {

  stack: [],

  /**
   * @param {*} inst Instance to add to hostStack
   * @return {void}
   * @this {hostStack}
   */
  registerHost: function registerHost(inst) {
    if (this.stack.length) {
      var host = this.stack[this.stack.length - 1];
      host._enqueueClient(inst);
    }
  },


  /**
   * @param {*} inst Instance to begin hosting
   * @return {void}
   * @this {hostStack}
   */
  beginHosting: function beginHosting(inst) {
    this.stack.push(inst);
  },


  /**
   * @param {*} inst Instance to end hosting
   * @return {void}
   * @this {hostStack}
   */
  endHosting: function endHosting(inst) {
    var stackLen = this.stack.length;
    if (stackLen && this.stack[stackLen - 1] == inst) {
      this.stack.pop();
    }
  }
};

var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$3 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a copy of `props` with each property normalized such that
 * upgraded it is an object with at least a type property { type: Type}.
 *
 * @param {Object} props Properties to normalize
 * @return {Object} Copy of input `props` with normalized properties that
 * are in the form {type: Type}
 * @private
 */
function normalizeProperties(props) {
  var output = {};
  for (var p in props) {
    var o = props[p];
    output[p] = typeof o === 'function' ? { type: o } : o;
  }
  return output;
}

var PropertiesMixin = dedupingMixin(function (superClass) {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertiesChanged}
   */
  var base = PropertiesChanged(superClass);

  /**
   * Returns the super class constructor for the given class, if it is an
   * instance of the PropertiesMixin.
   *
   * @param {!PropertiesMixinConstructor} constructor PropertiesMixin constructor
   * @return {PropertiesMixinConstructor} Super class constructor
   */
  function superPropertiesClass(constructor) {
    var superCtor = Object.getPrototypeOf(constructor);
    // Note, the `PropertiesMixin` class below only refers to the class
    // generated by this call to the mixin; the instanceof test only works
    // because the mixin is deduped and guaranteed only to apply once, hence
    // all constructors in a proto chain will see the same `PropertiesMixin`
    return superCtor.prototype instanceof PropertiesMixin ?
    /** @type {PropertiesMixinConstructor} */superCtor : null;
  }

  /**
   * Returns a memoized version of the `properties` object for the
   * given class. Properties not in object format are converted to at
   * least {type}.
   *
   * @param {PropertiesMixinConstructor} constructor PropertiesMixin constructor
   * @return {Object} Memoized properties object
   */
  function ownProperties(constructor) {
    if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', constructor))) {
      var props = constructor.properties;
      constructor.__ownProperties = props ? normalizeProperties(props) : null;
    }
    return constructor.__ownProperties;
  }

  /**
   * @polymer
   * @mixinClass
   * @extends {base}
   * @implements {Polymer_PropertiesMixin}
   * @unrestricted
   */

  var PropertiesMixin = function (_base) {
    _inherits$5(PropertiesMixin, _base);

    function PropertiesMixin() {
      _classCallCheck$5(this, PropertiesMixin);

      return _possibleConstructorReturn$5(this, (PropertiesMixin.__proto__ || Object.getPrototypeOf(PropertiesMixin)).apply(this, arguments));
    }

    _createClass$5(PropertiesMixin, [{
      key: '_initializeProperties',


      /**
       * Overrides `PropertiesChanged` method and adds a call to
       * `finalize` which lazily configures the element's property accessors.
       * @override
       * @return {void}
       */
      value: function _initializeProperties() {
        this.constructor.finalize();
        _get$3(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), '_initializeProperties', this).call(this);
      }

      /**
       * Called when the element is added to a document.
       * Calls `_enableProperties` to turn on property system from
       * `PropertiesChanged`.
       * @suppress {missingProperties} Super may or may not implement the callback
       * @return {void}
       */

    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        if (_get$3(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'connectedCallback', this)) {
          _get$3(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'connectedCallback', this).call(this);
        }
        this._enableProperties();
      }

      /**
       * Called when the element is removed from a document
       * @suppress {missingProperties} Super may or may not implement the callback
       * @return {void}
       */

    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        if (_get$3(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'disconnectedCallback', this)) {
          _get$3(PropertiesMixin.prototype.__proto__ || Object.getPrototypeOf(PropertiesMixin.prototype), 'disconnectedCallback', this).call(this);
        }
      }
    }], [{
      key: 'finalize',


      /**
       * Finalizes an element definition, including ensuring any super classes
       * are also finalized. This includes ensuring property
       * accessors exist on the element prototype. This method calls
       * `_finalizeClass` to finalize each constructor in the prototype chain.
       * @return {void}
       */
      value: function finalize() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))) {
          var superCtor = superPropertiesClass( /** @type {PropertiesMixinConstructor} */this);
          if (superCtor) {
            superCtor.finalize();
          }
          this.__finalized = true;
          this._finalizeClass();
        }
      }

      /**
       * Finalize an element class. This includes ensuring property
       * accessors exist on the element prototype. This method is called by
       * `finalize` and finalizes the class constructor.
       *
       * @protected
       */

    }, {
      key: '_finalizeClass',
      value: function _finalizeClass() {
        var props = ownProperties( /** @type {PropertiesMixinConstructor} */this);
        if (props) {
          this.createProperties(props);
        }
      }

      /**
       * Returns a memoized version of all properties, including those inherited
       * from super classes. Properties not in object format are converted to
       * at least {type}.
       *
       * @return {Object} Object containing properties for this class
       * @protected
       */

    }, {
      key: 'typeForProperty',


      /**
       * Overrides `PropertiesChanged` method to return type specified in the
       * static `properties` object for the given property.
       * @param {string} name Name of property
       * @return {*} Type to which to deserialize attribute
       *
       * @protected
       */
      value: function typeForProperty(name) {
        var info = this._properties[name];
        return info && info.type;
      }
    }, {
      key: 'observedAttributes',


      /**
       * Implements standard custom elements getter to observes the attributes
       * listed in `properties`.
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      get: function get() {
        var _this2 = this;

        var props = this._properties;
        return props ? Object.keys(props).map(function (p) {
          return _this2.attributeNameForProperty(p);
        }) : [];
      }
    }, {
      key: '_properties',
      get: function get() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))) {
          var superCtor = superPropertiesClass( /** @type {PropertiesMixinConstructor} */this);
          this.__properties = Object.assign({}, superCtor && superCtor._properties, ownProperties( /** @type {PropertiesMixinConstructor} */this));
        }
        return this.__properties;
      }
    }]);

    return PropertiesMixin;
  }(base);

  return PropertiesMixin;
});

var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$4 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;

var ElementMixin = dedupingMixin(function (base) {

  /**
   * @constructor
   * @extends {base}
   * @implements {Polymer_PropertyEffects}
   * @implements {Polymer_PropertiesMixin}
   */
  var polymerElementBase = PropertiesMixin(PropertyEffects(base));

  /**
   * Returns a list of properties with default values.
   * This list is created as an optimization since it is a subset of
   * the list returned from `_properties`.
   * This list is used in `_initializeProperties` to set property defaults.
   *
   * @param {PolymerElementConstructor} constructor Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   *   that have default values
   * @private
   */
  function propertyDefaults(constructor) {
    if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__propertyDefaults', constructor))) {
      constructor.__propertyDefaults = null;
      var props = constructor._properties;
      for (var p in props) {
        var info = props[p];
        if ('value' in info) {
          constructor.__propertyDefaults = constructor.__propertyDefaults || {};
          constructor.__propertyDefaults[p] = info;
        }
      }
    }
    return constructor.__propertyDefaults;
  }

  /**
   * Returns a memoized version of the the `observers` array.
   * @param {PolymerElementConstructor} constructor Element class
   * @return {Array} Array containing own observers for the given class
   * @protected
   */
  function ownObservers(constructor) {
    if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownObservers', constructor))) {
      constructor.__ownObservers = constructor.hasOwnProperty(JSCompiler_renameProperty('observers', constructor)) ?
      /** @type {PolymerElementConstructor} */constructor.observers : null;
    }
    return constructor.__ownObservers;
  }

  /**
   * Creates effects for a property.
   *
   * Note, once a property has been set to
   * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
   * these values may not be changed. For example, a subclass cannot
   * alter these settings. However, additional `observers` may be added
   * by subclasses.
   *
   * The info object should may contain property metadata as follows:
   *
   * * `type`: {function} type to which an attribute matching the property
   * is deserialized. Note the property is camel-cased from a dash-cased
   * attribute. For example, 'foo-bar' attribute is deserialized to a
   * property named 'fooBar'.
   *
   * * `readOnly`: {boolean} creates a readOnly property and
   * makes a private setter for the private of the form '_setFoo' for a
   * property 'foo',
   *
   * * `computed`: {string} creates a computed property. A computed property
   * also automatically is set to `readOnly: true`. The value is calculated
   * by running a method and arguments parsed from the given string. For
   * example 'compute(foo)' will compute a given property when the
   * 'foo' property changes by executing the 'compute' method. This method
   * must return the computed value.
   *
   * * `reflectToAttribute`: {boolean} If true, the property value is reflected
   * to an attribute of the same name. Note, the attribute is dash-cased
   * so a property named 'fooBar' is reflected as 'foo-bar'.
   *
   * * `notify`: {boolean} sends a non-bubbling notification event when
   * the property changes. For example, a property named 'foo' sends an
   * event named 'foo-changed' with `event.detail` set to the value of
   * the property.
   *
   * * observer: {string} name of a method that runs when the property
   * changes. The arguments of the method are (value, previousValue).
   *
   * Note: Users may want control over modifying property
   * effects via subclassing. For example, a user might want to make a
   * reflectToAttribute property not do so in a subclass. We've chosen to
   * disable this because it leads to additional complication.
   * For example, a readOnly effect generates a special setter. If a subclass
   * disables the effect, the setter would fail unexpectedly.
   * Based on feedback, we may want to try to make effects more malleable
   * and/or provide an advanced api for manipulating them.
   * Also consider adding warnings when an effect cannot be changed.
   *
   * @param {!PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {string} name Name of the property.
   * @param {Object} info Info object from which to create property effects.
   * Supported keys:
   * @param {Object} allProps Flattened map of all properties defined in this
   *   element (including inherited properties)
   * @return {void}
   * @private
   */
  function createPropertyFromConfig(proto, name, info, allProps) {
    // computed forces readOnly...
    if (info.computed) {
      info.readOnly = true;
    }
    // Note, since all computed properties are readOnly, this prevents
    // adding additional computed property effects (which leads to a confusing
    // setup where multiple triggers for setting a property)
    // While we do have `hasComputedEffect` this is set on the property's
    // dependencies rather than itself.
    if (info.computed && !proto._hasReadOnlyEffect(name)) {
      proto._createComputedProperty(name, info.computed, allProps);
    }
    if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
      proto._createReadOnlyProperty(name, !info.computed);
    }
    if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
      proto._createReflectedProperty(name);
    }
    if (info.notify && !proto._hasNotifyEffect(name)) {
      proto._createNotifyingProperty(name);
    }
    // always add observer
    if (info.observer) {
      proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
    }
    // always ensure an accessor is made for properties but don't stomp
    // on existing values.
    if (!info.readOnly && !(name in proto)) {
      proto._createPropertyAccessor(name);
    }
  }

  /**
   * Process all style elements in the element template. Styles with the
   * `include` attribute are processed such that any styles in
   * the associated "style modules" are included in the element template.
   * @param {PolymerElementConstructor} klass Element class
   * @param {!HTMLTemplateElement} template Template to process
   * @param {string} is Name of element
   * @param {string} baseURI Base URI for element
   * @private
   */
  function processElementStyles(klass, template, is, baseURI) {
    var templateStyles = template.content.querySelectorAll('style');
    var stylesWithImports = stylesFromTemplate(template);
    // insert styles from <link rel="import" type="css"> at the top of the template
    var linkedStyles = stylesFromModuleImports(is);
    var firstTemplateChild = template.content.firstElementChild;
    for (var idx = 0; idx < linkedStyles.length; idx++) {
      var s = linkedStyles[idx];
      s.textContent = klass._processStyleText(s.textContent, baseURI);
      template.content.insertBefore(s, firstTemplateChild);
    }
    // keep track of the last "concrete" style in the template we have encountered
    var templateStyleIndex = 0;
    // ensure all gathered styles are actually in this template.
    for (var i = 0; i < stylesWithImports.length; i++) {
      var _s = stylesWithImports[i];
      var templateStyle = templateStyles[templateStyleIndex];
      // if the style is not in this template, it's been "included" and
      // we put a clone of it in the template before the style that included it
      if (templateStyle !== _s) {
        _s = _s.cloneNode(true);
        templateStyle.parentNode.insertBefore(_s, templateStyle);
      } else {
        templateStyleIndex++;
      }
      _s.textContent = klass._processStyleText(_s.textContent, baseURI);
    }
    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, is);
    }
  }

  /**
   * @polymer
   * @mixinClass
   * @unrestricted
   * @implements {Polymer_ElementMixin}
   */

  var PolymerElement = function (_polymerElementBase) {
    _inherits$6(PolymerElement, _polymerElementBase);

    _createClass$6(PolymerElement, null, [{
      key: '_finalizeClass',


      /**
       * Override of PropertiesMixin _finalizeClass to create observers and
       * find the template.
       * @return {void}
       * @protected
       * @override
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      value: function _finalizeClass() {
        _get$4(PolymerElement.__proto__ || Object.getPrototypeOf(PolymerElement), '_finalizeClass', this).call(this);
        if (this.hasOwnProperty(JSCompiler_renameProperty('is', this)) && this.is) {
          register(this.prototype);
        }
        var observers = ownObservers(this);
        if (observers) {
          this.createObservers(observers, this._properties);
        }
        // note: create "working" template that is finalized at instance time
        var template = /** @type {PolymerElementConstructor} */this.template;
        if (template) {
          if (typeof template === 'string') {
            var t = document.createElement('template');
            t.innerHTML = template;
            template = t;
          } else {
            template = template.cloneNode(true);
          }
          this.prototype._template = template;
        }
      }

      /**
       * Override of PropertiesChanged createProperties to create accessors
       * and property effects for all of the properties.
       * @return {void}
       * @protected
       * @override
       */

    }, {
      key: 'createProperties',
      value: function createProperties(props) {
        for (var p in props) {
          createPropertyFromConfig(this.prototype, p, props[p], props);
        }
      }

      /**
       * Creates observers for the given `observers` array.
       * Leverages `PropertyEffects` to create observers.
       * @param {Object} observers Array of observer descriptors for
       *   this class
       * @param {Object} dynamicFns Object containing keys for any properties
       *   that are functions and should trigger the effect when the function
       *   reference is changed
       * @return {void}
       * @protected
       */

    }, {
      key: 'createObservers',
      value: function createObservers(observers, dynamicFns) {
        var proto = this.prototype;
        for (var i = 0; i < observers.length; i++) {
          proto._createMethodObserver(observers[i], dynamicFns);
        }
      }

      /**
       * Returns the template that will be stamped into this element's shadow root.
       *
       * If a `static get is()` getter is defined, the default implementation
       * will return the first `<template>` in a `dom-module` whose `id`
       * matches this element's `is`.
       *
       * Users may override this getter to return an arbitrary template
       * (in which case the `is` getter is unnecessary). The template returned
       * may be either an `HTMLTemplateElement` or a string that will be
       * automatically parsed into a template.
       *
       * Note that when subclassing, if the super class overrode the default
       * implementation and the subclass would like to provide an alternate
       * template via a `dom-module`, it should override this getter and
       * return `Polymer.DomModule.import(this.is, 'template')`.
       *
       * If a subclass would like to modify the super class template, it should
       * clone it rather than modify it in place.  If the getter does expensive
       * work such as cloning/modifying a template, it should memoize the
       * template for maximum performance:
       *
       *   let memoizedTemplate;
       *   class MySubClass extends MySuperClass {
       *     static get template() {
       *       if (!memoizedTemplate) {
       *         memoizedTemplate = super.template.cloneNode(true);
       *         let subContent = document.createElement('div');
       *         subContent.textContent = 'This came from MySubClass';
       *         memoizedTemplate.content.appendChild(subContent);
       *       }
       *       return memoizedTemplate;
       *     }
       *   }
       *
       * @return {HTMLTemplateElement|string} Template to be stamped
       */

    }, {
      key: 'template',
      get: function get() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
          this._template = DomModule && DomModule.import(
          /** @type {PolymerElementConstructor}*/this.is, 'template') ||
          // note: implemented so a subclass can retrieve the super
          // template; call the super impl this way so that `this` points
          // to the superclass.
          Object.getPrototypeOf( /** @type {PolymerElementConstructor}*/this.prototype).constructor.template;
        }
        return this._template;
      }

      /**
       * Path matching the url from which the element was imported.
       * This path is used to resolve url's in template style cssText.
       * The `importPath` property is also set on element instances and can be
       * used to create bindings relative to the import path.
       * Defaults to the path matching the url containing a `dom-module` element
       * matching this element's static `is` property.
       * Note, this path should contain a trailing `/`.
       *
       * @return {string} The import path for this element class
       */

    }, {
      key: 'importPath',
      get: function get() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
          var module = DomModule && DomModule.import( /** @type {PolymerElementConstructor} */this.is);
          this._importPath = module ? module.assetpath : '' || Object.getPrototypeOf( /** @type {PolymerElementConstructor}*/this.prototype).constructor.importPath;
        }
        return this._importPath;
      }
    }]);

    function PolymerElement() {
      _classCallCheck$6(this, PolymerElement);

      /** @type {HTMLTemplateElement} */
      var _this = _possibleConstructorReturn$6(this, (PolymerElement.__proto__ || Object.getPrototypeOf(PolymerElement)).call(this));

      _this._template;
      /** @type {string} */
      _this._importPath;
      /** @type {string} */
      _this.rootPath;
      /** @type {string} */
      _this.importPath;
      /** @type {StampedTemplate | HTMLElement | ShadowRoot} */
      _this.root;
      /** @type {!Object<string, !Element>} */
      _this.$;
      return _this;
    }

    /**
     * Overrides the default `Polymer.PropertyAccessors` to ensure class
     * metaprogramming related to property accessors and effects has
     * completed (calls `finalize`).
     *
     * It also initializes any property defaults provided via `value` in
     * `properties` metadata.
     *
     * @return {void}
     * @override
     * @suppress {invalidCasts}
     */


    _createClass$6(PolymerElement, [{
      key: '_initializeProperties',
      value: function _initializeProperties() {
        this.constructor.finalize();
        var importPath = this.constructor.importPath;
        // note: finalize template when we have access to `localName` to
        // avoid dependence on `is` for polyfilling styling.
        this.constructor._finalizeTemplate( /** @type {!HTMLElement} */this.localName);
        _get$4(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), '_initializeProperties', this).call(this);
        // set path defaults
        this.rootPath = rootPath;
        this.importPath = importPath;
        // apply property defaults...
        var p$ = propertyDefaults(this.constructor);
        if (!p$) {
          return;
        }
        for (var p in p$) {
          var info = p$[p];
          // Don't set default value if there is already an own property, which
          // happens when a `properties` property with default but no effects had
          // a property set (e.g. bound) by its host before upgrade
          if (!this.hasOwnProperty(p)) {
            var value = typeof info.value == 'function' ? info.value.call(this) : info.value;
            // Set via `_setProperty` if there is an accessor, to enable
            // initializing readOnly property defaults
            if (this._hasAccessor(p)) {
              this._setPendingProperty(p, value, true);
            } else {
              this[p] = value;
            }
          }
        }
      }

      /**
       * Gather style text for a style element in the template.
       *
       * @param {string} cssText Text containing styling to process
       * @param {string} baseURI Base URI to rebase CSS paths against
       * @return {string} The processed CSS text
       * @protected
       */

    }, {
      key: 'connectedCallback',


      /**
       * Provides a default implementation of the standard Custom Elements
       * `connectedCallback`.
       *
       * The default implementation enables the property effects system and
       * flushes any pending properties, and updates shimmed CSS properties
       * when using the ShadyCSS scoping/custom properties polyfill.
       *
       * @suppress {missingProperties, invalidCasts} Super may or may not implement the callback
       * @return {void}
       */
      value: function connectedCallback() {
        if (window.ShadyCSS && this._template) {
          window.ShadyCSS.styleElement( /** @type {!HTMLElement} */this);
        }
        _get$4(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), 'connectedCallback', this).call(this);
      }

      /**
       * Stamps the element template.
       *
       * @return {void}
       * @override
       */

    }, {
      key: 'ready',
      value: function ready() {
        if (this._template) {
          this.root = this._stampTemplate(this._template);
          this.$ = this.root.$;
        }
        _get$4(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), 'ready', this).call(this);
      }

      /**
       * Implements `PropertyEffects`'s `_readyClients` call. Attaches
       * element dom by calling `_attachDom` with the dom stamped from the
       * element's template via `_stampTemplate`. Note that this allows
       * client dom to be attached to the element prior to any observers
       * running.
       *
       * @return {void}
       * @override
       */

    }, {
      key: '_readyClients',
      value: function _readyClients() {
        if (this._template) {
          this.root = this._attachDom( /** @type {StampedTemplate} */this.root);
        }
        // The super._readyClients here sets the clients initialized flag.
        // We must wait to do this until after client dom is created/attached
        // so that this flag can be checked to prevent notifications fired
        // during this process from being handled before clients are ready.
        _get$4(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), '_readyClients', this).call(this);
      }

      /**
       * Attaches an element's stamped dom to itself. By default,
       * this method creates a `shadowRoot` and adds the dom to it.
       * However, this method may be overridden to allow an element
       * to put its dom in another location.
       *
       * @throws {Error}
       * @suppress {missingReturn}
       * @param {StampedTemplate} dom to attach to the element.
       * @return {ShadowRoot} node to which the dom has been attached.
       */

    }, {
      key: '_attachDom',
      value: function _attachDom(dom) {
        if (this.attachShadow) {
          if (dom) {
            if (!this.shadowRoot) {
              this.attachShadow({ mode: 'open' });
            }
            this.shadowRoot.appendChild(dom);
            return this.shadowRoot;
          }
          return null;
        } else {
          throw new Error('ShadowDOM not available. ' +
          // TODO(sorvell): move to compile-time conditional when supported
          'Polymer.Element can create dom as children instead of in ' + 'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
        }
      }

      /**
       * When using the ShadyCSS scoping and custom property shim, causes all
       * shimmed styles in this element (and its subtree) to be updated
       * based on current custom property values.
       *
       * The optional parameter overrides inline custom property styles with an
       * object of properties where the keys are CSS properties, and the values
       * are strings.
       *
       * Example: `this.updateStyles({'--color': 'blue'})`
       *
       * These properties are retained unless a value of `null` is set.
       *
       * @param {Object=} properties Bag of custom property key/values to
       *   apply to this element.
       * @return {void}
       * @suppress {invalidCasts}
       */

    }, {
      key: 'updateStyles',
      value: function updateStyles(properties) {
        if (window.ShadyCSS) {
          window.ShadyCSS.styleSubtree( /** @type {!HTMLElement} */this, properties);
        }
      }

      /**
       * Rewrites a given URL relative to a base URL. The base URL defaults to
       * the original location of the document containing the `dom-module` for
       * this element. This method will return the same URL before and after
       * bundling.
       *
       * @param {string} url URL to resolve.
       * @param {string=} base Optional base URL to resolve against, defaults
       * to the element's `importPath`
       * @return {string} Rewritten URL relative to base
       */

    }, {
      key: 'resolveUrl',
      value: function resolveUrl$$1(url, base) {
        // Preserve backward compatibility with `this.resolveUrl('/foo')` resolving
        // against the main document per #2448
        if (url && ABS_URL.test(url)) {
          return url;
        }
        if (!base && this.importPath) {
          base = resolveUrl(this.importPath);
        }
        return resolveUrl(url, base);
      }

      /**
       * Overrides `PropertyAccessors` to add map of dynamic functions on
       * template info, for consumption by `PropertyEffects` template binding
       * code. This map determines which method templates should have accessors
       * created for them.
       *
       * @override
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */

    }], [{
      key: '_processStyleText',
      value: function _processStyleText(cssText, baseURI) {
        return resolveCss(cssText, baseURI);
      }

      /**
      * Configures an element `proto` to function with a given `template`.
      * The element name `is` and extends `ext` must be specified for ShadyCSS
      * style scoping.
      *
      * @param {string} is Tag name (or type extension name) for this element
      * @return {void}
      * @protected
      */

    }, {
      key: '_finalizeTemplate',
      value: function _finalizeTemplate(is) {
        /** @const {HTMLTemplateElement} */
        var template = this.prototype._template;
        if (template && !template.__polymerFinalized) {
          template.__polymerFinalized = true;
          var importPath = this.importPath;
          var baseURI = importPath ? resolveUrl(importPath) : '';
          // e.g. support `include="module-name"`, and ShadyCSS
          processElementStyles(this, template, is, baseURI);
          this.prototype._bindTemplate(template);
        }
      }
    }, {
      key: '_parseTemplateContent',
      value: function _parseTemplateContent(template, templateInfo, nodeInfo) {
        templateInfo.dynamicFns = templateInfo.dynamicFns || this._properties;
        return _get$4(PolymerElement.__proto__ || Object.getPrototypeOf(PolymerElement), '_parseTemplateContent', this).call(this, template, templateInfo, nodeInfo);
      }
    }]);

    return PolymerElement;
  }(polymerElementBase);

  return PolymerElement;
});


var registrations = [];

function _regLog(prototype) {
  console.log('[' + prototype.is + ']: registered');
}

function register(prototype) {
  registrations.push(prototype);
  undefined && _regLog(prototype);
}

/**
 * Base class that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * @customElement
 * @polymer
 * @memberof Polymer
 * @constructor
 * @implements {Polymer_ElementMixin}
 * @extends HTMLElement
 * @appliesMixin Polymer.ElementMixin
 * @summary Custom element base class that provides the core API for Polymer's
 *   key meta-programming features including template stamping, data-binding,
 *   attribute deserialization, and property change observation
 */
var Element = ElementMixin(HTMLElement);

var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Common implementation for mixin & behavior
function mutablePropertyChange(inst, property, value, old, mutableData) {
  var isObject = void 0;
  if (mutableData) {
    isObject = (typeof value === 'undefined' ? 'undefined' : _typeof$3(value)) === 'object' && value !== null;
    // Pull `old` for Objects from temp cache, but treat `null` as a primitive
    if (isObject) {
      old = inst.__dataTemp[property];
    }
  }
  // Strict equality check, but return false for NaN===NaN
  var shouldChange = old !== value && (old === old || value === value);
  // Objects are stored in temporary cache (cleared at end of
  // turn), which is used for dirty-checking
  if (isObject && shouldChange) {
    inst.__dataTemp[property] = value;
  }
  return shouldChange;
}

var MutableData = dedupingMixin(function (superClass) {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_MutableData}
   */
  var MutableData = function (_superClass) {
    _inherits$7(MutableData, _superClass);

    function MutableData() {
      _classCallCheck$7(this, MutableData);

      return _possibleConstructorReturn$7(this, (MutableData.__proto__ || Object.getPrototypeOf(MutableData)).apply(this, arguments));
    }

    _createClass$7(MutableData, [{
      key: '_shouldPropertyChange',

      /**
       * Overrides `Polymer.PropertyEffects` to provide option for skipping
       * strict equality checking for Objects and Arrays.
       *
       * This method pulls the value to dirty check against from the `__dataTemp`
       * cache (rather than the normal `__data` cache) for Objects.  Since the temp
       * cache is cleared at the end of a turn, this implementation allows
       * side-effects of deep object changes to be processed by re-setting the
       * same object (using the temp cache as an in-turn backstop to prevent
       * cycles due to 2-way notification).
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       * @protected
       */
      value: function _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, true);
      }
    }]);

    return MutableData;
  }(superClass);
  /** @type {boolean} */


  MutableData.prototype.mutableData = false;

  return MutableData;
});

var OptionalMutableData = dedupingMixin(function (superClass) {

  /**
   * @mixinClass
   * @polymer
   * @implements {Polymer_OptionalMutableData}
   */
  var OptionalMutableData = function (_superClass2) {
    _inherits$7(OptionalMutableData, _superClass2);

    function OptionalMutableData() {
      _classCallCheck$7(this, OptionalMutableData);

      return _possibleConstructorReturn$7(this, (OptionalMutableData.__proto__ || Object.getPrototypeOf(OptionalMutableData)).apply(this, arguments));
    }

    _createClass$7(OptionalMutableData, [{
      key: '_shouldPropertyChange',


      /**
       * Overrides `Polymer.PropertyEffects` to provide option for skipping
       * strict equality checking for Objects and Arrays.
       *
       * When `this.mutableData` is true on this instance, this method
       * pulls the value to dirty check against from the `__dataTemp` cache
       * (rather than the normal `__data` cache) for Objects.  Since the temp
       * cache is cleared at the end of a turn, this implementation allows
       * side-effects of deep object changes to be processed by re-setting the
       * same object (using the temp cache as an in-turn backstop to prevent
       * cycles due to 2-way notification).
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       * @protected
       */
      value: function _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, this.mutableData);
      }
    }], [{
      key: 'properties',
      get: function get() {
        return {
          /**
           * Instance-level flag for configuring the dirty-checking strategy
           * for this element.  When true, Objects and Arrays will skip dirty
           * checking, otherwise strict equality checking will be used.
           */
          mutableData: Boolean
        };
      }
    }]);

    return OptionalMutableData;
  }(superClass);

  return OptionalMutableData;
});

// Export for use by legacy behavior
MutableData._mutablePropertyChange = mutablePropertyChange;

var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$5 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Base class for HTMLTemplateElement extension that has property effects
// machinery for propagating host properties to children. This is an ES5
// class only because Babel (incorrectly) requires super() in the class
// constructor even though no `this` is used and it returns an instance.
var newInstance = null;
/**
 * @constructor
 * @extends {HTMLTemplateElement}
 */
function HTMLTemplateElementExtension() {
  return newInstance;
}
HTMLTemplateElementExtension.prototype = Object.create(HTMLTemplateElement.prototype, {
  constructor: {
    value: HTMLTemplateElementExtension,
    writable: true
  }
});
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 * @extends {HTMLTemplateElementExtension}
 */
var DataTemplate = PropertyEffects(HTMLTemplateElementExtension);
/**
 * @constructor
 * @implements {Polymer_MutableData}
 * @extends {DataTemplate}
 */
var MutableDataTemplate = MutableData(DataTemplate);

// Applies a DataTemplate subclass to a <template> instance
function upgradeTemplate(template, constructor) {
  newInstance = template;
  Object.setPrototypeOf(template, constructor.prototype);
  new constructor();
  newInstance = null;
}

// Base class for TemplateInstance's
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 */
var base = PropertyEffects(function () {
  function _class() {
    _classCallCheck$8(this, _class);
  }

  return _class;
}());

/**
 * @polymer
 * @customElement
 * @appliesMixin Polymer.PropertyEffects
 * @unrestricted
 */

var TemplateInstanceBase = function (_base) {
  _inherits$8(TemplateInstanceBase, _base);

  function TemplateInstanceBase(props) {
    _classCallCheck$8(this, TemplateInstanceBase);

    var _this = _possibleConstructorReturn$8(this, (TemplateInstanceBase.__proto__ || Object.getPrototypeOf(TemplateInstanceBase)).call(this));

    _this._configureProperties(props);
    _this.root = _this._stampTemplate(_this.__dataHost);
    // Save list of stamped children
    var children = _this.children = [];
    for (var n = _this.root.firstChild; n; n = n.nextSibling) {
      children.push(n);
      n.__templatizeInstance = _this;
    }
    if (_this.__templatizeOwner.__hideTemplateChildren__) {
      _this._showHideChildren(true);
    }
    // Flush props only when props are passed if instance props exist
    // or when there isn't instance props.
    var options = _this.__templatizeOptions;
    if (props && options.instanceProps || !options.instanceProps) {
      _this._enableProperties();
    }
    return _this;
  }
  /**
   * Configure the given `props` by calling `_setPendingProperty`. Also
   * sets any properties stored in `__hostProps`.
   * @private
   * @param {Object} props Object of property name-value pairs to set.
   * @return {void}
   */


  _createClass$8(TemplateInstanceBase, [{
    key: '_configureProperties',
    value: function _configureProperties(props) {
      var options = this.__templatizeOptions;
      if (props) {
        for (var iprop in options.instanceProps) {
          if (iprop in props) {
            this._setPendingProperty(iprop, props[iprop]);
          }
        }
      }
      for (var hprop in this.__hostProps) {
        this._setPendingProperty(hprop, this.__dataHost['_host_' + hprop]);
      }
    }
    /**
     * Forwards a host property to this instance.  This method should be
     * called on instances from the `options.forwardHostProp` callback
     * to propagate changes of host properties to each instance.
     *
     * Note this method enqueues the change, which are flushed as a batch.
     *
     * @param {string} prop Property or path name
     * @param {*} value Value of the property to forward
     * @return {void}
     */

  }, {
    key: 'forwardHostProp',
    value: function forwardHostProp(prop, value) {
      if (this._setPendingPropertyOrPath(prop, value, false, true)) {
        this.__dataHost._enqueueClient(this);
      }
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {!Node} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to add
     * @return {void}
     */

  }, {
    key: '_addEventListenerToNode',
    value: function _addEventListenerToNode(node, eventName, handler) {
      var _this2 = this;

      if (this._methodHost && this.__templatizeOptions.parentModel) {
        // If this instance should be considered a parent model, decorate
        // events this template instance as `model`
        this._methodHost._addEventListenerToNode(node, eventName, function (e) {
          e.model = _this2;
          handler(e);
        });
      } else {
        // Otherwise delegate to the template's host (which could be)
        // another template instance
        var templateHost = this.__dataHost.__dataHost;
        if (templateHost) {
          templateHost._addEventListenerToNode(node, eventName, handler);
        }
      }
    }
    /**
     * Shows or hides the template instance top level child elements. For
     * text nodes, `textContent` is removed while "hidden" and replaced when
     * "shown."
     * @param {boolean} hide Set to true to hide the children;
     * set to false to show them.
     * @return {void}
     * @protected
     */

  }, {
    key: '_showHideChildren',
    value: function _showHideChildren(hide) {
      var c = this.children;
      for (var i = 0; i < c.length; i++) {
        var n = c[i];
        // Ignore non-changes
        if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
          if (n.nodeType === Node.TEXT_NODE) {
            if (hide) {
              n.__polymerTextContent__ = n.textContent;
              n.textContent = '';
            } else {
              n.textContent = n.__polymerTextContent__;
            }
          } else if (n.style) {
            if (hide) {
              n.__polymerDisplay__ = n.style.display;
              n.style.display = 'none';
            } else {
              n.style.display = n.__polymerDisplay__;
            }
          }
        }
        n.__hideTemplateChildren__ = hide;
        if (n._showHideChildren) {
          n._showHideChildren(hide);
        }
      }
    }
    /**
     * Overrides default property-effects implementation to intercept
     * textContent bindings while children are "hidden" and cache in
     * private storage for later retrieval.
     *
     * @param {!Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @return {void}
     * @protected
     */

  }, {
    key: '_setUnmanagedPropertyToNode',
    value: function _setUnmanagedPropertyToNode(node, prop, value) {
      if (node.__hideTemplateChildren__ && node.nodeType == Node.TEXT_NODE && prop == 'textContent') {
        node.__polymerTextContent__ = value;
      } else {
        _get$5(TemplateInstanceBase.prototype.__proto__ || Object.getPrototypeOf(TemplateInstanceBase.prototype), '_setUnmanagedPropertyToNode', this).call(this, node, prop, value);
      }
    }
    /**
     * Find the parent model of this template instance.  The parent model
     * is either another templatize instance that had option `parentModel: true`,
     * or else the host element.
     *
     * @return {!Polymer_PropertyEffects} The parent model of this instance
     */

  }, {
    key: 'parentModel',
    get: function get() {
      var model = this.__parentModel;
      if (!model) {
        var options = void 0;
        model = this;
        do {
          // A template instance's `__dataHost` is a <template>
          // `model.__dataHost.__dataHost` is the template's host
          model = model.__dataHost.__dataHost;
        } while ((options = model.__templatizeOptions) && !options.parentModel);
        this.__parentModel = model;
      }
      return model;
    }
  }]);

  return TemplateInstanceBase;
}(base);

/**
 * @constructor
 * @extends {TemplateInstanceBase}
 * @implements {Polymer_MutableData}
 */
var MutableTemplateInstanceBase = MutableData(TemplateInstanceBase);

function findMethodHost(template) {
  // Technically this should be the owner of the outermost template.
  // In shadow dom, this is always getRootNode().host, but we can
  // approximate this via cooperation with our dataHost always setting
  // `_methodHost` as long as there were bindings (or id's) on this
  // instance causing it to get a dataHost.
  var templateHost = template.__dataHost;
  return templateHost && templateHost._methodHost || templateHost;
}

/* eslint-disable valid-jsdoc */
/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function createTemplatizerClass(template, templateInfo, options) {
  // Anonymous class created by the templatize
  var base = options.mutableData ? MutableTemplateInstanceBase : TemplateInstanceBase;
  /**
   * @constructor
   * @extends {base}
   * @private
   */
  var klass = function (_base2) {
    _inherits$8(klass, _base2);

    function klass() {
      _classCallCheck$8(this, klass);

      return _possibleConstructorReturn$8(this, (klass.__proto__ || Object.getPrototypeOf(klass)).apply(this, arguments));
    }

    return klass;
  }(base);
  klass.prototype.__templatizeOptions = options;
  klass.prototype._bindTemplate(template);
  addNotifyEffects(klass, template, templateInfo, options);
  return klass;
}

/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function addPropagateEffects(template, templateInfo, options) {
  var userForwardHostProp = options.forwardHostProp;
  if (userForwardHostProp) {
    // Provide data API and property effects on memoized template class
    var klass = templateInfo.templatizeTemplateClass;
    if (!klass) {
      var _base3 = options.mutableData ? MutableDataTemplate : DataTemplate;
      klass = templateInfo.templatizeTemplateClass = function (_base4) {
        _inherits$8(TemplatizedTemplate, _base4);

        function TemplatizedTemplate() {
          _classCallCheck$8(this, TemplatizedTemplate);

          return _possibleConstructorReturn$8(this, (TemplatizedTemplate.__proto__ || Object.getPrototypeOf(TemplatizedTemplate)).apply(this, arguments));
        }

        return TemplatizedTemplate;
      }(_base3);
      // Add template - >instances effects
      // and host <- template effects
      var hostProps = templateInfo.hostProps;
      for (var prop in hostProps) {
        klass.prototype._addPropertyEffect('_host_' + prop, klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, { fn: createForwardHostPropEffect(prop, userForwardHostProp) });
        klass.prototype._createNotifyingProperty('_host_' + prop);
      }
    }
    upgradeTemplate(template, klass);
    // Mix any pre-bound data into __data; no need to flush this to
    // instances since they pull from the template at instance-time
    if (template.__dataProto) {
      // Note, generally `__dataProto` could be chained, but it's guaranteed
      // to not be since this is a vanilla template we just added effects to
      Object.assign(template.__data, template.__dataProto);
    }
    // Clear any pending data for performance
    template.__dataTemp = {};
    template.__dataPending = null;
    template.__dataOld = null;
    template._enableProperties();
  }
}
/* eslint-enable valid-jsdoc */

function createForwardHostPropEffect(hostProp, userForwardHostProp) {
  return function forwardHostProp(template, prop, props) {
    userForwardHostProp.call(template.__templatizeOwner, prop.substring('_host_'.length), props[prop]);
  };
}

function addNotifyEffects(klass, template, templateInfo, options) {
  var hostProps = templateInfo.hostProps || {};
  for (var iprop in options.instanceProps) {
    delete hostProps[iprop];
    var userNotifyInstanceProp = options.notifyInstanceProp;
    if (userNotifyInstanceProp) {
      klass.prototype._addPropertyEffect(iprop, klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp) });
    }
  }
  if (options.forwardHostProp && template.__dataHost) {
    for (var hprop in hostProps) {
      klass.prototype._addPropertyEffect(hprop, klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: createNotifyHostPropEffect() });
    }
  }
}

function createNotifyInstancePropEffect(instProp, userNotifyInstanceProp) {
  return function notifyInstanceProp(inst, prop, props) {
    userNotifyInstanceProp.call(inst.__templatizeOwner, inst, prop, props[prop]);
  };
}

function createNotifyHostPropEffect() {
  return function notifyHostProp(inst, prop, props) {
    inst.__dataHost._setPendingPropertyOrPath('_host_' + prop, props[prop], true, true);
  };
}

/**
 * Module for preparing and stamping instances of templates that utilize
 * Polymer's data-binding and declarative event listener features.
 *
 * Example:
 *
 *     // Get a template from somewhere, e.g. light DOM
 *     let template = this.querySelector('template');
 *     // Prepare the template
 *     let TemplateClass = Polymer.Templatize.templatize(template);
 *     // Instance the template with an initial data model
 *     let instance = new TemplateClass({myProp: 'initial'});
 *     // Insert the instance's DOM somewhere, e.g. element's shadow DOM
 *     this.shadowRoot.appendChild(instance.root);
 *     // Changing a property on the instance will propagate to bindings
 *     // in the template
 *     instance.myProp = 'new value';
 *
 * The `options` dictionary passed to `templatize` allows for customizing
 * features of the generated template class, including how outer-scope host
 * properties should be forwarded into template instances, how any instance
 * properties added into the template's scope should be notified out to
 * the host, and whether the instance should be decorated as a "parent model"
 * of any event handlers.
 *
 *     // Customize property forwarding and event model decoration
 *     let TemplateClass = Polymer.Templatize.templatize(template, this, {
 *       parentModel: true,
 *       instanceProps: {...},
 *       forwardHostProp(property, value) {...},
 *       notifyInstanceProp(instance, property, value) {...},
 *     });
 *
 *
 * @namespace
 * @memberof Polymer
 * @summary Module for preparing and stamping instances of templates
 *   utilizing Polymer templating features.
 */

var Templatize = {

  /**
   * Returns an anonymous `Polymer.PropertyEffects` class bound to the
   * `<template>` provided.  Instancing the class will result in the
   * template being stamped into a document fragment stored as the instance's
   * `root` property, after which it can be appended to the DOM.
   *
   * Templates may utilize all Polymer data-binding features as well as
   * declarative event listeners.  Event listeners and inline computing
   * functions in the template will be called on the host of the template.
   *
   * The constructor returned takes a single argument dictionary of initial
   * property values to propagate into template bindings.  Additionally
   * host properties can be forwarded in, and instance properties can be
   * notified out by providing optional callbacks in the `options` dictionary.
   *
   * Valid configuration in `options` are as follows:
   *
   * - `forwardHostProp(property, value)`: Called when a property referenced
   *   in the template changed on the template's host. As this library does
   *   not retain references to templates instanced by the user, it is the
   *   templatize owner's responsibility to forward host property changes into
   *   user-stamped instances.  The `instance.forwardHostProp(property, value)`
   *    method on the generated class should be called to forward host
   *   properties into the template to prevent unnecessary property-changed
   *   notifications. Any properties referenced in the template that are not
   *   defined in `instanceProps` will be notified up to the template's host
   *   automatically.
   * - `instanceProps`: Dictionary of property names that will be added
   *   to the instance by the templatize owner.  These properties shadow any
   *   host properties, and changes within the template to these properties
   *   will result in `notifyInstanceProp` being called.
   * - `mutableData`: When `true`, the generated class will skip strict
   *   dirty-checking for objects and arrays (always consider them to be
   *   "dirty").
   * - `notifyInstanceProp(instance, property, value)`: Called when
   *   an instance property changes.  Users may choose to call `notifyPath`
   *   on e.g. the owner to notify the change.
   * - `parentModel`: When `true`, events handled by declarative event listeners
   *   (`on-event="handler"`) will be decorated with a `model` property pointing
   *   to the template instance that stamped it.  It will also be returned
   *   from `instance.parentModel` in cases where template instance nesting
   *   causes an inner model to shadow an outer model.
   *
   * Note that the class returned from `templatize` is generated only once
   * for a given `<template>` using `options` from the first call for that
   * template, and the cached class is returned for all subsequent calls to
   * `templatize` for that template.  As such, `options` callbacks should not
   * close over owner-specific properties since only the first `options` is
   * used; rather, callbacks are called bound to the `owner`, and so context
   * needed from the callbacks (such as references to `instances` stamped)
   * should be stored on the `owner` such that they can be retrieved via `this`.
   *
   * @memberof Polymer.Templatize
   * @param {!HTMLTemplateElement} template Template to templatize
   * @param {!Polymer_PropertyEffects} owner Owner of the template instances;
   *   any optional callbacks will be bound to this owner.
   * @param {Object=} options Options dictionary (see summary for details)
   * @return {function(new:TemplateInstanceBase)} Generated class bound to the template
   *   provided
   * @suppress {invalidCasts}
   */
  templatize: function templatize(template, owner, options) {
    options = /** @type {!TemplatizeOptions} */options || {};
    if (template.__templatizeOwner) {
      throw new Error('A <template> can only be templatized once');
    }
    template.__templatizeOwner = owner;
    var templateInfo = owner.constructor._parseTemplate(template);
    // Get memoized base class for the prototypical template, which
    // includes property effects for binding template & forwarding
    var baseClass = templateInfo.templatizeInstanceClass;
    if (!baseClass) {
      baseClass = createTemplatizerClass(template, templateInfo, options);
      templateInfo.templatizeInstanceClass = baseClass;
    }
    // Host property forwarding must be installed onto template instance
    addPropagateEffects(template, templateInfo, options);
    // Subclass base class and add reference for this specific template
    /** @private */
    var klass = function (_baseClass) {
      _inherits$8(TemplateInstance, _baseClass);

      function TemplateInstance() {
        _classCallCheck$8(this, TemplateInstance);

        return _possibleConstructorReturn$8(this, (TemplateInstance.__proto__ || Object.getPrototypeOf(TemplateInstance)).apply(this, arguments));
      }

      return TemplateInstance;
    }(baseClass);
    klass.prototype._methodHost = findMethodHost(template);
    klass.prototype.__dataHost = template;
    klass.prototype.__templatizeOwner = owner;
    klass.prototype.__hostProps = templateInfo.hostProps;
    klass = /** @type {function(new:TemplateInstanceBase)} */klass; //eslint-disable-line no-self-assign
    return klass;
  },


  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of
   * `TemplateInstanceBase`, and should be used to manipulate data
   * associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @memberof Polymer.Templatize
   * @param {HTMLTemplateElement} template The model will be returned for
   *   elements stamped from this template
   * @param {Node=} node Node for which to return a template model.
   * @return {TemplateInstanceBase} Template instance representing the
   *   binding scope for the element
   */
  modelForElement: function modelForElement(template, node) {
    var model = void 0;
    while (node) {
      // An element with a __templatizeInstance marks the top boundary
      // of a scope; walk up until we find one, and then ensure that
      // its __dataHost matches `this`, meaning this dom-repeat stamped it
      if (model = node.__templatizeInstance) {
        // Found an element stamped by another template; keep walking up
        // from its __dataHost
        if (model.__dataHost != template) {
          node = model.__dataHost;
        } else {
          return model;
        }
      } else {
        // Still in a template scope, keep going up until
        // a __templatizeInstance is found
        node = node.parentNode;
      }
    }
    return null;
  }
};

var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @summary Collapse multiple callbacks into one invocation after a timer.
 * @memberof Polymer
 */

var Debouncer = function () {
  function Debouncer() {
    _classCallCheck$9(this, Debouncer);

    this._asyncModule = null;
    this._callback = null;
    this._timer = null;
  }
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncInterface} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   * @return {void}
   */


  _createClass$9(Debouncer, [{
    key: 'setConfig',
    value: function setConfig(asyncModule, callback) {
      var _this = this;

      this._asyncModule = asyncModule;
      this._callback = callback;
      this._timer = this._asyncModule.run(function () {
        _this._timer = null;
        _this._callback();
      });
    }
    /**
     * Cancels an active debouncer and returns a reference to itself.
     *
     * @return {void}
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.isActive()) {
        this._asyncModule.cancel(this._timer);
        this._timer = null;
      }
    }
    /**
     * Flushes an active debouncer and returns a reference to itself.
     *
     * @return {void}
     */

  }, {
    key: 'flush',
    value: function flush() {
      if (this.isActive()) {
        this.cancel();
        this._callback();
      }
    }
    /**
     * Returns true if the debouncer is active.
     *
     * @return {boolean} True if active.
     */

  }, {
    key: 'isActive',
    value: function isActive() {
      return this._timer != null;
    }
    /**
     * Creates a debouncer if no debouncer is passed as a parameter
     * or it cancels an active debouncer otherwise. The following
     * example shows how a debouncer can be called multiple times within a
     * microtask and "debounced" such that the provided callback function is
     * called once. Add this method to a custom element:
     *
     * _debounceWork() {
     *   this._debounceJob = Polymer.Debouncer.debounce(this._debounceJob,
     *       Polymer.Async.microTask, () => {
     *     this._doWork();
     *   });
     * }
     *
     * If the `_debounceWork` method is called multiple times within the same
     * microtask, the `_doWork` function will be called only once at the next
     * microtask checkpoint.
     *
     * Note: In testing it is often convenient to avoid asynchrony. To accomplish
     * this with a debouncer, you can use `Polymer.enqueueDebouncer` and
     * `Polymer.flush`. For example, extend the above example by adding
     * `Polymer.enqueueDebouncer(this._debounceJob)` at the end of the
     * `_debounceWork` method. Then in a test, call `Polymer.flush` to ensure
     * the debouncer has completed.
     *
     * @param {Debouncer?} debouncer Debouncer object.
     * @param {!AsyncInterface} asyncModule Object with Async interface
     * @param {function()} callback Callback to run.
     * @return {!Debouncer} Returns a debouncer object.
     */

  }], [{
    key: 'debounce',
    value: function debounce(debouncer, asyncModule, callback) {
      if (debouncer instanceof Debouncer) {
        debouncer.cancel();
      } else {
        debouncer = new Debouncer();
      }
      debouncer.setConfig(asyncModule, callback);
      return debouncer;
    }
  }]);

  return Debouncer;
}();

var debouncerQueue = [];

var enqueueDebouncer = function enqueueDebouncer(debouncer) {
  debouncerQueue.push(debouncer);
};

function flushDebouncers() {
  var didFlush = Boolean(debouncerQueue.length);
  while (debouncerQueue.length) {
    try {
      debouncerQueue.shift().flush();
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  return didFlush;
}

var flush = function flush() {
  var shadyDOM = void 0,
      debouncers = void 0;
  do {
    shadyDOM = window.ShadyDOM && ShadyDOM.flush();
    if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
      window.ShadyCSS.ScopingShim.flush();
    }
    debouncers = flushDebouncers();
  } while (shadyDOM || debouncers);
};

var _get$6 = function get$$1(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get$$1(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass$10 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `<dom-if>` element will stamp a light-dom `<template>` child when
 * the `if` property becomes truthy, and the template can use Polymer
 * data-binding and declarative event features when used in the context of
 * a Polymer element's template.
 *
 * When `if` becomes falsy, the stamped content is hidden but not
 * removed from dom. When `if` subsequently becomes truthy again, the content
 * is simply re-shown. This approach is used due to its favorable performance
 * characteristics: the expense of creating template content is paid only
 * once and lazily.
 *
 * Set the `restamp` property to true to force the stamped content to be
 * created / destroyed when the `if` condition changes.
 *
 * @customElement
 * @polymer
 * @extends Polymer.Element
 * @memberof Polymer
 * @summary Custom element that conditionally stamps and hides or removes
 *   template content based on a boolean flag.
 */

var DomIf = function (_Element) {
  _inherits$9(DomIf, _Element);

  _createClass$10(DomIf, null, [{
    key: 'is',


    // Not needed to find template; can be removed once the analyzer
    // can find the tag name from customElements.define call
    get: function get$$1() {
      return 'dom-if';
    }
  }, {
    key: 'template',
    get: function get$$1() {
      return null;
    }
  }, {
    key: 'properties',
    get: function get$$1() {

      return {

        /**
         * Fired whenever DOM is added or removed/hidden by this template (by
         * default, rendering occurs lazily).  To force immediate rendering, call
         * `render`.
         *
         * @event dom-change
         */

        /**
         * A boolean indicating whether this template should stamp.
         */
        if: {
          type: Boolean,
          observer: '__debounceRender'
        },

        /**
         * When true, elements will be removed from DOM and discarded when `if`
         * becomes false and re-created and added back to the DOM when `if`
         * becomes true.  By default, stamped elements will be hidden but left
         * in the DOM when `if` becomes false, which is generally results
         * in better performance.
         */
        restamp: {
          type: Boolean,
          observer: '__debounceRender'
        }

      };
    }
  }]);

  function DomIf() {
    _classCallCheck$10(this, DomIf);

    var _this = _possibleConstructorReturn$9(this, (DomIf.__proto__ || Object.getPrototypeOf(DomIf)).call(this));

    _this.__renderDebouncer = null;
    _this.__invalidProps = null;
    _this.__instance = null;
    _this._lastIf = false;
    _this.__ctor = null;
    return _this;
  }

  _createClass$10(DomIf, [{
    key: '__debounceRender',
    value: function __debounceRender() {
      var _this2 = this;

      // Render is async for 2 reasons:
      // 1. To eliminate dom creation trashing if user code thrashes `if` in the
      //    same turn. This was more common in 1.x where a compound computed
      //    property could result in the result changing multiple times, but is
      //    mitigated to a large extent by batched property processing in 2.x.
      // 2. To avoid double object propagation when a bag including values bound
      //    to the `if` property as well as one or more hostProps could enqueue
      //    the <dom-if> to flush before the <template>'s host property
      //    forwarding. In that scenario creating an instance would result in
      //    the host props being set once, and then the enqueued changes on the
      //    template would set properties a second time, potentially causing an
      //    object to be set to an instance more than once.  Creating the
      //    instance async from flushing data ensures this doesn't happen. If
      //    we wanted a sync option in the future, simply having <dom-if> flush
      //    (or clear) its template's pending host properties before creating
      //    the instance would also avoid the problem.
      this.__renderDebouncer = Debouncer.debounce(this.__renderDebouncer, microTask, function () {
        return _this2.__render();
      });
      enqueueDebouncer(this.__renderDebouncer);
    }

    /**
     * @return {void}
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      _get$6(DomIf.prototype.__proto__ || Object.getPrototypeOf(DomIf.prototype), 'disconnectedCallback', this).call(this);
      if (!this.parentNode || this.parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE && !this.parentNode.host) {
        this.__teardownInstance();
      }
    }

    /**
     * @return {void}
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      _get$6(DomIf.prototype.__proto__ || Object.getPrototypeOf(DomIf.prototype), 'connectedCallback', this).call(this);
      this.style.display = 'none';
      if (this.if) {
        this.__debounceRender();
      }
    }

    /**
     * Forces the element to render its content. Normally rendering is
     * asynchronous to a provoking change. This is done for efficiency so
     * that multiple changes trigger only a single render. The render method
     * should be called if, for example, template rendering is required to
     * validate application state.
     * @return {void}
     */

  }, {
    key: 'render',
    value: function render() {
      flush();
    }
  }, {
    key: '__render',
    value: function __render() {
      if (this.if) {
        if (!this.__ensureInstance()) {
          // No template found yet
          return;
        }
        this._showHideChildren();
      } else if (this.restamp) {
        this.__teardownInstance();
      }
      if (!this.restamp && this.__instance) {
        this._showHideChildren();
      }
      if (this.if != this._lastIf) {
        this.dispatchEvent(new CustomEvent('dom-change', {
          bubbles: true,
          composed: true
        }));
        this._lastIf = this.if;
      }
    }
  }, {
    key: '__ensureInstance',
    value: function __ensureInstance() {
      var _this3 = this;

      var parentNode = this.parentNode;
      // Guard against element being detached while render was queued
      if (parentNode) {
        if (!this.__ctor) {
          var template = this.querySelector('template');
          if (!template) {
            // Wait until childList changes and template should be there by then
            var observer = new MutationObserver(function () {
              if (_this3.querySelector('template')) {
                observer.disconnect();
                _this3.__render();
              } else {
                throw new Error('dom-if requires a <template> child');
              }
            });
            observer.observe(this, { childList: true });
            return false;
          }
          this.__ctor = Templatize.templatize(template, this, {
            // dom-if templatizer instances require `mutable: true`, as
            // `__syncHostProperties` relies on that behavior to sync objects
            mutableData: true,
            /**
             * @param {string} prop Property to forward
             * @param {*} value Value of property
             * @this {this}
             */
            forwardHostProp: function forwardHostProp(prop, value) {
              if (this.__instance) {
                if (this.if) {
                  this.__instance.forwardHostProp(prop, value);
                } else {
                  // If we have an instance but are squelching host property
                  // forwarding due to if being false, note the invalidated
                  // properties so `__syncHostProperties` can sync them the next
                  // time `if` becomes true
                  this.__invalidProps = this.__invalidProps || Object.create(null);
                  this.__invalidProps[root(prop)] = true;
                }
              }
            }
          });
        }
        if (!this.__instance) {
          this.__instance = new this.__ctor();
          parentNode.insertBefore(this.__instance.root, this);
        } else {
          this.__syncHostProperties();
          var c$ = this.__instance.children;
          if (c$ && c$.length) {
            // Detect case where dom-if was re-attached in new position
            var lastChild = this.previousSibling;
            if (lastChild !== c$[c$.length - 1]) {
              for (var i = 0, n; i < c$.length && (n = c$[i]); i++) {
                parentNode.insertBefore(n, this);
              }
            }
          }
        }
      }
      return true;
    }
  }, {
    key: '__syncHostProperties',
    value: function __syncHostProperties() {
      var props = this.__invalidProps;
      if (props) {
        for (var prop in props) {
          this.__instance._setPendingProperty(prop, this.__dataHost[prop]);
        }
        this.__invalidProps = null;
        this.__instance._flushProperties();
      }
    }
  }, {
    key: '__teardownInstance',
    value: function __teardownInstance() {
      if (this.__instance) {
        var c$ = this.__instance.children;
        if (c$ && c$.length) {
          // use first child parent, for case when dom-if may have been detached
          var parent = c$[0].parentNode;
          for (var i = 0, n; i < c$.length && (n = c$[i]); i++) {
            parent.removeChild(n);
          }
        }
        this.__instance = null;
        this.__invalidProps = null;
      }
    }

    /**
     * Shows or hides the template instance top level child elements. For
     * text nodes, `textContent` is removed while "hidden" and replaced when
     * "shown."
     * @return {void}
     * @protected
     */

  }, {
    key: '_showHideChildren',
    value: function _showHideChildren() {
      var hidden = this.__hideTemplateChildren__ || !this.if;
      if (this.__instance) {
        this.__instance._showHideChildren(hidden);
      }
    }
  }]);

  return DomIf;
}(Element);

customElements.define(DomIf.is, DomIf);

if (window.Polymer) {
  window.Polymer.Element = Element;
} else {
  window.Polymer = { Element: Element };
}

var $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = '<dom-module id="common-style">\n  <template strip-whitespace="">\n    <style>\n      @charset "UTF-8";.label,sub,sup{vertical-align:baseline}.btn,.btn-group,.btn-group-vertical,.caret,.checkbox-inline,.radio-inline,img{vertical-align:middle}body,figure{margin:0}.btn-group>.btn-group,.btn-toolbar .btn,.btn-toolbar .btn-group,.btn-toolbar .input-group,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.dropdown-menu{float:left}.img-responsive,.img-thumbnail,.table,label{max-width:100%}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse,.pre-scrollable{max-height:340px}@-moz-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-webkit-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-o-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}b,optgroup,strong{font-weight:700}dfn{font-style:italic}h1{margin:.67em 0}mark{background:#ff0;color:#000}sub,sup{font-size:75%;line-height:0;position:relative}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}hr{box-sizing:content-box;height:0}pre,textarea{overflow:auto}code,kbd,pre,samp{font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}.tooltip,address{font-style:normal}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}@media print{blockquote,img,pre,tr{page-break-inside:avoid}*,:after,:before{background:0 0!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:" (" attr(href) ")"}abbr[title]:after{content:" (" attr(title) ")"}a[href^="#"]:after,a[href^="javascript:"]:after{content:""}blockquote,pre{border:1px solid #999}thead{display:table-header-group}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000!important}.label{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}.btn,.btn-danger.active,.btn-danger:active,.btn-default.active,.btn-default:active,.btn-info.active,.btn-info:active,.btn-primary.active,.btn-primary:active,.btn-warning.active,.btn-warning:active,.btn.active,.btn:active,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover,.form-control,.navbar-toggle,.open>.btn-danger.dropdown-toggle,.open>.btn-default.dropdown-toggle,.open>.btn-info.dropdown-toggle,.open>.btn-primary.dropdown-toggle,.open>.btn-warning.dropdown-toggle{background-image:none}.img-thumbnail,body{background-color:#fff}*,:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:transparent}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{text-decoration:none}a:focus,a:hover{color:#23527c}a:focus{outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}.img-responsive{display:block;height:auto}.img-rounded{border-radius:6px}.img-thumbnail{padding:4px;line-height:1.5;border:1px solid #ddd;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;height:auto}.img-circle{border-radius:50%}hr{margin-top:21px;margin-bottom:21px;border:0;border-top:1px solid #eee}[role=button]{cursor:pointer}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{font-family:inherit;font-weight:500;line-height:1.1;color:inherit}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-weight:400;line-height:1;color:#777}.h1,.h2,.h3,h1,h2,h3{margin-top:21px;margin-bottom:10.5px}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small{font-size:65%}.h4,.h5,.h6,h4,h5,h6{margin-top:10.5px;margin-bottom:10.5px}.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-size:75%}.h1,h1{font-size:36px}.h2,h2{font-size:30px}.h3,h3{font-size:24px}.h4,h4{font-size:18px}.h5,h5{font-size:14px}.h6,h6{font-size:12px}p{margin:0 0 10.5px}.lead{margin-bottom:21px;font-size:16px;font-weight:300;line-height:1.4}dt,kbd kbd,label{font-weight:700}@media (min-width:768px){.lead{font-size:21px}}.small,small{font-size:85%}.mark,mark{background-color:#fcf8e3;padding:.2em}.list-inline,.list-unstyled{padding-left:0;list-style:none}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.initialism,.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#777}.text-primary{color:#337ab7}a.text-primary:focus,a.text-primary:hover{color:#286090}.text-success{color:#3c763d}a.text-success:focus,a.text-success:hover{color:#2b542c}.text-info{color:#31708f}a.text-info:focus,a.text-info:hover{color:#245269}.text-warning{color:#8a6d3b}a.text-warning:focus,a.text-warning:hover{color:#66512c}.text-danger{color:#a94442}a.text-danger:focus,a.text-danger:hover{color:#843534}.bg-primary{color:#fff;background-color:#337ab7}a.bg-primary:focus,a.bg-primary:hover{background-color:#286090}.bg-success{background-color:#dff0d8}a.bg-success:focus,a.bg-success:hover{background-color:#c1e2b3}.bg-info{background-color:#d9edf7}a.bg-info:focus,a.bg-info:hover{background-color:#afd9ee}.bg-warning{background-color:#fcf8e3}a.bg-warning:focus,a.bg-warning:hover{background-color:#f7ecb5}.bg-danger{background-color:#f2dede}a.bg-danger:focus,a.bg-danger:hover{background-color:#e4b9b9}pre code,table{background-color:transparent}.page-header{padding-bottom:9.5px;margin:42px 0 21px;border-bottom:1px solid #eee}dl,ol,ul{margin-top:0}blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child,ol ol,ol ul,ul ol,ul ul{margin-bottom:0}address,dl{margin-bottom:21px}ol,ul{margin-bottom:10.5px}.list-inline{margin-left:-5px}.list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}dd,dt{line-height:1.5}dd{margin-left:0}.dl-horizontal dd:after,.dl-horizontal dd:before{content:" ";display:table}.dl-horizontal dd:after{clear:both}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}.container{width:750px}}.btn-group-vertical>.btn-group:after,.btn-toolbar:after,.clearfix:after,.container-fluid:after,.container:after,.dropdown-menu>li>a,.form-horizontal .form-group:after,.modal-footer:after,.modal-header:after,.nav:after,.navbar-collapse:after,.navbar-header:after,.pager:after,.panel-body:after,.row:after,.u-cf:after,.u-clearfix:after{clear:both}abbr[data-original-title],abbr[title]{cursor:help;border-bottom:1px dotted #777}.initialism{font-size:90%}blockquote{padding:10.5px 21px;margin:0 0 21px;font-size:17.5px;border-left:5px solid #eee}blockquote .small,blockquote footer,blockquote small{display:block;font-size:80%;line-height:1.5;color:#777}legend,pre{color:#333}blockquote .small:before,blockquote footer:before,blockquote small:before{content:\'\\2014 \\00A0\'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #eee;border-left:0;text-align:right}code,kbd{padding:2px 4px;font-size:90%}caption,th{text-align:left}.blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before{content:\'\'}.blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after{content:\'\\00A0 \\2014\'}address{line-height:1.5}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,"Courier New",monospace}code{color:#c7254e;background-color:#f9f2f4;border-radius:4px}kbd{color:#fff;background-color:#333;border-radius:3px;box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}kbd kbd{padding:0;font-size:100%;box-shadow:none}pre{display:block;padding:10px;margin:0 0 10.5px;font-size:13px;line-height:1.5;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px}.container-fluid:after,.container-fluid:before,.container:after,.container:before,.row:after,.row:before{display:table;content:" "}.container,.container-fluid{margin-right:auto;margin-left:auto}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;border-radius:0}.container,.container-fluid{padding-left:15px;padding-right:15px}.pre-scrollable{overflow-y:scroll}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.row{margin-left:-15px;margin-right:-15px}.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;min-height:1px;padding-left:15px;padding-right:15px}.col-xs-1{width:8.33333%}.col-xs-2{width:16.66667%}.col-xs-3{width:25%}.col-xs-4{width:33.33333%}.col-xs-5{width:41.66667%}.col-xs-6{width:50%}.col-xs-7{width:58.33333%}.col-xs-8{width:66.66667%}.col-xs-9{width:75%}.col-xs-10{width:83.33333%}.col-xs-11{width:91.66667%}.col-xs-12{width:100%}.col-xs-pull-0{right:auto}.col-xs-pull-1{right:8.33333%}.col-xs-pull-2{right:16.66667%}.col-xs-pull-3{right:25%}.col-xs-pull-4{right:33.33333%}.col-xs-pull-5{right:41.66667%}.col-xs-pull-6{right:50%}.col-xs-pull-7{right:58.33333%}.col-xs-pull-8{right:66.66667%}.col-xs-pull-9{right:75%}.col-xs-pull-10{right:83.33333%}.col-xs-pull-11{right:91.66667%}.col-xs-pull-12{right:100%}.col-xs-push-0{left:auto}.col-xs-push-1{left:8.33333%}.col-xs-push-2{left:16.66667%}.col-xs-push-3{left:25%}.col-xs-push-4{left:33.33333%}.col-xs-push-5{left:41.66667%}.col-xs-push-6{left:50%}.col-xs-push-7{left:58.33333%}.col-xs-push-8{left:66.66667%}.col-xs-push-9{left:75%}.col-xs-push-10{left:83.33333%}.col-xs-push-11{left:91.66667%}.col-xs-push-12{left:100%}.col-xs-offset-0{margin-left:0}.col-xs-offset-1{margin-left:8.33333%}.col-xs-offset-2{margin-left:16.66667%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-4{margin-left:33.33333%}.col-xs-offset-5{margin-left:41.66667%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-7{margin-left:58.33333%}.col-xs-offset-8{margin-left:66.66667%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-10{margin-left:83.33333%}.col-xs-offset-11{margin-left:91.66667%}.col-xs-offset-12{margin-left:100%}@media (min-width:768px){.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}.col-sm-1{width:8.33333%}.col-sm-2{width:16.66667%}.col-sm-3{width:25%}.col-sm-4{width:33.33333%}.col-sm-5{width:41.66667%}.col-sm-6{width:50%}.col-sm-7{width:58.33333%}.col-sm-8{width:66.66667%}.col-sm-9{width:75%}.col-sm-10{width:83.33333%}.col-sm-11{width:91.66667%}.col-sm-12{width:100%}.col-sm-pull-0{right:auto}.col-sm-pull-1{right:8.33333%}.col-sm-pull-2{right:16.66667%}.col-sm-pull-3{right:25%}.col-sm-pull-4{right:33.33333%}.col-sm-pull-5{right:41.66667%}.col-sm-pull-6{right:50%}.col-sm-pull-7{right:58.33333%}.col-sm-pull-8{right:66.66667%}.col-sm-pull-9{right:75%}.col-sm-pull-10{right:83.33333%}.col-sm-pull-11{right:91.66667%}.col-sm-pull-12{right:100%}.col-sm-push-0{left:auto}.col-sm-push-1{left:8.33333%}.col-sm-push-2{left:16.66667%}.col-sm-push-3{left:25%}.col-sm-push-4{left:33.33333%}.col-sm-push-5{left:41.66667%}.col-sm-push-6{left:50%}.col-sm-push-7{left:58.33333%}.col-sm-push-8{left:66.66667%}.col-sm-push-9{left:75%}.col-sm-push-10{left:83.33333%}.col-sm-push-11{left:91.66667%}.col-sm-push-12{left:100%}.col-sm-offset-0{margin-left:0}.col-sm-offset-1{margin-left:8.33333%}.col-sm-offset-2{margin-left:16.66667%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-4{margin-left:33.33333%}.col-sm-offset-5{margin-left:41.66667%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-7{margin-left:58.33333%}.col-sm-offset-8{margin-left:66.66667%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-10{margin-left:83.33333%}.col-sm-offset-11{margin-left:91.66667%}.col-sm-offset-12{margin-left:100%}}@media (min-width:992px){.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9{float:left}.col-md-1{width:8.33333%}.col-md-2{width:16.66667%}.col-md-3{width:25%}.col-md-4{width:33.33333%}.col-md-5{width:41.66667%}.col-md-6{width:50%}.col-md-7{width:58.33333%}.col-md-8{width:66.66667%}.col-md-9{width:75%}.col-md-10{width:83.33333%}.col-md-11{width:91.66667%}.col-md-12{width:100%}.col-md-pull-0{right:auto}.col-md-pull-1{right:8.33333%}.col-md-pull-2{right:16.66667%}.col-md-pull-3{right:25%}.col-md-pull-4{right:33.33333%}.col-md-pull-5{right:41.66667%}.col-md-pull-6{right:50%}.col-md-pull-7{right:58.33333%}.col-md-pull-8{right:66.66667%}.col-md-pull-9{right:75%}.col-md-pull-10{right:83.33333%}.col-md-pull-11{right:91.66667%}.col-md-pull-12{right:100%}.col-md-push-0{left:auto}.col-md-push-1{left:8.33333%}.col-md-push-2{left:16.66667%}.col-md-push-3{left:25%}.col-md-push-4{left:33.33333%}.col-md-push-5{left:41.66667%}.col-md-push-6{left:50%}.col-md-push-7{left:58.33333%}.col-md-push-8{left:66.66667%}.col-md-push-9{left:75%}.col-md-push-10{left:83.33333%}.col-md-push-11{left:91.66667%}.col-md-push-12{left:100%}.col-md-offset-0{margin-left:0}.col-md-offset-1{margin-left:8.33333%}.col-md-offset-2{margin-left:16.66667%}.col-md-offset-3{margin-left:25%}.col-md-offset-4{margin-left:33.33333%}.col-md-offset-5{margin-left:41.66667%}.col-md-offset-6{margin-left:50%}.col-md-offset-7{margin-left:58.33333%}.col-md-offset-8{margin-left:66.66667%}.col-md-offset-9{margin-left:75%}.col-md-offset-10{margin-left:83.33333%}.col-md-offset-11{margin-left:91.66667%}.col-md-offset-12{margin-left:100%}}@media (min-width:1200px){.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}.col-lg-1{width:8.33333%}.col-lg-2{width:16.66667%}.col-lg-3{width:25%}.col-lg-4{width:33.33333%}.col-lg-5{width:41.66667%}.col-lg-6{width:50%}.col-lg-7{width:58.33333%}.col-lg-8{width:66.66667%}.col-lg-9{width:75%}.col-lg-10{width:83.33333%}.col-lg-11{width:91.66667%}.col-lg-12{width:100%}.col-lg-pull-0{right:auto}.col-lg-pull-1{right:8.33333%}.col-lg-pull-2{right:16.66667%}.col-lg-pull-3{right:25%}.col-lg-pull-4{right:33.33333%}.col-lg-pull-5{right:41.66667%}.col-lg-pull-6{right:50%}.col-lg-pull-7{right:58.33333%}.col-lg-pull-8{right:66.66667%}.col-lg-pull-9{right:75%}.col-lg-pull-10{right:83.33333%}.col-lg-pull-11{right:91.66667%}.col-lg-pull-12{right:100%}.col-lg-push-0{left:auto}.col-lg-push-1{left:8.33333%}.col-lg-push-2{left:16.66667%}.col-lg-push-3{left:25%}.col-lg-push-4{left:33.33333%}.col-lg-push-5{left:41.66667%}.col-lg-push-6{left:50%}.col-lg-push-7{left:58.33333%}.col-lg-push-8{left:66.66667%}.col-lg-push-9{left:75%}.col-lg-push-10{left:83.33333%}.col-lg-push-11{left:91.66667%}.col-lg-push-12{left:100%}.col-lg-offset-0{margin-left:0}.col-lg-offset-1{margin-left:8.33333%}.col-lg-offset-2{margin-left:16.66667%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-4{margin-left:33.33333%}.col-lg-offset-5{margin-left:41.66667%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-7{margin-left:58.33333%}.col-lg-offset-8{margin-left:66.66667%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-10{margin-left:83.33333%}.col-lg-offset-11{margin-left:91.66667%}.col-lg-offset-12{margin-left:100%}}caption{padding-top:8px;padding-bottom:8px;color:#777}.table{width:100%;margin-bottom:21px}.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th{padding:8px;line-height:1.5;vertical-align:top;border-top:1px solid #ddd}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}.table>caption+thead>tr:first-child>td,.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>td,.table>thead:first-child>tr:first-child>th{border-top:0}.table>tbody+tbody{border-top:2px solid #ddd}.table .table{background-color:#fff}.table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th{padding:5px}.table-bordered,.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border:1px solid #ddd}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped>tbody>tr:nth-of-type(odd){background-color:#f9f9f9}.table-hover>tbody>tr:hover,.table>tbody>tr.active>td,.table>tbody>tr.active>th,.table>tbody>tr>td.active,.table>tbody>tr>th.active,.table>tfoot>tr.active>td,.table>tfoot>tr.active>th,.table>tfoot>tr>td.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>thead>tr.active>th,.table>thead>tr>td.active,.table>thead>tr>th.active{background-color:#f5f5f5}table col[class*=col-]{position:static;float:none;display:table-column}table td[class*=col-],table th[class*=col-]{position:static;float:none;display:table-cell}.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr.active:hover>th,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover{background-color:#e8e8e8}.table>tbody>tr.success>td,.table>tbody>tr.success>th,.table>tbody>tr>td.success,.table>tbody>tr>th.success,.table>tfoot>tr.success>td,.table>tfoot>tr.success>th,.table>tfoot>tr>td.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>thead>tr.success>th,.table>thead>tr>td.success,.table>thead>tr>th.success{background-color:#dff0d8}.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr.success:hover>th,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover{background-color:#d0e9c6}.table>tbody>tr.info>td,.table>tbody>tr.info>th,.table>tbody>tr>td.info,.table>tbody>tr>th.info,.table>tfoot>tr.info>td,.table>tfoot>tr.info>th,.table>tfoot>tr>td.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>thead>tr.info>th,.table>thead>tr>td.info,.table>thead>tr>th.info{background-color:#d9edf7}.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr.info:hover>th,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover{background-color:#c4e3f3}.table>tbody>tr.warning>td,.table>tbody>tr.warning>th,.table>tbody>tr>td.warning,.table>tbody>tr>th.warning,.table>tfoot>tr.warning>td,.table>tfoot>tr.warning>th,.table>tfoot>tr>td.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>thead>tr.warning>th,.table>thead>tr>td.warning,.table>thead>tr>th.warning{background-color:#fcf8e3}.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr.warning:hover>th,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover{background-color:#faf2cc}.table>tbody>tr.danger>td,.table>tbody>tr.danger>th,.table>tbody>tr>td.danger,.table>tbody>tr>th.danger,.table>tfoot>tr.danger>td,.table>tfoot>tr.danger>th,.table>tfoot>tr>td.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>thead>tr.danger>th,.table>thead>tr>td.danger,.table>thead>tr>th.danger{background-color:#f2dede}.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr.danger:hover>th,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover{background-color:#ebcccc}.table-responsive{overflow-x:auto;min-height:.01%}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:15.75px;overflow-y:hidden;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #ddd}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>td,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>thead>tr>th{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}}fieldset,legend{padding:0;border:0}fieldset{margin:0;min-width:0}legend{display:block;width:100%;margin-bottom:21px;font-size:21px;line-height:inherit;border-bottom:1px solid #e5e5e5}label{display:inline-block;margin-bottom:5px}input[type=search]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none}input[type=checkbox],input[type=radio]{margin:4px 0 0;margin-top:1px\\9;line-height:normal}.form-control,output{font-size:14px;line-height:1.5;color:#555;display:block}input[type=file]{display:block}input[type=range]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=file]:focus,input[type=checkbox]:focus,input[type=radio]:focus{outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}output{padding-top:7px}.form-control{width:100%;height:35px;padding:6px 12px;background-color:#fff;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.form-control::-moz-placeholder{color:#999;opacity:1}.form-control:-ms-input-placeholder{color:#999}.form-control::-webkit-input-placeholder{color:#999}.has-success .checkbox,.has-success .checkbox-inline,.has-success .control-label,.has-success .form-control-feedback,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.checkbox label,.has-success.checkbox-inline label,.has-success.radio label,.has-success.radio-inline label{color:#3c763d}.form-control::-ms-expand{border:0;background-color:transparent}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#eee;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=date].form-control,input[type=time].form-control,input[type=datetime-local].form-control,input[type=month].form-control{line-height:35px}.input-group-sm input[type=date],.input-group-sm input[type=time],.input-group-sm input[type=datetime-local],.input-group-sm input[type=month],.input-group-sm>.input-group-btn>input[type=date].btn,.input-group-sm>.input-group-btn>input[type=time].btn,.input-group-sm>.input-group-btn>input[type=datetime-local].btn,.input-group-sm>.input-group-btn>input[type=month].btn,.input-group-sm>input[type=date].form-control,.input-group-sm>input[type=date].input-group-addon,.input-group-sm>input[type=time].form-control,.input-group-sm>input[type=time].input-group-addon,.input-group-sm>input[type=datetime-local].form-control,.input-group-sm>input[type=datetime-local].input-group-addon,.input-group-sm>input[type=month].form-control,.input-group-sm>input[type=month].input-group-addon,input[type=date].input-sm,input[type=time].input-sm,input[type=datetime-local].input-sm,input[type=month].input-sm{line-height:30px}.input-group-lg input[type=date],.input-group-lg input[type=time],.input-group-lg input[type=datetime-local],.input-group-lg input[type=month],.input-group-lg>.input-group-btn>input[type=date].btn,.input-group-lg>.input-group-btn>input[type=time].btn,.input-group-lg>.input-group-btn>input[type=datetime-local].btn,.input-group-lg>.input-group-btn>input[type=month].btn,.input-group-lg>input[type=date].form-control,.input-group-lg>input[type=date].input-group-addon,.input-group-lg>input[type=time].form-control,.input-group-lg>input[type=time].input-group-addon,.input-group-lg>input[type=datetime-local].form-control,.input-group-lg>input[type=datetime-local].input-group-addon,.input-group-lg>input[type=month].form-control,.input-group-lg>input[type=month].input-group-addon,input[type=date].input-lg,input[type=time].input-lg,input[type=datetime-local].input-lg,input[type=month].input-lg{line-height:46px}}.form-group{margin-bottom:15px}.checkbox,.radio{position:relative;display:block;margin-top:10px;margin-bottom:10px}.checkbox label,.radio label{min-height:21px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.checkbox input[type=checkbox],.checkbox-inline input[type=checkbox],.radio input[type=radio],.radio-inline input[type=radio]{position:absolute;margin-left:-20px;margin-top:4px\\9}.checkbox+.checkbox,.radio+.radio{margin-top:-5px}.checkbox-inline,.radio-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.checkbox-inline+.checkbox-inline,.radio-inline+.radio-inline{margin-top:0;margin-left:10px}.checkbox-inline.disabled,.checkbox.disabled label,.radio-inline.disabled,.radio.disabled label,fieldset[disabled] .checkbox label,fieldset[disabled] .checkbox-inline,fieldset[disabled] .radio label,fieldset[disabled] .radio-inline,fieldset[disabled] input[type=checkbox],fieldset[disabled] input[type=radio],input[type=checkbox].disabled,input[type=checkbox][disabled],input[type=radio].disabled,input[type=radio][disabled]{cursor:not-allowed}.form-control-static{padding-top:7px;padding-bottom:7px;margin-bottom:0;min-height:35px}.form-control-static.input-lg,.form-control-static.input-sm,.input-group-lg>.form-control-static.form-control,.input-group-lg>.form-control-static.input-group-addon,.input-group-lg>.input-group-btn>.form-control-static.btn,.input-group-sm>.form-control-static.form-control,.input-group-sm>.form-control-static.input-group-addon,.input-group-sm>.input-group-btn>.form-control-static.btn{padding-left:0;padding-right:0}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn,.input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.input-group-sm>.input-group-btn>select.btn,.input-group-sm>select.form-control,.input-group-sm>select.input-group-addon,select.input-sm{height:30px;line-height:30px}.input-group-sm>.input-group-btn>select[multiple].btn,.input-group-sm>.input-group-btn>textarea.btn,.input-group-sm>select[multiple].form-control,.input-group-sm>select[multiple].input-group-addon,.input-group-sm>textarea.form-control,.input-group-sm>textarea.input-group-addon,select[multiple].input-sm,textarea.input-sm{height:auto}.form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.form-group-sm select.form-control{height:30px;line-height:30px}.form-group-sm select[multiple].form-control,.form-group-sm textarea.form-control{height:auto}.form-group-sm .form-control-static{height:30px;min-height:33px;padding:6px 10px;font-size:12px;line-height:1.5}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn,.input-lg{height:46px;padding:10px 16px;font-size:18px;line-height:1.33333;border-radius:6px}.input-group-lg>.input-group-btn>select.btn,.input-group-lg>select.form-control,.input-group-lg>select.input-group-addon,select.input-lg{height:46px;line-height:46px}.input-group-lg>.input-group-btn>select[multiple].btn,.input-group-lg>.input-group-btn>textarea.btn,.input-group-lg>select[multiple].form-control,.input-group-lg>select[multiple].input-group-addon,.input-group-lg>textarea.form-control,.input-group-lg>textarea.input-group-addon,select[multiple].input-lg,textarea.input-lg{height:auto}.form-group-lg .form-control{height:46px;padding:10px 16px;font-size:18px;line-height:1.33333;border-radius:6px}.form-group-lg select.form-control{height:46px;line-height:46px}.form-group-lg select[multiple].form-control,.form-group-lg textarea.form-control{height:auto}.form-group-lg .form-control-static{height:46px;min-height:39px;padding:11px 16px;font-size:18px;line-height:1.33333}.has-feedback{position:relative}.has-feedback .form-control{padding-right:43.75px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:35px;height:35px;line-height:35px;text-align:center;pointer-events:none}.collapsing,.dropdown,.dropup{position:relative}.form-group-lg .form-control+.form-control-feedback,.input-group-lg+.form-control-feedback,.input-group-lg>.form-control+.form-control-feedback,.input-group-lg>.input-group-addon+.form-control-feedback,.input-group-lg>.input-group-btn>.btn+.form-control-feedback,.input-lg+.form-control-feedback{width:46px;height:46px;line-height:46px}.form-group-sm .form-control+.form-control-feedback,.input-group-sm+.form-control-feedback,.input-group-sm>.form-control+.form-control-feedback,.input-group-sm>.input-group-addon+.form-control-feedback,.input-group-sm>.input-group-btn>.btn+.form-control-feedback,.input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}.has-success .form-control{border-color:#3c763d;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-success .form-control:focus{border-color:#2b542c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}.has-success .input-group-addon{color:#3c763d;border-color:#3c763d;background-color:#dff0d8}.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning .control-label,.has-warning .form-control-feedback,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.checkbox label,.has-warning.checkbox-inline label,.has-warning.radio label,.has-warning.radio-inline label{color:#8a6d3b}.has-warning .form-control{border-color:#8a6d3b;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-warning .form-control:focus{border-color:#66512c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}.has-warning .input-group-addon{color:#8a6d3b;border-color:#8a6d3b;background-color:#fcf8e3}.has-error .checkbox,.has-error .checkbox-inline,.has-error .control-label,.has-error .form-control-feedback,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.checkbox label,.has-error.checkbox-inline label,.has-error.radio label,.has-error.radio-inline label{color:#a94442}.has-error .form-control{border-color:#a94442;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-error .form-control:focus{border-color:#843534;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}.has-error .input-group-addon{color:#a94442;border-color:#a94442;background-color:#f2dede}.has-feedback label~.form-control-feedback{top:26px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){.form-inline .form-control-static,.form-inline .form-group{display:inline-block}.form-inline .control-label,.form-inline .form-group{margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .form-control,.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .checkbox,.form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .checkbox label,.form-inline .radio label{padding-left:0}.form-inline .checkbox input[type=checkbox],.form-inline .radio input[type=radio]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}.form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:7px}}.btn-block,input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.form-horizontal .checkbox,.form-horizontal .checkbox-inline,.form-horizontal .radio,.form-horizontal .radio-inline{margin-top:0;margin-bottom:0;padding-top:7px}.form-horizontal .checkbox,.form-horizontal .radio{min-height:28px}.form-horizontal .form-group{margin-left:-15px;margin-right:-15px}.form-horizontal .form-group:after,.form-horizontal .form-group:before{content:" ";display:table}.form-horizontal .has-feedback .form-control-feedback{right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:11px;font-size:18px}.form-horizontal .form-group-sm .control-label{padding-top:6px;font-size:12px}}.btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;touch-action:manipulation;cursor:pointer;border:1px solid transparent;white-space:nowrap;padding:6px 12px;font-size:14px;line-height:1.5;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn.active.focus,.btn.active:focus,.btn.focus,.btn:active.focus,.btn:active:focus,.btn:focus{outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}.btn.focus,.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn.active,.btn:active{outline:0;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}a.btn.disabled,fieldset[disabled] a.btn{pointer-events:none}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn-default.focus,.btn-default:focus{color:#333;background-color:#e6e6e6;border-color:#8c8c8c}.btn-default.active,.btn-default:active,.btn-default:hover,.open>.btn-default.dropdown-toggle{color:#333;background-color:#e6e6e6;border-color:#adadad}.btn-default.active.focus,.btn-default.active:focus,.btn-default.active:hover,.btn-default:active.focus,.btn-default:active:focus,.btn-default:active:hover,.open>.btn-default.dropdown-toggle.focus,.open>.btn-default.dropdown-toggle:focus,.open>.btn-default.dropdown-toggle:hover{color:#333;background-color:#d4d4d4;border-color:#8c8c8c}.btn-default.disabled.focus,.btn-default.disabled:focus,.btn-default.disabled:hover,.btn-default[disabled].focus,.btn-default[disabled]:focus,.btn-default[disabled]:hover,fieldset[disabled] .btn-default.focus,fieldset[disabled] .btn-default:focus,fieldset[disabled] .btn-default:hover{background-color:#fff;border-color:#ccc}.btn-default .badge{color:#fff;background-color:#333}.btn-primary{color:#fff;background-color:#337ab7;border-color:#2e6da4}.btn-primary.focus,.btn-primary:focus{color:#fff;background-color:#286090;border-color:#122b40}.btn-primary.active,.btn-primary:active,.btn-primary:hover,.open>.btn-primary.dropdown-toggle{color:#fff;background-color:#286090;border-color:#204d74}.btn-primary.active.focus,.btn-primary.active:focus,.btn-primary.active:hover,.btn-primary:active.focus,.btn-primary:active:focus,.btn-primary:active:hover,.open>.btn-primary.dropdown-toggle.focus,.open>.btn-primary.dropdown-toggle:focus,.open>.btn-primary.dropdown-toggle:hover{color:#fff;background-color:#204d74;border-color:#122b40}.btn-primary.disabled.focus,.btn-primary.disabled:focus,.btn-primary.disabled:hover,.btn-primary[disabled].focus,.btn-primary[disabled]:focus,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary.focus,fieldset[disabled] .btn-primary:focus,fieldset[disabled] .btn-primary:hover{background-color:#337ab7;border-color:#2e6da4}.btn-primary .badge{color:#337ab7;background-color:#fff}.btn-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}.btn-success.focus,.btn-success:focus{color:#fff;background-color:#449d44;border-color:#255625}.btn-success.active,.btn-success:active,.btn-success:hover,.open>.btn-success.dropdown-toggle{color:#fff;background-color:#449d44;border-color:#398439}.btn-success.active.focus,.btn-success.active:focus,.btn-success.active:hover,.btn-success:active.focus,.btn-success:active:focus,.btn-success:active:hover,.open>.btn-success.dropdown-toggle.focus,.open>.btn-success.dropdown-toggle:focus,.open>.btn-success.dropdown-toggle:hover{color:#fff;background-color:#398439;border-color:#255625}.btn-success.active,.btn-success:active,.open>.btn-success.dropdown-toggle{background-image:none}.btn-success.disabled.focus,.btn-success.disabled:focus,.btn-success.disabled:hover,.btn-success[disabled].focus,.btn-success[disabled]:focus,.btn-success[disabled]:hover,fieldset[disabled] .btn-success.focus,fieldset[disabled] .btn-success:focus,fieldset[disabled] .btn-success:hover{background-color:#5cb85c;border-color:#4cae4c}.btn-success .badge{color:#5cb85c;background-color:#fff}.btn-info{color:#fff;background-color:#5bc0de;border-color:#46b8da}.btn-info.focus,.btn-info:focus{color:#fff;background-color:#31b0d5;border-color:#1b6d85}.btn-info.active,.btn-info:active,.btn-info:hover,.open>.btn-info.dropdown-toggle{color:#fff;background-color:#31b0d5;border-color:#269abc}.btn-info.active.focus,.btn-info.active:focus,.btn-info.active:hover,.btn-info:active.focus,.btn-info:active:focus,.btn-info:active:hover,.open>.btn-info.dropdown-toggle.focus,.open>.btn-info.dropdown-toggle:focus,.open>.btn-info.dropdown-toggle:hover{color:#fff;background-color:#269abc;border-color:#1b6d85}.btn-info.disabled.focus,.btn-info.disabled:focus,.btn-info.disabled:hover,.btn-info[disabled].focus,.btn-info[disabled]:focus,.btn-info[disabled]:hover,fieldset[disabled] .btn-info.focus,fieldset[disabled] .btn-info:focus,fieldset[disabled] .btn-info:hover{background-color:#5bc0de;border-color:#46b8da}.btn-info .badge{color:#5bc0de;background-color:#fff}.btn-warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}.btn-warning.focus,.btn-warning:focus{color:#fff;background-color:#ec971f;border-color:#985f0d}.btn-warning.active,.btn-warning:active,.btn-warning:hover,.open>.btn-warning.dropdown-toggle{color:#fff;background-color:#ec971f;border-color:#d58512}.btn-warning.active.focus,.btn-warning.active:focus,.btn-warning.active:hover,.btn-warning:active.focus,.btn-warning:active:focus,.btn-warning:active:hover,.open>.btn-warning.dropdown-toggle.focus,.open>.btn-warning.dropdown-toggle:focus,.open>.btn-warning.dropdown-toggle:hover{color:#fff;background-color:#d58512;border-color:#985f0d}.btn-warning.disabled.focus,.btn-warning.disabled:focus,.btn-warning.disabled:hover,.btn-warning[disabled].focus,.btn-warning[disabled]:focus,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning.focus,fieldset[disabled] .btn-warning:focus,fieldset[disabled] .btn-warning:hover{background-color:#f0ad4e;border-color:#eea236}.btn-warning .badge{color:#f0ad4e;background-color:#fff}.btn-danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}.btn-danger.focus,.btn-danger:focus{color:#fff;background-color:#c9302c;border-color:#761c19}.btn-danger.active,.btn-danger:active,.btn-danger:hover,.open>.btn-danger.dropdown-toggle{color:#fff;background-color:#c9302c;border-color:#ac2925}.btn-danger.active.focus,.btn-danger.active:focus,.btn-danger.active:hover,.btn-danger:active.focus,.btn-danger:active:focus,.btn-danger:active:hover,.open>.btn-danger.dropdown-toggle.focus,.open>.btn-danger.dropdown-toggle:focus,.open>.btn-danger.dropdown-toggle:hover{color:#fff;background-color:#ac2925;border-color:#761c19}.btn-danger.disabled.focus,.btn-danger.disabled:focus,.btn-danger.disabled:hover,.btn-danger[disabled].focus,.btn-danger[disabled]:focus,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger.focus,fieldset[disabled] .btn-danger:focus,fieldset[disabled] .btn-danger:hover{background-color:#d9534f;border-color:#d43f3a}.btn-danger .badge{color:#d9534f;background-color:#fff}.btn-link{color:#337ab7;font-weight:400;border-radius:0}.btn-link,.btn-link.active,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:active,.btn-link:focus,.btn-link:hover{border-color:transparent}.btn-link:focus,.btn-link:hover{color:#23527c;text-decoration:underline;background-color:transparent}.btn-link[disabled]:focus,.btn-link[disabled]:hover,fieldset[disabled] .btn-link:focus,fieldset[disabled] .btn-link:hover{color:#777;text-decoration:none}.btn-group-lg>.btn,.btn-lg{padding:10px 16px;font-size:18px;line-height:1.33333;border-radius:6px}.btn-group-sm>.btn,.btn-sm{padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.btn-group-xs>.btn,.btn-xs{padding:1px 5px;font-size:12px;line-height:1.5;border-radius:3px}.btn-block{display:block}.btn-block+.btn-block{margin-top:5px}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{height:0;overflow:hidden;-webkit-transition-property:height,visibility;transition-property:height,visibility;-webkit-transition-duration:.35s;transition-duration:.35s;-webkit-transition-timing-function:ease;transition-timing-function:ease}.caret{display:inline-block;width:0;height:0;margin-left:2px;border-top:4px dashed;border-top:4px solid\\9;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:14px;text-align:left;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);background-clip:padding-box}.dropdown-menu-right,.dropdown-menu.pull-right{left:auto;right:0}.dropdown-header,.dropdown-menu>li>a{display:block;padding:3px 20px;line-height:1.5;white-space:nowrap}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle,.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child,.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child),.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn,.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.dropdown-menu .divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{font-weight:400;color:#333}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{text-decoration:none;color:#262626;background-color:#f5f5f5}.dropdown-menu>.active>a,.dropdown-menu>.active>a:focus,.dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;outline:0;background-color:#337ab7}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{color:#777}.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{text-decoration:none;background-color:transparent;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);cursor:not-allowed}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-left{left:0;right:auto}.dropdown-header{font-size:12px;color:#777}.dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px dashed;border-bottom:4px solid\\9;content:""}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}.modal,.modal-backdrop{bottom:0;right:0;left:0;top:0}@media (min-width:768px){.navbar-right .dropdown-menu{right:0;left:auto}.navbar-right .dropdown-menu-left{left:0;right:auto}}.btn-group,.btn-group-vertical{position:relative;display:inline-block}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;float:left}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar:after,.btn-toolbar:before{content:" ";display:table}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn .caret,.btn-group>.btn:first-child{margin-left:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}.btn-group-lg.btn-group>.btn+.dropdown-toggle,.btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn-group-lg>.btn .caret,.btn-lg .caret{border-width:5px 5px 0}.dropup .btn-group-lg>.btn .caret,.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group:after,.btn-group-vertical>.btn-group:before{content:" ";display:table}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-radius:4px 4px 0 0}.btn-group-vertical>.btn:last-child:not(:first-child){border-radius:0 0 4px 4px}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn,.input-group .form-control:not(:first-child):not(:last-child),.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=buttons]>.btn input[type=checkbox],[data-toggle=buttons]>.btn input[type=radio],[data-toggle=buttons]>.btn-group>.btn input[type=checkbox],[data-toggle=buttons]>.btn-group>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group,.input-group-btn,.input-group-btn>.btn{position:relative}.input-group{display:table;border-collapse:separate}.input-group[class*=col-]{float:none;padding-left:0;padding-right:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group .form-control:focus{z-index:3}.input-group .form-control,.input-group-addon,.input-group-btn{display:table-cell}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:6px 12px;font-size:14px;font-weight:400;line-height:1;color:#555;text-align:center;background-color:#eee;border:1px solid #ccc;border-radius:4px}.input-group-addon.input-sm,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.input-group-addon.btn{padding:5px 10px;font-size:12px;border-radius:3px}.input-group-addon.input-lg,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.input-group-addon.btn{padding:10px 16px;font-size:18px;border-radius:6px}.input-group-addon input[type=checkbox],.input-group-addon input[type=radio]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn-group:not(:last-child)>.btn,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:first-child>.btn-group:not(:first-child)>.btn,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle{border-bottom-left-radius:0;border-top-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{font-size:0;white-space:nowrap}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{z-index:2;margin-left:-1px}.nav{margin-bottom:0;padding-left:0;list-style:none}.nav:after,.nav:before{content:" ";display:table}.nav>li,.nav>li>a{display:block;position:relative}.nav>li>a{padding:10px 15px}.nav>li>a:focus,.nav>li>a:hover{text-decoration:none;background-color:#eee}.nav>li.disabled>a{color:#777}.nav>li.disabled>a:focus,.nav>li.disabled>a:hover{color:#777;text-decoration:none;background-color:transparent;cursor:not-allowed}.nav .open>a,.nav .open>a:focus,.nav .open>a:hover{background-color:#eee;border-color:#337ab7}.nav .nav-divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.5;border:1px solid transparent;border-radius:4px 4px 0 0}.nav-tabs>li>a:hover{border-color:#eee #eee #ddd}.nav-tabs>li.active>a,.nav-tabs>li.active>a:focus,.nav-tabs>li.active>a:hover{color:#555;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent;cursor:default}.nav-pills>li{float:left}.nav-justified>li,.nav-stacked>li,.nav-tabs.nav-justified>li{float:none}.nav-pills>li>a{border-radius:4px}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:focus,.nav-pills>li.active>a:hover{color:#fff;background-color:#337ab7}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified,.nav-tabs.nav-justified{width:100%}.nav-justified>li>a,.nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}.nav-tabs-justified,.nav-tabs.nav-justified{border-bottom:0}.nav-tabs-justified>li>a,.nav-tabs.nav-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-justified>li,.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a,.nav-tabs.nav-justified>li>a{margin-bottom:0}.nav-tabs-justified>li>a,.nav-tabs.nav-justified>li>a{border-bottom:1px solid #ddd;border-radius:4px 4px 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border-bottom-color:#fff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.navbar-collapse:after,.navbar-collapse:before,.navbar-header:after,.navbar-header:before,.navbar:after,.navbar:before{display:table;content:" "}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}.navbar{position:relative;min-height:60px;margin-bottom:21px;border:1px solid transparent}.navbar:after{clear:both}.navbar-collapse{overflow-x:visible;padding-right:15px;padding-left:15px;border-top:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);-webkit-overflow-scrolling:touch}.navbar-collapse.in{overflow-y:auto}@media (min-width:768px){.navbar{border-radius:4px}.navbar-header{float:left}.navbar-collapse{width:auto;border-top:0;box-shadow:none}.navbar-collapse.collapse{display:block!important;height:auto!important;padding-bottom:0;overflow:visible!important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse{padding-left:0;padding-right:0}}.modal,.modal-open{overflow:hidden}@media (max-device-width:480px) and (orientation:landscape){.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:200px}}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:-15px;margin-left:-15px}.navbar-static-top{z-index:1000;border-width:0 0 1px}.navbar-fixed-bottom,.navbar-fixed-top{position:fixed;right:0;left:0;z-index:1030}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;padding:19.5px 15px;font-size:18px;line-height:21px;height:60px}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-brand>img{display:block}@media (min-width:768px){.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}.navbar-fixed-bottom,.navbar-fixed-top,.navbar-static-top{border-radius:0}.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:-15px}}.navbar-toggle{position:relative;float:right;margin-right:15px;padding:9px 10px;margin-top:13px;margin-bottom:13px;background-color:transparent;border:1px solid transparent;border-radius:4px}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}.navbar-nav{margin:9.75px -15px}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:21px}@media (max-width:767px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;box-shadow:none}.navbar-nav .open .dropdown-menu .dropdown-header,.navbar-nav .open .dropdown-menu>li>a{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:21px}.navbar-nav .open .dropdown-menu>li>a:focus,.navbar-nav .open .dropdown-menu>li>a:hover{background-image:none}}@media (min-width:768px){.navbar-toggle{display:none}.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:19.5px;padding-bottom:19.5px}}.navbar-form{padding:10px 15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);margin:12.5px -15px}@media (min-width:768px){.navbar-form .form-control-static,.navbar-form .form-group{display:inline-block}.navbar-form .control-label,.navbar-form .form-group{margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .form-control,.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .checkbox,.navbar-form .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .checkbox label,.navbar-form .radio label{padding-left:0}.navbar-form .checkbox input[type=checkbox],.navbar-form .radio input[type=radio]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}.navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}}.btn .badge,.btn .label{top:-1px;position:relative}@media (max-width:767px){.navbar-form .form-group{margin-bottom:5px}.navbar-form .form-group:last-child{margin-bottom:0}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{margin-bottom:0;border-radius:4px 4px 0 0}.navbar-btn{margin-top:12.5px;margin-bottom:12.5px}.btn-group-sm>.navbar-btn.btn,.navbar-btn.btn-sm{margin-top:15px;margin-bottom:15px}.btn-group-xs>.navbar-btn.btn,.navbar-btn.btn-xs{margin-top:19px;margin-bottom:19px}.navbar-text{margin-top:19.5px;margin-bottom:19.5px}@media (min-width:768px){.navbar-text{float:left;margin-left:15px;margin-right:15px}.navbar-left{float:left!important}.navbar-right{float:right!important;margin-right:-15px}.navbar-right~.navbar-right{margin-right:0}}.navbar-default{background-color:#f8f8f8;border-color:#e7e7e7}.navbar-default .navbar-brand{color:#777}.navbar-default .navbar-brand:focus,.navbar-default .navbar-brand:hover{color:#5e5e5e;background-color:transparent}.navbar-default .navbar-nav>li>a,.navbar-default .navbar-text{color:#777}.navbar-default .navbar-nav>li>a:focus,.navbar-default .navbar-nav>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:focus,.navbar-default .navbar-nav>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:focus,.navbar-default .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:#ddd}.navbar-default .navbar-toggle:focus,.navbar-default .navbar-toggle:hover{background-color:#ddd}.navbar-default .navbar-toggle .icon-bar{background-color:#888}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#e7e7e7}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:focus,.navbar-default .navbar-nav>.open>a:hover{background-color:#e7e7e7;color:#555}@media (max-width:767px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#777}.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}.navbar-default .navbar-link{color:#777}.navbar-default .navbar-link:hover{color:#333}.navbar-default .btn-link{color:#777}.navbar-default .btn-link:focus,.navbar-default .btn-link:hover{color:#333}.navbar-default .btn-link[disabled]:focus,.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:focus,fieldset[disabled] .navbar-default .btn-link:hover{color:#ccc}.navbar-inverse{background-color:#222;border-color:#090909}.navbar-inverse .navbar-brand{color:#9d9d9d}.navbar-inverse .navbar-brand:focus,.navbar-inverse .navbar-brand:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>li>a,.navbar-inverse .navbar-text{color:#9d9d9d}.navbar-inverse .navbar-nav>li>a:focus,.navbar-inverse .navbar-nav>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:focus,.navbar-inverse .navbar-nav>.active>a:hover{color:#fff;background-color:#090909}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:focus,.navbar-inverse .navbar-nav>.disabled>a:hover{color:#444;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:#333}.navbar-inverse .navbar-toggle:focus,.navbar-inverse .navbar-toggle:hover{background-color:#333}.navbar-inverse .navbar-toggle .icon-bar{background-color:#fff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#101010}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:focus,.navbar-inverse .navbar-nav>.open>a:hover{background-color:#090909;color:#fff}@media (max-width:767px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#090909}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#090909}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#9d9d9d}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#090909}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#444;background-color:transparent}}.navbar-inverse .navbar-link{color:#9d9d9d}.navbar-inverse .navbar-link:hover{color:#fff}.navbar-inverse .btn-link{color:#9d9d9d}.navbar-inverse .btn-link:focus,.navbar-inverse .btn-link:hover{color:#fff}.navbar-inverse .btn-link[disabled]:focus,.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:focus,fieldset[disabled] .navbar-inverse .btn-link:hover{color:#444}.pagination{display:inline-block;padding-left:0;margin:21px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;line-height:1.5;text-decoration:none;color:#337ab7;background-color:#fff;border:1px solid #ddd;margin-left:-1px}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-bottom-left-radius:4px;border-top-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-bottom-right-radius:4px;border-top-right-radius:4px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{z-index:2;color:#23527c;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:3;color:#fff;background-color:#337ab7;border-color:#337ab7;cursor:default}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;background-color:#fff;border-color:#ddd;cursor:not-allowed}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:18px;line-height:1.33333}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-bottom-left-radius:6px;border-top-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-bottom-right-radius:6px;border-top-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px;line-height:1.5}.badge,.label{line-height:1;white-space:nowrap;text-align:center;font-weight:700}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-bottom-left-radius:3px;border-top-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-bottom-right-radius:3px;border-top-right-radius:3px}.pager{padding-left:0;margin:21px 0;list-style:none;text-align:center}.pager:after,.pager:before{content:" ";display:table}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.close,.list-group-item>.badge{float:right}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#777;background-color:#fff;cursor:not-allowed}.label{display:inline;padding:.2em .6em .3em;font-size:75%;color:#fff;border-radius:.25em}.label:empty{display:none}a.label:focus,a.label:hover{color:#fff;text-decoration:none;cursor:pointer}.label-default{background-color:#777}.label-default[href]:focus,.label-default[href]:hover{background-color:#5e5e5e}.label-primary{background-color:#337ab7}.label-primary[href]:focus,.label-primary[href]:hover{background-color:#286090}.label-success{background-color:#5cb85c}.label-success[href]:focus,.label-success[href]:hover{background-color:#449d44}.label-info{background-color:#5bc0de}.label-info[href]:focus,.label-info[href]:hover{background-color:#31b0d5}.label-warning{background-color:#f0ad4e}.label-warning[href]:focus,.label-warning[href]:hover{background-color:#ec971f}.label-danger{background-color:#d9534f}.label-danger[href]:focus,.label-danger[href]:hover{background-color:#c9302c}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;color:#fff;vertical-align:middle;background-color:#777;border-radius:10px}.badge:empty{display:none}.btn-group-xs>.btn .badge,.btn-xs .badge{top:0;padding:1px 5px}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#337ab7;background-color:#fff}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}a.badge:focus,a.badge:hover{color:#fff;text-decoration:none;cursor:pointer}.list-group{margin-bottom:20px;padding-left:0}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #ddd}.list-group-item:first-child{border-top-right-radius:4px;border-top-left-radius:4px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}a.list-group-item,button.list-group-item{color:#555}a.list-group-item .list-group-item-heading,button.list-group-item .list-group-item-heading{color:#333}a.list-group-item:focus,a.list-group-item:hover,button.list-group-item:focus,button.list-group-item:hover{text-decoration:none;color:#555;background-color:#f5f5f5}button.list-group-item{width:100%;text-align:left}.list-group-item.disabled,.list-group-item.disabled:focus,.list-group-item.disabled:hover{background-color:#eee;color:#777;cursor:not-allowed}button.close,label{cursor:pointer}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text{color:#777}.list-group-item.active,.list-group-item.active:focus,.list-group-item.active:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7}.list-group-item.active .list-group-item-heading,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:focus .list-group-item-text,.list-group-item.active:hover .list-group-item-text{color:#c7ddef}.list-group-item-success{color:#3c763d;background-color:#dff0d8}a.list-group-item-success,button.list-group-item-success{color:#3c763d}a.list-group-item-success .list-group-item-heading,button.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:focus,a.list-group-item-success:hover,button.list-group-item-success:focus,button.list-group-item-success:hover{color:#3c763d;background-color:#d0e9c6}a.list-group-item-success.active,a.list-group-item-success.active:focus,a.list-group-item-success.active:hover,button.list-group-item-success.active,button.list-group-item-success.active:focus,button.list-group-item-success.active:hover{color:#fff;background-color:#3c763d;border-color:#3c763d}.list-group-item-info{color:#31708f;background-color:#d9edf7}a.list-group-item-info,button.list-group-item-info{color:#31708f}a.list-group-item-info .list-group-item-heading,button.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:focus,a.list-group-item-info:hover,button.list-group-item-info:focus,button.list-group-item-info:hover{color:#31708f;background-color:#c4e3f3}a.list-group-item-info.active,a.list-group-item-info.active:focus,a.list-group-item-info.active:hover,button.list-group-item-info.active,button.list-group-item-info.active:focus,button.list-group-item-info.active:hover{color:#fff;background-color:#31708f;border-color:#31708f}.list-group-item-warning{color:#8a6d3b;background-color:#fcf8e3}a.list-group-item-warning,button.list-group-item-warning{color:#8a6d3b}a.list-group-item-warning .list-group-item-heading,button.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:focus,a.list-group-item-warning:hover,button.list-group-item-warning:focus,button.list-group-item-warning:hover{color:#8a6d3b;background-color:#faf2cc}a.list-group-item-warning.active,a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover,button.list-group-item-warning.active,button.list-group-item-warning.active:focus,button.list-group-item-warning.active:hover{color:#fff;background-color:#8a6d3b;border-color:#8a6d3b}.list-group-item-danger{color:#a94442;background-color:#f2dede}a.list-group-item-danger,button.list-group-item-danger{color:#a94442}a.list-group-item-danger .list-group-item-heading,button.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:focus,a.list-group-item-danger:hover,button.list-group-item-danger:focus,button.list-group-item-danger:hover{color:#a94442;background-color:#ebcccc}a.list-group-item-danger.active,a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover,button.list-group-item-danger.active,button.list-group-item-danger.active:focus,button.list-group-item-danger.active:hover{color:#fff;background-color:#a94442;border-color:#a94442}.panel-heading>.dropdown .dropdown-toggle,.panel-title,.panel-title>.small,.panel-title>.small>a,.panel-title>a,.panel-title>small,.panel-title>small>a{color:inherit}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:21px;background-color:#fff;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-title,.panel>.list-group,.panel>.panel-collapse>.list-group,.panel>.panel-collapse>.table,.panel>.table,.panel>.table-responsive>.table{margin-bottom:0}.panel-body{padding:15px}.panel-body:after,.panel-body:before{content:" ";display:table}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:3px;border-top-left-radius:3px}.panel-title{margin-top:0;font-size:16px}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel-group .panel-heading,.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th{border-bottom:0}.panel>.table-responsive:last-child>.table:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child,.panel>.table:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:3px;border-top-left-radius:3px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.panel-heading+.panel-collapse>.list-group .list-group-item:first-child{border-top-right-radius:0;border-top-left-radius:0}.panel>.table-responsive:first-child>.table:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,.panel>.table:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child,.panel>.table:first-child>thead:first-child>tr:first-child{border-top-right-radius:3px;border-top-left-radius:3px}.list-group+.panel-footer,.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.panel>.panel-collapse>.table caption,.panel>.table caption,.panel>.table-responsive>.table caption{padding-left:15px;padding-right:15px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child{border-top-left-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child{border-top-right-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:3px}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive,.panel>.table+.panel-body,.panel>.table-responsive+.panel-body{border-top:1px solid #ddd}.panel>.table>tbody:first-child>tr:first-child td,.panel>.table>tbody:first-child>tr:first-child th{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.panel>.table-responsive{border:0;margin-bottom:0}.panel-group{margin-bottom:21px}.panel-group .panel{margin-bottom:0;border-radius:4px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #ddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ddd}.panel-default{border-color:#ddd}.panel-default>.panel-heading{color:#333;background-color:#f5f5f5;border-color:#ddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ddd}.panel-primary{border-color:#337ab7}.panel-primary>.panel-heading{color:#fff;background-color:#337ab7;border-color:#337ab7}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#337ab7}.panel-primary>.panel-heading .badge{color:#337ab7;background-color:#fff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#337ab7}.panel-success{border-color:#d6e9c6}.panel-success>.panel-heading{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#d6e9c6}.panel-success>.panel-heading .badge{color:#dff0d8;background-color:#3c763d}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#d6e9c6}.panel-info{border-color:#bce8f1}.panel-info>.panel-heading{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#bce8f1}.panel-info>.panel-heading .badge{color:#d9edf7;background-color:#31708f}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#bce8f1}.panel-warning{border-color:#faebcc}.panel-warning>.panel-heading{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#faebcc}.panel-warning>.panel-heading .badge{color:#fcf8e3;background-color:#8a6d3b}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#faebcc}.panel-danger{border-color:#ebccd1}.panel-danger>.panel-heading{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ebccd1}.panel-danger>.panel-heading .badge{color:#f2dede;background-color:#a94442}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ebccd1}.close{font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.2;filter:alpha(opacity=20)}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.5;filter:alpha(opacity=50)}button.close{padding:0;background:0 0;border:0;-webkit-appearance:none}.modal{display:none;position:fixed;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal-footer:after,.modal-footer:before,.modal-header:after,.modal-header:before{display:table;content:" "}.modal.fade .modal-dialog{-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);-o-transform:translate(0,-25%);transform:translate(0,-25%);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);background-clip:padding-box;outline:0}.modal-backdrop{position:fixed;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.5}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;font-family:"Helvetica Neue",Helvetica,Arial,"Pingfang SC","Microsoft Yahei",Sans-serif;font-weight:400;letter-spacing:normal;line-break:auto;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;word-wrap:normal;font-size:12px;opacity:0;filter:alpha(opacity=0)}.fa-fw,.fa-li,.tooltip-inner{text-align:center}.u-textNoWrap,.u-textTruncate{white-space:nowrap!important}.tooltip.in{opacity:.9;filter:alpha(opacity=90)}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;background-color:#000;border-radius:4px}.u-inlineBlock,img{max-width:100%}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow,.tooltip.top-left .tooltip-arrow,.tooltip.top-right .tooltip-arrow{border-width:5px 5px 0;border-top-color:#000;bottom:0}.tooltip.top .tooltip-arrow{left:50%;margin-left:-5px}.tooltip.top-left .tooltip-arrow{right:5px;margin-bottom:-5px}.tooltip.top-right .tooltip-arrow{left:5px;margin-bottom:-5px}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow,.tooltip.bottom-left .tooltip-arrow,.tooltip.bottom-right .tooltip-arrow{top:0;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom .tooltip-arrow{left:50%;margin-left:-5px}.tooltip.bottom-left .tooltip-arrow{right:5px;margin-top:-5px}.tooltip.bottom-right .tooltip-arrow{left:5px;margin-top:-5px}.clearfix:after,.clearfix:before{content:" ";display:table}.center-block{display:block;margin-left:auto;margin-right:auto}.fa.fa-pull-left,.fa.pull-left{margin-right:.3em}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.hidden,.visible-lg,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-sm,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs,.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block{display:none!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.affix{position:fixed}@-ms-viewport{width:device-width}@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table!important}tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}.visible-xs-block{display:block!important}.visible-xs-inline{display:inline!important}.visible-xs-inline-block{display:inline-block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table!important}tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}.visible-sm-block{display:block!important}.visible-sm-inline{display:inline!important}.visible-sm-inline-block{display:inline-block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table!important}tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}.visible-md-block{display:block!important}.visible-md-inline{display:inline!important}.visible-md-inline-block{display:inline-block!important}}@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table!important}tr.visible-lg{display:table-row!important}td.visible-lg,th.visible-lg{display:table-cell!important}.visible-lg-block{display:block!important}.visible-lg-inline{display:inline!important}.visible-lg-inline-block{display:inline-block!important}.hidden-lg{display:none!important}}@media (max-width:767px){.hidden-xs{display:none!important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:block!important}table.visible-print{display:table!important}tr.visible-print{display:table-row!important}td.visible-print,th.visible-print{display:table-cell!important}}.visible-print-block{display:none!important}@media print{.visible-print-block{display:block!important}}.visible-print-inline{display:none!important}@media print{.visible-print-inline{display:inline!important}}.visible-print-inline-block{display:none!important}@media print{.visible-print-inline-block{display:inline-block!important}.hidden-print{display:none!important}}.fa,.fa-stack{display:inline-block}@font-face{font-family:FontAwesome;src:url(../../fontawesome/fonts/fontawesome-webfont.eot?v=4.7.0);src:url(../../fontawesome/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0) format("embedded-opentype"),url(../../fontawesome/fonts/fontawesome-webfont.woff2?v=4.7.0) format("woff2"),url(../../fontawesome/fonts/fontawesome-webfont.woff?v=4.7.0) format("woff"),url(../../fontawesome/fonts/fontawesome-webfont.ttf?v=4.7.0) format("truetype"),url(../../fontawesome/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular) format("svg");font-weight:400;font-style:normal}.fa{font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571em}.fa-ul{padding-left:0;margin-left:2.14286em;list-style-type:none}.fa.fa-pull-right,.fa.pull-right{margin-left:.3em}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14286em;width:2.14286em;top:.14286em}.fa-li.fa-lg{left:-1.85714em}.fa-border{padding:.2em .25em .15em;border:.08em solid #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";-webkit-transform:scale(-1,1);-ms-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-ms-filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";-webkit-transform:scale(1,-1);-ms-transform:scale(1,-1);transform:scale(1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{filter:none}.fa-stack{position:relative;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\uF000"}.fa-music:before{content:"\uF001"}.fa-search:before{content:"\uF002"}.fa-envelope-o:before{content:"\uF003"}.fa-heart:before{content:"\uF004"}.fa-star:before{content:"\uF005"}.fa-star-o:before{content:"\uF006"}.fa-user:before{content:"\uF007"}.fa-film:before{content:"\uF008"}.fa-th-large:before{content:"\uF009"}.fa-th:before{content:"\uF00A"}.fa-th-list:before{content:"\uF00B"}.fa-check:before{content:"\uF00C"}.fa-close:before,.fa-remove:before,.fa-times:before{content:"\uF00D"}.fa-search-plus:before{content:"\uF00E"}.fa-search-minus:before{content:"\uF010"}.fa-power-off:before{content:"\uF011"}.fa-signal:before{content:"\uF012"}.fa-cog:before,.fa-gear:before{content:"\uF013"}.fa-trash-o:before{content:"\uF014"}.fa-home:before{content:"\uF015"}.fa-file-o:before{content:"\uF016"}.fa-clock-o:before{content:"\uF017"}.fa-road:before{content:"\uF018"}.fa-download:before{content:"\uF019"}.fa-arrow-circle-o-down:before{content:"\uF01A"}.fa-arrow-circle-o-up:before{content:"\uF01B"}.fa-inbox:before{content:"\uF01C"}.fa-play-circle-o:before{content:"\uF01D"}.fa-repeat:before,.fa-rotate-right:before{content:"\uF01E"}.fa-refresh:before{content:"\uF021"}.fa-list-alt:before{content:"\uF022"}.fa-lock:before{content:"\uF023"}.fa-flag:before{content:"\uF024"}.fa-headphones:before{content:"\uF025"}.fa-volume-off:before{content:"\uF026"}.fa-volume-down:before{content:"\uF027"}.fa-volume-up:before{content:"\uF028"}.fa-qrcode:before{content:"\uF029"}.fa-barcode:before{content:"\uF02A"}.fa-tag:before{content:"\uF02B"}.fa-tags:before{content:"\uF02C"}.fa-book:before{content:"\uF02D"}.fa-bookmark:before{content:"\uF02E"}.fa-print:before{content:"\uF02F"}.fa-camera:before{content:"\uF030"}.fa-font:before{content:"\uF031"}.fa-bold:before{content:"\uF032"}.fa-italic:before{content:"\uF033"}.fa-text-height:before{content:"\uF034"}.fa-text-width:before{content:"\uF035"}.fa-align-left:before{content:"\uF036"}.fa-align-center:before{content:"\uF037"}.fa-align-right:before{content:"\uF038"}.fa-align-justify:before{content:"\uF039"}.fa-list:before{content:"\uF03A"}.fa-dedent:before,.fa-outdent:before{content:"\uF03B"}.fa-indent:before{content:"\uF03C"}.fa-video-camera:before{content:"\uF03D"}.fa-image:before,.fa-photo:before,.fa-picture-o:before{content:"\uF03E"}.fa-pencil:before{content:"\uF040"}.fa-map-marker:before{content:"\uF041"}.fa-adjust:before{content:"\uF042"}.fa-tint:before{content:"\uF043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\uF044"}.fa-share-square-o:before{content:"\uF045"}.fa-check-square-o:before{content:"\uF046"}.fa-arrows:before{content:"\uF047"}.fa-step-backward:before{content:"\uF048"}.fa-fast-backward:before{content:"\uF049"}.fa-backward:before{content:"\uF04A"}.fa-play:before{content:"\uF04B"}.fa-pause:before{content:"\uF04C"}.fa-stop:before{content:"\uF04D"}.fa-forward:before{content:"\uF04E"}.fa-fast-forward:before{content:"\uF050"}.fa-step-forward:before{content:"\uF051"}.fa-eject:before{content:"\uF052"}.fa-chevron-left:before{content:"\uF053"}.fa-chevron-right:before{content:"\uF054"}.fa-plus-circle:before{content:"\uF055"}.fa-minus-circle:before{content:"\uF056"}.fa-times-circle:before{content:"\uF057"}.fa-check-circle:before{content:"\uF058"}.fa-question-circle:before{content:"\uF059"}.fa-info-circle:before{content:"\uF05A"}.fa-crosshairs:before{content:"\uF05B"}.fa-times-circle-o:before{content:"\uF05C"}.fa-check-circle-o:before{content:"\uF05D"}.fa-ban:before{content:"\uF05E"}.fa-arrow-left:before{content:"\uF060"}.fa-arrow-right:before{content:"\uF061"}.fa-arrow-up:before{content:"\uF062"}.fa-arrow-down:before{content:"\uF063"}.fa-mail-forward:before,.fa-share:before{content:"\uF064"}.fa-expand:before{content:"\uF065"}.fa-compress:before{content:"\uF066"}.fa-plus:before{content:"\uF067"}.fa-minus:before{content:"\uF068"}.fa-asterisk:before{content:"\uF069"}.fa-exclamation-circle:before{content:"\uF06A"}.fa-gift:before{content:"\uF06B"}.fa-leaf:before{content:"\uF06C"}.fa-fire:before{content:"\uF06D"}.fa-eye:before{content:"\uF06E"}.fa-eye-slash:before{content:"\uF070"}.fa-exclamation-triangle:before,.fa-warning:before{content:"\uF071"}.fa-plane:before{content:"\uF072"}.fa-calendar:before{content:"\uF073"}.fa-random:before{content:"\uF074"}.fa-comment:before{content:"\uF075"}.fa-magnet:before{content:"\uF076"}.fa-chevron-up:before{content:"\uF077"}.fa-chevron-down:before{content:"\uF078"}.fa-retweet:before{content:"\uF079"}.fa-shopping-cart:before{content:"\uF07A"}.fa-folder:before{content:"\uF07B"}.fa-folder-open:before{content:"\uF07C"}.fa-arrows-v:before{content:"\uF07D"}.fa-arrows-h:before{content:"\uF07E"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\uF080"}.fa-twitter-square:before{content:"\uF081"}.fa-facebook-square:before{content:"\uF082"}.fa-camera-retro:before{content:"\uF083"}.fa-key:before{content:"\uF084"}.fa-cogs:before,.fa-gears:before{content:"\uF085"}.fa-comments:before{content:"\uF086"}.fa-thumbs-o-up:before{content:"\uF087"}.fa-thumbs-o-down:before{content:"\uF088"}.fa-star-half:before{content:"\uF089"}.fa-heart-o:before{content:"\uF08A"}.fa-sign-out:before{content:"\uF08B"}.fa-linkedin-square:before{content:"\uF08C"}.fa-thumb-tack:before{content:"\uF08D"}.fa-external-link:before{content:"\uF08E"}.fa-sign-in:before{content:"\uF090"}.fa-trophy:before{content:"\uF091"}.fa-github-square:before{content:"\uF092"}.fa-upload:before{content:"\uF093"}.fa-lemon-o:before{content:"\uF094"}.fa-phone:before{content:"\uF095"}.fa-square-o:before{content:"\uF096"}.fa-bookmark-o:before{content:"\uF097"}.fa-phone-square:before{content:"\uF098"}.fa-twitter:before{content:"\uF099"}.fa-facebook-f:before,.fa-facebook:before{content:"\uF09A"}.fa-github:before{content:"\uF09B"}.fa-unlock:before{content:"\uF09C"}.fa-credit-card:before{content:"\uF09D"}.fa-feed:before,.fa-rss:before{content:"\uF09E"}.fa-hdd-o:before{content:"\uF0A0"}.fa-bullhorn:before{content:"\uF0A1"}.fa-bell:before{content:"\uF0F3"}.fa-certificate:before{content:"\uF0A3"}.fa-hand-o-right:before{content:"\uF0A4"}.fa-hand-o-left:before{content:"\uF0A5"}.fa-hand-o-up:before{content:"\uF0A6"}.fa-hand-o-down:before{content:"\uF0A7"}.fa-arrow-circle-left:before{content:"\uF0A8"}.fa-arrow-circle-right:before{content:"\uF0A9"}.fa-arrow-circle-up:before{content:"\uF0AA"}.fa-arrow-circle-down:before{content:"\uF0AB"}.fa-globe:before{content:"\uF0AC"}.fa-wrench:before{content:"\uF0AD"}.fa-tasks:before{content:"\uF0AE"}.fa-filter:before{content:"\uF0B0"}.fa-briefcase:before{content:"\uF0B1"}.fa-arrows-alt:before{content:"\uF0B2"}.fa-group:before,.fa-users:before{content:"\uF0C0"}.fa-chain:before,.fa-link:before{content:"\uF0C1"}.fa-cloud:before{content:"\uF0C2"}.fa-flask:before{content:"\uF0C3"}.fa-cut:before,.fa-scissors:before{content:"\uF0C4"}.fa-copy:before,.fa-files-o:before{content:"\uF0C5"}.fa-paperclip:before{content:"\uF0C6"}.fa-floppy-o:before,.fa-save:before{content:"\uF0C7"}.fa-square:before{content:"\uF0C8"}.fa-bars:before,.fa-navicon:before,.fa-reorder:before{content:"\uF0C9"}.fa-list-ul:before{content:"\uF0CA"}.fa-list-ol:before{content:"\uF0CB"}.fa-strikethrough:before{content:"\uF0CC"}.fa-underline:before{content:"\uF0CD"}.fa-table:before{content:"\uF0CE"}.fa-magic:before{content:"\uF0D0"}.fa-truck:before{content:"\uF0D1"}.fa-pinterest:before{content:"\uF0D2"}.fa-pinterest-square:before{content:"\uF0D3"}.fa-google-plus-square:before{content:"\uF0D4"}.fa-google-plus:before{content:"\uF0D5"}.fa-money:before{content:"\uF0D6"}.fa-caret-down:before{content:"\uF0D7"}.fa-caret-up:before{content:"\uF0D8"}.fa-caret-left:before{content:"\uF0D9"}.fa-caret-right:before{content:"\uF0DA"}.fa-columns:before{content:"\uF0DB"}.fa-sort:before,.fa-unsorted:before{content:"\uF0DC"}.fa-sort-desc:before,.fa-sort-down:before{content:"\uF0DD"}.fa-sort-asc:before,.fa-sort-up:before{content:"\uF0DE"}.fa-envelope:before{content:"\uF0E0"}.fa-linkedin:before{content:"\uF0E1"}.fa-rotate-left:before,.fa-undo:before{content:"\uF0E2"}.fa-gavel:before,.fa-legal:before{content:"\uF0E3"}.fa-dashboard:before,.fa-tachometer:before{content:"\uF0E4"}.fa-comment-o:before{content:"\uF0E5"}.fa-comments-o:before{content:"\uF0E6"}.fa-bolt:before,.fa-flash:before{content:"\uF0E7"}.fa-sitemap:before{content:"\uF0E8"}.fa-umbrella:before{content:"\uF0E9"}.fa-clipboard:before,.fa-paste:before{content:"\uF0EA"}.fa-lightbulb-o:before{content:"\uF0EB"}.fa-exchange:before{content:"\uF0EC"}.fa-cloud-download:before{content:"\uF0ED"}.fa-cloud-upload:before{content:"\uF0EE"}.fa-user-md:before{content:"\uF0F0"}.fa-stethoscope:before{content:"\uF0F1"}.fa-suitcase:before{content:"\uF0F2"}.fa-bell-o:before{content:"\uF0A2"}.fa-coffee:before{content:"\uF0F4"}.fa-cutlery:before{content:"\uF0F5"}.fa-file-text-o:before{content:"\uF0F6"}.fa-building-o:before{content:"\uF0F7"}.fa-hospital-o:before{content:"\uF0F8"}.fa-ambulance:before{content:"\uF0F9"}.fa-medkit:before{content:"\uF0FA"}.fa-fighter-jet:before{content:"\uF0FB"}.fa-beer:before{content:"\uF0FC"}.fa-h-square:before{content:"\uF0FD"}.fa-plus-square:before{content:"\uF0FE"}.fa-angle-double-left:before{content:"\uF100"}.fa-angle-double-right:before{content:"\uF101"}.fa-angle-double-up:before{content:"\uF102"}.fa-angle-double-down:before{content:"\uF103"}.fa-angle-left:before{content:"\uF104"}.fa-angle-right:before{content:"\uF105"}.fa-angle-up:before{content:"\uF106"}.fa-angle-down:before{content:"\uF107"}.fa-desktop:before{content:"\uF108"}.fa-laptop:before{content:"\uF109"}.fa-tablet:before{content:"\uF10A"}.fa-mobile-phone:before,.fa-mobile:before{content:"\uF10B"}.fa-circle-o:before{content:"\uF10C"}.fa-quote-left:before{content:"\uF10D"}.fa-quote-right:before{content:"\uF10E"}.fa-spinner:before{content:"\uF110"}.fa-circle:before{content:"\uF111"}.fa-mail-reply:before,.fa-reply:before{content:"\uF112"}.fa-github-alt:before{content:"\uF113"}.fa-folder-o:before{content:"\uF114"}.fa-folder-open-o:before{content:"\uF115"}.fa-smile-o:before{content:"\uF118"}.fa-frown-o:before{content:"\uF119"}.fa-meh-o:before{content:"\uF11A"}.fa-gamepad:before{content:"\uF11B"}.fa-keyboard-o:before{content:"\uF11C"}.fa-flag-o:before{content:"\uF11D"}.fa-flag-checkered:before{content:"\uF11E"}.fa-terminal:before{content:"\uF120"}.fa-code:before{content:"\uF121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\uF122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\uF123"}.fa-location-arrow:before{content:"\uF124"}.fa-crop:before{content:"\uF125"}.fa-code-fork:before{content:"\uF126"}.fa-chain-broken:before,.fa-unlink:before{content:"\uF127"}.fa-question:before{content:"\uF128"}.fa-info:before{content:"\uF129"}.fa-exclamation:before{content:"\uF12A"}.fa-superscript:before{content:"\uF12B"}.fa-subscript:before{content:"\uF12C"}.fa-eraser:before{content:"\uF12D"}.fa-puzzle-piece:before{content:"\uF12E"}.fa-microphone:before{content:"\uF130"}.fa-microphone-slash:before{content:"\uF131"}.fa-shield:before{content:"\uF132"}.fa-calendar-o:before{content:"\uF133"}.fa-fire-extinguisher:before{content:"\uF134"}.fa-rocket:before{content:"\uF135"}.fa-maxcdn:before{content:"\uF136"}.fa-chevron-circle-left:before{content:"\uF137"}.fa-chevron-circle-right:before{content:"\uF138"}.fa-chevron-circle-up:before{content:"\uF139"}.fa-chevron-circle-down:before{content:"\uF13A"}.fa-html5:before{content:"\uF13B"}.fa-css3:before{content:"\uF13C"}.fa-anchor:before{content:"\uF13D"}.fa-unlock-alt:before{content:"\uF13E"}.fa-bullseye:before{content:"\uF140"}.fa-ellipsis-h:before{content:"\uF141"}.fa-ellipsis-v:before{content:"\uF142"}.fa-rss-square:before{content:"\uF143"}.fa-play-circle:before{content:"\uF144"}.fa-ticket:before{content:"\uF145"}.fa-minus-square:before{content:"\uF146"}.fa-minus-square-o:before{content:"\uF147"}.fa-level-up:before{content:"\uF148"}.fa-level-down:before{content:"\uF149"}.fa-check-square:before{content:"\uF14A"}.fa-pencil-square:before{content:"\uF14B"}.fa-external-link-square:before{content:"\uF14C"}.fa-share-square:before{content:"\uF14D"}.fa-compass:before{content:"\uF14E"}.fa-caret-square-o-down:before,.fa-toggle-down:before{content:"\uF150"}.fa-caret-square-o-up:before,.fa-toggle-up:before{content:"\uF151"}.fa-caret-square-o-right:before,.fa-toggle-right:before{content:"\uF152"}.fa-eur:before,.fa-euro:before{content:"\uF153"}.fa-gbp:before{content:"\uF154"}.fa-dollar:before,.fa-usd:before{content:"\uF155"}.fa-inr:before,.fa-rupee:before{content:"\uF156"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen:before{content:"\uF157"}.fa-rouble:before,.fa-rub:before,.fa-ruble:before{content:"\uF158"}.fa-krw:before,.fa-won:before{content:"\uF159"}.fa-bitcoin:before,.fa-btc:before{content:"\uF15A"}.fa-file:before{content:"\uF15B"}.fa-file-text:before{content:"\uF15C"}.fa-sort-alpha-asc:before{content:"\uF15D"}.fa-sort-alpha-desc:before{content:"\uF15E"}.fa-sort-amount-asc:before{content:"\uF160"}.fa-sort-amount-desc:before{content:"\uF161"}.fa-sort-numeric-asc:before{content:"\uF162"}.fa-sort-numeric-desc:before{content:"\uF163"}.fa-thumbs-up:before{content:"\uF164"}.fa-thumbs-down:before{content:"\uF165"}.fa-youtube-square:before{content:"\uF166"}.fa-youtube:before{content:"\uF167"}.fa-xing:before{content:"\uF168"}.fa-xing-square:before{content:"\uF169"}.fa-youtube-play:before{content:"\uF16A"}.fa-dropbox:before{content:"\uF16B"}.fa-stack-overflow:before{content:"\uF16C"}.fa-instagram:before{content:"\uF16D"}.fa-flickr:before{content:"\uF16E"}.fa-adn:before{content:"\uF170"}.fa-bitbucket:before{content:"\uF171"}.fa-bitbucket-square:before{content:"\uF172"}.fa-tumblr:before{content:"\uF173"}.fa-tumblr-square:before{content:"\uF174"}.fa-long-arrow-down:before{content:"\uF175"}.fa-long-arrow-up:before{content:"\uF176"}.fa-long-arrow-left:before{content:"\uF177"}.fa-long-arrow-right:before{content:"\uF178"}.fa-apple:before{content:"\uF179"}.fa-windows:before{content:"\uF17A"}.fa-android:before{content:"\uF17B"}.fa-linux:before{content:"\uF17C"}.fa-dribbble:before{content:"\uF17D"}.fa-skype:before{content:"\uF17E"}.fa-foursquare:before{content:"\uF180"}.fa-trello:before{content:"\uF181"}.fa-female:before{content:"\uF182"}.fa-male:before{content:"\uF183"}.fa-gittip:before,.fa-gratipay:before{content:"\uF184"}.fa-sun-o:before{content:"\uF185"}.fa-moon-o:before{content:"\uF186"}.fa-archive:before{content:"\uF187"}.fa-bug:before{content:"\uF188"}.fa-vk:before{content:"\uF189"}.fa-weibo:before{content:"\uF18A"}.fa-renren:before{content:"\uF18B"}.fa-pagelines:before{content:"\uF18C"}.fa-stack-exchange:before{content:"\uF18D"}.fa-arrow-circle-o-right:before{content:"\uF18E"}.fa-arrow-circle-o-left:before{content:"\uF190"}.fa-caret-square-o-left:before,.fa-toggle-left:before{content:"\uF191"}.fa-dot-circle-o:before{content:"\uF192"}.fa-wheelchair:before{content:"\uF193"}.fa-vimeo-square:before{content:"\uF194"}.fa-try:before,.fa-turkish-lira:before{content:"\uF195"}.fa-plus-square-o:before{content:"\uF196"}.fa-space-shuttle:before{content:"\uF197"}.fa-slack:before{content:"\uF198"}.fa-envelope-square:before{content:"\uF199"}.fa-wordpress:before{content:"\uF19A"}.fa-openid:before{content:"\uF19B"}.fa-bank:before,.fa-institution:before,.fa-university:before{content:"\uF19C"}.fa-graduation-cap:before,.fa-mortar-board:before{content:"\uF19D"}.fa-yahoo:before{content:"\uF19E"}.fa-google:before{content:"\uF1A0"}.fa-reddit:before{content:"\uF1A1"}.fa-reddit-square:before{content:"\uF1A2"}.fa-stumbleupon-circle:before{content:"\uF1A3"}.fa-stumbleupon:before{content:"\uF1A4"}.fa-delicious:before{content:"\uF1A5"}.fa-digg:before{content:"\uF1A6"}.fa-pied-piper-pp:before{content:"\uF1A7"}.fa-pied-piper-alt:before{content:"\uF1A8"}.fa-drupal:before{content:"\uF1A9"}.fa-joomla:before{content:"\uF1AA"}.fa-language:before{content:"\uF1AB"}.fa-fax:before{content:"\uF1AC"}.fa-building:before{content:"\uF1AD"}.fa-child:before{content:"\uF1AE"}.fa-paw:before{content:"\uF1B0"}.fa-spoon:before{content:"\uF1B1"}.fa-cube:before{content:"\uF1B2"}.fa-cubes:before{content:"\uF1B3"}.fa-behance:before{content:"\uF1B4"}.fa-behance-square:before{content:"\uF1B5"}.fa-steam:before{content:"\uF1B6"}.fa-steam-square:before{content:"\uF1B7"}.fa-recycle:before{content:"\uF1B8"}.fa-automobile:before,.fa-car:before{content:"\uF1B9"}.fa-cab:before,.fa-taxi:before{content:"\uF1BA"}.fa-tree:before{content:"\uF1BB"}.fa-spotify:before{content:"\uF1BC"}.fa-deviantart:before{content:"\uF1BD"}.fa-soundcloud:before{content:"\uF1BE"}.fa-database:before{content:"\uF1C0"}.fa-file-pdf-o:before{content:"\uF1C1"}.fa-file-word-o:before{content:"\uF1C2"}.fa-file-excel-o:before{content:"\uF1C3"}.fa-file-powerpoint-o:before{content:"\uF1C4"}.fa-file-image-o:before,.fa-file-photo-o:before,.fa-file-picture-o:before{content:"\uF1C5"}.fa-file-archive-o:before,.fa-file-zip-o:before{content:"\uF1C6"}.fa-file-audio-o:before,.fa-file-sound-o:before{content:"\uF1C7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\uF1C8"}.fa-file-code-o:before{content:"\uF1C9"}.fa-vine:before{content:"\uF1CA"}.fa-codepen:before{content:"\uF1CB"}.fa-jsfiddle:before{content:"\uF1CC"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-ring:before,.fa-life-saver:before,.fa-support:before{content:"\uF1CD"}.fa-circle-o-notch:before{content:"\uF1CE"}.fa-ra:before,.fa-rebel:before,.fa-resistance:before{content:"\uF1D0"}.fa-empire:before,.fa-ge:before{content:"\uF1D1"}.fa-git-square:before{content:"\uF1D2"}.fa-git:before{content:"\uF1D3"}.fa-hacker-news:before,.fa-y-combinator-square:before,.fa-yc-square:before{content:"\uF1D4"}.fa-tencent-weibo:before{content:"\uF1D5"}.fa-qq:before{content:"\uF1D6"}.fa-wechat:before,.fa-weixin:before{content:"\uF1D7"}.fa-paper-plane:before,.fa-send:before{content:"\uF1D8"}.fa-paper-plane-o:before,.fa-send-o:before{content:"\uF1D9"}.fa-history:before{content:"\uF1DA"}.fa-circle-thin:before{content:"\uF1DB"}.fa-header:before{content:"\uF1DC"}.fa-paragraph:before{content:"\uF1DD"}.fa-sliders:before{content:"\uF1DE"}.fa-share-alt:before{content:"\uF1E0"}.fa-share-alt-square:before{content:"\uF1E1"}.fa-bomb:before{content:"\uF1E2"}.fa-futbol-o:before,.fa-soccer-ball-o:before{content:"\uF1E3"}.fa-tty:before{content:"\uF1E4"}.fa-binoculars:before{content:"\uF1E5"}.fa-plug:before{content:"\uF1E6"}.fa-slideshare:before{content:"\uF1E7"}.fa-twitch:before{content:"\uF1E8"}.fa-yelp:before{content:"\uF1E9"}.fa-newspaper-o:before{content:"\uF1EA"}.fa-wifi:before{content:"\uF1EB"}.fa-calculator:before{content:"\uF1EC"}.fa-paypal:before{content:"\uF1ED"}.fa-google-wallet:before{content:"\uF1EE"}.fa-cc-visa:before{content:"\uF1F0"}.fa-cc-mastercard:before{content:"\uF1F1"}.fa-cc-discover:before{content:"\uF1F2"}.fa-cc-amex:before{content:"\uF1F3"}.fa-cc-paypal:before{content:"\uF1F4"}.fa-cc-stripe:before{content:"\uF1F5"}.fa-bell-slash:before{content:"\uF1F6"}.fa-bell-slash-o:before{content:"\uF1F7"}.fa-trash:before{content:"\uF1F8"}.fa-copyright:before{content:"\uF1F9"}.fa-at:before{content:"\uF1FA"}.fa-eyedropper:before{content:"\uF1FB"}.fa-paint-brush:before{content:"\uF1FC"}.fa-birthday-cake:before{content:"\uF1FD"}.fa-area-chart:before{content:"\uF1FE"}.fa-pie-chart:before{content:"\uF200"}.fa-line-chart:before{content:"\uF201"}.fa-lastfm:before{content:"\uF202"}.fa-lastfm-square:before{content:"\uF203"}.fa-toggle-off:before{content:"\uF204"}.fa-toggle-on:before{content:"\uF205"}.fa-bicycle:before{content:"\uF206"}.fa-bus:before{content:"\uF207"}.fa-ioxhost:before{content:"\uF208"}.fa-angellist:before{content:"\uF209"}.fa-cc:before{content:"\uF20A"}.fa-ils:before,.fa-shekel:before,.fa-sheqel:before{content:"\uF20B"}.fa-meanpath:before{content:"\uF20C"}.fa-buysellads:before{content:"\uF20D"}.fa-connectdevelop:before{content:"\uF20E"}.fa-dashcube:before{content:"\uF210"}.fa-forumbee:before{content:"\uF211"}.fa-leanpub:before{content:"\uF212"}.fa-sellsy:before{content:"\uF213"}.fa-shirtsinbulk:before{content:"\uF214"}.fa-simplybuilt:before{content:"\uF215"}.fa-skyatlas:before{content:"\uF216"}.fa-cart-plus:before{content:"\uF217"}.fa-cart-arrow-down:before{content:"\uF218"}.fa-diamond:before{content:"\uF219"}.fa-ship:before{content:"\uF21A"}.fa-user-secret:before{content:"\uF21B"}.fa-motorcycle:before{content:"\uF21C"}.fa-street-view:before{content:"\uF21D"}.fa-heartbeat:before{content:"\uF21E"}.fa-venus:before{content:"\uF221"}.fa-mars:before{content:"\uF222"}.fa-mercury:before{content:"\uF223"}.fa-intersex:before,.fa-transgender:before{content:"\uF224"}.fa-transgender-alt:before{content:"\uF225"}.fa-venus-double:before{content:"\uF226"}.fa-mars-double:before{content:"\uF227"}.fa-venus-mars:before{content:"\uF228"}.fa-mars-stroke:before{content:"\uF229"}.fa-mars-stroke-v:before{content:"\uF22A"}.fa-mars-stroke-h:before{content:"\uF22B"}.fa-neuter:before{content:"\uF22C"}.fa-genderless:before{content:"\uF22D"}.fa-facebook-official:before{content:"\uF230"}.fa-pinterest-p:before{content:"\uF231"}.fa-whatsapp:before{content:"\uF232"}.fa-server:before{content:"\uF233"}.fa-user-plus:before{content:"\uF234"}.fa-user-times:before{content:"\uF235"}.fa-bed:before,.fa-hotel:before{content:"\uF236"}.fa-viacoin:before{content:"\uF237"}.fa-train:before{content:"\uF238"}.fa-subway:before{content:"\uF239"}.fa-medium:before{content:"\uF23A"}.fa-y-combinator:before,.fa-yc:before{content:"\uF23B"}.fa-optin-monster:before{content:"\uF23C"}.fa-opencart:before{content:"\uF23D"}.fa-expeditedssl:before{content:"\uF23E"}.fa-battery-4:before,.fa-battery-full:before,.fa-battery:before{content:"\uF240"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:"\uF241"}.fa-battery-2:before,.fa-battery-half:before{content:"\uF242"}.fa-battery-1:before,.fa-battery-quarter:before{content:"\uF243"}.fa-battery-0:before,.fa-battery-empty:before{content:"\uF244"}.fa-mouse-pointer:before{content:"\uF245"}.fa-i-cursor:before{content:"\uF246"}.fa-object-group:before{content:"\uF247"}.fa-object-ungroup:before{content:"\uF248"}.fa-sticky-note:before{content:"\uF249"}.fa-sticky-note-o:before{content:"\uF24A"}.fa-cc-jcb:before{content:"\uF24B"}.fa-cc-diners-club:before{content:"\uF24C"}.fa-clone:before{content:"\uF24D"}.fa-balance-scale:before{content:"\uF24E"}.fa-hourglass-o:before{content:"\uF250"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:"\uF251"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:"\uF252"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:"\uF253"}.fa-hourglass:before{content:"\uF254"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:"\uF255"}.fa-hand-paper-o:before,.fa-hand-stop-o:before{content:"\uF256"}.fa-hand-scissors-o:before{content:"\uF257"}.fa-hand-lizard-o:before{content:"\uF258"}.fa-hand-spock-o:before{content:"\uF259"}.fa-hand-pointer-o:before{content:"\uF25A"}.fa-hand-peace-o:before{content:"\uF25B"}.fa-trademark:before{content:"\uF25C"}.fa-registered:before{content:"\uF25D"}.fa-creative-commons:before{content:"\uF25E"}.fa-gg:before{content:"\uF260"}.fa-gg-circle:before{content:"\uF261"}.fa-tripadvisor:before{content:"\uF262"}.fa-odnoklassniki:before{content:"\uF263"}.fa-odnoklassniki-square:before{content:"\uF264"}.fa-get-pocket:before{content:"\uF265"}.fa-wikipedia-w:before{content:"\uF266"}.fa-safari:before{content:"\uF267"}.fa-chrome:before{content:"\uF268"}.fa-firefox:before{content:"\uF269"}.fa-opera:before{content:"\uF26A"}.fa-internet-explorer:before{content:"\uF26B"}.fa-television:before,.fa-tv:before{content:"\uF26C"}.fa-contao:before{content:"\uF26D"}.fa-500px:before{content:"\uF26E"}.fa-amazon:before{content:"\uF270"}.fa-calendar-plus-o:before{content:"\uF271"}.fa-calendar-minus-o:before{content:"\uF272"}.fa-calendar-times-o:before{content:"\uF273"}.fa-calendar-check-o:before{content:"\uF274"}.fa-industry:before{content:"\uF275"}.fa-map-pin:before{content:"\uF276"}.fa-map-signs:before{content:"\uF277"}.fa-map-o:before{content:"\uF278"}.fa-map:before{content:"\uF279"}.fa-commenting:before{content:"\uF27A"}.fa-commenting-o:before{content:"\uF27B"}.fa-houzz:before{content:"\uF27C"}.fa-vimeo:before{content:"\uF27D"}.fa-black-tie:before{content:"\uF27E"}.fa-fonticons:before{content:"\uF280"}.fa-reddit-alien:before{content:"\uF281"}.fa-edge:before{content:"\uF282"}.fa-credit-card-alt:before{content:"\uF283"}.fa-codiepie:before{content:"\uF284"}.fa-modx:before{content:"\uF285"}.fa-fort-awesome:before{content:"\uF286"}.fa-usb:before{content:"\uF287"}.fa-product-hunt:before{content:"\uF288"}.fa-mixcloud:before{content:"\uF289"}.fa-scribd:before{content:"\uF28A"}.fa-pause-circle:before{content:"\uF28B"}.fa-pause-circle-o:before{content:"\uF28C"}.fa-stop-circle:before{content:"\uF28D"}.fa-stop-circle-o:before{content:"\uF28E"}.fa-shopping-bag:before{content:"\uF290"}.fa-shopping-basket:before{content:"\uF291"}.fa-hashtag:before{content:"\uF292"}.fa-bluetooth:before{content:"\uF293"}.fa-bluetooth-b:before{content:"\uF294"}.fa-percent:before{content:"\uF295"}.fa-gitlab:before{content:"\uF296"}.fa-wpbeginner:before{content:"\uF297"}.fa-wpforms:before{content:"\uF298"}.fa-envira:before{content:"\uF299"}.fa-universal-access:before{content:"\uF29A"}.fa-wheelchair-alt:before{content:"\uF29B"}.fa-question-circle-o:before{content:"\uF29C"}.fa-blind:before{content:"\uF29D"}.fa-audio-description:before{content:"\uF29E"}.fa-volume-control-phone:before{content:"\uF2A0"}.fa-braille:before{content:"\uF2A1"}.fa-assistive-listening-systems:before{content:"\uF2A2"}.fa-american-sign-language-interpreting:before,.fa-asl-interpreting:before{content:"\uF2A3"}.fa-deaf:before,.fa-deafness:before,.fa-hard-of-hearing:before{content:"\uF2A4"}.fa-glide:before{content:"\uF2A5"}.fa-glide-g:before{content:"\uF2A6"}.fa-sign-language:before,.fa-signing:before{content:"\uF2A7"}.fa-low-vision:before{content:"\uF2A8"}.fa-viadeo:before{content:"\uF2A9"}.fa-viadeo-square:before{content:"\uF2AA"}.fa-snapchat:before{content:"\uF2AB"}.fa-snapchat-ghost:before{content:"\uF2AC"}.fa-snapchat-square:before{content:"\uF2AD"}.fa-pied-piper:before{content:"\uF2AE"}.fa-first-order:before{content:"\uF2B0"}.fa-yoast:before{content:"\uF2B1"}.fa-themeisle:before{content:"\uF2B2"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:"\uF2B3"}.fa-fa:before,.fa-font-awesome:before{content:"\uF2B4"}.fa-handshake-o:before{content:"\uF2B5"}.fa-envelope-open:before{content:"\uF2B6"}.fa-envelope-open-o:before{content:"\uF2B7"}.fa-linode:before{content:"\uF2B8"}.fa-address-book:before{content:"\uF2B9"}.fa-address-book-o:before{content:"\uF2BA"}.fa-address-card:before,.fa-vcard:before{content:"\uF2BB"}.fa-address-card-o:before,.fa-vcard-o:before{content:"\uF2BC"}.fa-user-circle:before{content:"\uF2BD"}.fa-user-circle-o:before{content:"\uF2BE"}.fa-user-o:before{content:"\uF2C0"}.fa-id-badge:before{content:"\uF2C1"}.fa-drivers-license:before,.fa-id-card:before{content:"\uF2C2"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:"\uF2C3"}.fa-quora:before{content:"\uF2C4"}.fa-free-code-camp:before{content:"\uF2C5"}.fa-telegram:before{content:"\uF2C6"}.fa-thermometer-4:before,.fa-thermometer-full:before,.fa-thermometer:before{content:"\uF2C7"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:"\uF2C8"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:"\uF2C9"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:"\uF2CA"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:"\uF2CB"}.fa-shower:before{content:"\uF2CC"}.fa-bath:before,.fa-bathtub:before,.fa-s15:before{content:"\uF2CD"}.fa-podcast:before{content:"\uF2CE"}.fa-window-maximize:before{content:"\uF2D0"}.fa-window-minimize:before{content:"\uF2D1"}.fa-window-restore:before{content:"\uF2D2"}.fa-times-rectangle:before,.fa-window-close:before{content:"\uF2D3"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:"\uF2D4"}.fa-bandcamp:before{content:"\uF2D5"}.fa-grav:before{content:"\uF2D6"}.fa-etsy:before{content:"\uF2D7"}.fa-imdb:before{content:"\uF2D8"}.fa-ravelry:before{content:"\uF2D9"}.fa-eercast:before{content:"\uF2DA"}.fa-microchip:before{content:"\uF2DB"}.fa-snowflake-o:before{content:"\uF2DC"}.fa-superpowers:before{content:"\uF2DD"}.fa-wpexplorer:before{content:"\uF2DE"}.fa-meetup:before{content:"\uF2E0"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.u-hiddenVisually,.u-nbfc,.u-textTruncate{overflow:hidden!important}.u-alignBaseline{vertical-align:baseline!important}.u-alignBottom{vertical-align:bottom!important}.u-alignMiddle{vertical-align:middle!important}.u-alignTop{vertical-align:top!important}.u-block{display:block!important}.u-hidden{display:none!important}.u-hiddenVisually{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;border:0!important;clip:rect(1px,1px,1px,1px)!important}.u-inline{display:inline!important}.u-inlineBlock{display:-moz-inline-stack;display:inline-block;zoom:1}.u-table{display:table!important}.u-tableCell{display:table-cell!important}.u-tableRow{display:table-row!important}.u-cf:after,.u-clearfix:after{content:"";display:table}.u-nbfcAlt{display:table-cell!important;width:10000px!important}.u-floatLeft{float:left!important}.u-floatRight{float:right!important}.u-linkBlock,.u-linkBlock:active,.u-linkBlock:focus,.u-linkBlock:hover,.u-linkClean,.u-linkClean:active,.u-linkClean:focus,.u-linkClean:hover,.u-linkComplex,.u-linkComplex:active,.u-linkComplex:focus,.u-linkComplex:hover{text-decoration:none!important}.u-linkComplex:active .u-linkComplexTarget,.u-linkComplex:focus .u-linkComplexTarget,.u-linkComplex:hover .u-linkComplexTarget{text-decoration:underline!important}.u-linkBlock,.u-linkBlock:active,.u-linkBlock:focus,.u-linkBlock:hover{display:block!important}.u-textBreak{word-wrap:break-word!important}.u-textCenter{text-align:center!important}.u-textLeft{text-align:left!important}.u-textRight{text-align:right!important}.u-textInheritColor{color:inherit!important}.u-textKern{text-rendering:optimizeLegibility;font-feature-settings:"kern" 1;font-kerning:normal}.u-textTruncate{max-width:100%;text-overflow:ellipsis!important;word-wrap:normal!important}.OperationGroup,.Table--slim td,.Table--slim th{white-space:nowrap}:focus{outline:0}body{font-family:"Helvetica Neue",Helvetica,Arial,"Pingfang SC","Microsoft Yahei",Sans-serif;font-size:14px;font-weight:300;line-height:1.5;color:#333}a{color:inherit}a:active,a:focus,a:hover{text-decoration:none}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}ol,ul{margin:0;padding:0;list-style:none inside}.ImageList:not(.u-hidden)+.ImageList:not(.u-hidden){margin-top:15px}.ImageItem{position:relative;text-align:center;background-color:#a6a6a6}.ImageItem,.ImageItem:not(.ImageItem--add)>div{border-radius:6px}.ImageItem.ImageItem--add,.ImageItem:not(.ImageItem--add)>div{position:relative;overflow:hidden}.ImageItem.ImageItem--add:after,.ImageItem:not(.ImageItem--add)>div:after{content:" ";display:block;position:relative;z-index:-999999999;padding-top:75%}.ImageItem.ImageItem--add>*,.ImageItem:not(.ImageItem--add)>div>*{position:absolute;top:0;right:0;bottom:0;left:0}.ImageItem.ImageItem--add{border:2px dashed #a6a6a6;background-color:transparent}.ImageItem.ImageItem--add>div:before{content:" ";display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0;height:100%}.ImageItem.ImageItem--add>div>span{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.ImageItem.ImageItem--add span span{display:block;font-weight:400}.ImageItem.is-empty,.ImageItem.is-nongraphic a>img,.ImageItem.is-uploading .ImageItem-button,.ImageItem:not(.is-empty)+.ImageItem--add{display:none}.ImageItem.ImageItem--add .fa{font-size:50px}.ImageItem.is-uploading a[href="#"]:after,.ImageItem.is-uploading a[href=""]:after,.ImageItem.is-uploading a[href^=javascript]:after{content:"\u56FE\u7247\u6B63\u5728\u4E0A\u4F20"}.ImageItem.is-nongraphic a:after{content:attr(data-file-ext)}.ImageItem a[href="#"]:after,.ImageItem a[href=""]:after,.ImageItem a[href^=javascript]:after,.ImageItem.is-nongraphic a:after{font-size:24px;font-weight:400;color:#666;display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.ImageItem a:before{content:" ";display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0;height:100%}.ImageItem a>img{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.ImageItem a[href="#"],.ImageItem a[href=""],.ImageItem a[href^=javascript]{cursor:default}.ImageItem a[href="#"]>img,.ImageItem a[href=""]>img,.ImageItem a[href^=javascript]>img{display:none}.ImageItem a[href="#"]:after,.ImageItem a[href=""]:after,.ImageItem a[href^=javascript]:after{content:"\u6682\u65E0\u56FE\u7247"}.ImageItem img{max-height:100%}.ImageItem figcaption{padding:5px;font-size:12px;color:#fff;background-color:rgba(0,0,0,.5);border-radius:0 0 6px 6px;position:absolute;top:auto;bottom:0;left:0;right:0}figure.ImageItem{z-index:2}button.ImageItem{display:block;z-index:1;width:100%;padding:0}.ImageItem-button{position:absolute;top:-15px;right:-15px;z-index:1;width:30px;height:30px;padding:0;border-style:none;border-radius:50%;background-color:#000;color:#fff;font-size:20px}.Card{background-color:#fefefe;-webkit-box-shadow:0 1px 4px 0 rgba(0,0,0,.14);box-shadow:0 1px 4px 0 rgba(0,0,0,.14);-webkit-border-radius:2px;-moz-border-radius:2px;-ms-border-radius:2px;-o-border-radius:2px;border-radius:2px}.Card .Card-content,.Card .Card-footer{padding:12px 15px}.Card .Card-footer{border-top:1px solid rgba(160,160,160,.2)}.Card .Card-footer .btn .fa{margin-right:5px}.Card .Card-footer .btn+.btn{margin-left:10px}.Layer--browserTip,.Layer--notice{position:absolute;right:0;left:0;height:24px;padding-right:10px;padding-left:10px;font-size:12px}.Layer--browserTip:before,.Layer--notice:before{content:" ";display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0;height:100%}.Layer--browserTip .fa,.Layer--browserTip span,.Layer--notice .fa,.Layer--notice span{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.Layer--browserTip.is-medium,.Layer--notice.is-medium{font-size:14px;height:28px}.Layer--browserTip.is-large,.Layer--notice.is-large{font-size:16px;height:32px}.ErrorGroup,.form-group-sm .help-block,.input-group-sm>.form-control~.help-block,.input-group-sm>.input-group-addon~.help-block,.input-group-sm>.input-group-btn>.btn~.help-block,.input-sm~.help-block{font-size:12px}.FieldGroup--period:before,.Layer--loading:before{height:100%;content:" "}.Layer--browserTip span,.Layer--notice span{margin-left:5px;line-height:1}.Layer--browserTip{top:0}.Layer--notice{display:none;top:61px;z-index:10}.Layer--notice.is-over{top:0;z-index:99999}.Layer--notice.is-shown{display:block;-webkit-animation:1.5s fadeout;-o-animation:1.5s fadeout;animation:1.5s fadeout}.Layer--loading{text-align:center;background-color:rgba(255,255,255,.7);position:absolute;top:58px;bottom:66px;left:0;right:0}.Layer--loading:before{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0}.FieldGroup--period:before,.Layer--loading p{display:-moz-inline-stack;vertical-align:middle;zoom:1}.Layer--loading p{display:inline-block;margin:0;font-weight:400}.Layer--watermark{top:58px!important;bottom:66px!important}.FieldSet--carProps table{width:100%;table-layout:fixed}.FieldSet--carProps td,.FieldSet--carProps th{padding:5px 10px}.FieldSet--carProps th{text-align:right}.FieldSet--carProps select{width:150px}.FieldSet--carProps .Field--customInner,.FieldSet--carProps .Field--customModel,.FieldSet--carProps .Field--customOuter{display:inline-block;width:150px;visibility:hidden}.FieldSet--carProps .Field--customInner.is-visible,.FieldSet--carProps .Field--customModel.is-visible,.FieldSet--carProps .Field--customOuter.is-visible{visibility:visible}.FieldGroup--period:before{display:inline-block;width:0}.FieldGroup--period input,.FieldGroup--period span{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.FieldGroup--period input{width:45%}.FieldGroup--period span{width:10%;text-align:center}.Operation .caret{margin-left:5px}.Operation.btn-xs .Operation-icon+.Operation-label,.btn-group-xs>.Operation.btn .Operation-icon+.Operation-label{margin-left:3px}.Operation-icon+.Operation-label,.OperationGroup>.Operation+.Operation,.OperationGroup>.Operation+.btn-group,.OperationGroup>.btn-group+.Operation,.OperationGroup>.btn-group+.btn-group{margin-left:5px}.Operation-menu{min-width:0;font-size:12px}.Operation-menu a{color:inherit!important}.OperationGroup>.btn-group .Operation+.Operation .caret{margin-left:0}.Table--slim{width:auto;min-width:100%;table-layout:fixed}.Table-container--alternative{position:absolute;top:0;right:0;background-color:#fefefe}.Table-container--alternative:before{content:" ";position:absolute;top:0;right:100%;bottom:0;width:6px;background-image:-owg-linear-gradient(to right,transparent,rgba(0,0,0,.25));background-image:-webkit-linear-gradient(to right,transparent,rgba(0,0,0,.25));background-image:-moz-linear-gradient(to right,transparent,rgba(0,0,0,.25));background-image:-o-linear-gradient(to right,transparent,rgba(0,0,0,.25));background-image:linear-gradient(to right,transparent,rgba(0,0,0,.25))}.Table-container--alternative>table{width:auto!important}.Table-container--alternative>table tbody td:first-child,.Table-container--alternative>table thead th:first-child{border-left:1px solid #ddd}.Table-toolbar{margin-top:10px;margin-bottom:10px}.Table-search{min-width:250px}.Table-search .dropdown-toggle .caret{margin-left:3px}.Table-search+.Table-columnToggle{margin-left:5px}.Table-filter.Table-filter--dropdown{width:100%;margin-top:15px;margin-bottom:15px}.js-showMoreFilters.is-dropped:focus{outline:0}.js-showMoreFilters.is-dropped:after{content:" ";position:absolute;top:100%;left:50%;width:0;height:0;margin-top:6px;margin-left:-10px;border:10px solid transparent;border-top-width:0;border-bottom-color:#fff}.Table-columnToggle .Operation-menu>li label{display:block;padding:3px 20px}span.control-label{font-weight:700;cursor:default}.control-label.is-required:after{content:"*";margin-left:3px;color:red}.form-horizontal .control-label.is-required:before{content:"*";margin-right:3px;color:red}.form-horizontal .control-label.is-required:after{display:none}.form-group .help-block{margin-bottom:0}.ErrorGroup{color:red}.ErrorGroup .Error{margin:5px 0 0}\n    </style>\n  </template>\n</dom-module>';

document.head.appendChild($_documentContainer);

var _createClass$11 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$7 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$10(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$10(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $_documentContainer$1 = document.createElement('div');
$_documentContainer$1.setAttribute('style', 'display: none;');

$_documentContainer$1.innerHTML = '<dom-module id="x-app-header">\n  <template strip-whitespace="">\n    <style include="common-style">\n      .Header-action,.Header-brand,.Header-navs,.Header-navs li,.Header-navs ul,.Header-operations,.Header-toggle{float:left}@-moz-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-webkit-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-o-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}:host{display:block;position:relative;z-index:99;padding-right:15px;padding-left:15px;border-bottom:1px solid #ffa200;background-color:#1e2332;overflow:visible!important;-webkit-box-shadow:0 1px 8px rgba(0,0,0,.3);box-shadow:0 1px 8px rgba(0,0,0,.3)}:host:after{content:"";display:table;clear:both}.Header-action.is-active:after,.Header-action:before,.Header-brand a img+span:before,.Header-brand a:before,.Header-navs li:before{content:" "}.Header-action,.Header-brand,.Header-brand a,.Header-extra,.Header-navs,.Header-navs li,.Header-navs ul,.Header-operations{height:100%}.Header-navs li{padding:0 5px}.Header-navs li:before{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0;height:100%}.Header-brand a:before,.Header-navs li>a{display:-moz-inline-stack;vertical-align:middle;zoom:1}.Header-navs li>a{display:inline-block}.Header-navs a{color:#fff}.Header-toggle{display:none;margin-top:21px;margin-right:10px;padding:0;border-style:none;line-height:1;font-size:18px;color:#fff;background-color:transparent}.Header-brand{margin-left:5px}.Header-brand a{display:block;position:relative;font-size:22px;font-weight:300;line-height:1.1}.Header-brand a:before{display:inline-block;width:0;height:100%}.Header-brand a img,.Header-brand a span{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.Header-brand a img{width:122.88px;height:24px;max-height:100%}.Header-brand a img+span{position:relative;padding-left:21px}.Header-brand a img+span:before{width:1px;background-color:#fff;position:absolute;top:0;bottom:0;left:10px;right:auto}.Header-action.Action--notification .Action-trigger,.Header-operations{position:relative}.Header-brand a span{padding-left:10px;color:#fff}.Header-brand+.Header-navs{margin-left:50px}.Header-brand+.Header-navs a:hover,.Header-brand+.Header-navs li.is-active a{border-bottom-color:#ffa200}.Header-brand+.Header-navs a{height:100%;padding:0 20px;line-height:60px;font-size:16px;border-bottom:2px solid transparent}.Header-extra{float:right}.Header-extra .Header-navs a:hover,.Header-extra .Header-navs li.is-active a{background-color:#ffa200}.Header-extra .Header-navs a{height:30px;padding:0 15px;line-height:30px;border-radius:3px}.Header-action{padding:0 15px}.Header-action:before{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0;height:100%}.Header-action .Action-trigger{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.Header-action .Action-trigger.fa{width:18px;font-size:18px;color:#fff}.Header-action button.Action-trigger{padding:0;border-style:none;background-color:transparent}.Header-action.Action--notification .Notification-counter{position:absolute;bottom:100%;left:50%;margin-bottom:-5px;padding:0 4px;font-family:"Helvetica Neue",Helvetica,Arial,"Pingfang SC","Microsoft Yahei",Sans-serif;font-size:12px;font-weight:300;line-height:1.3;-webkit-font-smoothing:auto;background-color:red;-webkit-border-radius:100px;-moz-border-radius:100px;-ms-border-radius:100px;-o-border-radius:100px;border-radius:100px}.Header-action.Action--avatar .Action-trigger img,.Header-action.Action--avatar .Action-trigger span{display:block;width:30px;height:30px;border-radius:50%}.Header-action.Action--avatar .Action-trigger span{line-height:30px;text-align:center;font-size:10px;font-weight:300;background-color:#E0F2F1;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}.Header-action .Action-content{display:none;position:absolute;top:100%;right:10px;min-width:200px;margin-top:-2px;padding:20px;border:1px solid #ccc;border-color:rgba(0,0,0,.2);border-radius:2px;background-color:#fff;-webkit-box-shadow:0 2px 10px rgba(0,0,0,.2);box-shadow:0 2px 10px rgba(0,0,0,.2)}.Header-action .Action-content .Card-content,.Header-action .Action-content .Card-footer{margin-right:-20px;margin-left:-20px}.Header-action .Action-content .Card-content{padding-top:0}.Header-action .Action-content .Card-content ul{list-style:none inside;margin-bottom:0;padding-left:0}.Header-action .Action-content .Card-footer{padding-bottom:0}.Header-action.is-active:after{position:absolute;top:100%;width:0;height:0;margin-top:-9px;margin-left:1px;border:8px solid transparent;border-top-width:0;border-bottom-color:#fff}.Header-action.is-active.Action--avatar:after{margin-left:7px}.Header-action.is-active .Action-content{display:block}@media screen and (max-width:768px){.Header-toggle{display:block}.Header-brand img{position:absolute;top:18px;left:0;max-width:none;max-height:none;clip:rect(0,34px,24px,0)}.Header-brand img+span{margin-left:30px}}\n    </style>\n\n    <button type="button" class="Header-toggle"><i class="fa fa-bars"></i></button>\n<div class="Header-brand">\n  <a href$="{{ url }}"><img src$="{{ logo }}" srcset$="{{ logo2x }} 2x" alt="\u5356\u597D\u8F66"><span>{{ siteTitle }}</span></a>\n</div>\n<div class="Header-extra">\n  <div class="Header-operations"><slot></slot></div>\n</div>\n\n  </template>\n\n  \n</dom-module>';

document.head.appendChild($_documentContainer$1);

var MuuAppHeader = function (_Polymer$Element) {
  _inherits$10(MuuAppHeader, _Polymer$Element);

  function MuuAppHeader() {
    _classCallCheck$11(this, MuuAppHeader);

    return _possibleConstructorReturn$10(this, (MuuAppHeader.__proto__ || Object.getPrototypeOf(MuuAppHeader)).apply(this, arguments));
  }

  _createClass$11(MuuAppHeader, [{
    key: '_getImageBaseUrl',
    value: function _getImageBaseUrl() {
      var baseUrl = "";

      try {
        a = b;
      } catch (err) {
        if (err.fileName) {
          baseUrl = err.fileName;
        } else if (err.stack) {
          baseUrl = (err.stack.match(/at[^\(]+\((.*\.js)/) || ["", ""])[1];
        } else if (err.sourceURL) {
          baseUrl = err.sourceURL;
        }
      }

      if (baseUrl) {
        var parts = baseUrl.split("\/");

        parts.reverse();

        while (parts[0] !== "muu") {
          parts.shift();
        }

        parts.reverse();
        parts.push("images");

        baseUrl = parts.join("\/");
      }

      return baseUrl;
    }
  }, {
    key: 'ready',
    value: function ready() {
      _get$7(MuuAppHeader.prototype.__proto__ || Object.getPrototypeOf(MuuAppHeader.prototype), 'ready', this).call(this);

      if (!this.logo) {
        this.logo = this._getImageBaseUrl() + '/logo.png';
      }

      if (!this.logo2x) {
        this.logo2x = this._getImageBaseUrl() + '/logo-2x.png';
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return "x-app-header";
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        url: {
          type: String,
          value: "/"
        },
        logo: {
          type: String,
          value: ""
        },
        logo2x: {
          type: String,
          value: ""
        },
        siteTitle: {
          type: String,
          value: ""
        }
      };
    }
  }]);

  return MuuAppHeader;
}(Polymer.Element);

window.customElements.define(MuuAppHeader.is, MuuAppHeader);

var _createClass$12 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$8 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$12(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$11(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$11(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $_documentContainer$2 = document.createElement('div');
$_documentContainer$2.setAttribute('style', 'display: none;');

$_documentContainer$2.innerHTML = '<dom-module id="x-app-sidebar">\n  <template strip-whitespace="">\n    <style include="common-style">\n      @-moz-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-webkit-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-o-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}:host{display:block;overflow:auto;width:220px;height:100%;padding-top:20px;padding-bottom:50px;float:left}:host .Navs>ul>li>a{display:block;color:#666;-webkit-transition:background-color .3s;-o-transition:background-color .3s;transition:background-color .3s}:host .Navs>ul>li>a:hover{background-color:#e7e7e7}.Sidebar-navs{font-size:14px}.Sidebar-navs>ul>li>a{position:relative;height:48px;font-weight:400;padding:0 25px}.Sidebar-navs>ul>li>a:before{content:" ";display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0;height:100%}.Sidebar-navs>ul>li>a>.fa,.Sidebar-navs>ul>li>a>.fa+span{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}.Sidebar-navs>ul>li>a>.fa{width:1.28571em;font-size:16px;text-align:center}.Sidebar-navs>ul>li>a>.fa+span{max-width:135.43px;margin-left:14px;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}.Sidebar-navs>ul>li>.Navs{display:none}.Sidebar-navs>ul>li>.Navs a{font-weight:300;padding:7px 10px 7px 59px;line-height:22px;word-wrap:break-word;word-wrap:normal\\9;word-break:break-all;white-space:normal}.Sidebar-navs>ul>li.is-active.is-childless>a,.Sidebar-navs>ul>li.is-active>.Navs .is-active a{background-color:#e7e7e7}.Sidebar-navs>ul>li.is-active>.Navs{display:block}.Sidebar-navs>ul>li.is-active .Menu-switcher .fa{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);transform:rotate(90deg)}.Sidebar-navs>ul>li.is-childless .Menu-switcher{display:none!important}.Sidebar-navs>ul.Menu--grouped:first-child{padding-top:10px}.Sidebar-navs .Menu:not(.Menu--grouped) .Menu-label{display:none}.Sidebar-navs .Menu.Menu--grouped .Menu-label{margin-bottom:5px;line-height:20px;font-size:12px;color:#999}.Sidebar-navs .Menu.Menu--grouped .Menu-label,.Sidebar-navs .Menu.Menu--grouped .Menu-label span{position:relative}.Sidebar-navs .Menu.Menu--grouped .Menu-label span{z-index:1;margin-left:15px;padding:0 5px;text-shadow:1px 1px 3px #fff;background-color:#eee}.Sidebar-navs .Menu.Menu--grouped .Menu-label:before{content:" ";position:absolute;top:50%;right:0;left:0;height:1px;background-color:#ddd}.Sidebar-navs .Menu+.Menu--grouped{padding-top:5px}.Sidebar-navs .Menu+.Menu--grouped .Menu-label{margin-top:5px}.Sidebar-navs .Menu-switcher{position:absolute;top:50%;right:10px;margin-top:-7px;line-height:1}.Sidebar-navs .Menu-switcher .fa{margin-right:5px;-webkit-transition:transform .3s ease;-o-transition:transform .3s ease;transition:transform .3s ease}.Sidebar-navs.Navs--hover{overflow:visible}.Sidebar-navs.Navs--hover>ul>li{position:relative}.Sidebar-navs.Navs--hover>ul>li>.Navs{position:absolute;top:-5px;left:100%;padding-left:10px}.Sidebar-navs.Navs--hover>ul>li>.Navs ul{position:relative;padding:5px 1px;border-radius:2px;background-color:#fff;-webkit-box-shadow:1px 1px 10px 1px rgba(0,0,0,.3);box-shadow:1px 1px 10px 1px rgba(0,0,0,.3)}.Sidebar-navs.Navs--hover>ul>li>.Navs ul:before{content:" ";position:absolute;top:21px;right:100%;width:0;height:0;border:8px solid transparent;border-right-color:#fff;border-left-width:0}.Sidebar-navs.Navs--hover>ul>li>.Navs li{min-width:120px;white-space:nowrap}.Sidebar-navs.Navs--hover>ul>li>.Navs li a{padding:0 25px}.Sidebar-navs.Navs--hover>ul>li:hover>.Navs{display:block}@media screen and (max-width:768px){:host{position:fixed;top:0;right:0;bottom:0;left:0;z-index:999999999;display:none;float:none;width:auto;padding:0;background-color:rgba(0,0,0,.4)}:host>.Sidebar-navs{width:220px;height:100%;padding-top:20px;padding-bottom:50px;overflow:auto;background-color:#eee}:host.is-shown{display:block}:host(.is-shown){display:block}}\n    </style>\n\n    <nav class="Sidebar-navs Navs"></nav>\n\n  </template>\n\n  \n</dom-module>';

document.head.appendChild($_documentContainer$2);

var MuuAppSidebar = function (_Polymer$Element) {
  _inherits$11(MuuAppSidebar, _Polymer$Element);

  function MuuAppSidebar() {
    _classCallCheck$12(this, MuuAppSidebar);

    return _possibleConstructorReturn$11(this, (MuuAppSidebar.__proto__ || Object.getPrototypeOf(MuuAppSidebar)).apply(this, arguments));
  }

  _createClass$12(MuuAppSidebar, [{
    key: '_itemsChanged',


    /**
    * 菜单项属性
    * 
    * @param {*} newItems 新的菜单项数据
    * @param {*} oldItems 旧的菜单项数据
    */
    value: function _itemsChanged(newItems, oldItems) {
      this._generateMenu(newItems);
    }
  }, {
    key: '_resolveItems',
    value: function _resolveItems(items) {
      return typeof items === "string" ? JSON.parse(items) : items;
    }

    /**
    * 生成侧边栏菜单
    * 
    * @param {*} items 菜单项数据
    */

  }, {
    key: '_generateMenu',
    value: function _generateMenu(items) {
      var _this2 = this;

      var navs = this.shadowRoot.querySelector(".Sidebar-navs");
      var menu = navs.children[0];

      if (menu) {
        menu.remove();
      }

      if (items) {
        items = this._resolveItems(items);

        if (Array.isArray(items) && items.length > 0) {
          var flag = document.documentElement.getAttribute("data-page");

          items.forEach(function (item) {
            navs.appendChild(_this2._generateList(item.views, true, {
              parts: !flag ? null : flag.split("-"),
              index: 1
            }, {
              label: item.name,
              flag: item.id
            }));
          });
        }
      }
    }

    /**
    * 生成菜单列表
    * 
    * @param {*} items 菜单项数据
    * @param {*} isPrimary 是否为主菜单
    * @param {*} flag 页面标识
    * @param {*} group 分组信息
    */

  }, {
    key: '_generateList',
    value: function _generateList(items, isPrimary, flag, group) {
      var _this3 = this;

      var node = document.createElement("ul");

      if (group) {
        node.className = "Navs-menu Menu Menu--grouped";

        node.setAttribute("data-flag", group.flag);

        var branch = document.createElement("li");
        var label = document.createElement("span");

        branch.className = "Menu-label";

        label.appendChild(document.createTextNode(group.label));
        branch.appendChild(label);
        node.appendChild(branch);
      }

      items.forEach(function (item) {
        node.appendChild(_this3._generateItem(item, isPrimary, $.extend(true, {}, flag)));
      });

      return node;
    }

    /**
    * 生成菜单条目
    * 
    * @param {*} item 菜单条目数据
    * @param {*} isPrimary 是否为主菜单
    * @param {*} flag 页面标识
    */

  }, {
    key: '_generateItem',
    value: function _generateItem(item, isPrimary, flag) {
      var node = document.createElement("li");
      var link = document.createElement("a");
      var hasChildren = Array.isArray(item.children) && item.children.length > 0;
      var nodeClasses = [];

      link.setAttribute("href", item.url || "javascript:void(0);");

      if (isPrimary) {
        var icon = document.createElement("i");
        var span = document.createElement("span");

        icon.className = "fa fa-" + item.icon;
        span.appendChild(document.createTextNode(item.name));

        link.appendChild(icon);
        link.appendChild(span);

        if (hasChildren) {
          var switcher = document.createElement("span");
          var trigger = document.createElement("i");

          switcher.className = "Menu-switcher";
          trigger.className = "fa fa-angle-right";

          switcher.appendChild(trigger);
          link.appendChild(switcher);
        } else {
          nodeClasses.push("is-childless");
        }
      } else {
        link.appendChild(document.createTextNode(item.name));
      }

      if (flag.parts && flag.parts[flag.index] === item.name) {
        nodeClasses.push("is-active");
      }

      if (nodeClasses.length > 0) {
        node.className = nodeClasses.join(" ");
      }

      node.setAttribute("data-flag", item.name);
      node.appendChild(link);

      if (hasChildren) {
        var wrapper = document.createElement("div");

        wrapper.className = "Navs";

        flag.index++;

        wrapper.appendChild(this._generateList(item.children, false, $.extend(true, {}, flag)));
        node.appendChild(wrapper);
      }

      return node;
    }

    /**
    * 切换菜单项选中状态
    * 
    * @param {*} $target 菜单项
    * @param {*} selector 选择器
    * @param {*} callback 回调函数
    */

  }, {
    key: '_toggleStatus',
    value: function _toggleStatus($target, selector, callback) {
      var cls = "is-active";

      if ($.type(selector) !== "string") {
        selector = "";
      }

      if ($target.hasClass(cls)) {
        $target.removeClass(cls);
      } else {
        if ($target.siblings(selector + '.' + cls).length) {
          $target.siblings(selector + '.' + cls).removeClass(cls);
        }

        if ($.isFunction(callback)) {
          callback.call($target.get(0), cls);
        } else {
          $target.addClass(cls);
        }
      }
    }

    /**
    * 获取指定元素的偏移值
    * 
    * 修复 Shadow DOM 中的元素用 `$.fn.offset()` 获取恒为 `{ top: 0, left: 0 }`
    * 
    * 实现参考 `$.fn.offset()`
    * 
    * @param {*} el 
    */

  }, {
    key: '_resolveOffset',
    value: function _resolveOffset(el) {
      var doc = el && el.ownerDocument;
      var win = doc.defaultView || doc.parentWindow;
      var docEl = doc.documentElement;

      var box = { top: 0, left: 0 };

      if (typeof el.getBoundingClientRect !== "undefined") {
        box = el.getBoundingClientRect();
      }

      return {
        top: box.top + (win.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0),
        left: box.left + (win.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0)
      };
    }

    /**
    * 使选中菜单项在可视区域
    */

  }, {
    key: '_scrollSidebar',
    value: function _scrollSidebar() {
      var $item = $(".Sidebar-navs > .Menu > li.is-active", $(this.shadowRoot));

      if ($item.length === 0) {
        return;
      }

      var $sidebar = $(this);
      var sidebarOffset = $sidebar.offset();
      var itemOffset = this._resolveOffset($item.get(0));

      if (sidebarOffset && itemOffset && (itemOffset.top < sidebarOffset.top || itemOffset.top > sidebarOffset.top + $sidebar.outerHeight() - $item.outerHeight())) {
        $sidebar.scrollTop($sidebar.scrollTop() + itemOffset.top - sidebarOffset.top);
      }
    }
  }, {
    key: 'initMenu',
    value: function initMenu(items) {
      var _this4 = this;

      this._generateMenu(items);

      $(document).ready(function () {
        _this4._scrollSidebar();
      });
    }
  }, {
    key: 'ready',
    value: function ready() {
      _get$8(MuuAppSidebar.prototype.__proto__ || Object.getPrototypeOf(MuuAppSidebar.prototype), 'ready', this).call(this);

      this.initMenu(this.items);

      var toggleStatus = this._toggleStatus;

      $(".Sidebar-navs:not(.Navs--hover)", $(this.shadowRoot)).on("click", "> ul > li > a", function () {
        if (/^(javascript\:|\#)/.test($(this).attr("href"))) {
          toggleStatus($(this).closest("li"));

          return false;
        }
      });
    }
  }], [{
    key: 'is',
    get: function get() {
      return "x-app-sidebar";
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        items: {
          type: String,
          value: "",
          observer: "_itemsChanged"
        }
      };
    }
  }]);

  return MuuAppSidebar;
}(Polymer.Element);

window.customElements.define(MuuAppSidebar.is, MuuAppSidebar);

var _createClass$13 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$9 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$13(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$12(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$12(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $_documentContainer$3 = document.createElement('div');
$_documentContainer$3.setAttribute('style', 'display: none;');

$_documentContainer$3.innerHTML = '<dom-module id="x-action">\n  <template strip-whitespace="">\n    <style include="common-style">\n      @-moz-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-webkit-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-o-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}:host{display:block;padding:0 15px;height:100%;float:left}:host:before{content:" ";display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1;width:0;height:100%}:host .Action-trigger{display:-moz-inline-stack;display:inline-block;vertical-align:middle;zoom:1}:host .Action-trigger.fa,:host ::slotted(.Action-trigger.fa){width:18px!important;font-size:18px!important;color:#fff!important}:host ::slotted(button.Action-trigger),:host button.Action-trigger{padding:0!important;border-style:none!important;background-color:transparent!important}:host .Action-content{display:none;position:absolute;top:100%;right:10px;min-width:200px;margin-top:-2px;padding:20px;border:1px solid #ccc;border-color:rgba(0,0,0,.2);border-radius:2px;background-color:#fff;-webkit-box-shadow:0 2px 10px rgba(0,0,0,.2);box-shadow:0 2px 10px rgba(0,0,0,.2)}:host .Action-content .Card-content,:host .Action-content .Card-footer{margin-right:-20px;margin-left:-20px}:host .Action-content .Card-content{padding-top:0}:host .Action-content .Card-content ul{list-style:none inside;margin-bottom:0;padding-left:0}:host .Action-content .Card-footer{padding-bottom:0}:host(.is-active){position:relative}:host(.is-active):after{position:absolute;top:100%;content:" ";width:0;height:0;margin-top:-9px;margin-left:1px;border:8px solid transparent;border-top-width:0;border-bottom-color:#fff}:host(.is-active) .Action-content{display:block}:host(.is-active[type=user]):after{left:50%;margin-left:-8px}:host([type=notification]) .Action-trigger{position:relative}:host([type=notification]) .Notification-counter{position:absolute;bottom:100%;left:50%;margin-bottom:-5px;padding:0 4px;font-family:"Helvetica Neue",Helvetica,Arial,"Pingfang SC","Microsoft Yahei",Sans-serif;font-size:12px;font-weight:300;line-height:1.3;-webkit-font-smoothing:auto;background-color:red;-webkit-border-radius:100px;-moz-border-radius:100px;-ms-border-radius:100px;-o-border-radius:100px;border-radius:100px}:host([type=user]) .Action-trigger ::slotted(img),:host([type=user]) .Action-trigger ::slotted(span){display:block;width:30px;height:30px;border-radius:50%}:host([type=user]) .Action-trigger ::slotted(span){line-height:30px;text-align:center;font-size:10px;font-weight:300;background-color:#E0F2F1;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}\n    </style>\n\n    <template is="dom-if" if="{{ __isCustom }}"><slot></slot></template>\n<template is="dom-if" if="{{ !__isCustom }}">\n  <a class="Action-trigger" href$="{{ url }}"><slot name="trigger"></slot></a>\n  <div class="Action-content Card">\n    <div class="Card-content"><slot></slot></div>\n    <div class="Card-footer"><slot name="footer"></slot></div>\n  </div>\n</template>\n\n  </template>\n\n  \n</dom-module>';

document.head.appendChild($_documentContainer$3);

var MuuAction = function (_Polymer$Element) {
  _inherits$12(MuuAction, _Polymer$Element);

  function MuuAction() {
    _classCallCheck$13(this, MuuAction);

    return _possibleConstructorReturn$12(this, (MuuAction.__proto__ || Object.getPrototypeOf(MuuAction)).apply(this, arguments));
  }

  _createClass$13(MuuAction, [{
    key: '_typeChanged',
    value: function _typeChanged(newVal, oldVal) {
      this.__isCustom = newVal === "custom";
    }

    /**
    * 页头动作激活状态
    * 
    * @param {*} $target 页头动作
    * @param {*} selector 选择器
    * @param {*} callback 回调函数
    */

  }, {
    key: '_toggleStatus',
    value: function _toggleStatus($target, selector, callback) {
      var cls = "is-active";

      if ($.type(selector) !== "string") {
        selector = "";
      }

      if ($target.hasClass(cls)) {
        $target.removeClass(cls);
      } else {
        if ($target.siblings(selector + '.' + cls).length) {
          $target.siblings(selector + '.' + cls).removeClass(cls);
        }

        if ($.isFunction(callback)) {
          callback.call($target.get(0), cls);
        } else {
          $target.addClass(cls);
        }
      }
    }
  }, {
    key: '_initTriggerEvent',
    value: function _initTriggerEvent() {
      var el = this;
      var toggleStatus = el._toggleStatus;

      $(".Action-trigger", $(el.shadowRoot)).on("click", function () {
        var $t = $(this);

        if (!($t.is("a[href^='javascript:']") || $t.is("button"))) {
          return;
        }

        toggleStatus($(el), null, function (cls) {
          if ($t.siblings(".Action-content").length) {
            $(this).addClass(cls);
          }
        });
      });
    }
  }, {
    key: 'ready',
    value: function ready() {
      _get$9(MuuAction.prototype.__proto__ || Object.getPrototypeOf(MuuAction.prototype), 'ready', this).call(this);

      var el = this;

      $(document).on("click", function (e) {
        var tagName = el.tagName.toLowerCase();
        var cls = "is-active";

        if ($(tagName + '.' + cls).length) {
          var $aw = $(e.target).closest(tagName + '.' + cls);

          if ($aw.length === 0) {
            $(tagName + '.' + cls).removeClass(cls);
          }
        }
      });

      $("dom-if", $(el.shadowRoot)).on("dom-change", function () {
        el._initTriggerEvent();
      });
    }
  }], [{
    key: 'is',
    get: function get() {
      return "x-action";
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        type: {
          type: String,
          value: "",
          observer: "_typeChanged"
        },
        url: {
          type: String,
          value: "javascript:void(0);"
        }
      };
    }
  }]);

  return MuuAction;
}(Polymer.Element);

window.customElements.define(MuuAction.is, MuuAction);

var _createClass$14 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$10 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$14(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$13(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$13(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $_documentContainer$4 = document.createElement('div');
$_documentContainer$4.setAttribute('style', 'display: none;');

$_documentContainer$4.innerHTML = '<dom-module id="x-form">\n  <template strip-whitespace="">\n    <style include="common-style">\n      @-moz-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-webkit-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-o-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}@keyframes fadeout{0%,75%{opacity:1}100%{opacity:0}}:host{display:block}:host form:not(.form-horizontal) .control-label{font-size:12px;font-weight:400;margin-bottom:3px}\n    </style>\n\n    <form><slot></slot></form>\n\n  </template>\n\n  \n</dom-module>';

document.head.appendChild($_documentContainer$4);

var MuuForm = function (_Polymer$Element) {
  _inherits$13(MuuForm, _Polymer$Element);

  function MuuForm() {
    _classCallCheck$14(this, MuuForm);

    return _possibleConstructorReturn$13(this, (MuuForm.__proto__ || Object.getPrototypeOf(MuuForm)).apply(this, arguments));
  }

  _createClass$14(MuuForm, [{
    key: '__resolveForm',
    value: function __resolveForm() {
      var $el = this.__$el;

      if (!$el) {
        this.__$el = $("form", $(this.shadowRoot));

        $el = this.__$el;
      }

      return $el;
    }
  }, {
    key: '__triggerChildrenEvent',
    value: function __triggerChildrenEvent(eventName) {
      $(this.__children).each(function () {
        $(this).trigger(eventName);
      });
    }
  }, {
    key: '__triggerEvent',
    value: function __triggerEvent(formEvt) {
      var $form = this.__$el;

      var evt = $.Event(formEvt.type);
      var preventDefault = evt.preventDefault;

      evt.preventDefault = function () {
        formEvt.preventDefault();

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        preventDefault.apply.apply(preventDefault, [this].concat(args));
      };

      evt.relatedTarget = $form.get(0);

      return $(this).trigger(evt, {
        serialize: function serialize() {
          return $form.serializeArray();
        },
        jsonify: function jsonify() {
          return muu.form.jsonify($form);
        },
        h5f: H5F.get($form)
      });
    }
  }, {
    key: '__initEvents',
    value: function __initEvents() {
      var el = this;
      var $el = $(el);
      var $form = el.__$el;

      $el.on("submit reset", function (evt) {
        if (evt.relatedTarget !== $form.get(0) && arguments.length < 2) {
          evt.stopImmediatePropagation();

          $form.trigger(evt.type);
        }
      });

      $el.on("submit", function (evt, extra) {
        if (extra && extra.h5f && extra.h5f.invalidCount) {
          evt.stopImmediatePropagation();

          return false;
        }
      });

      $form.on("submit reset", function (evt) {
        el.__triggerEvent(evt);
      });
    }
  }, {
    key: '_updateGrid',
    value: function _updateGrid(newGrid) {
      this.__resolveForm();
      this.__triggerChildrenEvent("adjust.internal.muu.field");
    }
  }, {
    key: '_updateDirection',
    value: function _updateDirection(isVertical) {
      var $form = this.__resolveForm();

      if (isVertical) {
        $form.removeClass("form-horizontal");

        var $groups = $form.children();

        if (!$groups.eq(0).is(".row")) {
          $groups.wrapAll('<div class="row" />');
        }
      } else {
        $form.addClass("form-horizontal");

        var $row = $form.children(".row");

        if ($row.length > 0) {
          $row.children().unwrap();
        }
      }

      this.__triggerChildrenEvent("draw.internal.muu.field");
    }
  }, {
    key: '_updateValidation',
    value: function _updateValidation() {
      if (!this.__validationInitializable) {
        return;
      }
    }
  }, {
    key: 'ready',
    value: function ready() {
      var _this2 = this;

      _get$10(MuuForm.prototype.__proto__ || Object.getPrototypeOf(MuuForm.prototype), 'ready', this).call(this);

      this.__initEvents();

      var $form = this.__$el;

      $form.ready(function () {
        _this2.__validationInitializable = true;

        if (!_this2.novalidate) {
          muu.form.h5f($form);
        }
      });
    }
  }], [{
    key: 'is',
    get: function get() {
      return "x-form";
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        grid: {
          type: String,
          value: "",
          observer: "_updateGrid"
        },
        vertical: {
          type: Boolean,
          value: false,
          observer: "_updateDirection"
        },
        novalidate: {
          type: Boolean,
          value: false,
          observer: "_updateValidation"
        }
      };
    }
  }]);

  return MuuForm;
}(Polymer.Element);

window.customElements.define(MuuForm.is, MuuForm);

var _createClass$15 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get$11 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck$15(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$14(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$14(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $_documentContainer$5 = document.createElement('div');
$_documentContainer$5.setAttribute('style', 'display: none;');

$_documentContainer$5.innerHTML = '<dom-module id="x-field">\n  <template strip-whitespace="">\n    <style include="common-style">\n      :host{display:none}\n    </style>\n\n    <slot></slot>\n\n  </template>\n\n  \n</dom-module>';

document.head.appendChild($_documentContainer$5);

var MuuField = function (_Polymer$Element) {
  _inherits$14(MuuField, _Polymer$Element);

  function MuuField() {
    _classCallCheck$15(this, MuuField);

    return _possibleConstructorReturn$14(this, (MuuField.__proto__ || Object.getPrototypeOf(MuuField)).apply(this, arguments));
  }

  _createClass$15(MuuField, [{
    key: '__generateRandomId',


    /**
    * 生成随机 ID
    */
    value: function __generateRandomId() {
      return 'muu-field-' + new Date().getTime().toString(32).toUpperCase();
    }

    /**
    * 处理字段相关信息
    */

  }, {
    key: '__resolveField',
    value: function __resolveField() {
      var $el = this.__$el;
      var type = this.type;

      var tagName = type === "textarea" ? "textarea" : "input";

      if (!type) {
        type = "text";
      }

      if ($el && $el.get(0).tagName.toLowerCase() === tagName) {
        if (tagName === "input") {
          $el.attr("type", type);
        }

        return $el;
      }

      var html = void 0;

      switch (tagName) {
        case "textarea":
          html = "<textarea />";
          break;
        default:
          html = '<input type="' + type + '" />';
      }

      this.__$el = $(html);

      if ($el) {
        $el.after(this.__$el).remove();
      } else {
        this.__fieldId = this.__generateRandomId();

        this.__$group = $('<div class="form-group"><label for="' + this.__fieldId + '" class="control-label"></label></div>');
        this.__$label = $("label", this.__$group);
      }

      return this.__$el.addClass("form-control input-sm").attr({
        id: this.__fieldId,
        name: this.name,
        required: this.required
      }).prop("required", this.required).val(this.value);
    }

    /**
    * 获取关联表单组件
    */

  }, {
    key: '__resolveParent',
    value: function __resolveParent() {
      var parent = $(this).closest("x-form").get(0);

      if (!parent) {
        return;
      }

      parent.__children = (parent.__children || []).concat(this);

      this.__parent = parent;

      var $root = $(parent.shadowRoot);

      $("slot", $root).remove();

      var $form = $("form", $root);

      if (parent.vertical) {
        if (!$form.children(".row").length) {
          $form.prepend('<div class="row" />');
        }

        $form.children(".row").append(this.__$group);
      } else {
        $form.append(this.__$group);
      }

      return parent;
    }

    /**
    * 移除栅格相关样式
    * 
    * @param {*} $el 目标元素
    */

  }, {
    key: '__removeGridClass',
    value: function __removeGridClass($el) {
      return $el.removeClass(function (idx, cls) {
        var arr = [];

        $.each(cls.split(" "), function (i, c) {
          if (/^col\-/.test(c)) {
            arr.push(c);
          }
        });

        return arr.join(" ");
      });
    }

    /**
    * 判断是否为有效的列大小
    * 
    * @param {*} col 列的大小
    */

  }, {
    key: '__isColumnValid',
    value: function __isColumnValid(col) {
      return $.isNumeric(col) && col * 1 > 0 && col * 1 < 12;
    }

    /**
    * 获取栅格相关样式
    * 
    * 支持格式：
    * 1. 「1」到「11」的整数；
    * 2. 有前缀「xs」、「sm」、「md」、「lg」的符合上述要求的数字。
    * 
    * @param {*} cols 需要被解析的列的大小列表
    */

  }, {
    key: '__resolveGridClass',
    value: function __resolveGridClass(cols) {
      var _this2 = this;

      if (cols.length === 1 && this.__isColumnValid(cols[0])) {
        return ['col-sm-' + cols[0]];
      }

      var prefixes = ["xs", "sm", "md", "lg"];
      var sizes = {};

      $.each(prefixes, function (idx, size) {
        sizes[size] = "";
      });

      var nonprefixed = [];
      var resolved = [];

      $.each(cols, function (idx, col) {
        var parts = col.split("-");

        if (parts.length > 2) {
          return;
        }

        var prefix = parts[0];
        var size = parts[1];

        if (parts.length === 1) {
          size = prefix;
          prefix = "";
        }

        if (!_this2.__isColumnValid(size)) {
          return;
        }

        if (prefix) {
          if (!sizes.hasOwnProperty(prefix) || sizes[prefix]) {
            return;
          }

          sizes[prefix] = size;

          resolved.push('col-' + prefix + '-' + size);
        } else {
          nonprefixed.push(size);
        }
      });

      $.each(prefixes, function (idx, prefix) {
        if (sizes[prefix] || nonprefixed.length === 0) {
          return;
        }

        var size = nonprefixed.shift();

        sizes[prefix] = size;

        resolved.push('col-' + prefix + '-' + size);
      });

      return resolved;
    }

    /**
    * 处理栅格
    */

  }, {
    key: '__resolveGrid',
    value: function __resolveGrid() {
      var $group = this.__removeGridClass(this.__$group);
      var $label = this.__removeGridClass(this.__$label);
      var $div = this.__removeGridClass($label.siblings("div"));

      var grid = this.__parent.grid;

      if (this.__parent.vertical) {
        if (!grid) {
          return;
        }

        $group.addClass(this.__resolveGridClass(grid.split("|")).join(" "));
      } else {
        var cols = (grid || "3:9").split(":");

        $label.addClass('col-sm-' + cols[0]);
        $div.addClass('col-sm-' + cols[1]);
      }
    }

    /**
    * 更新关联控件类型
    */

  }, {
    key: '_updateType',
    value: function _updateType() {
      this.__resolveField();
    }

    /**
    * 更新关联标签文本
    * 
    * @param {*} labelText 标签文本
    */

  }, {
    key: '_updateLabel',
    value: function _updateLabel(labelText) {
      this.__resolveField();
      this.__$label.text(labelText || "");
    }

    /**
    * 更新关联控件必要性
    * 
    * @param {*} isRequired 是否必需
    */

  }, {
    key: '_updateRequired',
    value: function _updateRequired(isRequired) {
      if (isRequired) {
        this.__$label.addClass("is-required");
      } else {
        this.__$label.removeClass("is-required");
      }

      this.__resolveField().attr("required", isRequired).prop("required", isRequired);
    }

    /**
    * 更新关联控件字段名
    * 
    * @param {*} fieldName 字段名
    */

  }, {
    key: '_updateFieldName',
    value: function _updateFieldName(fieldName) {
      this.__resolveField().attr("name", fieldName);
    }

    /**
    * 更新关联控件字段值
    * 
    * @param {*} fieldValue 字段值
    */

  }, {
    key: '_updateFieldValue',
    value: function _updateFieldValue(fieldValue) {
      this.__resolveField().val(fieldValue);
    }
  }, {
    key: 'ready',
    value: function ready() {
      var _this3 = this;

      _get$11(MuuField.prototype.__proto__ || Object.getPrototypeOf(MuuField.prototype), 'ready', this).call(this);

      if (!this.__resolveParent()) {
        return;
      }

      // 调整布局
      $(this).on("adjust.internal.muu.field", function () {
        _this3.__resolveGrid();
      });

      // 调整结构
      $(this).on("draw.internal.muu.field", function () {
        var isVertical = _this3.__parent.vertical;
        var $label = _this3.__$label;

        var $div = $label.siblings("div");

        if (isVertical) {
          $label.after(_this3.__$el);
          $div.remove();
        } else {
          if ($div.length === 0) {
            $div = $("<div />");

            $label.after($div);
          }

          $div.prepend(_this3.__$el);
        }

        $(_this3).trigger("adjust.internal.muu.field");
      });

      $(this).trigger("draw.internal.muu.field");
    }
  }], [{
    key: 'is',
    get: function get() {
      return "x-field";
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        type: {
          type: String,
          value: "",
          observer: "_updateType"
        },
        label: {
          type: String,
          value: "",
          observer: "_updateLabel"
        },
        required: {
          type: Boolean,
          value: false,
          observer: "_updateRequired"
        },
        name: {
          type: String,
          value: "",
          observer: "_updateFieldName"
        },
        value: {
          type: String,
          value: "",
          observer: "_updateFieldValue"
        }
      };
    }
  }]);

  return MuuField;
}(Polymer.Element);

window.customElements.define(MuuField.is, MuuField);

})));
