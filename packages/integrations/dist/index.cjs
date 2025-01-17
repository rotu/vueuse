'use strict';

var shared = require('@vueuse/shared');
var Schema = require('async-validator');
var vueDemi = require('vue-demi');
var axios = require('axios');
var changeCase$1 = require('change-case');
var Cookie = require('universal-cookie');
var drauu = require('drauu');
var core = require('@vueuse/core');
var focusTrap = require('focus-trap');
var Fuse = require('fuse.js');
var jwt_decode = require('jwt-decode');
var nprogress = require('nprogress');
var QRCode = require('qrcode');

var __defProp$4 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
function useAsyncValidator(value, rules, options = {}) {
  const errorInfo = vueDemi.ref();
  const isFinished = vueDemi.ref(false);
  const pass = vueDemi.ref(false);
  const errors = vueDemi.computed(() => {
    var _a;
    return ((_a = errorInfo.value) == null ? void 0 : _a.errors) || [];
  });
  const errorFields = vueDemi.computed(() => {
    var _a;
    return ((_a = errorInfo.value) == null ? void 0 : _a.fields) || {};
  });
  const { validateOption = {} } = options;
  vueDemi.watchEffect(async () => {
    isFinished.value = false;
    pass.value = false;
    const validator = new Schema(shared.resolveUnref(rules));
    try {
      await validator.validate(shared.resolveUnref(value), validateOption);
      pass.value = true;
      errorInfo.value = null;
    } catch (err) {
      errorInfo.value = err;
    } finally {
      isFinished.value = true;
    }
  });
  const shell = {
    pass,
    isFinished,
    errorInfo,
    errors,
    errorFields
  };
  function waitUntilFinished() {
    return new Promise((resolve, reject) => {
      shared.until(isFinished).toBe(true).then(() => resolve(shell)).catch((error) => reject(error));
    });
  }
  return __spreadProps$2(__spreadValues$4({}, shell), {
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    }
  });
}

var __defProp$3 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
function useAxios(...args) {
  const url = typeof args[0] === "string" ? args[0] : void 0;
  const argsPlaceholder = shared.isString(url) ? 1 : 0;
  let defaultConfig = {};
  let instance = axios;
  let options = { immediate: !!argsPlaceholder, shallow: true };
  const isAxiosInstance = (val) => !!(val == null ? void 0 : val.request);
  if (args.length > 0 + argsPlaceholder) {
    if (isAxiosInstance(args[0 + argsPlaceholder]))
      instance = args[0 + argsPlaceholder];
    else
      defaultConfig = args[0 + argsPlaceholder];
  }
  if (args.length > 1 + argsPlaceholder) {
    if (isAxiosInstance(args[1 + argsPlaceholder]))
      instance = args[1 + argsPlaceholder];
  }
  if (args.length === 2 + argsPlaceholder && !isAxiosInstance(args[1 + argsPlaceholder]) || args.length === 3 + argsPlaceholder)
    options = args[args.length - 1];
  const response = vueDemi.shallowRef();
  const data = options.shallow ? vueDemi.shallowRef() : vueDemi.ref();
  const isFinished = vueDemi.ref(false);
  const isLoading = vueDemi.ref(false);
  const isAborted = vueDemi.ref(false);
  const error = vueDemi.shallowRef();
  const cancelToken = axios.CancelToken.source();
  const abort = (message) => {
    if (isFinished.value || !isLoading.value)
      return;
    cancelToken.cancel(message);
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };
  const loading = (loading2) => {
    isLoading.value = loading2;
    isFinished.value = !loading2;
  };
  const waitUntilFinished = () => new Promise((resolve, reject) => {
    shared.until(isFinished).toBe(true).then(() => resolve(result)).catch(reject);
  });
  const then = (onFulfilled, onRejected) => waitUntilFinished().then(onFulfilled, onRejected);
  const execute = (executeUrl = url, config = {}) => {
    error.value = void 0;
    const _url = typeof executeUrl === "string" ? executeUrl : url != null ? url : "";
    loading(true);
    instance(_url, __spreadProps$1(__spreadValues$3(__spreadValues$3({}, defaultConfig), typeof executeUrl === "object" ? executeUrl : config), { cancelToken: cancelToken.token })).then((r) => {
      response.value = r;
      data.value = r.data;
    }).catch((e) => {
      error.value = e;
    }).finally(() => loading(false));
    return { then };
  };
  if (options.immediate && url)
    execute();
  const result = {
    response,
    data,
    error,
    finished: isFinished,
    loading: isLoading,
    isFinished,
    isLoading,
    cancel: abort,
    isAborted,
    canceled: isAborted,
    aborted: isAborted,
    isCanceled: isAborted,
    abort,
    execute
  };
  return __spreadProps$1(__spreadValues$3({}, result), {
    then
  });
}

var changeCase = /*#__PURE__*/Object.freeze({
  __proto__: null,
  camelCase: changeCase$1.camelCase,
  capitalCase: changeCase$1.capitalCase,
  constantCase: changeCase$1.constantCase,
  dotCase: changeCase$1.dotCase,
  headerCase: changeCase$1.headerCase,
  noCase: changeCase$1.noCase,
  paramCase: changeCase$1.paramCase,
  pascalCase: changeCase$1.pascalCase,
  pathCase: changeCase$1.pathCase,
  sentenceCase: changeCase$1.sentenceCase,
  snakeCase: changeCase$1.snakeCase
});

function useChangeCase(input, type, options) {
  if (shared.isFunction(input))
    return vueDemi.computed(() => changeCase[type](shared.resolveUnref(input), options));
  const text = vueDemi.ref(input);
  return vueDemi.computed({
    get() {
      return changeCase[type](text.value, options);
    },
    set(value) {
      text.value = value;
    }
  });
}

var __defProp$2 = Object.defineProperty;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
function createCookies(req) {
  const universalCookie = new Cookie(req ? req.headers.cookie : null);
  return (dependencies, { doNotParse = false, autoUpdateDependencies = false } = {}) => useCookies(dependencies, { doNotParse, autoUpdateDependencies }, universalCookie);
}
function useCookies(dependencies, { doNotParse = false, autoUpdateDependencies = false } = {}, cookies = new Cookie()) {
  const watchingDependencies = autoUpdateDependencies ? [...dependencies || []] : dependencies;
  let previousCookies = cookies.getAll({ doNotParse: true });
  const touches = vueDemi.ref(0);
  const onChange = () => {
    const newCookies = cookies.getAll({ doNotParse: true });
    if (shouldUpdate(watchingDependencies || null, newCookies, previousCookies))
      touches.value++;
    previousCookies = newCookies;
  };
  cookies.addChangeListener(onChange);
  shared.tryOnScopeDispose(() => {
    cookies.removeChangeListener(onChange);
  });
  return {
    get: (...args) => {
      if (autoUpdateDependencies && watchingDependencies && !watchingDependencies.includes(args[0]))
        watchingDependencies.push(args[0]);
      touches.value;
      return cookies.get(args[0], __spreadValues$2({ doNotParse }, args[1]));
    },
    getAll: (...args) => {
      touches.value;
      return cookies.getAll(__spreadValues$2({ doNotParse }, args[0]));
    },
    set: (...args) => cookies.set(...args),
    remove: (...args) => cookies.remove(...args),
    addChangeListener: (...args) => cookies.addChangeListener(...args),
    removeChangeListener: (...args) => cookies.removeChangeListener(...args)
  };
}
function shouldUpdate(dependencies, newCookies, oldCookies) {
  if (!dependencies)
    return true;
  for (const dependency of dependencies) {
    if (newCookies[dependency] !== oldCookies[dependency])
      return true;
  }
  return false;
}

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
function useDrauu(target, options) {
  const drauuInstance = vueDemi.ref();
  let disposables = [];
  const onChangedHook = core.createEventHook();
  const onCanceledHook = core.createEventHook();
  const onCommittedHook = core.createEventHook();
  const onStartHook = core.createEventHook();
  const onEndHook = core.createEventHook();
  const canUndo = vueDemi.ref(false);
  const canRedo = vueDemi.ref(false);
  const altPressed = vueDemi.ref(false);
  const shiftPressed = vueDemi.ref(false);
  const brush = vueDemi.ref({
    color: "black",
    size: 3,
    arrowEnd: false,
    cornerRadius: 0,
    dasharray: void 0,
    fill: "transparent",
    mode: "draw"
  });
  vueDemi.watch(brush, () => {
    const instance = drauuInstance.value;
    if (instance) {
      instance.brush = brush.value;
      instance.mode = brush.value.mode;
    }
  }, { deep: true });
  const undo = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.undo();
  };
  const redo = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.redo();
  };
  const clear = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.clear();
  };
  const cancel = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.cancel();
  };
  const load = (svg) => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.load(svg);
  };
  const dump = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.dump();
  };
  const cleanup = () => {
    var _a;
    disposables.forEach((dispose) => dispose());
    (_a = drauuInstance.value) == null ? void 0 : _a.unmount();
  };
  const syncStatus = () => {
    if (drauuInstance.value) {
      canUndo.value = drauuInstance.value.canUndo();
      canRedo.value = drauuInstance.value.canRedo();
      altPressed.value = drauuInstance.value.altPressed;
      shiftPressed.value = drauuInstance.value.shiftPressed;
    }
  };
  vueDemi.watch(() => core.unrefElement(target), (el) => {
    if (!el || typeof SVGSVGElement === "undefined" || !(el instanceof SVGSVGElement))
      return;
    if (drauuInstance.value)
      cleanup();
    drauuInstance.value = drauu.createDrauu(__spreadValues$1({ el }, options));
    syncStatus();
    disposables = [
      drauuInstance.value.on("canceled", () => onCanceledHook.trigger()),
      drauuInstance.value.on("committed", () => onCommittedHook.trigger()),
      drauuInstance.value.on("start", () => onStartHook.trigger()),
      drauuInstance.value.on("end", () => onEndHook.trigger()),
      drauuInstance.value.on("changed", () => {
        syncStatus();
        onChangedHook.trigger();
      })
    ];
  }, { flush: "post" });
  shared.tryOnScopeDispose(() => cleanup());
  return {
    drauuInstance,
    load,
    dump,
    clear,
    cancel,
    undo,
    redo,
    canUndo,
    canRedo,
    brush,
    onChanged: onChangedHook.on,
    onCommitted: onCommittedHook.on,
    onStart: onStartHook.on,
    onEnd: onEndHook.on,
    onCanceled: onCanceledHook.on
  };
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useFocusTrap(target, options = {}) {
  let trap;
  const _a = options, { immediate } = _a, focusTrapOptions = __objRest(_a, ["immediate"]);
  const hasFocus = vueDemi.ref(false);
  const isPaused = vueDemi.ref(false);
  const activate = (opts) => trap && trap.activate(opts);
  const deactivate = (opts) => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  vueDemi.watch(() => core.unrefElement(target), (el) => {
    if (!el)
      return;
    trap = focusTrap.createFocusTrap(el, __spreadProps(__spreadValues({}, focusTrapOptions), {
      onActivate() {
        hasFocus.value = true;
        if (options.onActivate)
          options.onActivate();
      },
      onDeactivate() {
        hasFocus.value = false;
        if (options.onDeactivate)
          options.onDeactivate();
      }
    }));
    if (immediate)
      activate();
  }, { flush: "post" });
  core.tryOnScopeDispose(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  };
}

function useFuse(search, data, options) {
  const createFuse = () => {
    var _a, _b;
    return new Fuse((_a = shared.resolveUnref(data)) != null ? _a : [], (_b = shared.resolveUnref(options)) == null ? void 0 : _b.fuseOptions);
  };
  const fuse = vueDemi.ref(createFuse());
  vueDemi.watch(() => {
    var _a;
    return (_a = shared.resolveUnref(options)) == null ? void 0 : _a.fuseOptions;
  }, () => {
    fuse.value = createFuse();
  }, { deep: true });
  vueDemi.watch(() => shared.resolveUnref(data), (newData) => {
    fuse.value.setCollection(newData);
  }, { deep: true });
  const results = vueDemi.computed(() => {
    const resolved = shared.resolveUnref(options);
    if ((resolved == null ? void 0 : resolved.matchAllWhenSearchEmpty) && !vueDemi.unref(search))
      return shared.resolveUnref(data).map((item, index) => ({ item, refIndex: index }));
    const limit = resolved == null ? void 0 : resolved.resultLimit;
    return fuse.value.search(shared.resolveUnref(search), limit ? { limit } : void 0);
  });
  return {
    fuse,
    results
  };
}

function useJwt(encodedJwt, options = {}) {
  const {
    onError,
    fallbackValue = null
  } = options;
  const decodeWithFallback = (encodedJwt2, options2) => {
    try {
      return jwt_decode(encodedJwt2, options2);
    } catch (err) {
      onError == null ? void 0 : onError(err);
      return fallbackValue;
    }
  };
  const header = vueDemi.computed(() => decodeWithFallback(shared.resolveUnref(encodedJwt), { header: true }));
  const payload = vueDemi.computed(() => decodeWithFallback(shared.resolveUnref(encodedJwt)));
  return {
    header,
    payload
  };
}

function useNProgress(currentProgress = null, options) {
  const progress = vueDemi.ref(currentProgress);
  const isLoading = vueDemi.computed({
    set: (load) => load ? nprogress.start() : nprogress.done(),
    get: () => shared.isNumber(progress.value) && progress.value < 1
  });
  if (options)
    nprogress.configure(options);
  const setProgress = nprogress.set;
  nprogress.set = (n) => {
    progress.value = n;
    return setProgress.call(nprogress, n);
  };
  vueDemi.watchEffect(() => {
    if (shared.isNumber(progress.value) && shared.isClient)
      setProgress.call(nprogress, progress.value);
  });
  shared.tryOnScopeDispose(nprogress.remove);
  return {
    isLoading,
    progress,
    start: nprogress.start,
    done: nprogress.done,
    remove: () => {
      progress.value = null;
      nprogress.remove();
    }
  };
}

function useQRCode(text, options) {
  const src = shared.resolveRef(text);
  const result = vueDemi.ref("");
  vueDemi.watch(src, async (value) => {
    if (src.value && shared.isClient)
      result.value = await QRCode.toDataURL(value, options);
  }, { immediate: true });
  return result;
}

exports.createCookies = createCookies;
exports.useAsyncValidator = useAsyncValidator;
exports.useAxios = useAxios;
exports.useChangeCase = useChangeCase;
exports.useCookies = useCookies;
exports.useDrauu = useDrauu;
exports.useFocusTrap = useFocusTrap;
exports.useFuse = useFuse;
exports.useJwt = useJwt;
exports.useNProgress = useNProgress;
exports.useQRCode = useQRCode;
