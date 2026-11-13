(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.i18next = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var consoleLogger = {
    type: 'logger',
    log: function log(args) {
      this.output('log', args);
    },
    warn: function warn(args) {
      this.output('warn', args);
    },
    error: function error(args) {
      this.output('error', args);
    },
    output: function output(type, args) {
      if (console && console[type]) console[type].apply(console, args);
    }
  };
  var Logger = function () {
    function Logger(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Logger);
      this.init(concreteLogger, options);
    }
    _createClass(Logger, [{
      key: "init",
      value: function init(concreteLogger) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.prefix = options.prefix || 'i18next:';
        this.logger = concreteLogger || consoleLogger;
        this.options = options;
        this.debug = options.debug;
      }
    }, {
      key: "setDebug",
      value: function setDebug(bool) {
        this.debug = bool;
      }
    }, {
      key: "log",
      value: function log() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return this.forward(args, 'log', '', true);
      }
    }, {
      key: "warn",
      value: function warn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return this.forward(args, 'warn', '', true);
      }
    }, {
      key: "error",
      value: function error() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        return this.forward(args, 'error', '');
      }
    }, {
      key: "deprecate",
      value: function deprecate() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
      }
    }, {
      key: "forward",
      value: function forward(args, lvl, prefix, debugOnly) {
        if (debugOnly && !this.debug) return null;
        if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
        return this.logger[lvl](args);
      }
    }, {
      key: "create",
      value: function create(moduleName) {
        return new Logger(this.logger, _objectSpread$6(_objectSpread$6({}, {
          prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
        }), this.options));
      }
    }, {
      key: "clone",
      value: function clone(options) {
        options = options || this.options;
        options.prefix = options.prefix || this.prefix;
        return new Logger(this.logger, options);
      }
    }]);
    return Logger;
  }();
  var baseLogger = new Logger();

  var EventEmitter = function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);
      this.observers = {};
    }
    _createClass(EventEmitter, [{
      key: "on",
      value: function on(events, listener) {
        var _this = this;
        events.split(' ').forEach(function (event) {
          _this.observers[event] = _this.observers[event] || [];
          _this.observers[event].push(listener);
        });
        return this;
      }
    }, {
      key: "off",
      value: function off(event, listener) {
        if (!this.observers[event]) return;
        if (!listener) {
          delete this.observers[event];
          return;
        }
        this.observers[event] = this.observers[event].filter(function (l) {
          return l !== listener;
        });
      }
    }, {
      key: "emit",
      value: function emit(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (this.observers[event]) {
          var cloned = [].concat(this.observers[event]);
          cloned.forEach(function (observer) {
            observer.apply(void 0, args);
          });
        }
        if (this.observers['*']) {
          var _cloned = [].concat(this.observers['*']);
          _cloned.forEach(function (observer) {
            observer.apply(observer, [event].concat(args));
          });
        }
      }
    }]);
    return EventEmitter;
  }();

  function defer() {
    var res;
    var rej;
    var promise = new Promise(function (resolve, reject) {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  }
  function makeString(object) {
    if (object == null) return '';
    return '' + object;
  }
  function copy(a, s, t) {
    a.forEach(function (m) {
      if (s[m]) t[m] = s[m];
    });
  }
  function getLastOfPath(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
    }
    function canNotTraverseDeeper() {
      return !object || typeof object === 'string';
    }
    var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
    while (stack.length > 1) {
      if (canNotTraverseDeeper()) return {};
      var key = cleanKey(stack.shift());
      if (!object[key] && Empty) object[key] = new Empty();
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        object = object[key];
      } else {
        object = {};
      }
    }
    if (canNotTraverseDeeper()) return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }
  function setPath(object, path, newValue) {
    var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;
    obj[k] = newValue;
  }
  function pushPath(object, path, newValue, concat) {
    var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;
    obj[k] = obj[k] || [];
    if (concat) obj[k] = obj[k].concat(newValue);
    if (!concat) obj[k].push(newValue);
  }
  function getPath(object, path) {
    var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;
    if (!obj) return undefined;
    return obj[k];
  }
  function getPathWithDefaults(data, defaultData, key) {
    var value = getPath(data, key);
    if (value !== undefined) {
      return value;
    }
    return getPath(defaultData, key);
  }
  function deepExtend(target, source, overwrite) {
    for (var prop in source) {
      if (prop !== '__proto__' && prop !== 'constructor') {
        if (prop in target) {
          if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
            if (overwrite) target[prop] = source[prop];
          } else {
            deepExtend(target[prop], source[prop], overwrite);
          }
        } else {
          target[prop] = source[prop];
        }
      }
    }
    return target;
  }
  function regexEscape(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
  var _entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };
  function escape(data) {
    if (typeof data === 'string') {
      return data.replace(/[&<>"'\/]/g, function (s) {
        return _entityMap[s];
      });
    }
    return data;
  }
  var isIE10 = typeof window !== 'undefined' && window.navigator && typeof window.navigator.userAgentData === 'undefined' && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;
  var chars = [' ', ',', '?', '!', ';'];
  function looksLikeObjectPath(key, nsSeparator, keySeparator) {
    nsSeparator = nsSeparator || '';
    keySeparator = keySeparator || '';
    var possibleChars = chars.filter(function (c) {
      return nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0;
    });
    if (possibleChars.length === 0) return true;
    var r = new RegExp("(".concat(possibleChars.map(function (c) {
      return c === '?' ? '\\?' : c;
    }).join('|'), ")"));
    var matched = !r.test(key);
    if (!matched) {
      var ki = key.indexOf(keySeparator);
      if (ki > 0 && !r.test(key.substring(0, ki))) {
        matched = true;
      }
    }
    return matched;
  }
  function deepFind(obj, path) {
    var keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
    if (!obj) return undefined;
    if (obj[path]) return obj[path];
    var paths = path.split(keySeparator);
    var current = obj;
    for (var i = 0; i < paths.length; ++i) {
      if (!current) return undefined;
      if (typeof current[paths[i]] === 'string' && i + 1 < paths.length) {
        return undefined;
      }
      if (current[paths[i]] === undefined) {
        var j = 2;
        var p = paths.slice(i, i + j).join(keySeparator);
        var mix = current[p];
        while (mix === undefined && paths.length > i + j) {
          j++;
          p = paths.slice(i, i + j).join(keySeparator);
          mix = current[p];
        }
        if (mix === undefined) return undefined;
        if (mix === null) return null;
        if (path.endsWith(p)) {
          if (typeof mix === 'string') return mix;
          if (p && typeof mix[p] === 'string') return mix[p];
        }
        var joinedPath = paths.slice(i + j).join(keySeparator);
        if (joinedPath) return deepFind(mix, joinedPath, keySeparator);
        return undefined;
      }
      current = current[paths[i]];
    }
    return current;
  }

  function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var ResourceStore = function (_EventEmitter) {
    _inherits(ResourceStore, _EventEmitter);
    var _super = _createSuper$3(ResourceStore);
    function ResourceStore(data) {
      var _this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        ns: ['translation'],
        defaultNS: 'translation'
      };
      _classCallCheck(this, ResourceStore);
      _this = _super.call(this);
      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }
      _this.data = data || {};
      _this.options = options;
      if (_this.options.keySeparator === undefined) {
        _this.options.keySeparator = '.';
      }
      if (_this.options.ignoreJSONStructure === undefined) {
        _this.options.ignoreJSONStructure = true;
      }
      return _this;
    }
    _createClass(ResourceStore, [{
      key: "addNamespaces",
      value: function addNamespaces(ns) {
        if (this.options.ns.indexOf(ns) < 0) {
          this.options.ns.push(ns);
        }
      }
    }, {
      key: "removeNamespaces",
      value: function removeNamespaces(ns) {
        var index = this.options.ns.indexOf(ns);
        if (index > -1) {
          this.options.ns.splice(index, 1);
        }
      }
    }, {
      key: "getResource",
      value: function getResource(lng, ns, key) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
        var ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
        var path = [lng, ns];
        if (key && typeof key !== 'string') path = path.concat(key);
        if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);
        if (lng.indexOf('.') > -1) {
          path = lng.split('.');
        }
        var result = getPath(this.data, path);
        if (result || !ignoreJSONStructure || typeof key !== 'string') return result;
        return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
      }
    }, {
      key: "addResource",
      value: function addResource(lng, ns, key, value) {
        var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
          silent: false
        };
        var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
        var path = [lng, ns];
        if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
        if (lng.indexOf('.') > -1) {
          path = lng.split('.');
          value = ns;
          ns = path[1];
        }
        this.addNamespaces(ns);
        setPath(this.data, path, value);
        if (!options.silent) this.emit('added', lng, ns, key, value);
      }
    }, {
      key: "addResources",
      value: function addResources(lng, ns, resources) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
          silent: false
        };
        for (var m in resources) {
          if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
            silent: true
          });
        }
        if (!options.silent) this.emit('added', lng, ns, resources);
      }
    }, {
      key: "addResourceBundle",
      value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
          silent: false
        };
        var path = [lng, ns];
        if (lng.indexOf('.') > -1) {
          path = lng.split('.');
          deep = resources;
          resources = ns;
          ns = path[1];
        }
        this.addNamespaces(ns);
        var pack = getPath(this.data, path) || {};
        if (deep) {
          deepExtend(pack, resources, overwrite);
        } else {
          pack = _objectSpread$5(_objectSpread$5({}, pack), resources);
        }
        setPath(this.data, path, pack);
        if (!options.silent) this.emit('added', lng, ns, resources);
      }
    }, {
      key: "removeResourceBundle",
      value: function removeResourceBundle(lng, ns) {
        if (this.hasResourceBundle(lng, ns)) {
          delete this.data[lng][ns];
        }
        this.removeNamespaces(ns);
        this.emit('removed', lng, ns);
      }
    }, {
      key: "hasResourceBundle",
      value: function hasResourceBundle(lng, ns) {
        return this.getResource(lng, ns) !== undefined;
      }
    }, {
      key: "getResourceBundle",
      value: function getResourceBundle(lng, ns) {
        if (!ns) ns = this.options.defaultNS;
        if (this.options.compatibilityAPI === 'v1') return _objectSpread$5(_objectSpread$5({}, {}), this.getResource(lng, ns));
        return this.getResource(lng, ns);
      }
    }, {
      key: "getDataByLanguage",
      value: function getDataByLanguage(lng) {
        return this.data[lng];
      }
    }, {
      key: "hasLanguageSomeTranslations",
      value: function hasLanguageSomeTranslations(lng) {
        var data = this.getDataByLanguage(lng);
        var n = data && Object.keys(data) || [];
        return !!n.find(function (v) {
          return data[v] && Object.keys(data[v]).length > 0;
        });
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.data;
      }
    }]);
    return ResourceStore;
  }(EventEmitter);

  var postProcessor = {
    processors: {},
    addPostProcessor: function addPostProcessor(module) {
      this.processors[module.name] = module;
    },
    handle: function handle(processors, value, key, options, translator) {
      var _this = this;
      processors.forEach(function (processor) {
        if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
      });
      return value;
    }
  };

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var checkedLoadedFor = {};
  var Translator = function (_EventEmitter) {
    _inherits(Translator, _EventEmitter);
    var _super = _createSuper$2(Translator);
    function Translator(services) {
      var _this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Translator);
      _this = _super.call(this);
      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }
      copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, _assertThisInitialized(_this));
      _this.options = options;
      if (_this.options.keySeparator === undefined) {
        _this.options.keySeparator = '.';
      }
      _this.logger = baseLogger.create('translator');
      return _this;
    }
    _createClass(Translator, [{
      key: "changeLanguage",
      value: function changeLanguage(lng) {
        if (lng) this.language = lng;
      }
    }, {
      key: "exists",
      value: function exists(key) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          interpolation: {}
        };
        if (key === undefined || key === null) {
          return false;
        }
        var resolved = this.resolve(key, options);
        return resolved && resolved.res !== undefined;
      }
    }, {
      key: "extractFromKey",
      value: function extractFromKey(key, options) {
        var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
        if (nsSeparator === undefined) nsSeparator = ':';
        var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
        var namespaces = options.ns || this.options.defaultNS || [];
        var wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
        var seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
        if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
          var m = key.match(this.interpolator.nestingRegexp);
          if (m && m.length > 0) {
            return {
              key: key,
              namespaces: namespaces
            };
          }
          var parts = key.split(nsSeparator);
          if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
          key = parts.join(keySeparator);
        }
        if (typeof namespaces === 'string') namespaces = [namespaces];
        return {
          key: key,
          namespaces: namespaces
        };
      }
    }, {
      key: "translate",
      value: function translate(keys, options, lastKey) {
        var _this2 = this;
        if (_typeof(options) !== 'object' && this.options.overloadTranslationOptionHandler) {
          options = this.options.overloadTranslationOptionHandler(arguments);
        }
        if (_typeof(options) === 'object') options = _objectSpread$4({}, options);
        if (!options) options = {};
        if (keys === undefined || keys === null) return '';
        if (!Array.isArray(keys)) keys = [String(keys)];
        var returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
        var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
        var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
          key = _this$extractFromKey.key,
          namespaces = _this$extractFromKey.namespaces;
        var namespace = namespaces[namespaces.length - 1];
        var lng = options.lng || this.language;
        var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
        if (lng && lng.toLowerCase() === 'cimode') {
          if (appendNamespaceToCIMode) {
            var nsSeparator = options.nsSeparator || this.options.nsSeparator;
            if (returnDetails) {
              return {
                res: "".concat(namespace).concat(nsSeparator).concat(key),
                usedKey: key,
                exactUsedKey: key,
                usedLng: lng,
                usedNS: namespace
              };
            }
            return "".concat(namespace).concat(nsSeparator).concat(key);
          }
          if (returnDetails) {
            return {
              res: key,
              usedKey: key,
              exactUsedKey: key,
              usedLng: lng,
              usedNS: namespace
            };
          }
          return key;
        }
        var resolved = this.resolve(keys, options);
        var res = resolved && resolved.res;
        var resUsedKey = resolved && resolved.usedKey || key;
        var resExactUsedKey = resolved && resolved.exactUsedKey || key;
        var resType = Object.prototype.toString.apply(res);
        var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
        var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
        var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
        var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
        if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
          if (!options.returnObjects && !this.options.returnObjects) {
            if (!this.options.returnedObjectHandler) {
              this.logger.warn('accessing an object - but returnObjects options is not enabled!');
            }
            var r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, _objectSpread$4(_objectSpread$4({}, options), {}, {
              ns: namespaces
            })) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
            if (returnDetails) {
              resolved.res = r;
              return resolved;
            }
            return r;
          }
          if (keySeparator) {
            var resTypeIsArray = resType === '[object Array]';
            var copy = resTypeIsArray ? [] : {};
            var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
            for (var m in res) {
              if (Object.prototype.hasOwnProperty.call(res, m)) {
                var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
                copy[m] = this.translate(deepKey, _objectSpread$4(_objectSpread$4({}, options), {
                  joinArrays: false,
                  ns: namespaces
                }));
                if (copy[m] === deepKey) copy[m] = res[m];
              }
            }
            res = copy;
          }
        } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
          res = res.join(joinArrays);
          if (res) res = this.extendTranslation(res, keys, options, lastKey);
        } else {
          var usedDefault = false;
          var usedKey = false;
          var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
          var hasDefaultValue = Translator.hasDefaultValue(options);
          var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
          var defaultValue = options["defaultValue".concat(defaultValueSuffix)] || options.defaultValue;
          if (!this.isValidLookup(res) && hasDefaultValue) {
            usedDefault = true;
            res = defaultValue;
          }
          if (!this.isValidLookup(res)) {
            usedKey = true;
            res = key;
          }
          var missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
          var resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
          var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
          if (usedKey || usedDefault || updateMissing) {
            this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
            if (keySeparator) {
              var fk = this.resolve(key, _objectSpread$4(_objectSpread$4({}, options), {}, {
                keySeparator: false
              }));
              if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
            }
            var lngs = [];
            var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
            if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
              for (var i = 0; i < fallbackLngs.length; i++) {
                lngs.push(fallbackLngs[i]);
              }
            } else if (this.options.saveMissingTo === 'all') {
              lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
            } else {
              lngs.push(options.lng || this.language);
            }
            var send = function send(l, k, specificDefaultValue) {
              var defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
              if (_this2.options.missingKeyHandler) {
                _this2.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
              } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
                _this2.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
              }
              _this2.emit('missingKey', l, namespace, k, res);
            };
            if (this.options.saveMissing) {
              if (this.options.saveMissingPlurals && needsPluralHandling) {
                lngs.forEach(function (language) {
                  _this2.pluralResolver.getSuffixes(language, options).forEach(function (suffix) {
                    send([language], key + suffix, options["defaultValue".concat(suffix)] || defaultValue);
                  });
                });
              } else {
                send(lngs, key, defaultValue);
              }
            }
          }
          res = this.extendTranslation(res, keys, options, resolved, lastKey);
          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
          if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
            if (this.options.compatibilityAPI !== 'v1') {
              res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(namespace, ":").concat(key) : key, usedDefault ? res : undefined);
            } else {
              res = this.options.parseMissingKeyHandler(res);
            }
          }
        }
        if (returnDetails) {
          resolved.res = res;
          return resolved;
        }
        return res;
      }
    }, {
      key: "extendTranslation",
      value: function extendTranslation(res, key, options, resolved, lastKey) {
        var _this3 = this;
        if (this.i18nFormat && this.i18nFormat.parse) {
          res = this.i18nFormat.parse(res, _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), options), resolved.usedLng, resolved.usedNS, resolved.usedKey, {
            resolved: resolved
          });
        } else if (!options.skipInterpolation) {
          if (options.interpolation) this.interpolator.init(_objectSpread$4(_objectSpread$4({}, options), {
            interpolation: _objectSpread$4(_objectSpread$4({}, this.options.interpolation), options.interpolation)
          }));
          var skipOnVariables = typeof res === 'string' && (options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
          var nestBef;
          if (skipOnVariables) {
            var nb = res.match(this.interpolator.nestingRegexp);
            nestBef = nb && nb.length;
          }
          var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
          if (this.options.interpolation.defaultVariables) data = _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), data);
          res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
          if (skipOnVariables) {
            var na = res.match(this.interpolator.nestingRegexp);
            var nestAft = na && na.length;
            if (nestBef < nestAft) options.nest = false;
          }
          if (!options.lng && this.options.compatibilityAPI !== 'v1' && resolved && resolved.res) options.lng = resolved.usedLng;
          if (options.nest !== false) res = this.interpolator.nest(res, function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            if (lastKey && lastKey[0] === args[0] && !options.context) {
              _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));
              return null;
            }
            return _this3.translate.apply(_this3, args.concat([key]));
          }, options);
          if (options.interpolation) this.interpolator.reset();
        }
        var postProcess = options.postProcess || this.options.postProcess;
        var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
        if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
          res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread$4({
            i18nResolved: resolved
          }, options) : options, this);
        }
        return res;
      }
    }, {
      key: "resolve",
      value: function resolve(keys) {
        var _this4 = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var found;
        var usedKey;
        var exactUsedKey;
        var usedLng;
        var usedNS;
        if (typeof keys === 'string') keys = [keys];
        keys.forEach(function (k) {
          if (_this4.isValidLookup(found)) return;
          var extracted = _this4.extractFromKey(k, options);
          var key = extracted.key;
          usedKey = key;
          var namespaces = extracted.namespaces;
          if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
          var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
          var needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && _this4.pluralResolver.shouldUseIntlApi();
          var needsContextHandling = options.context !== undefined && (typeof options.context === 'string' || typeof options.context === 'number') && options.context !== '';
          var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
          namespaces.forEach(function (ns) {
            if (_this4.isValidLookup(found)) return;
            usedNS = ns;
            if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
              checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;
              _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
            }
            codes.forEach(function (code) {
              if (_this4.isValidLookup(found)) return;
              usedLng = code;
              var finalKeys = [key];
              if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
                _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
              } else {
                var pluralSuffix;
                if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count, options);
                var zeroSuffix = "".concat(_this4.options.pluralSeparator, "zero");
                if (needsPluralHandling) {
                  finalKeys.push(key + pluralSuffix);
                  if (needsZeroSuffixLookup) {
                    finalKeys.push(key + zeroSuffix);
                  }
                }
                if (needsContextHandling) {
                  var contextKey = "".concat(key).concat(_this4.options.contextSeparator).concat(options.context);
                  finalKeys.push(contextKey);
                  if (needsPluralHandling) {
                    finalKeys.push(contextKey + pluralSuffix);
                    if (needsZeroSuffixLookup) {
                      finalKeys.push(contextKey + zeroSuffix);
                    }
                  }
                }
              }
              var possibleKey;
              while (possibleKey = finalKeys.pop()) {
                if (!_this4.isValidLookup(found)) {
                  exactUsedKey = possibleKey;
                  found = _this4.getResource(code, ns, possibleKey, options);
                }
              }
            });
          });
        });
        return {
          res: found,
          usedKey: usedKey,
          exactUsedKey: exactUsedKey,
          usedLng: usedLng,
          usedNS: usedNS
        };
      }
    }, {
      key: "isValidLookup",
      value: function isValidLookup(res) {
        return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
      }
    }, {
      key: "getResource",
      value: function getResource(code, ns, key) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
        return this.resourceStore.getResource(code, ns, key, options);
      }
    }], [{
      key: "hasDefaultValue",
      value: function hasDefaultValue(options) {
        var prefix = 'defaultValue';
        for (var option in options) {
          if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
            return true;
          }
        }
        return false;
      }
    }]);
    return Translator;
  }(EventEmitter);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var LanguageUtil = function () {
    function LanguageUtil(options) {
      _classCallCheck(this, LanguageUtil);
      this.options = options;
      this.supportedLngs = this.options.supportedLngs || false;
      this.logger = baseLogger.create('languageUtils');
    }
    _createClass(LanguageUtil, [{
      key: "getScriptPartFromCode",
      value: function getScriptPartFromCode(code) {
        if (!code || code.indexOf('-') < 0) return null;
        var p = code.split('-');
        if (p.length === 2) return null;
        p.pop();
        if (p[p.length - 1].toLowerCase() === 'x') return null;
        return this.formatLanguageCode(p.join('-'));
      }
    }, {
      key: "getLanguagePartFromCode",
      value: function getLanguagePartFromCode(code) {
        if (!code || code.indexOf('-') < 0) return code;
        var p = code.split('-');
        return this.formatLanguageCode(p[0]);
      }
    }, {
      key: "formatLanguageCode",
      value: function formatLanguageCode(code) {
        if (typeof code === 'string' && code.indexOf('-') > -1) {
          var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
          var p = code.split('-');
          if (this.options.lowerCaseLng) {
            p = p.map(function (part) {
              return part.toLowerCase();
            });
          } else if (p.length === 2) {
            p[0] = p[0].toLowerCase();
            p[1] = p[1].toUpperCase();
            if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          } else if (p.length === 3) {
            p[0] = p[0].toLowerCase();
            if (p[1].length === 2) p[1] = p[1].toUpperCase();
            if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
            if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
            if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
          }
          return p.join('-');
        }
        return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
      }
    }, {
      key: "isSupportedCode",
      value: function isSupportedCode(code) {
        if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
          code = this.getLanguagePartFromCode(code);
        }
        return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
      }
    }, {
      key: "getBestMatchFromCodes",
      value: function getBestMatchFromCodes(codes) {
        var _this = this;
        if (!codes) return null;
        var found;
        codes.forEach(function (code) {
          if (found) return;
          var cleanedLng = _this.formatLanguageCode(code);
          if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
        });
        if (!found && this.options.supportedLngs) {
          codes.forEach(function (code) {
            if (found) return;
            var lngOnly = _this.getLanguagePartFromCode(code);
            if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
            found = _this.options.supportedLngs.find(function (supportedLng) {
              if (supportedLng === lngOnly) return supportedLng;
              if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
              if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
            });
          });
        }
        if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
        return found;
      }
    }, {
      key: "getFallbackCodes",
      value: function getFallbackCodes(fallbacks, code) {
        if (!fallbacks) return [];
        if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
        if (typeof fallbacks === 'string') fallbacks = [fallbacks];
        if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
        if (!code) return fallbacks["default"] || [];
        var found = fallbacks[code];
        if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
        if (!found) found = fallbacks[this.formatLanguageCode(code)];
        if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
        if (!found) found = fallbacks["default"];
        return found || [];
      }
    }, {
      key: "toResolveHierarchy",
      value: function toResolveHierarchy(code, fallbackCode) {
        var _this2 = this;
        var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
        var codes = [];
        var addCode = function addCode(c) {
          if (!c) return;
          if (_this2.isSupportedCode(c)) {
            codes.push(c);
          } else {
            _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
          }
        };
        if (typeof code === 'string' && code.indexOf('-') > -1) {
          if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
          if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
          if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
        } else if (typeof code === 'string') {
          addCode(this.formatLanguageCode(code));
        }
        fallbackCodes.forEach(function (fc) {
          if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
        });
        return codes;
      }
    }]);
    return LanguageUtil;
  }();

  var sets = [{
    lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
    nr: [1, 2],
    fc: 1
  }, {
    lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
    nr: [1, 2],
    fc: 2
  }, {
    lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
    nr: [1],
    fc: 3
  }, {
    lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
    nr: [1, 2, 5],
    fc: 4
  }, {
    lngs: ['ar'],
    nr: [0, 1, 2, 3, 11, 100],
    fc: 5
  }, {
    lngs: ['cs', 'sk'],
    nr: [1, 2, 5],
    fc: 6
  }, {
    lngs: ['csb', 'pl'],
    nr: [1, 2, 5],
    fc: 7
  }, {
    lngs: ['cy'],
    nr: [1, 2, 3, 8],
    fc: 8
  }, {
    lngs: ['fr'],
    nr: [1, 2],
    fc: 9
  }, {
    lngs: ['ga'],
    nr: [1, 2, 3, 7, 11],
    fc: 10
  }, {
    lngs: ['gd'],
    nr: [1, 2, 3, 20],
    fc: 11
  }, {
    lngs: ['is'],
    nr: [1, 2],
    fc: 12
  }, {
    lngs: ['jv'],
    nr: [0, 1],
    fc: 13
  }, {
    lngs: ['kw'],
    nr: [1, 2, 3, 4],
    fc: 14
  }, {
    lngs: ['lt'],
    nr: [1, 2, 10],
    fc: 15
  }, {
    lngs: ['lv'],
    nr: [1, 2, 0],
    fc: 16
  }, {
    lngs: ['mk'],
    nr: [1, 2],
    fc: 17
  }, {
    lngs: ['mnk'],
    nr: [0, 1, 2],
    fc: 18
  }, {
    lngs: ['mt'],
    nr: [1, 2, 11, 20],
    fc: 19
  }, {
    lngs: ['or'],
    nr: [2, 1],
    fc: 2
  }, {
    lngs: ['ro'],
    nr: [1, 2, 20],
    fc: 20
  }, {
    lngs: ['sl'],
    nr: [5, 1, 2, 3],
    fc: 21
  }, {
    lngs: ['he', 'iw'],
    nr: [1, 2, 20, 21],
    fc: 22
  }];
  var _rulesPluralsTypes = {
    1: function _(n) {
      return Number(n > 1);
    },
    2: function _(n) {
      return Number(n != 1);
    },
    3: function _(n) {
      return 0;
    },
    4: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    5: function _(n) {
      return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
    },
    6: function _(n) {
      return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
    },
    7: function _(n) {
      return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    8: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
    },
    9: function _(n) {
      return Number(n >= 2);
    },
    10: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
    },
    11: function _(n) {
      return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
    },
    12: function _(n) {
      return Number(n % 10 != 1 || n % 100 == 11);
    },
    13: function _(n) {
      return Number(n !== 0);
    },
    14: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
    },
    15: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    16: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
    },
    17: function _(n) {
      return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
    },
    18: function _(n) {
      return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
    },
    19: function _(n) {
      return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
    },
    20: function _(n) {
      return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
    },
    21: function _(n) {
      return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
    },
    22: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
    }
  };
  var deprecatedJsonVersions = ['v1', 'v2', 'v3'];
  var suffixesOrder = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
  };
  function createRules() {
    var rules = {};
    sets.forEach(function (set) {
      set.lngs.forEach(function (l) {
        rules[l] = {
          numbers: set.nr,
          plurals: _rulesPluralsTypes[set.fc]
        };
      });
    });
    return rules;
  }
  var PluralResolver = function () {
    function PluralResolver(languageUtils) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, PluralResolver);
      this.languageUtils = languageUtils;
      this.options = options;
      this.logger = baseLogger.create('pluralResolver');
      if ((!this.options.compatibilityJSON || this.options.compatibilityJSON === 'v4') && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
        this.options.compatibilityJSON = 'v3';
        this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
      }
      this.rules = createRules();
    }
    _createClass(PluralResolver, [{
      key: "addRule",
      value: function addRule(lng, obj) {
        this.rules[lng] = obj;
      }
    }, {
      key: "getRule",
      value: function getRule(code) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this.shouldUseIntlApi()) {
          try {
            return new Intl.PluralRules(code, {
              type: options.ordinal ? 'ordinal' : 'cardinal'
            });
          } catch (_unused) {
            return;
          }
        }
        return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
      }
    }, {
      key: "needsPlural",
      value: function needsPlural(code) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var rule = this.getRule(code, options);
        if (this.shouldUseIntlApi()) {
          return rule && rule.resolvedOptions().pluralCategories.length > 1;
        }
        return rule && rule.numbers.length > 1;
      }
    }, {
      key: "getPluralFormsOfKey",
      value: function getPluralFormsOfKey(code, key) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.getSuffixes(code, options).map(function (suffix) {
          return "".concat(key).concat(suffix);
        });
      }
    }, {
      key: "getSuffixes",
      value: function getSuffixes(code) {
        var _this = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var rule = this.getRule(code, options);
        if (!rule) {
          return [];
        }
        if (this.shouldUseIntlApi()) {
          return rule.resolvedOptions().pluralCategories.sort(function (pluralCategory1, pluralCategory2) {
            return suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2];
          }).map(function (pluralCategory) {
            return "".concat(_this.options.prepend).concat(pluralCategory);
          });
        }
        return rule.numbers.map(function (number) {
          return _this.getSuffix(code, number, options);
        });
      }
    }, {
      key: "getSuffix",
      value: function getSuffix(code, count) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var rule = this.getRule(code, options);
        if (rule) {
          if (this.shouldUseIntlApi()) {
            return "".concat(this.options.prepend).concat(rule.select(count));
          }
          return this.getSuffixRetroCompatible(rule, count);
        }
        this.logger.warn("no plural rule found for: ".concat(code));
        return '';
      }
    }, {
      key: "getSuffixRetroCompatible",
      value: function getSuffixRetroCompatible(rule, count) {
        var _this2 = this;
        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
        var suffix = rule.numbers[idx];
        if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          if (suffix === 2) {
            suffix = 'plural';
          } else if (suffix === 1) {
            suffix = '';
          }
        }
        var returnSuffix = function returnSuffix() {
          return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
        };
        if (this.options.compatibilityJSON === 'v1') {
          if (suffix === 1) return '';
          if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
          return returnSuffix();
        } else if (this.options.compatibilityJSON === 'v2') {
          return returnSuffix();
        } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          return returnSuffix();
        }
        return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
      }
    }, {
      key: "shouldUseIntlApi",
      value: function shouldUseIntlApi() {
        return !deprecatedJsonVersions.includes(this.options.compatibilityJSON);
      }
    }]);
    return PluralResolver;
  }();

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function deepFindWithDefaults(data, defaultData, key) {
    var keySeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
    var ignoreJSONStructure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var path = getPathWithDefaults(data, defaultData, key);
    if (!path && ignoreJSONStructure && typeof key === 'string') {
      path = deepFind(data, key, keySeparator);
      if (path === undefined) path = deepFind(defaultData, key, keySeparator);
    }
    return path;
  }
  var Interpolator = function () {
    function Interpolator() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Interpolator);
      this.logger = baseLogger.create('interpolator');
      this.options = options;
      this.format = options.interpolation && options.interpolation.format || function (value) {
        return value;
      };
      this.init(options);
    }
    _createClass(Interpolator, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!options.interpolation) options.interpolation = {
          escapeValue: true
        };
        var iOpts = options.interpolation;
        this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
        this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
        this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
        this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
        this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
        this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
        this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
        this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
        this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
        this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
        this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
        this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
        this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
        this.resetRegExp();
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this.options) this.init(this.options);
      }
    }, {
      key: "resetRegExp",
      value: function resetRegExp() {
        var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
        this.regexp = new RegExp(regexpStr, 'g');
        var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
        this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
        var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
        this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
      }
    }, {
      key: "interpolate",
      value: function interpolate(str, data, lng, options) {
        var _this = this;
        var match;
        var value;
        var replaces;
        var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
        function regexSafe(val) {
          return val.replace(/\$/g, '$$$$');
        }
        var handleFormat = function handleFormat(key) {
          if (key.indexOf(_this.formatSeparator) < 0) {
            var path = deepFindWithDefaults(data, defaultData, key, _this.options.keySeparator, _this.options.ignoreJSONStructure);
            return _this.alwaysFormat ? _this.format(path, undefined, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
              interpolationkey: key
            })) : path;
          }
          var p = key.split(_this.formatSeparator);
          var k = p.shift().trim();
          var f = p.join(_this.formatSeparator).trim();
          return _this.format(deepFindWithDefaults(data, defaultData, k, _this.options.keySeparator, _this.options.ignoreJSONStructure), f, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
            interpolationkey: k
          }));
        };
        this.resetRegExp();
        var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
        var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
        var todos = [{
          regex: this.regexpUnescape,
          safeValue: function safeValue(val) {
            return regexSafe(val);
          }
        }, {
          regex: this.regexp,
          safeValue: function safeValue(val) {
            return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
          }
        }];
        todos.forEach(function (todo) {
          replaces = 0;
          while (match = todo.regex.exec(str)) {
            var matchedVar = match[1].trim();
            value = handleFormat(matchedVar);
            if (value === undefined) {
              if (typeof missingInterpolationHandler === 'function') {
                var temp = missingInterpolationHandler(str, match, options);
                value = typeof temp === 'string' ? temp : '';
              } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
                value = '';
              } else if (skipOnVariables) {
                value = match[0];
                continue;
              } else {
                _this.logger.warn("missed to pass in variable ".concat(matchedVar, " for interpolating ").concat(str));
                value = '';
              }
            } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
              value = makeString(value);
            }
            var safeValue = todo.safeValue(value);
            str = str.replace(match[0], safeValue);
            if (skipOnVariables) {
              todo.regex.lastIndex += value.length;
              todo.regex.lastIndex -= match[0].length;
            } else {
              todo.regex.lastIndex = 0;
            }
            replaces++;
            if (replaces >= _this.maxReplaces) {
              break;
            }
          }
        });
        return str;
      }
    }, {
      key: "nest",
      value: function nest(str, fc) {
        var _this2 = this;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var match;
        var value;
        var clonedOptions;
        function handleHasOptions(key, inheritedOptions) {
          var sep = this.nestingOptionsSeparator;
          if (key.indexOf(sep) < 0) return key;
          var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
          var optionsString = "{".concat(c[1]);
          key = c[0];
          optionsString = this.interpolate(optionsString, clonedOptions);
          var matchedSingleQuotes = optionsString.match(/'/g);
          var matchedDoubleQuotes = optionsString.match(/"/g);
          if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
            optionsString = optionsString.replace(/'/g, '"');
          }
          try {
            clonedOptions = JSON.parse(optionsString);
            if (inheritedOptions) clonedOptions = _objectSpread$3(_objectSpread$3({}, inheritedOptions), clonedOptions);
          } catch (e) {
            this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
            return "".concat(key).concat(sep).concat(optionsString);
          }
          delete clonedOptions.defaultValue;
          return key;
        }
        while (match = this.nestingRegexp.exec(str)) {
          var formatters = [];
          clonedOptions = _objectSpread$3({}, options);
          clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== 'string' ? clonedOptions.replace : clonedOptions;
          clonedOptions.applyPostProcessor = false;
          delete clonedOptions.defaultValue;
          var doReduce = false;
          if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
            var r = match[1].split(this.formatSeparator).map(function (elem) {
              return elem.trim();
            });
            match[1] = r.shift();
            formatters = r;
            doReduce = true;
          }
          value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
          if (value && match[0] === str && typeof value !== 'string') return value;
          if (typeof value !== 'string') value = makeString(value);
          if (!value) {
            this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
            value = '';
          }
          if (doReduce) {
            value = formatters.reduce(function (v, f) {
              return _this2.format(v, f, options.lng, _objectSpread$3(_objectSpread$3({}, options), {}, {
                interpolationkey: match[1].trim()
              }));
            }, value.trim());
          }
          str = str.replace(match[0], value);
          this.regexp.lastIndex = 0;
        }
        return str;
      }
    }]);
    return Interpolator;
  }();

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function parseFormatStr(formatStr) {
    var formatName = formatStr.toLowerCase().trim();
    var formatOptions = {};
    if (formatStr.indexOf('(') > -1) {
      var p = formatStr.split('(');
      formatName = p[0].toLowerCase().trim();
      var optStr = p[1].substring(0, p[1].length - 1);
      if (formatName === 'currency' && optStr.indexOf(':') < 0) {
        if (!formatOptions.currency) formatOptions.currency = optStr.trim();
      } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
        if (!formatOptions.range) formatOptions.range = optStr.trim();
      } else {
        var opts = optStr.split(';');
        opts.forEach(function (opt) {
          if (!opt) return;
          var _opt$split = opt.split(':'),
            _opt$split2 = _toArray(_opt$split),
            key = _opt$split2[0],
            rest = _opt$split2.slice(1);
          var val = rest.join(':').trim().replace(/^'+|'+$/g, '');
          if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val;
          if (val === 'false') formatOptions[key.trim()] = false;
          if (val === 'true') formatOptions[key.trim()] = true;
          if (!isNaN(val)) formatOptions[key.trim()] = parseInt(val, 10);
        });
      }
    }
    return {
      formatName: formatName,
      formatOptions: formatOptions
    };
  }
  function createCachedFormatter(fn) {
    var cache = {};
    return function invokeFormatter(val, lng, options) {
      var key = lng + JSON.stringify(options);
      var formatter = cache[key];
      if (!formatter) {
        formatter = fn(lng, options);
        cache[key] = formatter;
      }
      return formatter(val);
    };
  }
  var Formatter = function () {
    function Formatter() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Formatter);
      this.logger = baseLogger.create('formatter');
      this.options = options;
      this.formats = {
        number: createCachedFormatter(function (lng, opt) {
          var formatter = new Intl.NumberFormat(lng, _objectSpread$2({}, opt));
          return function (val) {
            return formatter.format(val);
          };
        }),
        currency: createCachedFormatter(function (lng, opt) {
          var formatter = new Intl.NumberFormat(lng, _objectSpread$2(_objectSpread$2({}, opt), {}, {
            style: 'currency'
          }));
          return function (val) {
            return formatter.format(val);
          };
        }),
        datetime: createCachedFormatter(function (lng, opt) {
          var formatter = new Intl.DateTimeFormat(lng, _objectSpread$2({}, opt));
          return function (val) {
            return formatter.format(val);
          };
        }),
        relativetime: createCachedFormatter(function (lng, opt) {
          var formatter = new Intl.RelativeTimeFormat(lng, _objectSpread$2({}, opt));
          return function (val) {
            return formatter.format(val, opt.range || 'day');
          };
        }),
        list: createCachedFormatter(function (lng, opt) {
          var formatter = new Intl.ListFormat(lng, _objectSpread$2({}, opt));
          return function (val) {
            return formatter.format(val);
          };
        })
      };
      this.init(options);
    }
    _createClass(Formatter, [{
      key: "init",
      value: function init(services) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          interpolation: {}
        };
        var iOpts = options.interpolation;
        this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
      }
    }, {
      key: "add",
      value: function add(name, fc) {
        this.formats[name.toLowerCase().trim()] = fc;
      }
    }, {
      key: "addCached",
      value: function addCached(name, fc) {
        this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
      }
    }, {
      key: "format",
      value: function format(value, _format, lng) {
        var _this = this;
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var formats = _format.split(this.formatSeparator);
        var result = formats.reduce(function (mem, f) {
          var _parseFormatStr = parseFormatStr(f),
            formatName = _parseFormatStr.formatName,
            formatOptions = _parseFormatStr.formatOptions;
          if (_this.formats[formatName]) {
            var formatted = mem;
            try {
              var valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
              var l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
              formatted = _this.formats[formatName](mem, l, _objectSpread$2(_objectSpread$2(_objectSpread$2({}, formatOptions), options), valOptions));
            } catch (error) {
              _this.logger.warn(error);
            }
            return formatted;
          } else {
            _this.logger.warn("there was no format function for ".concat(formatName));
          }
          return mem;
        }, value);
        return result;
      }
    }]);
    return Formatter;
  }();

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  function removePending(q, name) {
    if (q.pending[name] !== undefined) {
      delete q.pending[name];
      q.pendingCount--;
    }
  }
  var Connector = function (_EventEmitter) {
    _inherits(Connector, _EventEmitter);
    var _super = _createSuper$1(Connector);
    function Connector(backend, store, services) {
      var _this;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      _classCallCheck(this, Connector);
      _this = _super.call(this);
      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }
      _this.backend = backend;
      _this.store = store;
      _this.services = services;
      _this.languageUtils = services.languageUtils;
      _this.options = options;
      _this.logger = baseLogger.create('backendConnector');
      _this.waitingReads = [];
      _this.maxParallelReads = options.maxParallelReads || 10;
      _this.readingCalls = 0;
      _this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
      _this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
      _this.state = {};
      _this.queue = [];
      if (_this.backend && _this.backend.init) {
        _this.backend.init(services, options.backend, options);
      }
      return _this;
    }
    _createClass(Connector, [{
      key: "queueLoad",
      value: function queueLoad(languages, namespaces, options, callback) {
        var _this2 = this;
        var toLoad = {};
        var pending = {};
        var toLoadLanguages = {};
        var toLoadNamespaces = {};
        languages.forEach(function (lng) {
          var hasAllNamespaces = true;
          namespaces.forEach(function (ns) {
            var name = "".concat(lng, "|").concat(ns);
            if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
              _this2.state[name] = 2;
            } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
              if (pending[name] === undefined) pending[name] = true;
            } else {
              _this2.state[name] = 1;
              hasAllNamespaces = false;
              if (pending[name] === undefined) pending[name] = true;
              if (toLoad[name] === undefined) toLoad[name] = true;
              if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
            }
          });
          if (!hasAllNamespaces) toLoadLanguages[lng] = true;
        });
        if (Object.keys(toLoad).length || Object.keys(pending).length) {
          this.queue.push({
            pending: pending,
            pendingCount: Object.keys(pending).length,
            loaded: {},
            errors: [],
            callback: callback
          });
        }
        return {
          toLoad: Object.keys(toLoad),
          pending: Object.keys(pending),
          toLoadLanguages: Object.keys(toLoadLanguages),
          toLoadNamespaces: Object.keys(toLoadNamespaces)
        };
      }
    }, {
      key: "loaded",
      value: function loaded(name, err, data) {
        var s = name.split('|');
        var lng = s[0];
        var ns = s[1];
        if (err) this.emit('failedLoading', lng, ns, err);
        if (data) {
          this.store.addResourceBundle(lng, ns, data);
        }
        this.state[name] = err ? -1 : 2;
        var loaded = {};
        this.queue.forEach(function (q) {
          pushPath(q.loaded, [lng], ns);
          removePending(q, name);
          if (err) q.errors.push(err);
          if (q.pendingCount === 0 && !q.done) {
            Object.keys(q.loaded).forEach(function (l) {
              if (!loaded[l]) loaded[l] = {};
              var loadedKeys = q.loaded[l];
              if (loadedKeys.length) {
                loadedKeys.forEach(function (n) {
                  if (loaded[l][n] === undefined) loaded[l][n] = true;
                });
              }
            });
            q.done = true;
            if (q.errors.length) {
              q.callback(q.errors);
            } else {
              q.callback();
            }
          }
        });
        this.emit('loaded', loaded);
        this.queue = this.queue.filter(function (q) {
          return !q.done;
        });
      }
    }, {
      key: "read",
      value: function read(lng, ns, fcName) {
        var _this3 = this;
        var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
        var callback = arguments.length > 5 ? arguments[5] : undefined;
        if (!lng.length) return callback(null, {});
        if (this.readingCalls >= this.maxParallelReads) {
          this.waitingReads.push({
            lng: lng,
            ns: ns,
            fcName: fcName,
            tried: tried,
            wait: wait,
            callback: callback
          });
          return;
        }
        this.readingCalls++;
        var resolver = function resolver(err, data) {
          _this3.readingCalls--;
          if (_this3.waitingReads.length > 0) {
            var next = _this3.waitingReads.shift();
            _this3.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
          }
          if (err && data && tried < _this3.maxRetries) {
            setTimeout(function () {
              _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
            }, wait);
            return;
          }
          callback(err, data);
        };
        var fc = this.backend[fcName].bind(this.backend);
        if (fc.length === 2) {
          try {
            var r = fc(lng, ns);
            if (r && typeof r.then === 'function') {
              r.then(function (data) {
                return resolver(null, data);
              })["catch"](resolver);
            } else {
              resolver(null, r);
            }
          } catch (err) {
            resolver(err);
          }
          return;
        }
        return fc(lng, ns, resolver);
      }
    }, {
      key: "prepareLoading",
      value: function prepareLoading(languages, namespaces) {
        var _this4 = this;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var callback = arguments.length > 3 ? arguments[3] : undefined;
        if (!this.backend) {
          this.logger.warn('No backend was added via i18next.use. Will not load resources.');
          return callback && callback();
        }
        if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
        if (typeof namespaces === 'string') namespaces = [namespaces];
        var toLoad = this.queueLoad(languages, namespaces, options, callback);
        if (!toLoad.toLoad.length) {
          if (!toLoad.pending.length) callback();
          return null;
        }
        toLoad.toLoad.forEach(function (name) {
          _this4.loadOne(name);
        });
      }
    }, {
      key: "load",
      value: function load(languages, namespaces, callback) {
        this.prepareLoading(languages, namespaces, {}, callback);
      }
    }, {
      key: "reload",
      value: function reload(languages, namespaces, callback) {
        this.prepareLoading(languages, namespaces, {
          reload: true
        }, callback);
      }
    }, {
      key: "loadOne",
      value: function loadOne(name) {
        var _this5 = this;
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var s = name.split('|');
        var lng = s[0];
        var ns = s[1];
        this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
          if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
          if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);
          _this5.loaded(name, err, data);
        });
      }
    }, {
      key: "saveMissing",
      value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        var clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function () {};
        if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
          this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          return;
        }
        if (key === undefined || key === null || key === '') return;
        if (this.backend && this.backend.create) {
          var opts = _objectSpread$1(_objectSpread$1({}, options), {}, {
            isUpdate: isUpdate
          });
          var fc = this.backend.create.bind(this.backend);
          if (fc.length < 6) {
            try {
              var r;
              if (fc.length === 5) {
                r = fc(languages, namespace, key, fallbackValue, opts);
              } else {
                r = fc(languages, namespace, key, fallbackValue);
              }
              if (r && typeof r.then === 'function') {
                r.then(function (data) {
                  return clb(null, data);
                })["catch"](clb);
              } else {
                clb(null, r);
              }
            } catch (err) {
              clb(err);
            }
          } else {
            fc(languages, namespace, key, fallbackValue, clb, opts);
          }
        }
        if (!languages || !languages[0]) return;
        this.store.addResource(languages[0], namespace, key, fallbackValue);
      }
    }]);
    return Connector;
  }(EventEmitter);

  function get() {
    return {
      debug: false,
      initImmediate: true,
      ns: ['translation'],
      defaultNS: ['translation'],
      fallbackLng: ['dev'],
      fallbackNS: false,
      supportedLngs: false,
      nonExplicitSupportedLngs: false,
      load: 'all',
      preload: false,
      simplifyPluralSuffix: true,
      keySeparator: '.',
      nsSeparator: ':',
      pluralSeparator: '_',
      contextSeparator: '_',
      partialBundledLanguages: false,
      saveMissing: false,
      updateMissing: false,
      saveMissingTo: 'fallback',
      saveMissingPlurals: true,
      missingKeyHandler: false,
      missingInterpolationHandler: false,
      postProcess: false,
      postProcessPassResolved: false,
      returnNull: true,
      returnEmptyString: true,
      returnObjects: false,
      joinArrays: false,
      returnedObjectHandler: false,
      parseMissingKeyHandler: false,
      appendNamespaceToMissingKey: false,
      appendNamespaceToCIMode: false,
      overloadTranslationOptionHandler: function handle(args) {
        var ret = {};
        if (_typeof(args[1]) === 'object') ret = args[1];
        if (typeof args[1] === 'string') ret.defaultValue = args[1];
        if (typeof args[2] === 'string') ret.tDescription = args[2];
        if (_typeof(args[2]) === 'object' || _typeof(args[3]) === 'object') {
          var options = args[3] || args[2];
          Object.keys(options).forEach(function (key) {
            ret[key] = options[key];
          });
        }
        return ret;
      },
      interpolation: {
        escapeValue: true,
        format: function format(value, _format, lng, options) {
          return value;
        },
        prefix: '{{',
        suffix: '}}',
        formatSeparator: ',',
        unescapePrefix: '-',
        nestingPrefix: '$t(',
        nestingSuffix: ')',
        nestingOptionsSeparator: ',',
        maxReplaces: 1000,
        skipOnVariables: true
      }
    };
  }
  function transformOptions(options) {
    if (typeof options.ns === 'string') options.ns = [options.ns];
    if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
    if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];
    if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
      options.supportedLngs = options.supportedLngs.concat(['cimode']);
    }
    return options;
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  function noop() {}
  function bindMemberFunctions(inst) {
    var mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
    mems.forEach(function (mem) {
      if (typeof inst[mem] === 'function') {
        inst[mem] = inst[mem].bind(inst);
      }
    });
  }
  var I18n = function (_EventEmitter) {
    _inherits(I18n, _EventEmitter);
    var _super = _createSuper(I18n);
    function I18n() {
      var _this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, I18n);
      _this = _super.call(this);
      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }
      _this.options = transformOptions(options);
      _this.services = {};
      _this.logger = baseLogger;
      _this.modules = {
        external: []
      };
      bindMemberFunctions(_assertThisInitialized(_this));
      if (callback && !_this.isInitialized && !options.isClone) {
        if (!_this.options.initImmediate) {
          _this.init(options, callback);
          return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
        }
        setTimeout(function () {
          _this.init(options, callback);
        }, 0);
      }
      return _this;
    }
    _createClass(I18n, [{
      key: "init",
      value: function init() {
        var _this2 = this;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments.length > 1 ? arguments[1] : undefined;
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }
        if (!options.defaultNS && options.defaultNS !== false && options.ns) {
          if (typeof options.ns === 'string') {
            options.defaultNS = options.ns;
          } else if (options.ns.indexOf('translation') < 0) {
            options.defaultNS = options.ns[0];
          }
        }
        var defOpts = get();
        this.options = _objectSpread(_objectSpread(_objectSpread({}, defOpts), this.options), transformOptions(options));
        if (this.options.compatibilityAPI !== 'v1') {
          this.options.interpolation = _objectSpread(_objectSpread({}, defOpts.interpolation), this.options.interpolation);
        }
        if (options.keySeparator !== undefined) {
          this.options.userDefinedKeySeparator = options.keySeparator;
        }
        if (options.nsSeparator !== undefined) {
          this.options.userDefinedNsSeparator = options.nsSeparator;
        }
        function createClassOnDemand(ClassOrObject) {
          if (!ClassOrObject) return null;
          if (typeof ClassOrObject === 'function') return new ClassOrObject();
          return ClassOrObject;
        }
        if (!this.options.isClone) {
          if (this.modules.logger) {
            baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
          } else {
            baseLogger.init(null, this.options);
          }
          var formatter;
          if (this.modules.formatter) {
            formatter = this.modules.formatter;
          } else if (typeof Intl !== 'undefined') {
            formatter = Formatter;
          }
          var lu = new LanguageUtil(this.options);
          this.store = new ResourceStore(this.options.resources, this.options);
          var s = this.services;
          s.logger = baseLogger;
          s.resourceStore = this.store;
          s.languageUtils = lu;
          s.pluralResolver = new PluralResolver(lu, {
            prepend: this.options.pluralSeparator,
            compatibilityJSON: this.options.compatibilityJSON,
            simplifyPluralSuffix: this.options.simplifyPluralSuffix
          });
          if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
            s.formatter = createClassOnDemand(formatter);
            s.formatter.init(s, this.options);
            this.options.interpolation.format = s.formatter.format.bind(s.formatter);
          }
          s.interpolator = new Interpolator(this.options);
          s.utils = {
            hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
          };
          s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
          s.backendConnector.on('*', function (event) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            _this2.emit.apply(_this2, [event].concat(args));
          });
          if (this.modules.languageDetector) {
            s.languageDetector = createClassOnDemand(this.modules.languageDetector);
            if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
          }
          if (this.modules.i18nFormat) {
            s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
            if (s.i18nFormat.init) s.i18nFormat.init(this);
          }
          this.translator = new Translator(this.services, this.options);
          this.translator.on('*', function (event) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            _this2.emit.apply(_this2, [event].concat(args));
          });
          this.modules.external.forEach(function (m) {
            if (m.init) m.init(_this2);
          });
        }
        this.format = this.options.interpolation.format;
        if (!callback) callback = noop;
        if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
          var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
        }
        if (!this.services.languageDetector && !this.options.lng) {
          this.logger.warn('init: no languageDetector is used and no lng is defined');
        }
        var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
        storeApi.forEach(function (fcName) {
          _this2[fcName] = function () {
            var _this2$store;
            return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
          };
        });
        var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
        storeApiChained.forEach(function (fcName) {
          _this2[fcName] = function () {
            var _this2$store2;
            (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);
            return _this2;
          };
        });
        var deferred = defer();
        var load = function load() {
          var finish = function finish(err, t) {
            if (_this2.isInitialized && !_this2.initializedStoreOnce) _this2.logger.warn('init: i18next is already initialized. You should call init just once!');
            _this2.isInitialized = true;
            if (!_this2.options.isClone) _this2.logger.log('initialized', _this2.options);
            _this2.emit('initialized', _this2.options);
            deferred.resolve(t);
            callback(err, t);
          };
          if (_this2.languages && _this2.options.compatibilityAPI !== 'v1' && !_this2.isInitialized) return finish(null, _this2.t.bind(_this2));
          _this2.changeLanguage(_this2.options.lng, finish);
        };
        if (this.options.resources || !this.options.initImmediate) {
          load();
        } else {
          setTimeout(load, 0);
        }
        return deferred;
      }
    }, {
      key: "loadResources",
      value: function loadResources(language) {
        var _this3 = this;
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
        var usedCallback = callback;
        var usedLng = typeof language === 'string' ? language : this.language;
        if (typeof language === 'function') usedCallback = language;
        if (!this.options.resources || this.options.partialBundledLanguages) {
          if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
          var toLoad = [];
          var append = function append(lng) {
            if (!lng) return;
            var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
            lngs.forEach(function (l) {
              if (toLoad.indexOf(l) < 0) toLoad.push(l);
            });
          };
          if (!usedLng) {
            var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            fallbacks.forEach(function (l) {
              return append(l);
            });
          } else {
            append(usedLng);
          }
          if (this.options.preload) {
            this.options.preload.forEach(function (l) {
              return append(l);
            });
          }
          this.services.backendConnector.load(toLoad, this.options.ns, function (e) {
            if (!e && !_this3.resolvedLanguage && _this3.language) _this3.setResolvedLanguage(_this3.language);
            usedCallback(e);
          });
        } else {
          usedCallback(null);
        }
      }
    }, {
      key: "reloadResources",
      value: function reloadResources(lngs, ns, callback) {
        var deferred = defer();
        if (!lngs) lngs = this.languages;
        if (!ns) ns = this.options.ns;
        if (!callback) callback = noop;
        this.services.backendConnector.reload(lngs, ns, function (err) {
          deferred.resolve();
          callback(err);
        });
        return deferred;
      }
    }, {
      key: "use",
      value: function use(module) {
        if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
        if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
        if (module.type === 'backend') {
          this.modules.backend = module;
        }
        if (module.type === 'logger' || module.log && module.warn && module.error) {
          this.modules.logger = module;
        }
        if (module.type === 'languageDetector') {
          this.modules.languageDetector = module;
        }
        if (module.type === 'i18nFormat') {
          this.modules.i18nFormat = module;
        }
        if (module.type === 'postProcessor') {
          postProcessor.addPostProcessor(module);
        }
        if (module.type === 'formatter') {
          this.modules.formatter = module;
        }
        if (module.type === '3rdParty') {
          this.modules.external.push(module);
        }
        return this;
      }
    }, {
      key: "setResolvedLanguage",
      value: function setResolvedLanguage(l) {
        if (!l || !this.languages) return;
        if (['cimode', 'dev'].indexOf(l) > -1) return;
        for (var li = 0; li < this.languages.length; li++) {
          var lngInLngs = this.languages[li];
          if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
          if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
            this.resolvedLanguage = lngInLngs;
            break;
          }
        }
      }
    }, {
      key: "changeLanguage",
      value: function changeLanguage(lng, callback) {
        var _this4 = this;
        this.isLanguageChangingTo = lng;
        var deferred = defer();
        this.emit('languageChanging', lng);
        var setLngProps = function setLngProps(l) {
          _this4.language = l;
          _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
          _this4.resolvedLanguage = undefined;
          _this4.setResolvedLanguage(l);
        };
        var done = function done(err, l) {
          if (l) {
            setLngProps(l);
            _this4.translator.changeLanguage(l);
            _this4.isLanguageChangingTo = undefined;
            _this4.emit('languageChanged', l);
            _this4.logger.log('languageChanged', l);
          } else {
            _this4.isLanguageChangingTo = undefined;
          }
          deferred.resolve(function () {
            return _this4.t.apply(_this4, arguments);
          });
          if (callback) callback(err, function () {
            return _this4.t.apply(_this4, arguments);
          });
        };
        var setLng = function setLng(lngs) {
          if (!lng && !lngs && _this4.services.languageDetector) lngs = [];
          var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);
          if (l) {
            if (!_this4.language) {
              setLngProps(l);
            }
            if (!_this4.translator.language) _this4.translator.changeLanguage(l);
            if (_this4.services.languageDetector && _this4.services.languageDetector.cacheUserLanguage) _this4.services.languageDetector.cacheUserLanguage(l);
          }
          _this4.loadResources(l, function (err) {
            done(err, l);
          });
        };
        if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
          setLng(this.services.languageDetector.detect());
        } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
          if (this.services.languageDetector.detect.length === 0) {
            this.services.languageDetector.detect().then(setLng);
          } else {
            this.services.languageDetector.detect(setLng);
          }
        } else {
          setLng(lng);
        }
        return deferred;
      }
    }, {
      key: "getFixedT",
      value: function getFixedT(lng, ns, keyPrefix) {
        var _this5 = this;
        var fixedT = function fixedT(key, opts) {
          var options;
          if (_typeof(opts) !== 'object') {
            for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
              rest[_key3 - 2] = arguments[_key3];
            }
            options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
          } else {
            options = _objectSpread({}, opts);
          }
          options.lng = options.lng || fixedT.lng;
          options.lngs = options.lngs || fixedT.lngs;
          options.ns = options.ns || fixedT.ns;
          options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
          var keySeparator = _this5.options.keySeparator || '.';
          var resultKey;
          if (options.keyPrefix && Array.isArray(key)) {
            resultKey = key.map(function (k) {
              return "".concat(options.keyPrefix).concat(keySeparator).concat(k);
            });
          } else {
            resultKey = options.keyPrefix ? "".concat(options.keyPrefix).concat(keySeparator).concat(key) : key;
          }
          return _this5.t(resultKey, options);
        };
        if (typeof lng === 'string') {
          fixedT.lng = lng;
        } else {
          fixedT.lngs = lng;
        }
        fixedT.ns = ns;
        fixedT.keyPrefix = keyPrefix;
        return fixedT;
      }
    }, {
      key: "t",
      value: function t() {
        var _this$translator;
        return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
      }
    }, {
      key: "exists",
      value: function exists() {
        var _this$translator2;
        return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
      }
    }, {
      key: "setDefaultNamespace",
      value: function setDefaultNamespace(ns) {
        this.options.defaultNS = ns;
      }
    }, {
      key: "hasLoadedNamespace",
      value: function hasLoadedNamespace(ns) {
        var _this6 = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!this.isInitialized) {
          this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
          return false;
        }
        if (!this.languages || !this.languages.length) {
          this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
          return false;
        }
        var lng = options.lng || this.resolvedLanguage || this.languages[0];
        var fallbackLng = this.options ? this.options.fallbackLng : false;
        var lastLng = this.languages[this.languages.length - 1];
        if (lng.toLowerCase() === 'cimode') return true;
        var loadNotPending = function loadNotPending(l, n) {
          var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];
          return loadState === -1 || loadState === 2;
        };
        if (options.precheck) {
          var preResult = options.precheck(this, loadNotPending);
          if (preResult !== undefined) return preResult;
        }
        if (this.hasResourceBundle(lng, ns)) return true;
        if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
        if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
        return false;
      }
    }, {
      key: "loadNamespaces",
      value: function loadNamespaces(ns, callback) {
        var _this7 = this;
        var deferred = defer();
        if (!this.options.ns) {
          if (callback) callback();
          return Promise.resolve();
        }
        if (typeof ns === 'string') ns = [ns];
        ns.forEach(function (n) {
          if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
        });
        this.loadResources(function (err) {
          deferred.resolve();
          if (callback) callback(err);
        });
        return deferred;
      }
    }, {
      key: "loadLanguages",
      value: function loadLanguages(lngs, callback) {
        var deferred = defer();
        if (typeof lngs === 'string') lngs = [lngs];
        var preloaded = this.options.preload || [];
        var newLngs = lngs.filter(function (lng) {
          return preloaded.indexOf(lng) < 0;
        });
        if (!newLngs.length) {
          if (callback) callback();
          return Promise.resolve();
        }
        this.options.preload = preloaded.concat(newLngs);
        this.loadResources(function (err) {
          deferred.resolve();
          if (callback) callback(err);
        });
        return deferred;
      }
    }, {
      key: "dir",
      value: function dir(lng) {
        if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
        if (!lng) return 'rtl';
        var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
        var languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get());
        return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
      }
    }, {
      key: "cloneInstance",
      value: function cloneInstance() {
        var _this8 = this;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
        var mergedOptions = _objectSpread(_objectSpread(_objectSpread({}, this.options), options), {
          isClone: true
        });
        var clone = new I18n(mergedOptions);
        if (options.debug !== undefined || options.prefix !== undefined) {
          clone.logger = clone.logger.clone(options);
        }
        var membersToCopy = ['store', 'services', 'language'];
        membersToCopy.forEach(function (m) {
          clone[m] = _this8[m];
        });
        clone.services = _objectSpread({}, this.services);
        clone.services.utils = {
          hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
        };
        clone.translator = new Translator(clone.services, clone.options);
        clone.translator.on('*', function (event) {
          for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }
          clone.emit.apply(clone, [event].concat(args));
        });
        clone.init(mergedOptions, callback);
        clone.translator.options = clone.options;
        clone.translator.backendConnector.services.utils = {
          hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
        };
        return clone;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          options: this.options,
          store: this.store,
          language: this.language,
          languages: this.languages,
          resolvedLanguage: this.resolvedLanguage
        };
      }
    }]);
    return I18n;
  }(EventEmitter);
  _defineProperty(I18n, "createInstance", function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    return new I18n(options, callback);
  });
  var instance = I18n.createInstance();
  instance.createInstance = I18n.createInstance;

  return instance;

}));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.i18nextBrowserLanguageDetector = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var arr = [];
  var each = arr.forEach;
  var slice = arr.slice;
  function defaults(obj) {
    each.call(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === undefined) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  // eslint-disable-next-line no-control-regex
  var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

  var serializeCookie = function serializeCookie(name, val, options) {
    var opt = options || {};
    opt.path = opt.path || '/';
    var value = encodeURIComponent(val);
    var str = "".concat(name, "=").concat(value);

    if (opt.maxAge > 0) {
      var maxAge = opt.maxAge - 0;
      if (Number.isNaN(maxAge)) throw new Error('maxAge should be a Number');
      str += "; Max-Age=".concat(Math.floor(maxAge));
    }

    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError('option domain is invalid');
      }

      str += "; Domain=".concat(opt.domain);
    }

    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError('option path is invalid');
      }

      str += "; Path=".concat(opt.path);
    }

    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== 'function') {
        throw new TypeError('option expires is invalid');
      }

      str += "; Expires=".concat(opt.expires.toUTCString());
    }

    if (opt.httpOnly) str += '; HttpOnly';
    if (opt.secure) str += '; Secure';

    if (opt.sameSite) {
      var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

      switch (sameSite) {
        case true:
          str += '; SameSite=Strict';
          break;

        case 'lax':
          str += '; SameSite=Lax';
          break;

        case 'strict':
          str += '; SameSite=Strict';
          break;

        case 'none':
          str += '; SameSite=None';
          break;

        default:
          throw new TypeError('option sameSite is invalid');
      }
    }

    return str;
  };

  var cookie = {
    create: function create(name, value, minutes, domain) {
      var cookieOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        path: '/',
        sameSite: 'strict'
      };

      if (minutes) {
        cookieOptions.expires = new Date();
        cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1000);
      }

      if (domain) cookieOptions.domain = domain;
      document.cookie = serializeCookie(name, encodeURIComponent(value), cookieOptions);
    },
    read: function read(name) {
      var nameEQ = "".concat(name, "=");
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }

      return null;
    },
    remove: function remove(name) {
      this.create(name, '', -1);
    }
  };
  var cookie$1 = {
    name: 'cookie',
    lookup: function lookup(options) {
      var found;

      if (options.lookupCookie && typeof document !== 'undefined') {
        var c = cookie.read(options.lookupCookie);
        if (c) found = c;
      }

      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupCookie && typeof document !== 'undefined') {
        cookie.create(options.lookupCookie, lng, options.cookieMinutes, options.cookieDomain, options.cookieOptions);
      }
    }
  };

  var querystring = {
    name: 'querystring',
    lookup: function lookup(options) {
      var found;

      if (typeof window !== 'undefined') {
        var search = window.location.search;

        if (!window.location.search && window.location.hash && window.location.hash.indexOf('?') > -1) {
          search = window.location.hash.substring(window.location.hash.indexOf('?'));
        }

        var query = search.substring(1);
        var params = query.split('&');

        for (var i = 0; i < params.length; i++) {
          var pos = params[i].indexOf('=');

          if (pos > 0) {
            var key = params[i].substring(0, pos);

            if (key === options.lookupQuerystring) {
              found = params[i].substring(pos + 1);
            }
          }
        }
      }

      return found;
    }
  };

  var hasLocalStorageSupport = null;

  var localStorageAvailable = function localStorageAvailable() {
    if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;

    try {
      hasLocalStorageSupport = window !== 'undefined' && window.localStorage !== null;
      var testKey = 'i18next.translate.boo';
      window.localStorage.setItem(testKey, 'foo');
      window.localStorage.removeItem(testKey);
    } catch (e) {
      hasLocalStorageSupport = false;
    }

    return hasLocalStorageSupport;
  };

  var localStorage = {
    name: 'localStorage',
    lookup: function lookup(options) {
      var found;

      if (options.lookupLocalStorage && localStorageAvailable()) {
        var lng = window.localStorage.getItem(options.lookupLocalStorage);
        if (lng) found = lng;
      }

      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupLocalStorage && localStorageAvailable()) {
        window.localStorage.setItem(options.lookupLocalStorage, lng);
      }
    }
  };

  var hasSessionStorageSupport = null;

  var sessionStorageAvailable = function sessionStorageAvailable() {
    if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;

    try {
      hasSessionStorageSupport = window !== 'undefined' && window.sessionStorage !== null;
      var testKey = 'i18next.translate.boo';
      window.sessionStorage.setItem(testKey, 'foo');
      window.sessionStorage.removeItem(testKey);
    } catch (e) {
      hasSessionStorageSupport = false;
    }

    return hasSessionStorageSupport;
  };

  var sessionStorage = {
    name: 'sessionStorage',
    lookup: function lookup(options) {
      var found;

      if (options.lookupSessionStorage && sessionStorageAvailable()) {
        var lng = window.sessionStorage.getItem(options.lookupSessionStorage);
        if (lng) found = lng;
      }

      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupSessionStorage && sessionStorageAvailable()) {
        window.sessionStorage.setItem(options.lookupSessionStorage, lng);
      }
    }
  };

  var navigator$1 = {
    name: 'navigator',
    lookup: function lookup(options) {
      var found = [];

      if (typeof navigator !== 'undefined') {
        if (navigator.languages) {
          // chrome only; not an array, so can't use .push.apply instead of iterating
          for (var i = 0; i < navigator.languages.length; i++) {
            found.push(navigator.languages[i]);
          }
        }

        if (navigator.userLanguage) {
          found.push(navigator.userLanguage);
        }

        if (navigator.language) {
          found.push(navigator.language);
        }
      }

      return found.length > 0 ? found : undefined;
    }
  };

  var htmlTag = {
    name: 'htmlTag',
    lookup: function lookup(options) {
      var found;
      var htmlTag = options.htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);

      if (htmlTag && typeof htmlTag.getAttribute === 'function') {
        found = htmlTag.getAttribute('lang');
      }

      return found;
    }
  };

  var path = {
    name: 'path',
    lookup: function lookup(options) {
      var found;

      if (typeof window !== 'undefined') {
        var language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);

        if (language instanceof Array) {
          if (typeof options.lookupFromPathIndex === 'number') {
            if (typeof language[options.lookupFromPathIndex] !== 'string') {
              return undefined;
            }

            found = language[options.lookupFromPathIndex].replace('/', '');
          } else {
            found = language[0].replace('/', '');
          }
        }
      }

      return found;
    }
  };

  var subdomain = {
    name: 'subdomain',
    lookup: function lookup(options) {
      // If given get the subdomain index else 1
      var lookupFromSubdomainIndex = typeof options.lookupFromSubdomainIndex === 'number' ? options.lookupFromSubdomainIndex + 1 : 1; // get all matches if window.location. is existing
      // first item of match is the match itself and the second is the first group macht which sould be the first subdomain match
      // is the hostname no public domain get the or option of localhost

      var language = typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i); // if there is no match (null) return undefined

      if (!language) return undefined; // return the given group match

      return language[lookupFromSubdomainIndex];
    }
  };

  function getDefaults() {
    return {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      // cache user language
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'] // cookieMinutes: 10,
      // cookieDomain: 'myDomain'

    };
  }

  var Browser = /*#__PURE__*/function () {
    function Browser(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Browser);

      this.type = 'languageDetector';
      this.detectors = {};
      this.init(services, options);
    }

    _createClass(Browser, [{
      key: "init",
      value: function init(services) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.services = services;
        this.options = defaults(options, this.options || {}, getDefaults()); // backwards compatibility

        if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
        this.i18nOptions = i18nOptions;
        this.addDetector(cookie$1);
        this.addDetector(querystring);
        this.addDetector(localStorage);
        this.addDetector(sessionStorage);
        this.addDetector(navigator$1);
        this.addDetector(htmlTag);
        this.addDetector(path);
        this.addDetector(subdomain);
      }
    }, {
      key: "addDetector",
      value: function addDetector(detector) {
        this.detectors[detector.name] = detector;
      }
    }, {
      key: "detect",
      value: function detect(detectionOrder) {
        var _this = this;

        if (!detectionOrder) detectionOrder = this.options.order;
        var detected = [];
        detectionOrder.forEach(function (detectorName) {
          if (_this.detectors[detectorName]) {
            var lookup = _this.detectors[detectorName].lookup(_this.options);

            if (lookup && typeof lookup === 'string') lookup = [lookup];
            if (lookup) detected = detected.concat(lookup);
          }
        });
        if (this.services.languageUtils.getBestMatchFromCodes) return detected; // new i18next v19.5.0

        return detected.length > 0 ? detected[0] : null; // a little backward compatibility
      }
    }, {
      key: "cacheUserLanguage",
      value: function cacheUserLanguage(lng, caches) {
        var _this2 = this;

        if (!caches) caches = this.options.caches;
        if (!caches) return;
        if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
        caches.forEach(function (cacheName) {
          if (_this2.detectors[cacheName]) _this2.detectors[cacheName].cacheUserLanguage(lng, _this2.options);
        });
      }
    }]);

    return Browser;
  }();

  Browser.type = 'languageDetector';

  return Browser;

}));
(function(){
  var zmgr;
  zmgr = function(opt){
    opt == null && (opt = {});
    this.opt = opt;
    this.stack = [];
    this.step = opt.step || 1;
    if (opt.init != null) {
      this.init = opt.init;
    }
    this._g = import$(import$({}, zmgr.layer), opt.layer || {});
    this._v = {};
    this._s = {};
    return this;
  };
  zmgr.prototype = import$(Object.create(Object.prototype), {
    scope: function(n, s){
      var nv, this$ = this;
      nv = typeof n === 'number'
        ? n
        : this._g[n];
      return {
        add: function(_n, _s){
          var _nv;
          if (!(_n != null)) {
            _n = n;
          } else {
            _nv = typeof _n === 'number'
              ? _n
              : this$._g[_n];
            _n = this$.step < 0
              ? _nv < nv ? _n : n
              : _nv > nv ? _n : n;
          }
          return this$.add(_n, _s != null ? _s : s);
        },
        remove: function(_n, _v){
          return this$.remove(_n != null ? _n : n, _v);
        }
      };
    },
    add: function(v, s){
      var n, ref$;
      s == null && (s = 0);
      if (!(v != null) || typeof v === 'number') {
        if (!(v != null)) {
          v = this.init;
        }
        if (this.init != null) {
          v = this.step > 0
            ? Math.max(this.init, v)
            : Math.min(this.init, v);
        }
        if (!(this.value != null)) {
          this.value = v;
        }
        v = this.step > 0
          ? Math.max(this.value, v)
          : Math.min(this.value, v);
        v = v + (this.step > 0
          ? 1
          : -1) * Math.max(Math.abs(this.step), Math.abs(s));
        this.stack.push(v);
        this.value = v;
        return v;
      } else {
        n = v;
        v = (this.step > 0
          ? Math.max
          : Math.min)(this._g[n], this._v[n] || this._g[n]);
        v = v + (this.step > 0
          ? 1
          : -1) * Math.max(Math.abs(this.step), Math.abs(s));
        ((ref$ = this._s)[n] || (ref$[n] = [])).push(v);
        this._v[n] = v;
        return v;
      }
    },
    remove: function(n, v){
      var i, ref$;
      if (typeof n === 'number') {
        if (!~(i = this.stack.indexOf(n))) {
          return;
        }
        this.stack.splice(i, 1);
        return this.value = (ref$ = this.stack)[ref$.length - 1];
      } else {
        if (!(i = ((ref$ = this._s)[n] || (ref$[n] = [])).indexOf(v))) {
          return;
        }
        ((ref$ = this._s)[n] || (ref$[n] = [])).splice(i, 1);
        return this._v[n] = (ref$ = this._s)[ref$.length - 1];
      }
    }
  });
  zmgr.layer = {
    notify: 5000,
    splash: 4000,
    modal: 3000,
    fixed: 2000,
    float: 1000,
    base: 1
  };
  zmgr.notify = 'notify';
  zmgr.splash = 'splash';
  zmgr.modal = 'modal';
  zmgr.fixed = 'fixed';
  zmgr.float = 'float';
  zmgr.base = 'base';
  if (typeof module != 'undefined' && module !== null) {
    module.exports = zmgr;
  } else if (typeof window != 'undefined' && window !== null) {
    window.zmgr = zmgr;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.httputil = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function(){
  module.exports = function(k, v, o){
    var r, _k, _v, hash;
    if (v) {
      r = "";
      o = typeof o === 'string'
        ? o = {
          expires: o
        }
        : o || {};
      if (!o.path) {
        o.path = '/';
      }
      o.path = escape(o.path);
      for (_k in o) {
        _v = o[_k];
        r += ";" + _k + "=" + _v;
      }
      return document.cookie = (encodeURIComponent(k) + "=" + encodeURIComponent(v)) + r;
    }
    hash = {};
    (document.cookie || '').split(';').map(function(it){
      return it.split('=').map(function(it){
        return it.trim();
      });
    }).map(function(it){
      return hash[decodeURIComponent(it[0])] = decodeURIComponent(it[1]);
    });
    return k ? hash[k] : hash;
  };
}).call(this);

},{}],2:[function(require,module,exports){
(function(){
  var cookie, qs;
  cookie = require('./cookie');
  qs = require('./qs');
  module.exports = {
    cookie: cookie,
    qs: qs
  };
}).call(this);

},{"./cookie":1,"./qs":3}],3:[function(require,module,exports){
(function(){
  var local;
  local = {};
  module.exports = function(key){
    var k, v, hash;
    if (typeof key === 'object') {
      return "?" + (function(){
        var ref$, results$ = [];
        for (k in ref$ = key) {
          v = ref$[k];
          results$.push([k, v]);
        }
        return results$;
      }()).map(function(it){
        return encodeURIComponent(it[0]) + "=" + encodeURIComponent(it[1]);
      }).join('&');
    }
    if (!(hash = local.querystring)) {
      local.querystring = hash = {};
      (window.location.search || "").replace(/^\?/, '').split('&').map(function(it){
        return decodeURIComponent(it).split('=');
      }).map(function(it){
        return hash[it[0]] = it[1];
      });
    }
    return key ? hash[key] : hash;
  };
}).call(this);

},{}]},{},[2])(2)
});
(function(){
  var re, parse, fit;
  re = /(\D*)([^-]+)-?([.0-9a-zA-Z]*)(\+?[.0-9a-zA-Z]*)/;
  parse = function(v){
    var ret, ref$, vs, range;
    if (!(ret = re.exec(v))) {
      ref$ = [[], '', []], vs = ref$[0], range = ref$[1], ret = ref$[2];
    } else {
      ref$ = [ret[2].split('.'), ret[1] || ''], vs = ref$[0], range = ref$[1];
    }
    return [+(vs[0] || 0), +(vs[1] || 0), +(vs[2] || 0), ret[3] || '', ret[4] || '', range];
  };
  fit = function(v, r){
    var ref$, j, i$, i;
    ref$ = [
      Array.isArray(v)
        ? v
        : parse(v || ''), Array.isArray(r)
        ? r
        : parse(r || '')
    ], v = ref$[0], r = ref$[1];
    j = (function(){
      switch (r[5]) {
      case '^':
        return 0;
      case '~':
        return 1;
      case '>':
      case '>=':
        return -1;
      default:
        return 2;
      }
    }());
    for (i$ = 0; i$ < 3; ++i$) {
      i = i$;
      if (i <= j) {
        if (v[i] !== r[i]) {
          return false;
        }
      }
      if (v[i] < r[i]) {
        return false;
      }
    }
    return true;
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = {
      parse: parse,
      fit: fit
    };
  } else if (typeof window != 'undefined' && window !== null) {
    window.semver = {
      parse: parse,
      fit: fit
    };
  }
}).call(this);
(function(){
var win, doc, enableRspvarsetcb, _fetch, proxin, ref$, rsp, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
enableRspvarsetcb = true;
_fetch = function(u, c){
  if (rsp.__node && (typeof fs != 'undefined' && fs !== null) && !/^https?:/.exec(u)) {
    return new Promise(function(res, rej){
      return fs.readFile(u, function(e, b){
        if (e) {
          return rej(e);
        } else {
          return res(b.toString());
        }
      });
    });
  }
  return fetch(u, c).then(function(ret){
    var ref$;
    if (ret && ret.ok) {
      return ret.text();
    }
    if (!ret) {
      return Promise.reject((ref$ = new Error("404"), ref$.name = 'lderror', ref$.id = 404, ref$));
    }
    return ret.clone().text().then(function(t){
      var i, e, ref$, j, err;
      i = ret.status || 404;
      e = (ref$ = new Error(i + " " + t), ref$.name = 'lderror', ref$.id = i, ref$.message = t, ref$);
      try {
        if ((j = JSON.parse(t)) && j.name === 'lderror') {
          import$(e, j).json = j;
        }
      } catch (e$) {
        err = e$;
      }
      return Promise.reject(e);
    });
  });
};
proxin = function(o){
  var ref$, attr, intrinsic, func, unwrapped, wrapped, wm, evtProxy, varSetter, this$ = this;
  o == null && (o = {});
  this.lc = o.context || {};
  this.id = Math.random().toString(36).substring(2);
  this.mode = o.mode || 'default';
  if (o.iframe) {
    this.iframe = o.iframe;
  }
  ref$ = proxin.nativeKeys(o.iframe
    ? o.iframe.contentWindow
    : o.target || win), attr = ref$.attr, intrinsic = ref$.intrinsic;
  func = {};
  unwrapped = {};
  wrapped = {};
  wm = new WeakMap();
  evtProxy = function(evt){
    return new Proxy(evt, {
      get: function(t, key){
        var v;
        if (key === 'source') {
          return this$._proxy;
        }
        v = t[key];
        if (typeof v === 'function') {
          return v.bind(t);
        } else {
          return v;
        }
      }
    });
  };
  this._proxy = new Proxy(o.target || win, {
    has: function(t, k){
      if (this$.mode === 'with') {
        return true;
      } else {
        return Reflect.has(t, k);
      }
    },
    get: function(t, k, o){
      var f, e, ret;
      if (this$.mode === 'with') {
        if (k === Symbol.unscopables) {
          return undefined;
        }
        if (proxin.selfKeys[k]) {
          return this$._proxy;
        }
      }
      if (this$.lc[k] != null) {
        return this$.lc[k];
      }
      if (intrinsic[k]) {
        return t[k];
      }
      if (func[k] != null) {
        return func[k];
      }
      if (unwrapped[k] != null) {
        return unwrapped[k];
      }
      if (wrapped[k] != null) {
        return wrapped[k];
      }
      if (k === 'addEventListener') {
        return wrapped[k] = function(n, ocb){
          var rest, res$, i$, to$, ref$, ncb;
          res$ = [];
          for (i$ = 2, to$ = arguments.length; i$ < to$; ++i$) {
            res$.push(arguments[i$]);
          }
          rest = res$;
          if (n !== 'message') {
            return (ref$ = o.target || win).addEventListener.apply(ref$, [n, ocb].concat(arrayFrom$(rest)));
          }
          ncb = function(evt){
            return ocb.call(this$._proxy, evtProxy(evt));
          };
          (ref$ = o.target || win).addEventListener.apply(ref$, [n, ncb].concat(arrayFrom$(rest)));
          return wm.set(ocb, ncb);
        };
      }
      if (k === 'removeEventListener') {
        return wrapped[k] = function(n, ocb){
          var rest, res$, i$, to$, ref$;
          res$ = [];
          for (i$ = 2, to$ = arguments.length; i$ < to$; ++i$) {
            res$.push(arguments[i$]);
          }
          rest = res$;
          if (n !== 'message') {
            return (ref$ = o.target || win).removeEventListener.apply(ref$, [n, ocb].concat(arrayFrom$(rest)));
          }
          return (ref$ = o.target || win).removeEventListener.apply(ref$, [n, wm.get(ocb) || ocb].concat(arrayFrom$(rest)));
        };
      }
      if (typeof t[k] === 'function') {
        try {
          f = Reflect.get(t, k, o);
        } catch (e$) {
          e = e$;
          f = void 8;
        }
        if (typeof f !== 'function') {
          f = t[k];
        }
        ret = func[k] = new Proxy(f.bind(t), {
          get: function(d, g, o){
            return Reflect.get(in$(g, d) ? d : f, g, o);
          }
        });
        return ret;
      }
      if (attr[k] == null) {
        return undefined;
      }
      return t[k];
    },
    set: function(t, k, v){
      var f;
      if (enableRspvarsetcb) {
        if (k === '_rspvarsetcb_') {
          varSetter.on(v.k, v.f);
          return true;
        }
        varSetter.fire(k, v);
      }
      if (k === 'onmessage') {
        f = function(v){
          return function(evt){
            if (v) {
              return v.call(this$._proxy, evtProxy(evt));
            }
          };
        };
        unwrapped[k] = v;
        queueMicrotask(function(){
          return t[k] = f(v);
        });
        return true;
      }
      if (attr[k]) {
        t[k] = v;
        return true;
      }
      this$.lc[k] = v;
      return true;
    },
    defineProperty: function(t, k, d){
      Object.defineProperty(this$.lc, k, d);
      return this$._proxy;
    }
  });
  varSetter = {
    evthdr: {},
    on: function(n, cb){
      var this$ = this;
      return (Array.isArray(n)
        ? n
        : [n]).map(function(n){
        var ref$;
        return ((ref$ = this$.evthdr)[n] || (ref$[n] = [])).push(cb);
      });
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evthdr[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    }
  };
  return this;
};
proxin.nativeRe = /\{\s*\[native code\]\s*\}/;
proxin.nativeExtra = ['chrome'];
proxin.selfKeys = {
  window: true,
  self: true,
  globalThis: true,
  global: true,
  top: true,
  parent: true,
  frames: true
};
proxin.keysCache = new WeakMap();
proxin.nativeKeys = function(w){
  var ret, ref$, attr, intrinsic, p, i$, len$, k, d;
  if (ret = proxin.keysCache.get(w)) {
    return ret;
  }
  ref$ = [{}, {}], attr = ref$[0], intrinsic = ref$[1];
  p = Object.getPrototypeOf(w);
  while (p) {
    for (i$ = 0, len$ = (ref$ = Reflect.ownKeys(p)).length; i$ < len$; ++i$) {
      k = ref$[i$];
      attr[k] = true;
    }
    p = Object.getPrototypeOf(p);
  }
  for (i$ = 0, len$ = (ref$ = Reflect.ownKeys(w)).length; i$ < len$; ++i$) {
    k = ref$[i$];
    if (!(d = Object.getOwnPropertyDescriptor(w, k))) {
      continue;
    }
    if (d.get || d.set) {
      attr[k] = true;
    } else if (!d.enumerable) {
      attr[k] = true;
      if (typeof d.value === 'function') {
        intrinsic[k] = true;
      }
    } else if (typeof d.value === 'function' && proxin.nativeRe.exec(Function.prototype.toString.call(d.value))) {
      attr[k] = true;
    }
  }
  for (i$ = 0, len$ = (ref$ = proxin.nativeExtra).length; i$ < len$; ++i$) {
    k = ref$[i$];
    attr[k] = true;
  }
  proxin.keysCache.set(w, ret = {
    attr: attr,
    intrinsic: intrinsic
  });
  return ret;
};
proxin.prototype = (ref$ = Object.create(Object.prototype), ref$.proxy = function(){
  return this._proxy;
}, ref$.ctx = function(){
  return this.lc;
}, ref$);
rsp = function(o){
  o == null && (o = {});
  this.id = Math.random().toString(36).substring(2);
  this._cache = {};
  this._scope = o.scope || 'default';
  this._delivery = o.delivery || 'eval';
  this._scriptElement = o.scriptElement != null ? !!o.scriptElement : true;
  this._preloads = o.preloads || [];
  this.proxy = new proxin();
  this.registry(o.registry || "/assets/lib/");
  return this;
};
rsp.env = function(it){
  var ref$;
  return ref$ = [it, it.document], win = ref$[0], doc = ref$[1], ref$;
};
rsp.sourceUrl = function(src){
  if (src) {
    return "\n//# sourceURL=" + src;
  } else {
    return '';
  }
};
rsp.compile = function(code, src){
  if (win && typeof win.eval === 'function') {
    return win.eval("(function(scope, ctx, win){" + code + "})" + rsp.sourceUrl(src));
  }
  return new Function("scope", "ctx", "win", code);
};
rsp.markerType = 'application/rescope-marker';
rsp.markers = typeof WeakMap === 'function' ? new WeakMap() : null;
rsp.scriptNode = function(d, lib){
  var url, map, node;
  url = lib.url || lib.resolvedUrl;
  if (!(rsp.markers && d && d.createElement && url)) {
    return null;
  }
  if (!(map = rsp.markers.get(d))) {
    rsp.markers.set(d, map = {});
  }
  if (!(node = map[url])) {
    node = map[url] = d.createElement('script');
    node.setAttribute('type', rsp.markerType);
    node.setAttribute('src', url);
    node.setAttribute('data-rescope', lib.id || url);
  }
  (d.body || d.documentElement).appendChild(node);
  return node;
};
rsp.pretendScript = function(d, lib, f){
  var node, e, faked;
  node = null;
  try {
    node = rsp.scriptNode(d, lib);
  } catch (e$) {
    e = e$;
  }
  if (!node) {
    return f();
  }
  faked = false;
  try {
    Object.defineProperty(d, 'currentScript', {
      configurable: true,
      get: function(){
        return node;
      }
    });
    faked = true;
  } catch (e$) {
    e = e$;
  }
  try {
    return f();
  } finally {
    if (faked) {
      try {
        delete d.currentScript;
      } catch (e$) {
        e = e$;
      }
    }
  }
};
rsp.prop = {
  legacy: {
    webkitStorageInfo: true
  }
};
rsp.id = function(o){
  var path;
  path = o.path || (o.type === 'js'
    ? 'index.min.js'
    : o.type === 'css' ? 'index.min.css' : 'index.html');
  return o.id || o.url || (o.ns ? o.ns + ":" : '') + "" + o.name + "@" + (o.version || 'main') + ":" + path;
};
rsp._cache = {};
rsp._ver = {
  map: {},
  list: {}
};
rsp.genRegistry = '__rescope_gen__';
rsp.cache = function(o){
  var k, that, nv, p, s, ret, n, v, ref$, i$, to$, i, ver;
  if (typeof o === 'string') {
    o = {
      url: o
    };
  }
  if (Array.isArray(o.prop)) {
    import$(o, {
      prop: Object.fromEntries((function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = o.prop).length; i$ < len$; ++i$) {
          k = ref$[i$];
          results$.push([k, null]);
        }
        return results$;
      }())),
      propCached: true,
      propIniting: true
    });
  }
  if (!o.id) {
    o.id = rsp.id(o);
  }
  if (that = this._cache[o.id]) {
    return that;
  }
  if (o.id && !o.name) {
    k = o.id.split(':');
    if (k.length <= 2) {
      nv = k[0], p = k[1], s = k[2];
    } else {
      s = k[0], nv = k[1], p = k[2];
    }
    if (!(ret = /^(@?[^@]+)(?:@([^:]+))?$/.exec(nv))) {
      ret = ['', o.id, ''];
    }
    n = ret[1];
    v = ret[2];
  } else {
    ref$ = [o.ns, o.name, o.version || '', o.path || ''], s = ref$[0], n = ref$[1], v = ref$[2], p = ref$[3];
  }
  if (/^[0-9.]+$/.exec(v)) {
    if (that = ((ref$ = this._ver.map)[n] || (ref$[n] = {}))[v]) {
      v = that;
    }
    if (that = this._cache[rsp.id({
      ns: s,
      name: n,
      version: v,
      path: p
    })]) {
      return that;
    }
    for (i$ = 0, to$ = ((ref$ = this._ver.list)[n] || (ref$[n] = [])).length; i$ < to$; ++i$) {
      i = i$;
      ver = this._ver.list[n][i];
      if (!semver.fit(ver, v)) {
        continue;
      }
      this._ver.map[n][v] = ver;
      o.id = rsp.id({
        ns: s,
        name: n,
        version: ver,
        path: p
      });
      if (that = this._cache[o.id]) {
        return that;
      }
    }
  }
  if (!in$(v, (ref$ = this._ver.list)[n] || (ref$[n] = []))) {
    this._ver.list[n].push(v);
  }
  return this._cache[o.id] = o;
};
rsp.prototype = (ref$ = Object.create(Object.prototype), ref$.peekScope = function(){
  return false;
}, ref$.init = function(){
  return Promise.resolve();
}, ref$._url = function(o){
  var r, u, e;
  if (typeof (r = this._reg.url || this._reg) !== 'function') {
    return null;
  }
  u = null;
  try {
    u = r(o);
  } catch (e$) {
    e = e$;
  }
  return typeof u === 'string' ? u : null;
}, ref$._ref = function(lib){
  var o, r, ref$;
  o = typeof lib === 'string' ? {
    url: lib
  } : lib;
  if (typeof (r = this._reg.url || this._reg) === 'function') {
    o = (ref$ = import$({}, o), ref$.url = r(o), ref$);
    if (lib && typeof lib === 'object' && !lib.url && typeof o.url === 'string') {
      lib.resolvedUrl = o.url;
    }
  }
  return this._reg.fetch
    ? this._reg.fetch(o)
    : o.url;
}, ref$.registry = function(v){
  if (typeof v === 'string') {
    if (v[v.length - 1] === '/') {
      v = v.substring(0, v.length - 1);
    }
    return this._reg = function(v){
      return function(o){
        return o.url || v + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || 'index.min.js');
      };
    }(v);
  } else {
    return this._reg = v;
  }
}, ref$.cache = function(o){
  var that;
  if (typeof o === 'string') {
    o = {
      url: o
    };
  }
  if (!o.id) {
    o.id = rsp.id(o);
  }
  if (that = this._cache[o.id]) {
    return that;
  }
  return this._cache[o.id] = rsp.cache(o);
}, ref$.ifr = function(){
  var that, ifr, ref$;
  if (that = this.iframe) {
    return that;
  }
  this.iframe = ifr = doc.createElement('iframe');
  ref$ = ifr.style;
  ref$.position = 'absolute';
  ref$.top = 0;
  ref$.left = 0;
  ref$.width = 0;
  ref$.height = 0;
  ref$.pointerEvents = 'none';
  ref$.opacity = 0;
  ifr.setAttribute('title', "rescope script loader");
  ifr.setAttribute('name', "pdb-rescope-" + this.id);
  doc.body.appendChild(ifr);
  ifr.contentWindow.document.body.innerHTML = this._preloads.map(function(it){
    return "<script type=\"text/javascript\" src=\"" + it + "\"></script>";
  }).join('');
  return ifr;
}, ref$.exports = function(o){
  var ctx, libs, ref$, hash, iw, k, this$ = this, results$ = [];
  o == null && (o = {});
  ctx = o.ctx || {};
  libs = typeof o.libs === 'string'
    ? [o.libs]
    : o.libs || [];
  if (libs.every(function(lib){
    return this$.cache(lib).propCached;
  })) {
    return;
  }
  ref$ = [{}, this.ifr().contentWindow], hash = ref$[0], iw = ref$[1];
  for (k in ctx) {
    hash[k] = iw[k];
    iw[k] = ctx[k];
  }
  this._exports(libs, 0, ctx);
  for (k in hash) {
    results$.push(iw[k] = hash[k]);
  }
  return results$;
}, ref$._exports = function(libs, idx, ctx){
  var lib, ref$, hash, fprop, iw, k, att1, ev, e, att2, results$ = [];
  idx == null && (idx = 0);
  ctx == null && (ctx = {});
  if (!(lib = libs[idx])) {
    return;
  }
  lib = this.cache(lib);
  if (lib.propCached) {
    return this._exports(libs, idx + 1, ctx);
  }
  ref$ = [{}, lib.fprop, this.ifr().contentWindow], hash = ref$[0], fprop = ref$[1], iw = ref$[2];
  if (!fprop) {
    lib.fprop = fprop = {};
    lib.prop = {};
    lib.propIniting = true;
    if (lib.gen) {
      import$(fprop, lib.gen.apply(iw, [iw, iw, iw]));
      lib.prop = Object.fromEntries((function(){
        var results$ = [];
        for (k in fprop) {
          results$.push([k, null]);
        }
        return results$;
      }()));
    } else {
      att1 = Object.fromEntries(Reflect.ownKeys(iw).filter(function(it){
        return !rsp.prop.legacy[it];
      }).map(function(it){
        return [it, true];
      }));
      for (k in att1) {
        hash[k] = iw[k];
      }
      try {
        ev = function(){
          return iw.eval((lib.code || '').replace('"use strict";', '') + rsp.sourceUrl(lib.url || lib.id));
        };
        if (this._scriptElement) {
          rsp.pretendScript(iw.document, lib, ev);
        } else {
          ev();
        }
      } catch (e$) {
        e = e$;
        console.error("[@plotdb/rescope] Parse failed", {
          url: lib.url,
          ns: lib.ns,
          name: lib.name,
          version: lib.version,
          path: lib.path
        });
        console.error("[@plotdb/rescope] with this error:", e);
        throw e;
      }
      att2 = Object.fromEntries(Reflect.ownKeys(iw).filter(function(it){
        return !rsp.prop.legacy[it];
      }).map(function(it){
        return [it, true];
      }));
      for (k in att2) {
        if (iw[k] === hash[k] || k === 'NaN') {
          continue;
        }
        fprop[k] = iw[k];
        lib.prop[k] = null;
      }
    }
  } else {
    for (k in fprop) {
      hash[k] = iw[k];
      iw[k] = fprop[k];
    }
  }
  for (k in fprop) {
    ctx[k] = fprop[k];
  }
  this._exports(libs, idx + 1, ctx);
  for (k in fprop) {
    results$.push(iw[k] = hash[k]);
  }
  return results$;
}, ref$._wrapWith = function(o, ctx, opt){
  var code;
  o == null && (o = {});
  ctx == null && (ctx = {});
  opt == null && (opt = {});
  code = "with(scope){" + o.code + "\n}";
  if (opt.codeOnly) {
    return "function(scope, ctx, win){" + code + "}";
  }
  return rsp.compile(code, o.url || o.id);
}, ref$._wrap = function(o, ctx, opt){
  var varre, prop, code, _, k;
  o == null && (o = {});
  ctx == null && (ctx = {});
  opt == null && (opt = {});
  if ((opt.scope || this._scope) === 'with') {
    return this._wrapWith(o, ctx, opt);
  }
  varre = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  prop = o.prop || {};
  code = "var window, global, globalThis, self, __ret = {}, __win = {}; window = global = globalThis = self = scope;";
  _ = !enableRspvarsetcb
    ? function(){}
    : function(k){
      return "window['_rspvarsetcb_'] = {k:'" + k + "',f:function(v){" + k + "=v}};";
    };
  for (k in prop) {
    if (varre.exec(k)) {
      code += "var " + k + ";" + _(k);
    }
    code += "__win['" + k + "'] = win['" + k + "']; win['" + k + "'] = undefined;";
  }
  for (k in ctx) {
    code += "window['" + k + "'] = ctx['" + k + "'];";
    if (varre.exec(k)) {
      code += "var " + k + " = window['" + k + "'];" + _(k);
    }
  }
  code += "try {" + o.code + "\n;";
  for (k in prop) {
    if (varre.exec(k)) {
      code += "if(!(" + k + ")) { " + k + " = scope['" + k + "']; }\n__ret['" + k + "'] = " + k + " || window['" + k + "'] || win['" + k + "'] || this['" + k + "'];";
    } else {
      code += "__ret['" + k + "'] = window['" + k + "'] || win['" + k + "'] || this['" + k + "'];";
    }
  }
  code += "} finally {";
  for (k in prop) {
    code += "win['" + k + "'] = __win['" + k + "'];";
  }
  code += "}return __ret;";
  if (opt.codeOnly) {
    return "function(scope, ctx, win){" + code + "}";
  }
  return rsp.compile(code, o.url || o.id);
}, ref$._gen = function(lib, ctx){
  var that, code, id, reg, body, url;
  if (that = lib.gen) {
    return Promise.resolve(that);
  }
  if (this._delivery !== 'script' || rsp.__node || !doc) {
    return Promise.resolve(lib.gen = this._wrap(lib, ctx));
  }
  code = this._wrap(lib, ctx, {
    codeOnly: true
  });
  id = this.id + "-" + Math.random().toString(36).substring(2);
  reg = win[rsp.genRegistry] = win[rsp.genRegistry] || {};
  body = "window['" + rsp.genRegistry + "']['" + id + "'] = " + code + ";" + rsp.sourceUrl(lib.url || lib.id);
  url = URL.createObjectURL(new Blob([body], {
    type: 'text/javascript'
  }));
  return new Promise(function(res, rej){
    var node, done;
    node = doc.createElement('script');
    done = function(e){
      var gen, ref$;
      node.remove();
      URL.revokeObjectURL(url);
      if (!(gen = reg[id])) {
        return rej((ref$ = new Error("[@plotdb/rescope] wrapper script blocked or failed for " + lib.id + ". with `delivery: 'script'` the page's CSP has to allow `blob:` in script-src, or use a nonce with 'strict-dynamic'."), ref$.name = 'lderror', ref$.id = 403, ref$));
      }
      delete reg[id];
      return res(lib.gen = gen);
    };
    node.onload = done;
    node.onerror = done;
    node.src = url;
    return doc.body.appendChild(node);
  });
}, ref$.load = function(libs, dctx, forceFetch, onlyFetch){
  var px, ctx, proxy, segs, _, this$ = this;
  dctx == null && (dctx = {});
  forceFetch == null && (forceFetch = false);
  onlyFetch == null && (onlyFetch = false);
  libs = (Array.isArray(libs)
    ? libs
    : [libs]).map(function(o){
    return this$.cache(o);
  });
  px = libs.px
    ? libs.px
    : libs.px = dctx && dctx.p
      ? dctx.p
      : new proxin({
        mode: this._scope
      });
  ctx = px.ctx();
  proxy = px.proxy();
  /*
  # this tries to segment libs based on async flag.
  # however, current implementation batches fetches and then loads by order
  # in this case segment seems to be unnecessary.
  # we will keep the code here for reference.
  [segs, seg] = [[], []]
  for lib in libs =>
    seg.push lib
    if !(lib.async? and !lib.async) => continue
    segs.push seg
    seg = []
  if seg.length => segs.push seg
  */
  segs = [libs];
  _ = function(idx){
    var libs, ps;
    idx == null && (idx = 0);
    if (!(libs = segs[idx])) {
      return Promise.resolve(ctx);
    }
    ps = libs.map(function(lib){
      var ref;
      if ((lib.code || lib.gen) && !forceFetch) {
        if (!lib.url && !lib.resolvedUrl) {
          lib.resolvedUrl = this$._url(lib);
        }
        return Promise.resolve();
      }
      ref = this$._ref(lib);
      if (ref.then) {
        return ref.then(function(it){
          lib.code = it.content;
          return this$.cache((lib.id = undefined, lib.version = it.version, lib.code = it.content, lib));
        });
      } else {
        return _fetch(ref, {
          method: 'GET'
        }).then(function(it){
          return lib.code = it;
        });
      }
    });
    return Promise.all(ps).then(function(){
      var i$, ref$, len$, lib;
      if (onlyFetch) {
        return;
      }
      if (this$._scope === 'with') {
        for (i$ = 0, len$ = (ref$ = libs).length; i$ < len$; ++i$) {
          lib = ref$[i$];
          if (!lib.gen && !lib.prop) {
            lib.prop = {};
            lib.propIniting = true;
          }
        }
      } else {
        this$.exports({
          libs: libs,
          ctx: dctx.f
        });
      }
      return libs.reduce(function(p, lib){
        return p.then(function(){
          if (!lib.propIniting) {
            return import$(ctx, lib.prop);
          }
          return this$._gen(lib, ctx).then(function(gen){
            var run;
            run = function(){
              var seen, k;
              if (this$._scope !== 'with') {
                return lib.prop = gen.apply(proxy, [proxy, ctx, win]);
              } else {
                seen = Object.fromEntries((function(){
                  var results$ = [];
                  for (k in ctx) {
                    results$.push([k, true]);
                  }
                  return results$;
                }()));
                gen.apply(proxy, [proxy, ctx, win]);
                return lib.prop = Object.fromEntries((function(){
                  var results$ = [];
                  for (k in ctx) {
                    if (!seen[k]) {
                      results$.push([k, ctx[k]]);
                    }
                  }
                  return results$;
                }()));
              }
            };
            if (this$._scriptElement) {
              rsp.pretendScript(doc, lib, run);
            } else {
              run();
            }
            lib.propIniting = false;
            return import$(ctx, lib.prop);
          });
        });
      }, Promise.resolve());
    }).then(function(){
      return ctx;
    }).then(function(){
      return _(idx + 1);
    });
  };
  return _(0);
}, ref$.context = function(libs, func, px){
  var ref$;
  if (typeof func !== 'function') {
    ref$ = [px, func], func = ref$[0], px = ref$[1];
  }
  return this.load(libs, px).then(function(ctx){
    if (func) {
      return func(ctx);
    } else {
      return ctx;
    }
  });
}, ref$);
rsp.env(typeof self != 'undefined' && self !== null ? self : globalThis);
rsp.proxin = proxin;
rsp.dualContext = function(){
  return {
    p: new proxin(),
    f: {},
    ctx: function(){
      return this.p.ctx();
    }
  };
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}if (typeof module != 'undefined' && module !== null) {
  module.exports = rsp;
} else if (typeof window != 'undefined' && window !== null) {
  window.rescope = rsp;
}}())
(function(){
var win, doc, isScope, _fetch, csp, slice$ = [].slice;
isScope = function(it){
  return /^:scope[ .:\[#]|^:scope$/.exec(it);
};
_fetch = function(u, c){
  if (csp.__node && (typeof fs != 'undefined' && fs !== null) && !/^https?:/.exec(u)) {
    return new Promise(function(res, rej){
      return fs.readFile(u, function(e, b){
        if (e) {
          return rej(e);
        } else {
          return res(b.toString());
        }
      });
    });
  }
  return fetch(u, c).then(function(ret){
    var ref$;
    if (ret && ret.ok) {
      return ret.text();
    }
    if (!ret) {
      return Promise.reject((ref$ = new Error("404"), ref$.name = 'lderror', ref$.id = 404, ref$));
    }
    return ret.clone().text().then(function(t){
      var i, e, ref$, j, err;
      i = ret.status || 404;
      e = (ref$ = new Error(i + " " + t), ref$.name = 'lderror', ref$.id = i, ref$.message = t, ref$);
      try {
        if ((j = JSON.parse(t)) && j.name === 'lderror') {
          import$(e, j).json = j;
        }
      } catch (e$) {
        err = e$;
      }
      return Promise.reject(e);
    });
  });
};
csp = function(a, b, c, d){
  if (!csp['default']) {
    csp['default'] = new csp.converter();
  }
  return csp['default'].convert(a, b, c, d);
};
csp.env = function(it){
  var ref$;
  return ref$ = [it, it.document], win = ref$[0], doc = ref$[1], ref$;
};
csp.id = function(o){
  var path;
  path = o.path || (o.type === 'js'
    ? 'index.min.js'
    : o.type === 'css' ? 'index.min.css' : 'index.html');
  return o.id || o.url || (o.ns ? o.ns + ":" : '') + "" + o.name + "@" + (o.version || 'main') + ":" + path;
};
csp.scope = function(o){
  return o.scope || '_' + btoa(csp.id(o)).replace(/=/g, '_');
};
csp._cache = {};
csp._ver = {
  map: {},
  list: {}
};
csp.cache = function(o){
  var that, k, nv, p, s, ret, n, v, ref$, i$, to$, i, ver;
  if (typeof o === 'string') {
    o = {
      url: o
    };
  }
  if (!o.id) {
    o.id = csp.id(o);
  }
  if (that = this._cache[o.id]) {
    return that;
  }
  if (o.id && !o.name) {
    k = o.id.split(':');
    if (k.length <= 2) {
      nv = k[0], p = k[1], s = k[2];
    } else {
      s = k[0], nv = k[1], p = k[2];
    }
    if (!(ret = /^(@?[^@]+)(?:@([^:]+))?$/.exec(nv))) {
      ret = ['', o.id, ''];
    }
    n = ret[1];
    v = ret[2];
  } else {
    ref$ = [o.ns, o.name, o.version || '', o.path || ''], s = ref$[0], n = ref$[1], v = ref$[2], p = ref$[3];
  }
  if (/^[0-9.]+$/.exec(v)) {
    if (that = ((ref$ = this._ver.map)[n] || (ref$[n] = {}))[v]) {
      v = that;
    }
    if (that = this._cache[csp.id({
      name: n,
      version: v,
      path: p
    })]) {
      return that;
    }
    for (i$ = 0, to$ = ((ref$ = this._ver.list)[n] || (ref$[n] = [])).length; i$ < to$; ++i$) {
      i = i$;
      ver = this._ver.list[n][i];
      if (!semver.fit(ver, v)) {
        continue;
      }
      this._ver.map[n][v] = ver;
      o.id = csp.id({
        ns: s,
        name: n,
        version: ver,
        path: p
      });
      if (that = this._cache[o.id]) {
        return that;
      }
    }
  }
  if (!in$(v, (ref$ = this._ver.list)[n] || (ref$[n] = []))) {
    this._ver.list[n].push(v);
  }
  return this._cache[o.id] = o;
};
csp.converter = function(opt){
  var ifr;
  opt == null && (opt = {});
  this.scopeTest = opt.scopeTest;
  this.node = doc.createElement("style");
  this.iframe = ifr = doc.createElement("iframe");
  ifr.setAttribute('title', "for csscope parsing");
  ifr.style.display = 'none';
  ifr.src = 'about:blank';
  doc.body.appendChild(ifr);
  this.iframe.contentDocument.body.appendChild(this.node);
  this._idx = 0;
  return this;
};
csp.converter.prototype = import$(Object.create(Object.prototype), {
  getNames: function(rules, defs){
    var i$, len$, rule;
    defs == null && (defs = {});
    for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
      rule = rules[i$];
      if (rule.name) {
        defs[rule.name] = true;
      } else if (rule.cssRules) {
        this.getNames(rule.cssRules, defs);
      }
    }
    return defs;
  },
  _convert: function(rules, scopeRule, name, scopeTest, defs){
    var ret, i$, len$, rule, matched, sel, code;
    defs == null && (defs = {});
    ret = "";
    for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
      rule = rules[i$];
      if (rule.style) {
        if (defs[rule.style.animationName]) {
          rule.style.animationName = name + "__" + rule.style.animationName;
        } else if (rule.style.animation) {
          matched = false;
          rule.style.animation = rule.style.animation.split(' ').map(fn$).join(' ');
        }
      }
      if (rule.selectorText) {
        if (!scopeTest) {
          sel = rule.selectorText.split(',').map(fn1$).map(fn2$).join(',');
        } else {
          sel = rule.selectorText.split(',').map(fn3$).map(fn4$).join(',');
        }
        ret += sel + "{" + rule.style.cssText + "}";
        /*
        ret += """
        #sel {
          #{Array.from(rule.style).map(-> "#it:#{rule.style.getPropertyValue(it)}#{if rule.style.getPropertyPriority(it) == 'important' => '!important' else ''}").join(';')}
        }
        """
        */
        rule.selectorText = sel;
      } else if (rule.name) {
        sel = rule.name.split(',').map(fn5$).map(fn6$).join(',');
        rule.name = sel;
        ret += "@keyframes " + sel + " {\n  " + Array.from(rule.cssRules).map(fn7$).join('\n') + "\n}";
      } else if (rule.cssRules) {
        code = this._convert(rule.cssRules, scopeRule, name, scopeTest, defs);
        ret += "@media " + rule.conditionText + " {\n  " + code + "\n}";
      }
    }
    return ret;
    function fn$(it){
      var matched;
      if (matched || !defs[it]) {
        return it;
      }
      matched = true;
      return name + "__" + it;
    }
    function fn1$(it){
      return it.trim();
    }
    function fn2$(it){
      if (isScope(it)) {
        return it.replace(/^:scope/, scopeRule);
      } else {
        return scopeRule + " " + it;
      }
    }
    function fn3$(it){
      return it.trim();
    }
    function fn4$(it){
      var ref$, h, t, h1, h2;
      if (isScope(it)) {
        return it.replace(/^:scope/, scopeRule);
      }
      ref$ = it.split(' ').map(function(it){
        return it.trim();
      }).filter(function(it){
        return it;
      }), h = ref$[0], t = slice$.call(ref$, 1);
      ref$ = /^[a-zA-Z]/.exec(h)
        ? [h, '']
        : ['', h], h1 = ref$[0], h2 = ref$[1];
      return /:[a-z-]+$/.exec(it)
        ? (scopeRule + " :not(" + scopeTest + ") " + it + ",") + (scopeRule + " > " + h1 + h2 + " " + t.join(' '))
        : (scopeRule + " :not(" + scopeTest + ") " + it + ",") + (scopeRule + " > " + h1 + ":not(" + scopeTest + ")" + h2 + " " + t.join(' '));
    }
    function fn5$(it){
      return it.trim();
    }
    function fn6$(it){
      return name + "__" + it;
    }
    function fn7$(it){
      return it.cssText;
    }
  },
  convert: function(a, b, c, d){
    var opt, ref$, name, css, rule, scopeTest, rules, defs;
    ref$ = opt = typeof a === 'object'
      ? a
      : {
        name: a,
        css: b,
        rule: c,
        scopeTest: d
      }, name = ref$.name, css = ref$.css, rule = ref$.rule, scopeTest = ref$.scopeTest;
    if (!rule) {
      rule = "." + name;
    }
    if (!name) {
      name = rule;
    }
    if (!scopeTest) {
      scopeTest = this.scopeTest;
    }
    rules = typeof css === 'object'
      ? css
      : (this.node.textContent = (css || '') + ("/*" + (this._idx++) + "*/"), this.node.sheet.cssRules);
    defs = this.getNames(rules, {});
    return this._convert(rules, rule, name, scopeTest, defs) || '';
  }
});
csp.manager = function(o){
  o == null && (o = {});
  this.attrName = "csscope";
  this._cache = {};
  this.converter = new csp.converter();
  this.counter = 0;
  this.registry(o.registry || "/assets/lib/");
  this.init();
  return this;
};
csp.manager.prototype = import$(Object.create(Object.prototype), {
  cache: function(o){
    var that;
    if (typeof o === 'string') {
      o = {
        url: o
      };
    }
    if (!o.id) {
      o.id = csp.id(o);
    }
    if (that = this._cache[o.id]) {
      return that;
    }
    return this._cache[o.id] = csp.cache(o);
  },
  _ref: function(o){
    var r, ref$;
    if (typeof o === 'string') {
      o = {
        url: o
      };
    }
    if (typeof (r = this._reg.url || this._reg) === 'function') {
      o = (ref$ = import$({}, o), ref$.url = r(o), ref$);
    }
    return this._reg.fetch
      ? this._reg.fetch(o)
      : o.url;
  },
  registry: function(v){
    if (typeof v === 'string') {
      if (v[v.length - 1] === '/') {
        v = v.substring(0, v.length - 1);
      }
      return this._reg = function(v){
        return function(o){
          return v + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || 'index.min.css');
        };
      }(v);
    } else {
      return this._reg = v;
    }
  },
  init: function(){
    if (this.inited) {
      return;
    }
    this.inited = true;
    this.styleNode = doc.createElement('style');
    this.styleNode.setAttribute('type', 'text/css');
    this.styleNode.setAttribute('data-name', "csscope.manager");
    this.styleContent = [];
    return doc.body.appendChild(this.styleNode);
  },
  scope: function(node, urls){
    var ret;
    urls == null && (urls = []);
    ret = this.get(urls);
    node.classList.add.apply(node.classList, ret.map(function(it){
      return it.scope;
    }));
    return ret;
  },
  get: function(libs){
    var this$ = this;
    libs == null && (libs = []);
    return (Array.isArray(libs)
      ? libs
      : [libs]).map(function(it){
      return this$.cache(it);
    }).filter(function(it){
      return it.scope;
    });
  },
  load: function(libs, scopeTest, bundle){
    var code, this$ = this;
    libs = (Array.isArray(libs)
      ? libs
      : [libs]).map(function(o){
      return this$.cache(o);
    });
    code = [];
    return Promise.all(libs.map(function(o, idx){
      var ref, p;
      if (o.inited) {
        return Promise.resolve();
      }
      if (o.scope && o.code) {
        o.inited = true;
        code.push([o.code, idx]);
        return Promise.resolve();
      }
      ref = this$._ref(o);
      p = ref.then
        ? ref.then(function(it){
          this$.cache((o.id = undefined, o.version = it.version, o));
          return it;
        })
        : _fetch(ref, {
          method: 'GET'
        }).then(function(it){
          return {
            content: it
          };
        });
      return p.then(function(arg$){
        var content;
        content = arg$.content;
        o.inited = true;
        o.scope = csp.scope(o);
        o.code = this$.converter.convert({
          css: content,
          name: o.scope,
          scopeTest: scopeTest
        });
        return code.push([o.code, idx]);
      });
    })).then(function(){
      var _code;
      if (bundle) {
        return libs;
      }
      _code = code.sort(function(a, b){
        if (a[1] > b[1]) {
          return 1;
        } else if (a[1] < b[1]) {
          return -1;
        } else {
          return 0;
        }
      }).map(function(it){
        return it[0];
      });
      this$.styleContent.push.apply(this$.styleContent, _code);
      this$.styleNode.textContent = this$.styleContent.join('\n');
      return this$.get(libs);
    });
  }
});
csp.env(typeof self != 'undefined' && self !== null ? self : globalThis);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}if (typeof module != 'undefined' && module !== null) {
  module.exports = csp;
} else if (typeof window != 'undefined' && window !== null) {
  window.csscope = csp;
}}())
(function(){
var win, doc, err, _fetch, rid, sanitize, pubsub, block, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
err = function(o, id){
  var ref$;
  o == null && (o = "");
  id == null && (id = 404);
  return Promise.reject((ref$ = new Error(o), ref$.name = 'lderror', ref$.id = id, ref$.message = o, ref$));
};
_fetch = function(u, c){
  if (block.__node && (typeof fs != 'undefined' && fs !== null) && !/^https?:/.exec(u)) {
    return new Promise(function(res, rej){
      return fs.stat(u, function(e, s){
        var n;
        if (e) {
          return rej(e);
        }
        n = s.isDirectory() ? u + "/index.html" : u;
        return fs.readFile(n, function(e, b){
          if (e) {
            return rej(e);
          }
          return res(b.toString());
        });
      });
    });
  }
  return fetch(u, c).then(function(ret){
    if (ret && ret.ok) {
      return ret.text();
    }
    if (!ret) {
      return err();
    }
    return ret.clone().text().then(function(t){
      var i, m, e, ref$, j, _e;
      i = ret.status || 404;
      m = i + " " + t;
      e = (ref$ = new Error(m), ref$.name = 'lderror', ref$.id = i, ref$.message = m, ref$);
      try {
        if ((j = JSON.parse(t)) && j.name === 'lderror') {
          import$(e, j).json = j;
        }
      } catch (e$) {
        _e = e$;
      }
      return Promise.reject(e);
    });
  });
};
rid = function(){
  var id;
  for (;;) {
    id = "b-" + Math.random().toString(36).substring(2);
    if (!rid.hash[id]) {
      break;
    }
  }
  rid.hash[id] = true;
  return id;
};
rid.hash = {};
sanitize = function(code){
  return code || '';
};
pubsub = function(){
  this.subs = {};
  return this;
};
pubsub.prototype = import$(Object.create(Object.prototype), {
  fire: function(n){
    var args, res$, i$, to$, ref$;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    args = res$;
    return Promise.all(((ref$ = this.subs)[n] || (ref$[n] = [])).map(function(it){
      return it.apply(null, args);
    }));
  },
  on: function(n, cb){
    var this$ = this;
    return (Array.isArray(n)
      ? n
      : [n]).map(function(n){
      var ref$;
      return ((ref$ = this$.subs)[n] || (ref$[n] = [])).push(cb);
    });
  }
  /* # sample code for nonblocking message publishing
  pub: (name, ...args) ->
    ps = @subs[][name].map ->
      (res, rej) <- new Promise _
      Promise.resolve!
        .then -> it.apply null, args
        .then -> res!
        .catch -> rej it
    Promise.all ps
  */
});
block = {};
block.id = function(o){
  var path;
  if (typeof o === 'string') {
    return o;
  }
  path = o.path || (o.type === 'js'
    ? 'index.min.js'
    : o.type === 'css' ? 'index.min.css' : 'index.html');
  return o.id || o.url || (o.ns ? o.ns + ":" : '') + "" + o.name + "@" + (o.version || 'main') + ":" + path;
};
block.id2obj = function(k){
  var nv, path, ns, ret;
  k = k.split(':');
  if (k.length <= 2) {
    nv = k[0], path = k[1], ns = k[2];
  } else {
    ns = k[0], nv = k[1], path = k[2];
  }
  if (!(ret = /^(@?[^@]+)(?:@([^:]+))?$/.exec(nv))) {
    return null;
  }
  return {
    ns: ns,
    name: ret[1],
    version: ret[2],
    path: path
  };
};
block.env = function(it){
  var ref$;
  ref$ = [it, it.document], win = ref$[0], doc = ref$[1];
  if (rescope.env) {
    rescope.env(win);
  }
  if (rescope.env) {
    return csscope.env(win);
  }
};
block.i18n = {
  module: {
    lng: 'en',
    t: function(v, o){
      var vs, lng, i$, to$, i, t, j, ns, _t, u, ref$, ref1$, j$, to1$, that;
      vs = Array.isArray(v)
        ? v
        : [v];
      lng = this.lng;
      for (i$ = 0, to$ = vs.length; i$ < to$; ++i$) {
        i = i$;
        if (!((t = vs[i]) != null)) {
          continue;
        }
        j = t.indexOf(':');
        ns = t.substring(0, j);
        t = t.substring(j + 1);
        _t = t.split('.');
        u = (ref$ = (ref1$ = this.res)[lng] || (ref1$[lng] = {}))[ns] || (ref$[ns] = {});
        for (j$ = 0, to1$ = _t.length; j$ < to1$; ++j$) {
          j = j$;
          if (!u) {
            break;
          } else {
            u = u[_t[j]];
          }
        }
        if (that = u) {
          return that;
        }
      }
      return t || v[v.length - 1];
    },
    changeLanguage: function(it){
      return this._fire('languageChanged', this.lng = it) || 'en';
    },
    addResourceBundle: function(lng, ns, res, deep, overwrite){
      var ref$;
      return ((ref$ = this.res)[lng] || (ref$[lng] = {}))[ns] = res;
    },
    _evthdr: {},
    on: function(n, cb){
      var this$ = this;
      return (Array.isArray(n)
        ? n
        : [n]).map(function(n){
        var ref$;
        return ((ref$ = this$._evthdr)[n] || (ref$[n] = [])).push(cb);
      });
    },
    off: function(n, cb){
      var this$ = this;
      return (Array.isArray(n)
        ? n
        : [n]).map(function(n){
        var idx, ref$;
        if (~(idx = ((ref$ = this$._evthdr)[n] || (ref$[n] = [])).indexOf(cb))) {
          return this$._evthdr[n].splice(idx, 1);
        }
      });
    },
    _fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this._evthdr[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    res: {}
  },
  use: function(it){
    return this.module = it;
  },
  addResourceBundle: function(lng, id, resource, deep, overwrite){
    deep == null && (deep = true);
    overwrite == null && (overwrite = true);
    return block.i18n.module.addResourceBundle(lng, id, resource, deep, overwrite);
  },
  changeLanguage: function(it){
    return block.i18n.module.changeLanguage(it);
  }
};
Object.defineProperty(block.i18n, 'language', {
  get: function(){
    return block.i18n.module.lng || block.i18n.module.language;
  }
});
Object.defineProperty(block.i18n.module, 'language', {
  get: function(){
    return block.i18n.module.lng;
  }
});
block.compatible = function(arg$){
  var ref$, required, current, o1, o2;
  ref$ = arg$ != null
    ? arg$
    : {}, required = ref$.required, current = ref$.current;
  ref$ = [required || '', current || ''], o1 = ref$[0], o2 = ref$[1];
  if (typeof o1 === 'string') {
    o1 = block.id2obj(o1);
  }
  if (typeof o2 === 'string') {
    o2 = block.id2obj(o2);
  }
  if (!(o1.ns === o2.ns && o1.name === o2.name)) {
    return false;
  }
  if (o1.version === 'main' || o2.version === 'main') {
    return true;
  }
  return semver.fit(o2.version, o1.version);
};
block.global = {
  csscope: {
    hash: {},
    apply: function(ret){
      var this$ = this;
      ret = ret.filter(function(it){
        return !this$.hash[it.id || it.url];
      }).map(function(it){
        return this$.hash[it.id || it.url] = it.scope;
      });
      if (ret.length) {
        return doc.body.classList.add.apply(doc.body.classList, ret);
      }
    }
  }
};
block.init = proxise.once(function(){
  if (block._rescope) {
    return block._rescope.init();
  }
});
block.rescope = function(){
  if (!block._rescope) {
    block._rescope = new rescope({
      global: win != null ? win : global
    });
  }
  return block._rescope;
};
block.csscope = function(){
  if (!block._csscope) {
    block._csscope = new csscope.manager();
  }
  return block._csscope;
};
block.manager = function(opt){
  var this$ = this;
  opt == null && (opt = {});
  this.hash = {};
  this.proxy = {};
  this.running = {};
  this._ver = {
    map: {}
  };
  this._chain = opt.chain || null;
  this.init = proxise.once(function(){
    return this$._init();
  });
  this.rescope = opt.rescope instanceof rescope
    ? opt.rescope
    : block.rescope();
  this.csscope = opt.csscope instanceof csscope
    ? opt.csscope
    : block.csscope();
  if (opt.registry) {
    this.registry(opt.registry);
  }
  this.init();
  return this;
};
block.manager.prototype = import$(Object.create(Object.prototype), {
  _init: function(){
    if (this.rescope === block.rescope()) {
      return block.init();
    } else {
      return this.rescope.init();
    }
  },
  id: block.id,
  id2obj: block.id2obj,
  chain: function(c, o){
    if (!this._chain || (o && o.replace)) {
      return this._chain = c;
    } else {
      return this._chain.chain(c);
    }
  },
  registry: function(r){
    var ref$;
    if (((ref$ = typeof r) === 'string' || ref$ === 'function') || r.url || r.fetch) {
      r = {
        lib: r,
        block: r
      };
    }
    if (r.lib != null) {
      if (this.rescope === block.rescope()) {
        this.rescope = new rescope({
          global: win
        });
      }
      if (this.csscope === block.csscope()) {
        this.csscope = new csscope.manager();
      }
      this.rescope.registry(r.lib);
      this.csscope.registry(r.lib);
    }
    if (r.block != null) {
      this._reg = r.block || '';
      if (typeof this._reg === 'string' && this._reg && (ref$ = this._reg)[ref$.length - 1] !== '/') {
        return this._reg += '/';
      }
    }
  },
  set: function(opt){
    var opts, this$ = this;
    opt == null && (opt = {});
    opts = Array.isArray(opt)
      ? opt
      : typeof opt[Symbol.iterator] === 'function' || !isNaN(opt.length)
        ? Array.from(opt)
        : [opt];
    return Promise.all(opts.map(function(obj){
      var bid, root, ref$, ns, name, version, path, b, p, ref1$, ref2$;
      if (obj instanceof win.Element) {
        bid = obj.dataset.bid || '';
        root = (obj.nodeName || '').toLowerCase() === 'template' && obj.content.childNodes[0]
          ? obj.content.childNodes[0].cloneNode(true)
          : obj.cloneNode(true);
        obj = (ref$ = block.id2obj(bid), ref$.block = new block['class']({
          manager: this$,
          root: root
        }), ref$);
      }
      ns = obj.ns, name = obj.name, version = obj.version, path = obj.path;
      if (!ns) {
        ns = '';
      }
      b = obj instanceof block['class']
        ? obj
        : obj.block;
      p = path;
      p = (p || 'index.html').replace(/\/(index\.html)?$/, '');
      return ((ref$ = (ref1$ = (ref2$ = this$.hash)[ns] || (ref2$[ns] = {}))[name] || (ref1$[name] = {}))[version] || (ref$[version] = {}))[p] = b;
    }));
  },
  _getUrl: function(arg$){
    var url, name, version, path, type;
    url = arg$.url, name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
    if (url) {
      return url;
    }
    path = path
      ? path
      : type === 'block'
        ? 'index.html'
        : type === 'js' ? 'index.min.js' : 'index.min.css';
    return (this._reg || '') + "/assets/block/" + name + "/" + (version || 'main') + "/" + path;
  },
  getUrl: function(o){
    var r;
    if (!o.type) {
      o.type = 'block';
    }
    if (typeof (r = this._reg.url || this._reg) === 'function') {
      return r(o);
    } else {
      return this._getUrl(o);
    }
  },
  _ref: function(o){
    var r, ref$;
    if (typeof (r = this._reg.url || this._reg) === 'function') {
      o = (ref$ = import$({}, o), ref$.url = r(o), ref$);
    }
    return this._reg.fetch
      ? this._reg.fetch(o)
      : o.url;
  },
  fetch: function(o){
    var r;
    o.type = 'block';
    r = this._ref(o);
    return !r
      ? err(o)
      : r.then
        ? r
        : _fetch(r, {
          method: 'GET'
        }).then(function(it){
          return {
            content: it
          };
        });
  },
  _get: function(opt){
    var ref$, ns, n, v, p, obj, ref1$, that, key$, ver, c, ref2$, this$ = this;
    ref$ = [opt.ns || '', opt.name, opt.version || 'main', opt.path || 'index.html'], ns = ref$[0], n = ref$[1], v = ref$[2], p = ref$[3];
    obj = {
      ns: ns,
      name: n,
      version: v,
      path: p,
      ctx: opt.ctx
    };
    if (!(n && v)) {
      return err("", 1015);
    }
    p = p.replace(/\/(index\.html)?$/, '');
    (ref$ = (ref1$ = this.hash)[ns] || (ref1$[ns] = {}))[n] || (ref$[n] = {});
    if (/[^0-9.]/.exec(v) && !opt.force) {
      if (((ref$ = this._ver.map)[ns] || (ref$[ns] = {}))[n] && this._ver.map[ns][n][v]) {
        if (that = ((ref$ = this.hash[ns][n])[key$ = this._ver.map[ns][n][v]] || (ref$[key$] = {}))[p]) {
          return that;
        }
      }
      for (ver in ref$ = ((ref1$ = this.hash)[ns] || (ref1$[ns] = {}))[n]) {
        c = ref$[ver];
        if (!semver.fit(ver, v)) {
          continue;
        }
        return Promise.resolve(c[p]);
      }
    }
    if (((ref$ = this.hash[ns][n])[v] || (ref$[v] = {}))[p] != null && !opt.force) {
      return Promise.resolve(this.hash[ns][n][v][p]);
    }
    if (((ref$ = (ref1$ = (ref2$ = this.running)[ns] || (ref2$[ns] = {}))[n] || (ref1$[n] = {}))[v] || (ref$[v] = {}))[p] === true) {
      return;
    }
    this.running[ns][n][v][p] = true;
    return this.fetch({
      ns: opt.ns,
      name: opt.name,
      version: opt.version,
      path: opt.path
    }).then(function(it){
      var ref$;
      if (!it) {
        return e404(obj);
      }
      if (it.version) {
        if (obj.version !== it.version) {
          ((ref$ = this$._ver.map[ns])[n] || (ref$[n] = {}))[obj.version] = it.version;
        }
        obj.version = it.version;
      }
      return it.content || it;
    })['catch'](function(e){
      if (!this$._chain) {
        return Promise.reject(e);
      }
      return this$._chain.get(opt);
    }).then(function(ret){
      var b;
      ret == null && (ret = {});
      b = new block['class']((obj.code = ret, obj.manager = this$, obj));
      this$.set((obj.block = b, obj));
      return b;
    }).then(function(it){
      this$.proxy[ns][n][v][p].resolve(it);
      return it;
    })['finally'](function(){
      return this$.running[ns][n][v][p] = false;
    })['catch'](function(e){
      this$.proxy[ns][n][v][p].reject(e);
      return Promise.reject(e);
    });
  },
  from: function(o, p){
    return this.get(o).then(function(b){
      return b.create().then(function(i){
        return i.attach(p).then(function(){
          return i['interface']();
        }).then(function(it){
          return {
            instance: i,
            'interface': it
          };
        });
      });
    });
  },
  get: function(opt){
    var opts, this$ = this;
    opt == null && (opt = {});
    opts = Array.isArray(opt)
      ? opt
      : [opt];
    return Promise.all(opts.map(function(opt){
      var ref$, ns, n, v, p, ref1$, ref2$;
      opt == null && (opt = {});
      if (typeof opt === 'string') {
        opt = block.id2obj(opt);
      }
      ref$ = [opt.ns || '', opt.name, opt.version || 'main', opt.path || 'index.html'], ns = ref$[0], n = ref$[1], v = ref$[2], p = ref$[3];
      p = p.replace(/\/(index\.html)?$/, '');
      if (!((ref$ = (ref1$ = (ref2$ = this$.proxy)[ns] || (ref2$[ns] = {}))[n] || (ref1$[n] = {}))[v] || (ref$[v] = {}))[p]) {
        this$.proxy[ns][n][v][p] = proxise(function(opt){
          return this$._get(opt);
        });
      }
      return this$.proxy[ns][n][v][p](opt);
    })).then(function(it){
      if (Array.isArray(opt)) {
        return it;
      } else {
        return it[0];
      }
    });
  },
  debundle: function(o){
    var ps, this$ = this;
    o == null && (o = {});
    o = Array.isArray(o)
      ? o
      : [o];
    ps = o.map(function(opt){
      return Promise.resolve().then(function(){
        var mgr, lc, p;
        mgr = opt.manager || this$;
        lc = {};
        if (!opt.root) {
          p = opt.url
            ? _fetch(opt.url, {
              method: 'GET'
            })
            : Promise.resolve(opt.code || '');
          p = p.then(function(c){
            var div;
            if (!block.debundleNode) {
              doc.body.appendChild(block.debundleNode = doc.createElement('div'));
            }
            block.debundleNode.style.display = 'none';
            block.debundleNode.appendChild(div = doc.createElement('div'));
            div.innerHTML = c;
            return div.querySelector('template');
          });
        } else {
          p = Promise.resolve(typeof opt.root === 'string'
            ? doc.querySelector(opt.root)
            : opt.root);
        }
        return p.then(function(root){
          var ref$, nodes, classes, s, k, node, ns, name, version, path, bc, results$ = [];
          if (!root) {
            return;
          }
          if (root.content) {
            root = root.content;
          }
          ref$ = [{}, {}], nodes = ref$[0], classes = ref$[1];
          Array.from(root.childNodes).map(function(n){
            var id;
            if (n.nodeType !== doc.ELEMENT_NODE) {
              return;
            }
            if (n.nodeName === 'SCRIPT') {
              return lc.script = n.cloneNode(true);
            } else if (n.nodeName === 'STYLE') {
              return lc.style = n.cloneNode(true);
            } else if (!(id = n.getAttribute('block'))) {} else {
              return nodes[id] = n;
            }
          });
          if (lc.script) {
            s = doc.createElement('script');
            s.textContent = lc.script.textContent;
            lc.script = s;
            lc.script['import'] = function(it){
              return lc.codes = typeof it === 'function' ? it() : it;
            };
            lc.script.setAttribute('type', 'text/javascript');
            doc.body.appendChild(lc.script);
          }
          if (lc.style) {
            lc.style.setAttribute('type', 'text/css');
            doc.body.appendChild(lc.style);
          }
          for (k in nodes) {
            node = nodes[k];
            ref$ = block.id2obj(k), ns = ref$.ns, name = ref$.name, version = ref$.version, path = ref$.path;
            bc = new block['class']({
              manager: mgr,
              ns: ns,
              name: name,
              version: version,
              path: path,
              code: {
                script: lc.codes[k],
                dom: node,
                style: ""
              }
            });
            results$.push(mgr.set(bc));
          }
          return results$;
        });
      });
    });
    return Promise.all(ps);
  }
});
block['class'] = function(opt){
  var code, node, div, dom, i$, to$, i, this$ = this;
  opt == null && (opt = {});
  this.opt = opt;
  this.scope = opt.scope || null;
  this._ctx = {};
  this.csscopes = {
    global: [],
    local: []
  };
  this.ns = opt.ns;
  this.name = opt.name;
  this.version = opt.version;
  this.path = opt.path;
  this.manager = opt.manager;
  if (!opt.ns) {
    opt.ns = '';
  }
  if (!this.manager) {
    console.warn("manager is mandatory when constructing block.class");
  }
  code = opt.code;
  if (opt.root) {
    node = typeof opt.root === 'string'
      ? doc.querySelector(opt.root)
      : opt.root;
  } else {
    if (typeof code === 'function') {
      code = code();
    }
    if (typeof code === 'string') {
      code = sanitize(code);
      div = doc.createElement("div");
      div.innerHTML = (code || '').trim();
      this._templates = Array.from(div.querySelectorAll('template[rel=block]')).map(function(n){
        return n.parentNode.removeChild(n);
      });
      if (div.childNodes.length > 1) {
        console.warn("DOM definition of a block should contain only one root.");
      }
    } else if (typeof code === 'object') {
      this.script = code.script;
      this.style = code.style;
      this.style = code.style;
      this.script = code.script;
      dom = code.dom instanceof Function
        ? code.dom()
        : code.dom;
      if (dom instanceof win.Element) {
        node = dom;
      } else {
        code = sanitize(dom);
        div = doc.createElement("div");
        div.innerHTML = code;
        if (div.childNodes.length > 1) {
          console.warn("DOM definition of a block should contain only one root.");
        }
      }
    }
  }
  ['script', 'style', 'link'].map(function(n){
    var v;
    v = Array.from((node || div).querySelectorAll(n)).map(function(it){
      it.parentNode.removeChild(it);
      return it.textContent;
    }).join('\n');
    return this$[n] = v != null && v
      ? v
      : this$[n] || "";
  });
  if (!node && div) {
    for (i$ = 0, to$ = div.childNodes.length; i$ < to$; ++i$) {
      i = i$;
      if ((node = div.childNodes[i]).nodeType === win.Element.ELEMENT_NODE) {
        break;
      }
    }
  }
  if (!node) {
    node = doc.createElement('div');
  }
  if (node.nodeType !== win.Element.ELEMENT_NODE) {
    console.warn("root of DOM definition of a block should be an Element");
  }
  this.node = node;
  this.init = proxise.once(function(){
    return this$._init();
  });
  return this;
};
block['class'].prototype = import$(Object.create(Object.prototype), {
  _init: function(){
    var this$ = this;
    return block.init().then(function(){
      if (!this$._templates) {
        return;
      }
      return Promise.all(this$._templates.map(function(it){
        return this$.manager.debundle({
          root: it
        });
      }));
    }).then(function(){
      var v, ref$, ret, getClient;
      this$['interface'] = this$.script instanceof Function
        ? this$.script()
        : typeof this$.script === 'object'
          ? this$.script
          : (v = eval("(function(module){" + (this$.script || '') + ";return module.exports;})({})")) instanceof Function
            ? v()
            : v || {};
      if (!this$['interface']) {
        this$['interface'] = {};
      }
      (ref$ = this$['interface']).pkg || (ref$.pkg = {});
      if (!this$.ns) {
        this$.ns = this$['interface'].pkg.ns;
      }
      if (!this$.name) {
        this$.name = this$['interface'].pkg.name;
      }
      if (!this$.version) {
        this$.version = this$['interface'].pkg.version;
      }
      if (!this$.path) {
        this$.path = this$['interface'].pkg.path;
      }
      this$.id = block.id({
        ns: this$.ns,
        name: this$.name || rid(),
        version: this$.version || rid(),
        path: this$.path
      });
      this$._id_t = this$.id.replace(/:/g, '=');
      if (!this$.scope) {
        this$.scope = csscope.scope(this$);
      }
      if (this$.style) {
        doc.body.appendChild(this$.styleNode = doc.createElement("style"));
        this$.styleNode.setAttribute('type', 'text/css');
        ret = csscope({
          rule: "*[scope~=" + this$.scope + "]",
          name: this$.scope,
          css: this$.style,
          scopeTest: "[scope]"
        });
        ret = ret.replace(/url\("?(?!data:)([^()"]+)"?\)/g, "url(" + this$._path('') + "$1)");
        this$.styleNode.textContent = ret;
      }
      this$.factory = function(i){
        this._instance = i;
        return this;
      };
      getClient = function(opt){
        return !(this.parent && this.parent.client instanceof Function)
          ? null
          : this.parent.client(opt);
      };
      return this$.factory.prototype = import$((ref$ = Object.create(Object.prototype), ref$.init = function(){}, ref$.destroy = function(){}, ref$._class = this$, ref$['interface'] = function(){
        if (!this.parent) {
          return;
        }
        if (this.parent['interface'] instanceof Function) {
          return this.parent['interface']();
        } else {
          return this.parent['interface'];
        }
      }, ref$.client = getClient, ref$.clients = function(opt){
        if (!this.parent) {
          return [this.client(opt)];
        }
        return this.parent.clients(opt).concat(this.client === getClient
          ? [null]
          : this.client(opt));
      }, ref$), this$['interface']);
    }).then(function(){
      var that, ext, ref$;
      this$.acceptedHosts = (that = this$['interface'].pkg.host)
        ? that
        : [];
      this$['extends'] = [];
      if (!(ext = this$['interface'].pkg.extend)) {
        return;
      }
      if (!this$.manager) {
        return new Error("no available manager to get extended block");
      }
      if (!(ext.name || ext.url)) {
        ext.ns = this$.ns;
        ext.name = this$.name;
        ext.version = this$.version;
      }
      if (this$.opt.ctx) {
        ext = (ref$ = import$({}, ext), ref$.ctx = this$.opt.ctx, ref$);
      }
      return this$.manager.get(ext).then(function(it){
        var e;
        this$.extend = it;
        try {
          this$.extend._usedby(this$);
        } catch (e$) {
          e = e$;
          this$.extend = null;
          throw e;
        }
        this$.extendDom = !(ext.dom != null) || ext.dom;
        this$.extendStyle = !(ext.style != null) || ext.style;
        return this$.extend.init();
      }).then(function(){
        return this$['extends'] = [this$.extend].concat(this$.extend['extends']);
      });
    }).then(function(){
      var i18n, lng, res, results$ = [];
      i18n = this$['interface'].pkg.i18n || {};
      for (lng in i18n) {
        res = i18n[lng];
        results$.push(block.i18n.module.addResourceBundle(lng, this$._id_t, res, true, true));
      }
      return results$;
    }).then(function(){
      var k, v;
      this$.dependencies = Array.isArray(this$['interface'].pkg.dependencies)
        ? this$['interface'].pkg.dependencies
        : (function(){
          var ref$, results$ = [];
          for (k in ref$ = this['interface'].pkg.dependencies || {}) {
            v = ref$[k];
            results$.push(v);
          }
          return results$;
        }.call(this$));
      this$.dependencies.map(function(d){
        if (!(d.name || d.url)) {
          d.ns = this$.ns;
          d.name = this$.name;
          d.version = this$.version;
        }
        if (d.type) {
          return;
        }
        if (/\.js$/.exec(d.url || d.path || d)) {
          return d.type = 'js';
        } else if (/\.css$/.exec(d.url || d.path || d)) {
          return d.type = 'css';
        } else {
          return d.type = 'js';
        }
      });
      if (this$.extend) {
        this$._ctx = this$.extend.context();
      } else if (this$.opt.ctx) {
        this$._ctx = this$.opt.ctx;
      } else if (rescope.dualContext) {
        this$._ctx = rescope.dualContext();
      } else if (rescope.proxin) {
        this$._ctx = new rescope.proxin();
      }
      return this$.manager.rescope.load(this$.dependencies.filter(function(it){
        return !it.type || it.type === 'js';
      }), this$._ctx);
    }).then(function(){
      return this$.manager.csscope.load(this$.dependencies.filter(function(it){
        return it.type === 'css' && it.global === true;
      }));
    }).then(function(it){
      this$.csscopes.global = it || [];
      return this$.manager.csscope.load(this$.dependencies.filter(function(it){
        return it.type === 'css' && it.global !== true;
      }));
    }).then(function(it){
      var ref$;
      this$.csscopes.local = it || [];
      if (!this$.extend) {
        return;
      }
      (ref$ = this$.csscopes).global = ref$.global.concat(this$.extend.csscopes.global || []);
      if (this$.extendStyle === true) {
        return (ref$ = this$.csscopes).local = ref$.local.concat(this$.extend.csscopes.local || []);
      } else if (this$.extendDom === 'overwrite') {
        return (ref$ = this$.csscopes).local = ref$.local.concat(this$.extend.csscopes.local.slice(1));
      }
    })['catch'](function(e){
      console.error("[@plotdb/block] init " + block.id(this$), e);
      return this$['interface'] = {}, this$.styleNode = {}, this$.factory = function(){
        return this;
      }, this$.dependencies = [], this$;
    });
  },
  _usedby: function(b){
    var _, this$ = this;
    if (this === b) {
      throw new Error("circular extend");
    }
    (this._users || (this._users = [])).push(b);
    _ = function(l){
      var i$, len$, o, results$ = [];
      l == null && (l = []);
      if (in$(this$, l)) {
        throw new Error("circular extend");
      }
      for (i$ = 0, len$ = l.length; i$ < len$; ++i$) {
        o = l[i$];
        results$.push(_(o._users));
      }
      return results$;
    };
    return _(b._users);
  },
  context: function(){
    return this._ctx;
  },
  dom: function(){
    return this.node;
  },
  _path: function(p){
    var _;
    p == null && (p = '');
    _ = this.manager.getUrl({
      ns: this.ns,
      name: this.name,
      version: this.version,
      path: this.path
    }) || '';
    return _.replace(/\/[^/]*$/, '/') + p;
  },
  i18n: function(t, o){
    var id, r;
    id = this._id_t;
    t = t.replace(/:/g, '\uf8ff');
    r = block.i18n.module.t([id + ":" + t].concat(this['extends'].map(function(it){
      return it._id_t + ":" + t;
    }), [t + ""]), o);
    return (r || '').replace(/\uf8ff/g, ':');
  },
  create: function(o){
    var this$ = this;
    o == null && (o = {});
    return this.init().then(function(){
      var r;
      r = new block.instance({
        block: this$,
        data: o.data,
        host: o.host,
        ns: this$.ns,
        name: this$.name,
        path: this$.path,
        version: this$.version
      });
      return r.init().then(function(){
        if (!o.root) {
          return;
        }
        return r.attach({
          root: o.root,
          before: o.before,
          host: o.host,
          autoTransform: o.autoTransform || null
        });
      }).then(function(){
        return r;
      });
    });
  },
  resolvePlugAndCloneNode: function(child, byPass){
    var node;
    byPass == null && (byPass = false);
    if (!byPass) {
      node = this.dom().cloneNode(true);
      Array.from(node.querySelectorAll('plug')).forEach(function(p){
        var name, n;
        name = p.getAttribute('name');
        if (!child) {
          return;
        }
        n = child.querySelector(":scope :not([plug]) [plug=" + name + "], :scope > [plug=" + name + "]");
        if (n) {
          return p.replaceWith(n);
        }
      });
      Array.from(node.querySelectorAll('plug')).forEach(function(p){
        var name, n, i$, ref$, len$, attr;
        name = p.getAttribute('name');
        p.removeAttribute('name');
        p.setAttribute('plug', name);
        n = doc.createElement('div');
        for (i$ = 0, len$ = (ref$ = p.attributes).length; i$ < len$; ++i$) {
          attr = ref$[i$];
          n.setAttribute(attr.name, attr.value);
        }
        while (p.firstChild) {
          n.appendChild(p.firstChild);
        }
        return p.replaceWith(n);
      });
    } else {
      node = child;
    }
    return this.extend && this.extendDom !== false ? this.extendDom === 'overwrite'
      ? this.extend.resolvePlugAndCloneNode(node, true)
      : this.extend.resolvePlugAndCloneNode(node) : node;
  }
});
block.instance = function(opt){
  var ref$, this$ = this;
  opt == null && (opt = {});
  this.ns = opt.ns;
  this.name = opt.name;
  this.version = opt.version;
  this.path = opt.path;
  this.block = opt.block;
  this.data = opt.data;
  this._id = ((ref$ = opt.block) != null ? ref$._id_t : void 8) + "=" + Date.now() + "-" + Math.random().toString(36).substring(2);
  this.init = proxise.once(function(){
    return this$._init();
  });
  return this;
};
block.instance.prototype = import$(Object.create(Object.prototype), {
  _init: function(){
    return this.block.init();
  },
  attach: function(opt){
    var _o, list, i$, i, b, i18n, lng, res, root, node, exts, s, to$, es, this$ = this;
    opt == null && (opt = {});
    if (_o = this._defered) {
      if (_o.before) {
        _o.root.insertBefore(_o.node, _o.before);
      } else {
        _o.root.appendChild(_o.node);
      }
      return Promise.resolve();
    }
    if (opt.data) {
      this.data = opt.data;
    }
    this.host = (Array.isArray(opt.host)
      ? opt.host
      : [opt.host]).filter(function(it){
      return it;
    });
    if (opt.i18n) {
      this._i18nModule = opt.i18n;
      list = [this.block].concat(this.block['extends']);
      for (i$ = list.length - 1; i$ >= 0; --i$) {
        i = i$;
        b = list[i];
        i18n = b['interface'].pkg.i18n || {};
        for (lng in i18n) {
          res = i18n[lng];
          this._i18nModule.addResourceBundle(lng, b._id_t, res, true, true);
        }
      }
    } else {
      this._i18nModule = block.i18n.module;
    }
    root = opt.root;
    root = !root
      ? null
      : typeof root === 'string' ? doc.querySelector(root) : root;
    block.global.csscope.apply(this.block.csscopes.global);
    if (!root) {
      node = null;
    } else {
      node = this.dom(opt.root);
      exts = [this.block].concat(this.block['extends']);
      s = [this.block.scope];
      for (i$ = 0, to$ = exts.length - 1; i$ < to$; ++i$) {
        i = i$;
        es = exts[i].extendStyle;
        if (es === 'overwrite') {
          continue;
        } else if (es === false) {
          break;
        }
        s.push(exts[i + 1].scope);
      }
      node.setAttribute('scope', s.join(' '));
      node.classList.add.apply(node.classList, this.block.csscopes.local.map(function(it){
        return it.scope;
      }).concat(this.block.csscopes.global.map(function(it){
        return it.scope;
      })));
      if (!opt.defer) {
        if (opt.before) {
          root.insertBefore(node, opt.before);
        } else {
          root.appendChild(node);
        }
      } else {
        this._defered = {
          node: node,
          root: root,
          before: opt.before
        };
      }
    }
    if (opt.autoTransform === 'i18n') {
      this._i18nModule.on('languageChanged', this._i18nTransform = function(){
        return this$.transform('i18n');
      });
    }
    return this.run({
      node: node,
      type: 'init'
    });
  },
  detach: function(){
    var node;
    node = this.dom();
    node.parentNode.removeChild(node);
    if (this._i18nTransform) {
      this._i18nModule.off('languageChanged', this._i18nTransform);
      this._i18nTransform = null;
    }
    return this.run({
      node: node,
      type: 'destroy'
    });
  },
  'interface': function(){
    var ref$;
    return (ref$ = this.obj)[ref$.length - 1]['interface']();
  },
  client: function(opt){
    var ref$;
    return (ref$ = this.obj)[ref$.length - 1].client(opt);
  },
  clients: function(opt){
    var ref$;
    return (ref$ = this.obj)[ref$.length - 1].clients(opt);
  },
  _transform: function(node, tag, func){
    var regex, _, wk;
    regex = new RegExp("^" + tag + "-(.+)$");
    _ = function(n){
      var i$, to$, i, ref$, name, value, ret, v, results$ = [];
      if (n.nodeType === win.Element.TEXT_NODE) {
        n.parentNode.setAttribute(tag, n.textContent);
        return n.parentNode.replaceChild(doc.createTextNode(func(n.textContent)), n);
      } else {
        for (i$ = 0, to$ = n.attributes.length; i$ < to$; ++i$) {
          i = i$;
          ref$ = n.attributes[i], name = ref$.name, value = ref$.value;
          if (!(ret = regex.exec(name))) {
            continue;
          }
          n.setAttribute(ret[1], func(value || ''));
        }
        if (v = n.getAttribute(tag)) {
          return n.textContent = func(v);
        }
        for (i$ = 0, to$ = n.childNodes.length; i$ < to$; ++i$) {
          i = i$;
          results$.push(_(n.childNodes[i]));
        }
        return results$;
      }
    };
    wk = new WeakMap();
    Array.from(node.querySelectorAll(":scope [scope] [" + tag + "]")).map(function(n){
      return wk.set(n, 1);
    });
    Array.from(node.querySelectorAll("[" + tag + "]")).filter(function(n){
      return !wk.get(n);
    }).map(function(n){
      return _(n);
    });
    return node;
  },
  transform: function(n){
    var this$ = this;
    if (!(n === 'i18n' || n === 'path')) {
      return;
    }
    this._transform(this.node, 't', function(it){
      return this$.i18n(it);
    });
    return this._transform(this.node, 'path', function(it){
      return this$._path(it);
    });
  },
  dom: function(child){
    var that;
    if (that = this.node) {
      return that;
    }
    this.node = this.block.resolvePlugAndCloneNode(child);
    this.transform('i18n');
    return this.transform('path');
  },
  _path: function(it){
    return this.block._path(it);
  },
  _gethost: function(arg$){
    var host, accept, accepts, ret;
    host = arg$.host, accept = arg$.accept;
    accepts = (Array.isArray(accept)
      ? accept
      : [accept]).filter(function(it){
      return it;
    });
    if (!accepts.length) {
      return host;
    }
    ret = accepts.map(function(a){
      return (host || []).filter(function(h){
        return (h.bid ? block.id2obj(h.bid) : h).name === a.name;
      })[0];
    });
    return Array.isArray(accept)
      ? ret
      : ret[0] || null;
  },
  i18n: function(v, o){
    var id, t, r;
    if (!this._i18nModule) {
      return this.block.i18n(v, o);
    }
    id = this.block._id_t;
    t = v.replace(/:/g, '\uf8ff');
    r = this._i18nModule.t([id + ":" + t].concat(this.block['extends'].map(function(it){
      return it._id_t + ":" + t;
    }), [t + ""]), o);
    return (r || '').replace(/\uf8ff/g, ':');
  }
  /* TODO [IID] a way to extend instance-based i18n resource
  add-resource-bundles: (resources = {}) ~>
    for lng, res of resources =>
      (@_i18n-module or @block.i18n.module).add-resource-bundle lng, @_id, res, true, true
  */,
  run: function(arg$){
    var node, type, cs, ps, c, _i18nObj, i18nObj, this$ = this;
    node = arg$.node, type = arg$.type;
    cs = [];
    ps = [];
    c = this.block;
    if (!this.obj) {
      this.obj = [];
    }
    if (!this.pubsub) {
      this.pubsub = new pubsub();
    }
    /* local i18n object issue
       this was confusing, since it's actually a customized i18n object inside @plotdb/block
       we need a namespace version of i18n for translate ( `t` ) and adding resource bundles
       so that block can query layer by layer based on the extension chain.
       so overwriting `t` and provide an mean to add resource based on namespace is necessary.
    
       however, while extending `t` may be a acceptable approach, adding `addResourceBundles`
       as a new API pollute the original i18n object interface. We should consider alternative approaches.
       and `getLanguage()` can now be replaced by `lanaguage` so we mark it as deprecated,
       and expect to remove it in the future.
    */
    _i18nObj = {
      t: function(v, o){
        return this$.i18n(v, o);
      },
      getLanguage: function(){
        return this.language;
      },
      addResourceBundles: function(resources){
        var lng, res, results$ = [];
        resources == null && (resources = {});
        for (lng in resources) {
          res = resources[lng];
          results$.push((this$._i18nModule || this$.block.i18n.module).addResourceBundle(lng, this$.block._id_t, res, true, true));
        }
        return results$;
      }
    };
    i18nObj = new Proxy(this._i18nModule
      ? this._i18nModule
      : this.block.i18n.module, {
      get: function(obj, prop, receiver){
        var that;
        return (that = _i18nObj[prop])
          ? that
          : Reflect.get(obj, prop, receiver);
      },
      ownKeys: function(obj){
        return arrayFrom$(Reflect.ownKeys(_i18nObj)).concat(arrayFrom$(Reflect.ownKeys(obj)));
      },
      getOwnPropertyDescriptor: function(obj, prop){
        return _i18nObj[prop]
          ? {
            enumerable: true,
            configurable: true,
            value: _i18nObj[prop]
          }
          : Reflect.getOwnPropertyDescriptor(obj, prop);
      }
    });
    while (c) {
      cs = [c].concat(cs);
      c = c.extend;
    }
    return new Promise(function(res, rej){
      var _;
      _ = function(list, idx, gtx, parent, sync){
        var p, b, ref$;
        list == null && (list = []);
        idx == null && (idx = 0);
        gtx == null && (gtx = {});
        if (list.length <= idx) {
          p = Promise.all(ps).then(function(it){
            return res(it);
          })['catch'](function(it){
            return rej(it);
          });
          return p;
        }
        b = list[idx];
        return function(ctx){
          var payload, o, _p, sync;
          import$(gtx, ctx);
          payload = {
            root: node,
            parent: parent,
            manager: this$.block.manager,
            ctx: gtx,
            context: gtx,
            pubsub: this$.pubsub,
            i18n: i18nObj,
            t: function(v, o){
              return this$.i18n(v, o);
            },
            path: function(it){
              return this$._path(it);
            },
            data: this$.data,
            host: this$._gethost({
              host: this$.host,
              accept: b.acceptedHosts
            })
          };
          if (type === 'init') {
            this$.obj.push(o = new b.factory(this$.block === b ? this$ : null));
            o.parent = this$.obj[idx - 1];
          }
          if (o = this$.obj[idx]) {
            ps.push(_p = o[type](payload));
          }
          sync = sync || b['interface'].pkg.syncInit;
          if (!(sync && _p)) {
            return _(list, idx + 1, gtx, o, sync);
          } else {
            return Promise.resolve(_p).then(function(){
              return _(list, idx + 1, gtx, o, sync);
            });
          }
        }(b._ctx.ctx
          ? b._ctx.ctx()
          : (ref$ = b._ctx).local || (ref$.local = {}));
      };
      return _(cs, 0, {});
    });
  }
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}block.env(typeof self != 'undefined' && self !== null ? self : globalThis);
if (typeof module != 'undefined' && module !== null) {
  module.exports = block;
} else if (typeof window != 'undefined' && window !== null) {
  window.block = block;
}}())
(function(){
  var ldform;
  ldform = function(opt){
    var root, fields, status, el, that, check, k, v, this$ = this;
    opt == null && (opt = {});
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? ld$.find(document, opt.root, 0)
      : opt.root;
    this.evtHandler = {};
    this.fields = fields = {};
    this.status = status = {
      all: 1
    };
    this.el = el = {};
    if (opt.submit != null) {
      el.submit = typeof opt.submit === 'string'
        ? ld$.find(this.root, opt.submit, 0)
        : opt.submit;
    }
    if (!el.submit) {
      if (that = ld$.find(root, '[type=submit]', 0)) {
        el.submit = that;
      }
    }
    ['debounce', 'verify', 'names', 'getFields', 'afterCheck'].map(function(n){
      if (opt[n]) {
        return this$[n] = opt[n];
      }
    });
    check = function(e){
      return this$.check({
        n: e && e.target ? e.target.getAttribute('name') : undefined,
        e: e
      });
    };
    this.fields = fields = this.getFields(root);
    this.values(opt.values || {});
    for (k in fields) {
      v = fields[k];
      (Array.isArray(v)
        ? v
        : [v]).map(fn$);
      status[k] = 1;
    }
    this.checkDebounced = debounce(330, function(n, fs, s, res, rej){
      var names, all, len, that;
      names = this.names(s);
      all = s.all;
      delete s.all;
      this.afterCheck(s, fs);
      len = names.map(function(n){
        return s[n] != null && s[n] === 0;
      }).filter(function(it){
        return !it;
      }).length;
      if (!(s.all != null)) {
        s.all = !len ? 0 : 1;
      }
      names.map(function(n){
        return (Array.isArray(fs[n])
          ? fs[n]
          : [fs[n]]).map(function(f){
          var x$;
          x$ = f.classList;
          x$.toggle('is-invalid', s[n] === 2);
          x$.toggle('is-valid', s[n] < 1);
          return x$;
        });
      });
      if (all !== s.all) {
        this.fire('readystatechange', s.all === 0);
      }
      if (that = this.el.submit) {
        that.classList.toggle('disabled', s.all !== 0);
      }
      return res();
    });
    if (opt.init) {
      opt.init.apply(this);
    }
    if (this.opt.initCheck) {
      this.checkAll();
    }
    return this;
    function fn$(f){
      return ['change', 'input', 'paste'].forEach(function(n){
        return f.addEventListener(n, check);
      });
    }
  };
  ldform.prototype = import$(Object.create(Object.prototype), {
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    field: function(n){
      return this.fields[n];
    },
    reset: function(){
      var ref$, s, fs;
      ref$ = [this.status, this.fields], s = ref$[0], fs = ref$[1];
      s.all = 1;
      this.names(s).map(function(n){
        var v;
        v = fs[n];
        if (Array.isArray(v)) {
          v.map(function(f){
            f.checked = it.defaultChecked;
            return f.classList.remove('is-invalid', 'is-valid');
          });
        } else {
          v.value = '';
          v.classList.remove('is-invalid', 'is-valid');
        }
        return s[n] = 1;
      });
      return this.check();
    },
    ready: function(){
      return this.status.all === 0;
    },
    verify: function(n, v, e){
      return v ? 0 : 2;
    },
    names: function(){
      var k, results$ = [];
      for (k in this.fields) {
        results$.push(k);
      }
      return results$;
    },
    debounce: function(){
      return true;
    },
    afterCheck: function(){},
    values: function(val){
      var k, ref$, v, fs, ret, results$ = [], this$ = this;
      if (val != null) {
        for (k in ref$ = val || {}) {
          v = ref$[k];
          if (!(fs = this.fields[k])) {
            continue;
          }
          fs = Array.isArray(fs)
            ? fs
            : [fs];
          results$.push(fs.map(fn$));
        }
        return results$;
      } else {
        ret = {};
        for (k in ref$ = this.fields) {
          v = ref$[k];
          (Array.isArray(v)
            ? v
            : [v]).map(fn1$);
        }
        return ret;
      }
      function fn$(f){
        var type;
        type = f.getAttribute('type');
        if (type === 'file') {} else if (type === 'radio') {
          return f.checked = f.value === v;
        } else if (type === 'checkbox') {
          return f.checked = in$(f.value, v || []);
        } else {
          return this$.fields[k].value = v;
        }
      }
      function fn1$(f){
        var type;
        type = f.getAttribute('type');
        if (type === 'checkbox') {
          if (f.checked) {
            return (ret[k] || (ret[k] = [])).push(f.value);
          }
        } else if (type === 'radio') {
          if (f.checked) {
            return ret[k] = f.value;
          }
        } else {
          return ret[k] = f.getAttribute('type') === 'checkbox'
            ? f.checked
            : f.value;
        }
      }
    },
    getfd: function(){
      var fd, k, ref$, v, i$, to$, i;
      fd = new FormData();
      for (k in ref$ = this.fields) {
        v = ref$[k];
        if (v.files && v.files.length) {
          for (i$ = 0, to$ = v.files.length; i$ < to$; ++i$) {
            i = i$;
            fd.append(k + "[]", v.files[i]);
          }
        } else if (Array.isArray(v)) {
          v.map(fn$);
        } else {
          fd.append(k, v.value);
        }
      }
      return fd;
      function fn$(f){
        if (f.checked) {
          return fd.append(k + "[]", f.value);
        }
      }
    },
    getFields: function(root){
      var ret, this$ = this;
      ret = {};
      ld$.find(this.root, '[name]').map(function(f){
        var form, n;
        form = ld$.parent(f, '[ldform]', this$.root);
        if (form && this$.root !== form) {
          return;
        }
        n = f.getAttribute('name');
        if (ret[n]) {
          if (Array.isArray(ret[n])) {
            return ret[n].push(f);
          } else {
            return ret[n] = [ret[n], f];
          }
        } else {
          return ret[n] = f;
        }
      });
      return ret;
    },
    checkAll: function(){
      var k, v;
      return Promise.all((function(){
        var ref$, results$ = [];
        for (k in ref$ = this.fields) {
          v = ref$[k];
          results$.push(this.check({
            n: k,
            now: true
          }));
        }
        return results$;
      }.call(this)));
    },
    check: function(opt){
      var this$ = this;
      opt == null && (opt = {});
      if (Array.isArray(opt)) {
        return Promise.all(opt.map(function(it){
          return this$.check(it);
        }));
      }
      return new Promise(function(res, rej){
        var ref$, n, e, now, fs, s, v, r, p;
        ref$ = {
          n: opt.n,
          e: opt.e,
          now: opt.now
        }, n = ref$.n, e = ref$.e, now = ref$.now;
        if (n && !in$(n, this$.names(s))) {
          return;
        }
        if (n != null && !this$.fields[n]) {
          return rej(new Error("ldform.check: field " + n + " not found."));
        }
        ref$ = [this$.fields, this$.status], fs = ref$[0], s = ref$[1];
        if (fs[n]) {
          if (!Array.isArray(fs[n])) {
            v = fs[n].value;
          } else {
            v = fs[n].filter(function(it){
              return it.checked;
            }).map(function(it){
              return it.value;
            });
            if (fs[n][0].getAttribute('type') === 'radio') {
              v = v[0];
            }
          }
          r = this$.verify(n, v, fs[n]);
        }
        p = !(r && r.then)
          ? Promise.resolve(s[n] = r)
          : r.then(function(it){
            return s[n] = it;
          });
        return p.then(function(){
          if (this$.debounce(n, s) && !now) {
            return this$.checkDebounced(n, fs, s, res, rej);
          } else {
            return this$.checkDebounced(n, fs, s, res, rej).now();
          }
        });
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldform;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldform = ldform;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
(function(){ var curegex = [
[
  {
    "name": "email",
    "rule": "^[-a-z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.[a-z]{2,}|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$",
    "flag": "i"
  },
  {
    "name": "url",
    "rule": "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)"
  },
  {
    "name": "password-len8-cn",
    "rule": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
  },
  {
    "name": "password-len8-cns",
    "rule": "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
  },
  {
    "name": "password-len8-uln",
    "rule": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
  },
  {
    "name": "password-len8-ulns",
    "rule": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
  }
]
];
var map, main;
map = {};
curegex.map(function(regs){
  return regs.map(function(it){
    return map[it.name] = it;
  });
});
main = {
  get: function(name, engine){
    var obj;
    if (!engine) {
      engine = this._engine || RegExp;
    }
    if (!(obj = map[name])) {
      return null;
    }
    return new engine(obj.rule, obj.flag || []);
  },
  engine: function(it){
    return this._engine = it;
  },
  raw: function(name){
    return map[name];
  }
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = main;
}
if (typeof window != 'undefined' && window !== null) {
  window.curegex = main;
}
})();
(function(){
  var idmap, lderror;
  idmap = {
    0: "unknown lderror",
    998: "skipped",
    999: "canceled",
    1000: "user not login",
    1001: "suspicious user",
    1002: "unknown error",
    1003: "image process failed",
    1004: "quota exceeded",
    1005: "csrftoken mismatch",
    1006: "timeout",
    1007: "server down",
    1008: "unable to parse user data",
    1009: "bot",
    1010: "captcha error",
    1011: "resource conflict",
    1012: "permission denied",
    1013: "expire",
    1014: "apply for a resource that already exists",
    1015: "bad parameter",
    1016: "feature not yet available",
    1017: "resource corrupted",
    1018: "no consent",
    1019: "wrong domain",
    1020: "not supported",
    1021: "email not verified",
    1022: "missing dependency",
    1023: "lderror testing",
    1024: "limited by throttling",
    1025: "runtime error",
    1026: "not applicable",
    1027: "missing config",
    1028: "resource unavailable",
    1029: "session data corrupted",
    1030: "password mismatched",
    1031: "weak password",
    1032: "credential scheme mismatched",
    1033: "view failed to render",
    1034: "user not found",
    1035: "payment rejected",
    1036: "reused passwords not allowed",
    1037: "offline",
    1038: "file too large",
    1039: "payment rejected",
    1040: "registration closed",
    1041: "resource possibly blocked by client",
    1042: "3rd party service error",
    1043: "additional token required",
    1044: "unsupported encoding",
    1045: "invalid token / code",
    1046: "network or cors issue",
    1047: "abort",
    1048: "captcha required",
    1049: "too many attempts",
    1050: "code consumed",
    1051: "ip not allowed",
    1052: "account not activated"
  };
  lderror = function(opt, id){
    var _id, that, e;
    opt == null && (opt = "");
    id == null && (id = 0);
    if (!(this instanceof lderror)) {
      return new lderror(opt, id);
    }
    _id = (!isNaN(+id) ? +id : 0) || opt.id || 0;
    if (typeof opt === 'string') {
      this.message = opt;
      this.id = _id;
    } else if (opt instanceof Error) {
      (this.stack = opt.stack, this.message = opt.message, this).id = _id;
    } else if (typeof opt === 'object') {
      delete opt.__proto__;
      delete opt.constructor;
      import$(this, opt).id = _id;
    } else if (typeof opt === 'number') {
      this.id = opt;
      if (typeof id === 'string') {
        this.message = id;
      } else if (typeof id === 'object') {
        this.payload = id;
      }
      if (!this.message) {
        this.message = (that = idmap[this.id || 0])
          ? that
          : this.id >= 100 && this.id < 600
            ? "http code: " + this.id
            : idmap[0] + " (id: " + (this.id || 0) + ")";
      }
    }
    this.name = lderror.prototype.name;
    this.stack = (e = import$(new Error(), this)).stack;
    this.error = e;
    return this;
  };
  lderror.prototype = import$(Object.create(Error.prototype), {
    name: 'lderror',
    toString: function(opt){
      var obj;
      opt == null && (opt = {});
      obj = this.toObject();
      if (opt.stack != null && !opt.stack) {
        delete obj.stack;
      }
      return JSON.stringify(obj);
    },
    toObject: function(){
      var ref$;
      return ref$ = {
        name: this.name
      }, ref$.id = this.id, ref$.message = this.message, ref$.stack = this.stack, ref$.payload = this.payload, ref$;
    }
  });
  lderror.id = function(opt){
    if (opt && typeof opt === 'object' && opt.name === 'lderror' && opt.id) {
      return opt.id;
    }
    return 0;
  };
  lderror.message = function(o){
    if (typeof o === 'number') {
      return idmap[o] || idmap[0];
    } else if (typeof o === 'object') {
      return idmap[o.id] || idmap[0];
    }
    return idmap[0];
  };
  lderror.reject = function(opt, id){
    return Promise.reject(new lderror(opt, id));
  };
  lderror.handler = function(o){
    var h, this$ = this;
    o == null && (o = {});
    this.i = (o.ignore || []).concat([999]);
    this.h = o.handler;
    this.r = o.rule || function(it){
      return it;
    };
    this.s = {};
    h = function(e){
      var i, p;
      if (in$(i = lderror.id(e), this$.i)) {
        return;
      }
      this$.s[i] = 1;
      p = this$.h(this$.r(i), e);
      if (!(p && p.then)) {
        this$.s[i] = 0;
      } else {
        p.then(function(){
          return this$.s[i] = 0;
        });
      }
      if (!i) {
        console.log(e);
        throw e;
      }
    };
    h.isOn = function(){
      var k, v;
      return !!(function(){
        var ref$, results$ = [];
        for (k in ref$ = this.s) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }.call(this$)).filter(function(v){
        return v;
      }).length;
    };
    return h;
  };
  lderror.eventHandler = {
    error: function(e){
      if (e.error && e.error.name === 'lderror' && e.error.error && e.error !== e.error.error) {
        console.warn("uncaught lderror", e.error);
        console.warn("with its internal Error object thrown:");
        e.preventDefault();
        setTimeout(function(){
          throw e.error.error;
        }, 0);
        return true;
      }
      return false;
    },
    rejection: function(e){
      if (e.reason && e.reason.name === 'lderror' && e.reason.error) {
        console.warn("Unhandled rejection with lderror:", e.reason);
        console.warn("with its internal Error object thrown:");
        setTimeout(function(){
          throw e.reason.error;
        }, 0);
        e.preventDefault();
        return true;
      }
      return false;
    }
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = lderror;
  } else if (typeof window != 'undefined' && window !== null) {
    window.lderror = lderror;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
(function(){
  var lc, ldnotify;
  lc = {};
  ldnotify = function(opt){
    var this$ = this;
    opt == null && (opt = {});
    this.opt = {
      className: ['ldnotify-item'],
      classIn: ['ldnotify-in'],
      classOut: ['ldnotify-out'],
      delay: 3000
    };
    import$(this.opt, opt);
    ['className', 'classIn', 'classOut'].map(function(it){
      if (typeof this$.opt[it] === 'string') {
        return this$.opt[it] = this$.opt[it].split(' ').filter(function(it){
          return it.trim();
        });
      }
    });
    if (opt.classByType) {
      this.classByType = opt.classByType;
    }
    this.root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    if (!this.root) {
      this.root = document.body.appendChild(document.createElement('div'));
    }
    this.root.classList.add('ldnotify');
    return this;
  };
  ldnotify.prototype = import$(Object.create(Object.prototype), {
    classByType: function(it){
      return "ldnotify-" + it;
    },
    send: function(type, msg){
      var node, span, this$ = this;
      node = document.createElement('div');
      span = document.createElement('span');
      node.appendChild(span);
      node.setAttribute('class', (this.opt.className.concat(this.opt.classIn, [this.classByType(type)])).join(' '));
      span.innerText = msg;
      this.root.insertBefore(node, this.root.childNodes[0]);
      return setTimeout(function(){
        node.classList.remove.apply(node.classList, this$.opt.classIn);
        node.classList.add.apply(node.classList, this$.opt.classOut);
        return setTimeout(function(){
          if (node.parentNode) {
            return node.parentNode.removeChild(node);
          }
        }, this$.opt.delay);
      }, this.opt.delay);
    }
  });
  ldnotify.send = function(){
    var args, res$, i$, to$;
    res$ = [];
    for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    args = res$;
    if (!lc.obj) {
      lc.obj = new ldnotify();
    }
    return lc.obj.send.apply(lc.obj, args);
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldnotify;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldnotify = ldnotify;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
// Generated by LiveScript 1.6.0
var ldcvmgr;
ldcvmgr = function(opt){
  var that;
  opt == null && (opt = {});
  this.opt = opt;
  this.evtHandler = {};
  this.path = opt.path || "/modules/cover";
  if (typeof this.path === 'string') {
    this.path = this.path.replace(/\/$/, '');
  }
  this.loader = (that = opt.loader)
    ? that
    : new ldloader({
      className: "ldld full",
      autoZ: true
    });
  this.mgr = opt.manager || null;
  this.covers = {};
  this.workers = {};
  this.errorCover = opt.errorCover || 'error';
  this.errorHandling = false;
  this.prepareProxy = proxise(function(n){});
  if (opt.zmgr) {
    this.zmgr(opt.zmgr);
  }
  this.baseZ = opt.baseZ || (opt.zmgr ? 'modal' : 3000);
  if (opt.autoInit) {
    this.init();
  }
  return this;
};
ldcvmgr.prototype = import$(Object.create(Object.prototype), {
  on: function(n, cb){
    var ref$;
    return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
  },
  fire: function(n){
    var v, res$, i$, to$, ref$, len$, cb, results$ = [];
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    v = res$;
    for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
      cb = ref$[i$];
      results$.push(cb.apply(this, v));
    }
    return results$;
  },
  zmgr: function(it){
    if (it != null) {
      return this._zmgr = it;
    } else {
      return this._zmgr;
    }
  },
  error: function(n, e, p){
    n == null && (n = '');
    e == null && (e = {});
    p == null && (p = {});
    if (n === 'error' || n === this.errorCover || n === this._id(this.errorCover)) {
      alert("something is wrong; please reload and try again");
    } else {
      this.errorHandling = true;
      this.toggle(this.errorCover || 'error', true, {
        err: e,
        param: p
      });
    }
    return console.log(e.message || e);
  },
  _id: function(o){
    if (typeof o === 'object') {
      return this.mgr.id(o);
    } else {
      return o;
    }
  },
  prepare: function(o){
    var n, p, that, name, this$ = this;
    n = this._id(o);
    if (this.covers[n]) {
      return Promise.resolve();
    }
    if (this.workers[n]) {
      return this.prepareProxy(n);
    }
    if (this.errorHandling) {
      this.loader.on();
      this.errorHandling = false;
    } else {
      this.loader.on(1000);
    }
    p = typeof o === 'object'
      ? this.workers[n] = this.mgr.get(o).then(function(bc){
        return bc.create();
      }).then(function(bi){
        return bi.attach({
          root: document.body,
          data: {
            zmgr: this$._zmgr,
            baseZ: this$.baseZ
          }
        }).then(function(){
          var ret;
          this$.covers[n] = ret = bi['interface']();
          return bi.dom();
        });
      })
      : (that = document.querySelector(".ldcvmgr[data-name='" + n + "']"))
        ? Promise.resolve(that)
        : (name = typeof this.path === 'function'
          ? this.path(n)
          : this.path + "/" + n + ".html", this.workers[n] = fetch(name).then(function(v){
          if (!(v && v.ok)) {
            throw new Error("modal '" + (!n ? '<no-name>' : n) + "' load failed.");
          }
          return v.text();
        }).then(function(code){
          var bc;
          bc = new block['class']({
            manager: this$.mgr,
            code: code
          });
          return bc.create({
            root: document.body
          }).then(function(bi){
            var itf;
            if (itf = bi['interface']()) {
              this.covers[n] = itf;
            }
            return bi.dom();
          });
        }));
    return p['finally'](function(){
      return this$.loader.cancel(false);
    }).then(function(root){
      var ref$, ref1$;
      if (!this$.covers[n]) {
        this$.covers[n] = new ldcover({
          root: root,
          lock: root.getAttribute('data-lock') === 'true',
          zmgr: this$._zmgr,
          baseZ: this$.baseZ
        });
      }
      this$.prepareProxy.resolve();
      return ref1$ = (ref$ = this$.workers)[n], delete ref$[n], ref1$;
    })['catch'](function(it){
      this$.prepareProxy.reject(it);
      delete this$.workers[n];
      throw it;
    });
  },
  purge: function(o){
    var n, ref$, ref1$;
    n = this._id(o);
    if (n != null) {
      return ref1$ = (ref$ = this.covers)[n], delete ref$[n], ref1$;
    } else {
      return this.covers = {};
    }
  },
  lock: function(o, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].lock();
    }).then(function(){
      return this$.covers[n].toggle(true, p);
    })['catch'](function(e){
      return this$.error(n, e, p);
    });
  },
  toggle: function(o, v, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].toggle(v, p);
    }).then(function(){
      return this$.fire((this$.covers[n].isOn() ? 'on' : 'off') + "", {
        node: this$.covers[n],
        param: p,
        name: n
      });
    })['catch'](function(e){
      return this$.error(n, e, p);
    });
  },
  getcover: function(o){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n];
    });
  },
  getdom: function(o){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].root();
    });
  },
  isOn: function(o){
    var n;
    n = this._id(o);
    return this.covers[n] && this.covers[n].isOn();
  },
  set: function(o, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      return this$.covers[n].set(p);
    });
  },
  get: function(o, p){
    var n, this$ = this;
    n = this._id(o);
    return this.prepare(o).then(function(){
      this$.fire("on", {
        node: this$.covers[n],
        param: p,
        name: n
      });
      return this$.covers[n].get(p);
    })['catch'](function(e){
      return this$.error(n, e, p);
    });
  },
  init: function(root){
    var this$ = this;
    ld$.find(root || document.body, '.ldcvmgr').map(function(n){
      var id;
      if (!(id = n.getAttribute('data-name')) || this$.covers[id]) {
        return;
      }
      return this$.covers[id] = new ldcover({
        root: n,
        lock: n.getAttribute('data-lock') === 'true',
        zmgr: this$._zmgr,
        baseZ: this$.baseZ
      });
    });
    return document.body.addEventListener('click', function(evt){
      var n, id;
      if (!(n = ld$.parent(evt.target, "[data-ldcvmgr-toggle]"))) {
        return;
      }
      if (!(id = n.getAttribute('data-ldcvmgr-toggle'))) {
        return;
      }
      return this$.toggle(/:/.exec(id) ? this$.mgr.id2obj(id) : id);
    });
  }
});
if (typeof module != 'undefined' && module !== null) {
  module.exports = ldcvmgr;
} else if (typeof window != 'undefined' && window !== null) {
  window.ldcvmgr = ldcvmgr;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
(function(){
  var local, lda, ldc;
  local = {};
  window.lda = lda = {};
  window.ldc = ldc = {
    module: {},
    register: function(n, d, f){
      var ret;
      if (Array.isArray(n)) {
        this.apps.push(ret = {
          f: d,
          d: n
        });
      } else {
        ret = this.module[n] = {
          f: f,
          d: d
        };
      }
      return ret;
    },
    evtHandler: {},
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    actHandler: {},
    action: function(n, cb){
      var ref$;
      if (typeof n === 'object') {
        if (!local.name) {
          console.warn("ldc.action(): Action registered after module initialization will be anonymous actions.");
          console.warn("You can name the action set explicitly if you have to do this.");
          console.warn("e.g., ldc.action('name', { actions ... });");
          console.warn("related action object: ", n);
        }
        if (local.name) {
          return lda[local.name] = n;
        }
      } else if (typeof cb === 'object') {
        return lda[n] = cb;
      } else {
        return ((ref$ = this.actHandler)[n] || (ref$[n] = [])).push(cb);
      }
    },
    act: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.actHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    apps: [],
    app: function(){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return this.apps = this.apps.concat(args);
    },
    init: function(ns){
      var _, i$, len$, k, this$ = this, results$ = [];
      _ = function(param){
        var ref$, p, name, m, i$, len$, n;
        ref$ = typeof param === 'object'
          ? [{}, "", param]
          : [{}, param, this$.module[param]], p = ref$[0], name = ref$[1], m = ref$[2];
        if (!m) {
          return null;
        }
        if (m.o) {
          return m.o;
        }
        if (m.state === 'initing') {
          throw new Error("circular dependency");
        }
        m.state = 'initing';
        for (i$ = 0, len$ = (ref$ = m.d).length; i$ < len$; ++i$) {
          n = ref$[i$];
          p[n] = _(n);
        }
        m.state = 'inited';
        local.name = name;
        m.o = m.f.call(m._o = {}, p);
        local.name = null;
        return m.o;
      };
      ns = !ns
        ? this.apps
        : Array.isArray(ns)
          ? ns
          : [ns];
      for (i$ = 0, len$ = ns.length; i$ < len$; ++i$) {
        k = ns[i$];
        results$.push(_(k));
      }
      return results$;
    },
    run: function(n){
      this.init(n);
      return null;
    }
  };
  window.addEventListener('DOMContentLoaded', function(){
    return ldc.init();
  });
}).call(this);
// Generated by LiveScript 1.6.0
(function(){
  (function(it){
    return it.apply({});
  })(function(){
    var lc, getGlobal, auth;
    lc = {};
    getGlobal = proxise(function(a){
      if (lc.global) {
        return Promise.resolve(lc.global);
      } else if (lc.fetching) {
        return;
      }
      if (a) {
        return a.fetch();
      }
    });
    auth = function(opt){
      var ref$, this$ = this;
      opt == null && (opt = {});
      this._ldcvmgr = opt.ldcvmgr;
      this._manager = opt.manager;
      this.timeout = {
        loader: 1000,
        failed: 10000
      };
      this.evtHandler = {};
      this.ui = {
        loader: opt.loader || {
          on: function(){},
          off: function(){},
          cancel: function(){}
        },
        authpanel: function(tgl, o){
          var bid;
          o == null && (o = {});
          if (this$._authpanel) {
            return this$._authpanel(tgl, o);
          }
          this$.ui.loader.on(350);
          bid = opt.authpanel || {
            name: "@servebase/auth"
          };
          return this$._manager.from(bid, {
            autoTransform: 'i18n',
            root: document.body,
            data: {
              auth: this$,
              zmgr: opt.zmgr
            }
          }).then(function(p){
            return this$._authpanel = p['interface'];
          }).then(function(i){
            this$.ui.loader.off();
            return i(tgl, o);
          });
        },
        timeout: function(){
          return new Promise(function(res, rej){});
        }
      };
      if (!this._apiRoot) {
        this._apiRoot = opt.api || "/api/auth";
      }
      if ((ref$ = this._apiRoot)[ref$.length - 1] !== '/') {
        this._apiRoot += '/';
      }
      if (opt.initFetch == null || opt.initFetch) {
        this.fetch();
      }
      return this;
    };
    auth.prototype = import$(Object.create(Object.prototype), {
      on: function(n, cb){
        var this$ = this;
        return (Array.isArray(n)
          ? n
          : [n]).map(function(n){
          var ref$;
          return ((ref$ = this$.evtHandler)[n] || (ref$[n] = [])).push(cb);
        });
      },
      fire: function(n){
        var v, res$, i$, to$, ref$, len$, cb, results$ = [];
        res$ = [];
        for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        v = res$;
        for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
          cb = ref$[i$];
          results$.push(cb.apply(this, v));
        }
        return results$;
      },
      inject: function(){
        return {};
      },
      apiRoot: function(){
        return this._apiRoot;
      },
      setUi: function(it){
        return import$(this.ui, it || {});
      },
      logout: function(){
        var this$ = this;
        this.ui.loader.on();
        return ld$.fetch(this.apiRoot() + "logout", {
          method: 'post'
        }, {}).then(function(){
          return this$.fetch({
            renew: true
          });
        })['finally'](function(){
          return this$.ui.loader.off();
        }).then(function(){
          return this$.fire('logout');
        })['catch'](function(e){
          return this$.fire('error', e);
        });
      },
      reset: function(){
        this.ui.loader.on();
        return auth.reset();
      },
      ensure: function(opt){
        opt == null && (opt = {});
        return this.get((opt.authedOnly = true, opt));
      },
      get: function(opt){
        var this$ = this;
        opt == null && (opt = {
          authedOnly: false
        });
        return getGlobal(this).then(function(g){
          g == null && (g = {});
          if (!opt.authedOnly) {
            return g;
          }
          return g.user.key
            ? g
            : this$.ui.authpanel(true, opt).then(function(){
              return getGlobal(this);
            });
        }).then(function(g){
          g == null && (g = {});
          if (opt.authedOnly && !(g.user || (g.user = {})).key) {
            return Promise.reject(new lderror(1000));
          }
          return g;
        });
      },
      fetch: function(opt){
        var useCookie, ret, promise, this$ = this;
        opt == null && (opt = {
          renew: true
        });
        lc.fetching = true;
        this.ui.loader.on(this.timeout.loader);
        this.watchdog = debounce(this.timeout.failed, function(){
          this$.ui.loader.off();
          return this$.ui.timeout().then(function(){
            return this$.ui.loader.on();
          }).then(function(){
            return debounce(10000);
          }).then(function(){
            return this$.fetch();
          });
        })();
        useCookie = false;
        if (!opt.renew) {
          console.warn("[@servebase/auth] fetch: renew:false currently has no effect - data is still fetched from the server. avoid it until the behaviour is defined again");
        }
        ret = useCookie && !opt.renew && /global=/.exec(document.cookie) ? document.cookie.split(';').map(function(it){
          return /^global=(.+)/.exec(it.trim());
        }).filter(function(it){
          return it;
        })[0] : null;
        promise = ret
          ? Promise.resolve(JSON.parse(decodeURIComponent(ret[1])))
          : ld$.fetch(this.apiRoot() + "info", {}, {
            type: 'json'
          });
        return promise['finally'](function(g){
          this$.watchdog.cancel();
          this$.ui.loader.cancel();
          return this$.ui.loader.off();
        }).then(function(g){
          var ref$, e;
          lc.fetching = false;
          ((ref$ = ld$.fetch).headers || (ref$.headers = {}))['X-CSRF-Token'] = g.csrfToken;
          g.ext = this$.inject(g) || {};
          getGlobal.resolve(JSON.parse(JSON.stringify(lc.global = g)));
          try {
            this$.fire('update', lc.global);
          } catch (e$) {
            e = e$;
            this$.fire('error', e);
            console.log(e);
          }
          return lc.global;
        })['catch'](function(e){
          if (lderror.id(e) === 1029) {
            return Promise.reject(e);
          }
          e.name = 'lderror';
          e.id = 1007;
          this$.fire('error', e);
          console.log("server down: ", e);
          return new Promise(function(res, rej){});
        });
      },
      prompt: function(o){
        return this.ui.authpanel(true, o);
      },
      oauth: function(arg$){
        var name, inviteToken, this$ = this;
        name = arg$.name, inviteToken = arg$.inviteToken;
        return this.get().then(function(g){
          var e, form, input, login;
          g == null && (g = {});
          if ((g.user || (g.user = {})).key) {
            return g;
          }
          this$.oauth.window = window.open('', '_blank', 'height=640,width=560');
          try {
            this$.oauth.window.opener = null;
            this$.oauth.window.name = 'oauth-login';
          } catch (e$) {
            e = e$;
            return Promise.reject(e);
          }
          this$.oauth.form = form = ld$.create({
            name: 'div'
          });
          form.innerHTML = "<form target=\"oauth-login\" action=\"" + this$.apiRoot() + name + "/\" method=\"post\">\n  <input type=\"hidden\" name=\"_csrf\" value=\"" + g.csrfToken + "\"/>\n</form>";
          if (inviteToken) {
            input = ld$.create({
              name: 'input',
              attr: {
                type: 'hidden',
                name: 'inviteToken'
              }
            });
            input.value = inviteToken;
            ld$.find(form, 'form', 0).appendChild(input);
          }
          document.body.appendChild(form);
          window.oauthLogin = login = proxise(function(){
            return ld$.find(form, 'form', 0).submit();
          });
          if (this$.oauth.channel) {
            this$.oauth.channel.close();
          }
          if (typeof BroadcastChannel != 'undefined' && BroadcastChannel !== null) {
            this$.oauth.channel = new BroadcastChannel('@servebase/auth/oauth');
            this$.oauth.channel.onmessage = function(arg$){
              var data;
              data = arg$.data;
              if (data === 'done') {
                return login.resolve();
              }
            };
          }
          return login().then(function(){
            return this$.fetch({
              renew: true
            });
          });
        })['finally'](function(){
          if (this$.oauth.channel) {
            this$.oauth.channel.close();
            this$.oauth.channel = null;
          }
          if (!(this$.oauth.form && this$.oauth.form.parentNode)) {
            return;
          }
          return this$.oauth.form.parentNode.removeChild(this$.oauth.form);
        }).then(function(g){
          g == null && (g = {});
          if (!(g.user || (g.user = {})).key) {
            return Promise.reject(new lderror(1000));
          } else {
            return g;
          }
        })['catch'](function(e){
          this$.fire('error', e);
          return Promise.reject(e);
        });
      },
      ensureVerified: function(){
        var this$ = this;
        return this.fetch({
          renew: true
        }).then(function(g){
          if (((g.user || {}).verified || {}).date) {
            return 'done';
          }
          return this$._ldcvmgr.get({
            name: '@servebase/auth',
            path: 'ensure-verified'
          });
        });
      }
    });
    auth.reset = function(){
      return window.location.href = "/auth/reset";
    };
    if (typeof module != 'undefined' && module !== null) {
      return module.exports = auth;
    } else if (typeof window != 'undefined' && window !== null) {
      return window.auth = auth;
    }
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
(function(){
  var _id, consent;
  _id = function(o){
    return o.name + "@" + (o.version || '') + ":" + (o.path || '');
  };
  consent = function(o){
    var ref$;
    o == null && (o = {});
    this.mgr = o.manager;
    this.store = window.localStorage;
    this._apiRoot = o.api || "/api/consent";
    this.global = {
      user: (o.global || {}).user
    };
    this.userkey = ((ref$ = this.global).user || (ref$.user = {})).key || 0;
    this._apiRoot = this._apiRoot.replace(/\/$/, '');
    return this;
  };
  consent.prototype = import$(Object.create(Object.prototype), {
    _keep: function(o, remote){
      var id, ref$;
      remote == null && (remote = true);
      id = "module/consent/" + this.userkey + "/" + _id(o);
      this.store.setItem(id, JSON.stringify({
        time: Date.now(),
        user: ((ref$ = this.global).user || (ref$.user = {})).key || 0
      }));
      if (remote) {
        return ld$.fetch(this._apiRoot + "", {
          method: 'POST'
        }, {
          json: {
            consent_id: id
          }
        });
      }
    },
    prompt: function(o){
      var args, res$, i$, to$, this$ = this;
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return this.mgr.get(o).then(function(bc){
        return bc.create();
      }).then(function(bi){
        return bi.attach({
          root: document.body
        }).then(function(){
          return bi['interface']();
        });
      }).then(function(itf){
        return itf.get.apply(itf, args);
      }).then(function(ret){
        if (!ret) {
          return Promise.reject(lderror(1018));
        } else {
          return this$._keep(o);
        }
      });
    },
    ensure: function(o){
      var args, res$, i$, to$, id, ret, e, this$ = this;
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      id = "module/consent/" + this.userkey + "/" + _id(o);
      ret = this.store.getItem(id);
      if (ret) {
        try {
          JSON.parse(ret);
          return Promise.resolve(true);
        } catch (e$) {
          e = e$;
        }
      }
      return ld$.fetch(this._apiRoot + "", {
        method: 'POST'
      }, {
        json: {
          consent_id: id,
          check: true
        },
        type: 'json'
      }).then(function(it){
        if (!it) {
          return lderror.reject(1018);
        }
        this$._keep(o, false);
        return true;
      })['catch'](function(){
        return this$.prompt.apply(this$, [o].concat(args));
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = consent;
  } else {
    window.consent = consent;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
// Generated by LiveScript 1.6.0
(function(){
  var captcha;
  captcha = function(opt){
    var this$ = this;
    opt == null && (opt = {});
    this._cfg = opt.cfg;
    this.mgr = opt.manager;
    this.init = proxise.once(function(cfg){
      cfg == null && (cfg = {});
      return this$._init(cfg);
    });
    this._zmgr = opt.zmgr;
    return this;
  };
  captcha.prototype = import$(Object.create(Object.prototype), {
    _init: function(cfg){
      var this$ = this;
      if (cfg) {
        this._cfg = cfg;
      }
      return Promise.resolve().then(function(){
        return this$.mgr.get({
          name: '@servebase/captcha'
        });
      }).then(function(bc){
        return bc.create();
      }).then(function(bi){
        return bi.attach({
          root: document.body
        }).then(function(){
          return bi['interface']();
        });
      }).then(function(cap){
        return this$.captcha = cap;
      }).then(function(){
        return this$.captcha.init({
          cfg: this$._cfg,
          zmgr: this$._zmgr
        });
      });
    },
    guard: function(arg$){
      var cb;
      cb = arg$.cb;
      if (this._cfg && (this._cfg.enabled == null || this._cfg.enabled)) {
        return this.captcha.guard({
          cb: cb
        });
      } else {
        return Promise.resolve().then(function(){
          return cb({
            captcha: {}
          });
        });
      }
    },
    once: function(arg$){
      var cb, this$ = this;
      cb = arg$.cb;
      return Promise.resolve().then(function(){
        return cb(null);
      })['catch'](function(e){
        if (lderror.id(e) !== 1048) {
          return Promise.reject(e);
        }
        return this$.guard({
          cb: cb
        });
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = captcha;
  } else {
    window.captcha = captcha;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
// Generated by LiveScript 1.6.0
(function(){
  var cfchallenge, err, ref$;
  cfchallenge = function(opt){
    opt == null && (opt = {});
    this.sitekey = opt.sitekey || null;
    this.clear = opt.clear || null;
    this.timeout = opt.timeout || 30000;
    this._prompt = opt.prompt || null;
    this._solving = null;
    this._hdr = {};
    return this;
  };
  err = function(id){
    var ref$;
    return ref$ = new Error(), ref$.name = 'lderror', ref$.id = id, ref$;
  };
  cfchallenge.prototype = (ref$ = Object.create(Object.prototype), ref$.on = function(n, cb){
    var ref$;
    return ((ref$ = this._hdr)[n] || (ref$[n] = [])).push(cb);
  }, ref$.fire = function(n){
    var v, res$, i$, to$, ref$, len$, cb, results$ = [];
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    v = res$;
    for (i$ = 0, len$ = (ref$ = this._hdr[n] || []).length; i$ < len$; ++i$) {
      cb = ref$[i$];
      results$.push(cb.apply(this, v));
    }
    return results$;
  }, ref$.isChallenge = function(e){
    var d;
    if (!e || (e.id !== 403 && e.status !== 403)) {
      return false;
    }
    if (e.headers && e.headers.get) {
      return e.headers.get('cf-mitigated') === 'challenge';
    }
    d = typeof e.data === 'string' ? e.data : '';
    return /_cf_chl_opt|\/cdn-cgi\/challenge-platform\//.exec(d) != null;
  }, ref$._script = function(){
    var this$ = this;
    if (this._scriptP) {
      return this._scriptP;
    }
    return this._scriptP = new Promise(function(res, rej){
      var s;
      if (window.turnstile) {
        return res();
      }
      s = document.createElement('script');
      s.onerror = function(){
        this$._scriptP = null;
        return rej(err(1041));
      };
      s.onload = function(){
        return res();
      };
      s.setAttribute('src', 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit');
      return document.body.appendChild(s);
    });
  }, ref$._ui = function(){
    var node;
    node = document.createElement('div');
    node.classList.add('ldcv');
    node.innerHTML = '<div class="base"><div class="inner card"><div class="card-body text-center">\n<div class="mb-2">please confirm you are human to continue.</div>\n<div ld="box" class="d-inline-block"></div>\n</div></div></div>';
    document.body.appendChild(node);
    return {
      node: node,
      box: node.querySelector('[ld=box]'),
      ldcv: new ldcover({
        root: node,
        escape: false,
        resident: true
      })
    };
  }, ref$.solve = function(opt){
    var ui, wid, timer, this$ = this;
    opt == null && (opt = {});
    if (!this.sitekey) {
      return Promise.reject(err(1010));
    }
    if (this._solving) {
      return this._solving;
    }
    ui = null;
    wid = null;
    timer = null;
    this._solving = this._script().then(function(){
      if (!opt.root) {
        ui = this$._ui();
      }
      return new Promise(function(res, rej){
        var bg;
        this$._abort = function(){
          return rej(err(999));
        };
        bg = ui && !opt.visible;
        if (bg) {
          timer = setTimeout(function(){
            return rej(err(1010));
          }, this$.timeout);
        }
        if (ui && opt.visible) {
          ui.ldcv.toggle(true);
        }
        return wid = turnstile.render(ui
          ? ui.box
          : opt.root, {
          sitekey: this$.sitekey,
          appearance: bg ? 'interaction-only' : 'always',
          callback: function(token){
            return res(token);
          },
          "error-callback": function(){
            return rej(err(1010));
          },
          "expired-callback": function(){
            return rej(err(1010));
          },
          "timeout-callback": function(){
            return rej(err(1010));
          },
          "unsupported-callback": function(){
            return rej(err(1010));
          },
          "before-interactive-callback": function(){
            clearTimeout(timer);
            if (ui) {
              return ui.ldcv.toggle(true);
            }
          }
        });
      });
    }).then(function(token){
      if (!this$.clear) {
        return;
      }
      return fetch(this$.clear, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      });
    })['finally'](function(){
      clearTimeout(timer);
      this$._solving = null;
      this$._abort = null;
      if (wid != null && window.turnstile) {
        try {
          turnstile.remove(wid);
        } catch (e$) {}
      }
      if (ui) {
        ui.ldcv.toggle(false);
        return ui.node.parentNode.removeChild(ui.node);
      }
    });
    return this._solving;
  }, ref$.prompt = function(){
    var this$ = this;
    this._prompting = true;
    return Promise.resolve().then(function(){
      if (this$._prompt) {
        return this$._prompt(this$);
      } else {
        return this$.solve({
          visible: true
        });
      }
    })['finally'](function(){
      return this$._prompting = false;
    });
  }, ref$.dismiss = function(){
    if (!this._prompting) {
      return;
    }
    if (this._abort) {
      this._abort();
    }
    return this.fire('dismiss');
  }, ref$.probe = function(url){
    var this$ = this;
    if (!this.sitekey) {
      return Promise.resolve('down');
    }
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store'
    }).then(function(r){
      if (r.status === 403 && r.headers.get('cf-mitigated') === 'challenge') {
        return this$.solve().then(function(){
          return 'solved';
        }, function(){
          return 'failed';
        });
      }
      if (r.status >= 500) {
        return 'down';
      } else {
        return 'reachable';
      }
    })['catch'](function(){
      return 'down';
    });
  }, ref$.wrap = function(ld$){
    var orig, wrapped, this$ = this;
    if (!ld$ || !ld$.fetch || ld$.fetch._cfchallenge) {
      return;
    }
    orig = ld$.fetch;
    wrapped = function(){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return orig.apply(ld$, args)['catch'](function(e){
        if (!(this$.sitekey && this$.isChallenge(e))) {
          return Promise.reject(e);
        }
        return this$.solve()['catch'](function(){
          return Promise.reject(e);
        }).then(function(){
          return orig.apply(ld$, args);
        });
      });
    };
    import$(wrapped, orig);
    wrapped._cfchallenge = true;
    return ld$.fetch = wrapped;
  }, ref$);
  (typeof module != 'undefined' && module !== null
    ? module.exports
    : window.captcha).cfchallenge = cfchallenge;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
(function(){
  var erratum, ref$;
  erratum = function(o){
    var this$ = this;
    o == null && (o = {});
    if (typeof window == 'undefined' || window === null) {
      console.warn("[@servebase/erratum] no window to listen to error/rejection");
    }
    window.addEventListener('error', function(evt){
      return this$.errorHandler(evt);
    });
    window.addEventListener('unhandledrejection', function(evt){
      var e;
      try {
        return this$.rejectionHandler(evt);
      } catch (e$) {
        return e = e$;
      }
    });
    if (o.handler) {
      this.handler = o.handler;
    }
    this._lockdown = o.lockdown || null;
    this._locked = false;
    this._fired = false;
    return this;
  };
  erratum.prototype = (ref$ = Object.create(Object.prototype), ref$.handler = function(e){}, ref$.lockdown = function(v){
    var ref$;
    if (typeof v === 'function') {
      ref$ = [v, true], this._lockdown = ref$[0], v = ref$[1];
    }
    this._locked = !!(v && this._lockdown);
    if (!this._locked) {
      this._fired = false;
    }
    return this._locked;
  }, ref$.locked = function(){
    return this._locked;
  }, ref$._lock = function(e){
    var err;
    if (!this._locked) {
      return false;
    }
    if (this._fired) {
      return true;
    }
    this._fired = true;
    try {
      this._lockdown(e);
    } catch (e$) {
      err = e$;
      console.error("[@servebase/erratum] lockdown handler failed:", err);
    }
    return true;
  }, ref$.errorHandler = function(evt){
    if (this._lock(evt.error)) {
      return;
    }
    if (!lderror.eventHandler.error(evt)) {
      return this.handler(evt.error);
    }
  }, ref$.rejectionHandler = function(evt){
    if (this._lock(evt.reason)) {
      return;
    }
    if (!lderror.eventHandler.rejection(evt)) {
      return this.handler(evt.reason);
    }
  }, ref$.test = function(o){
    o == null && (o = {});
    if (o.bare) {
      return this._test(o);
    } else {
      return function(o){
        var this$ = this;
        return setTimeout(function(){
          return this$._test(o);
        }, 0);
      }(o);
    }
  }, ref$._test = function(o){
    if (o.promise) {
      return lderror.reject(1023);
    } else {
      throw lderror(1023);
    }
  }, ref$);
  if (typeof module != 'undefined' && module !== null) {
    module.exports = erratum;
  } else {
    window.erratum = erratum;
  }
}).call(this);
// Generated by LiveScript 1.6.0
(function(){
  var servebase;
  servebase = {
    reset: function(){
      return auth.reset();
    },
    corectx: function(cb){
      return new Promise(function(res, rej){
        var ret;
        ret = ldc.register(['core'], function(o){
          return o.core.init().then(function(){
            if (cb) {
              return cb.apply(o.core, [o]);
            }
          }).then(res)['catch'](rej);
        });
        return ldc.init(ret);
      });
    },
    config: function(o){
      o == null && (o = {});
      if (this._inited) {
        console.warn("[@servebase/core] `servebase.config` is called after `@servebase/core` is initialized.\n[@servebase/core] This may lead to inconsistent behavior.");
      }
      return this._cfg = o;
    },
    _i18nInit: function(){
      var i18n, that, ref$, i18ncfg, this$ = this;
      this.i18n = i18n = (that = ((ref$ = this._cfg).i18n || (ref$.i18n = {})).driver)
        ? that
        : typeof i18next != 'undefined' && i18next !== null ? i18next : undefined;
      ((ref$ = this.hint).i18n || (ref$.i18n = {})).placeholder = this._cfg.i18n.placeholder || false;
      if (i18n == null) {
        return Promise.resolve();
      }
      block.i18n.use(i18n);
      i18ncfg = {
        supportedLngs: ['en', 'zh-TW'],
        fallbackNS: '',
        defaultNS: '',
        keySeparator: '.',
        nsSeparator: ':'
      };
      if (this._cfg.i18n.cfg) {
        i18ncfg = import$(i18ncfg, this._cfg.i18n.cfg);
      }
      if (i18ncfg.supportedLng) {
        i18ncfg.supportedLngs = i18ncfg.supportedLng;
        delete i18ncfg.supportedLng;
      }
      if (!i18ncfg.fallbackLng) {
        i18ncfg.fallbackLng = (ref$ = Object.fromEntries(i18ncfg.supportedLngs.map(function(lng){
          return [
            lng, i18ncfg.supportedLngs.filter(function(it){
              return it !== lng;
            })
          ];
        })), ref$['default'] = i18ncfg.supportedLngs, ref$);
      }
      return Promise.resolve().then(function(){
        return i18n.init(i18ncfg);
      }).then(function(){
        if (typeof i18nextBrowserLanguageDetector != 'undefined' && i18nextBrowserLanguageDetector !== null) {
          return i18n.use(i18nextBrowserLanguageDetector);
        }
      }).then(function(){
        var ns, ref$, obj, lng, res;
        for (ns in ref$ = this$._cfg.i18n.locales || {}) {
          obj = ref$[ns];
          for (lng in obj) {
            res = obj[lng];
            i18n.addResourceBundle(lng, ns, res, true, true);
          }
        }
        lng = (typeof httputil != 'undefined' && httputil !== null ? httputil.qs('lng') || httputil.cookie('lng') : null) || navigator.language || navigator.userLanguage || '';
        if ((typeof httputil != 'undefined' && httputil !== null) && httputil.qs('setlng')) {
          lng = httputil.qs('setlng');
          httputil.cookie('lng', lng, {
            path: '/'
          });
        }
        if (!in$(lng, i18ncfg.supportedLngs)) {
          lng = /-/.exec(lng) && in$(lng.split('-')[0], i18ncfg.supportedLngs)
            ? lng.split('-')[0]
            : i18ncfg.supportedLngs[0] || 'en';
        }
        console.log("[@servebase/core][i18n] use language: ", lng);
        return i18n.changeLanguage(lng);
      }).then(function(){
        i18n.on('languageChanged', function(lng){
          if (typeof httputil != 'undefined' && httputil !== null) {
            console.log("[@servebase/core][i18n] language changed to " + lng + " / cookie updated");
            return httputil.cookie('lng', lng, {
              path: '/'
            });
          } else {
            return console.log("[@servebase/core][i18n] language changed to " + lng + " / no httputil, skip cookie update");
          }
        });
        return block.i18n.use(i18n);
      });
    },
    _init: function(o){
      var this$ = this;
      servebase._inited = true;
      if (o != null) {
        servebase._cfg = o;
      }
      this._cfg = servebase._cfg || {};
      if (typeof this._cfg === 'function') {
        this._cfg = this._cfg();
      }
      this.global = {};
      this.user = {};
      this.challenge = new captcha.cfchallenge(this._cfg.challenge || {});
      this.challenge.wrap(ld$);
      this.hint = {};
      this.zmgr = new zmgr();
      this.manager = this._cfg.manager || new block.manager({
        registry: function(arg$){
          var ns, url, name, version, path, type, that;
          ns = arg$.ns, url = arg$.url, name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
          if (that = url) {
            return that;
          }
          path = path || (type === 'block'
            ? 'index.html'
            : type ? "index.min." + type : 'index.min.js');
          if (ns === 'local') {
            if (name === 'error' || name === 'cover') {
              return "/modules/" + name + "/" + (path || 'index.html');
            }
            return "/modules/block/" + name + "/" + (path || 'index.html');
          }
          return "/assets/lib/" + name + "/" + (version || 'main') + "/" + path;
        }
      });
      ldcover.zmgr(this.zmgr);
      return servebase._i18nInit.apply(this).then(function(){
        var fatal, ethr, err;
        this$.loader = new ldloader({
          className: "ldld full",
          autoZ: true,
          baseZ: null,
          zmgr: this$.zmgr.scope(zmgr.splash)
        });
        this$.captcha = new captcha({
          manager: this$.manager,
          zmgr: this$.zmgr.scope(zmgr.splash)
        });
        this$.ldcvmgr = new ldcvmgr({
          manager: this$.manager,
          errorCover: {
            ns: 'local',
            name: "error",
            path: "0.html"
          },
          zmgr: this$.zmgr
        });
        fatal = {
          node: null,
          called: false
        };
        this$.fatal = function(e){
          var ret, cfg, e2, zh, node, box, msg, btn;
          ret = new Promise(function(res, rej){});
          cfg = this$._cfg.fatal || {};
          if (typeof cfg === 'function') {
            if (fatal.called) {
              return ret;
            }
            fatal.called = true;
            try {
              cfg.call(this$, e);
            } catch (e$) {
              e2 = e$;
              console.error(e2);
            }
            return ret;
          }
          if (fatal.node) {
            if (!document.body.contains(fatal.node)) {
              document.body.appendChild(fatal.node);
            }
            return ret;
          }
          zh = /^zh/.exec((this$.i18n && this$.i18n.language) || navigator.language || '');
          node = document.createElement('div');
          node.className = 'servebase-fatal';
          node.setAttribute('style', ["position:fixed", "top:0", "left:0", "width:100%", "height:100%", "z-index:2147483647", "display:flex", "align-items:center", "justify-content:center", "background:rgba(0,0,0,0.5)", "font-family:sans-serif", "color:#333"].join(';'));
          box = document.createElement('div');
          box.setAttribute('style', ["max-width:20rem", "margin:1rem", "padding:1.5rem", "border-radius:0.5rem", "background:white", "box-shadow:0 0.5rem 2rem rgba(0,0,0,0.3)", "text-align:center"].join(';'));
          msg = document.createElement('div');
          msg.setAttribute('style', "margin-bottom:1.5rem;line-height:1.5");
          msg.textContent = cfg.message || (zh ? "發生錯誤，請重新載入頁面後再試一次。" : "Something is wrong. Please reload and try again.");
          btn = document.createElement('button');
          btn.setAttribute('type', 'button');
          btn.setAttribute('style', ["padding:0.5rem 1.5rem", "border:none", "border-radius:0.25rem", "background:#333", "color:white", "cursor:pointer", "font-size:1rem"].join(';'));
          btn.textContent = cfg.action || (zh ? "重新載入" : "Reload");
          btn.addEventListener('click', function(){
            return location.reload();
          });
          box.appendChild(msg);
          box.appendChild(btn);
          node.appendChild(box);
          fatal.node = node;
          document.body.appendChild(node);
          return ret;
        };
        ethr = {
          t: 0,
          c: 0
        };
        err = new lderror.handler({
          handler: function(n, e){
            var t;
            if (fatal.node || fatal.called) {
              return this$.fatal(e);
            }
            /*
            melt down mechanism - prevent infinite errors. errors limited to 4 in 500ms / 11 in 2s
            any unhandled error/rejection may trigger this handler again, which causes infinite errors
            e.g., Promise.reject(Promise.reject(new Error())) in @plotdb/block `_fetch`
            generate an additional rejection which is impossible to be caught.
            this bug in @plotdb/block is fixed, however in case of any possible bugs in the future -
            melt down mechanism is required.
            */
            t = Date.now();
            if (ethr.t < t - 2000) {
              ethr.t = t;
              ethr.c = 0;
            } else if (!ethr.t) {
              ethr.t = t;
              ethr.c = 0;
            } else if (ethr.t > t - 2000 && ethr.c > 10 || ethr.t > t - 500 && ethr.c > 3) {
              return this$.fatal(e);
            }
            ethr.c = (ethr.c || 0) + 1;
            return this$.ldcvmgr.get({
              ns: 'local',
              name: 'error',
              path: n + ".html"
            }, e);
          }
        });
        this$.error = function(e){
          return err(e);
        };
        this$.error.ignore = function(){
          var ids;
          ids = Array.from(arguments);
          return function(e){
            if (!in$(lderror.id(e), ids)) {
              return Promise.reject(e);
            }
          };
        };
        this$.erratum = new erratum({
          handler: err
        });
        this$.auth = new auth({
          ldcvmgr: this$.ldcvmgr,
          manager: this$.manager,
          zmgr: this$.zmgr,
          loader: this$.loader,
          authpanel: this$._cfg.auth ? this$._cfg.auth.authpanel : null
        });
        if (typeof ldc != 'undefined' && ldc !== null) {
          ldc.action('ldcvmgr', this$.ldcvmgr);
        }
        this$.update = function(g){
          return this.global = g, this.user = g.user || {}, this;
        };
        this$.auth.on('error', this$.error);
        this$.auth.on('logout', function(){
          return window.location.replace('/');
        });
        return this$.manager.init().then(function(){
          return this$.auth.get();
        }).then(function(g){
          this$.global = g;
          this$.user = g.user;
          return this$.captcha.init(g.captcha);
        }).then(function(){
          this$.auth.on('update', function(g){
            return this$.update(g);
          });
          return this$;
        });
      });
    }
  };
  ldc.register('core', ['corecfg'], function(arg$){
    var corecfg;
    corecfg = arg$.corecfg;
    if (corecfg != null) {
      servebase.config(corecfg);
    }
    return {
      init: proxise.once(function(o){
        return servebase._init.apply(this, [o]);
      })
    };
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = servebase;
  } else if (typeof window != 'undefined' && window !== null) {
    window.servebase = import$(window.servebase || {}, servebase);
    servebase = window.servebase;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
ldc.register('locales', [], function(){
  return {
    "@servebase/navtop": {
      en: {
        login: "Login",
        signup: "Sign Up",
        settings: "Settings",
        logout: "Logout"
      },
      "zh-TW": {
        login: "登入",
        signup: "註冊",
        settings: "個人設定",
        logout: "登出"
      }
    }
  };
});
ldc.register('corecfg', ['locales'], function(arg$){
  var locales;
  locales = arg$.locales;
  return function(){
    var this$ = this;
    if ((typeof httputil != 'undefined' && httputil !== null) && !httputil.cookie('lng')) {
      httputil.cookie('lng', 'en', {
        path: '/'
      });
    }
    return {
      i18n: {
        locales: locales
      },
      manager: new block.manager({
        registry: function(arg$){
          var ns, name, version, path, type;
          ns = arg$.ns, name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
          console.log("mgr (dec=" + this$.global.version + "): ", {
            ns: ns,
            name: name,
            version: version,
            path: path,
            type: type
          });
          path = path || (type === 'block'
            ? 'index.html'
            : type ? "index.min." + type : 'index.min.js');
          path = path + "?dec=" + (this$.global.version || '');
          if (ns === 'local') {
            if (name === 'error' || name === 'cover') {
              return "/modules/" + name + "/" + path;
            }
            return "/modules/block/" + name + "/" + path;
          }
          return "/assets/lib/" + name + "/" + (version || 'main') + "/" + path;
        }
      }),
      auth: {
        authpanel: {
          ns: 'local',
          name: "authpanel"
        }
      },
      challenge: /\.test$/.test(location.hostname) ? {
        sitekey: '1x00000000000000000000AA',
        clear: '/__cf-mock/clear'
      } : void 8
    };
  };
});