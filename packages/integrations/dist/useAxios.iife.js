var VueDemi = (function (VueDemi, Vue, VueCompositionAPI) {
  if (VueDemi.install) {
    return VueDemi
  }
  if (!Vue) {
    console.error('[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`.')
    return VueDemi
  }

  // Vue 2.7
  if (Vue.version.slice(0, 4) === '2.7.') {
    for (var key in Vue) {
      VueDemi[key] = Vue[key]
    }
    VueDemi.isVue2 = true
    VueDemi.isVue3 = false
    VueDemi.install = function () {}
    VueDemi.Vue = Vue
    VueDemi.Vue2 = Vue
    VueDemi.version = Vue.version
    VueDemi.warn = Vue.util.warn
    function createApp(rootComponent, rootProps) {
      var vm
      var provide = {}
      var app = {
        config: Vue.config,
        use: Vue.use.bind(Vue),
        mixin: Vue.mixin.bind(Vue),
        component: Vue.component.bind(Vue),
        provide: function (key, value) {
          provide[key] = value
          return this
        },
        directive: function (name, dir) {
          if (dir) {
            Vue.directive(name, dir)
            return app
          } else {
            return Vue.directive(name)
          }
        },
        mount: function (el, hydrating) {
          if (!vm) {
            vm = new Vue(Object.assign({ propsData: rootProps }, rootComponent, { provide: Object.assign(provide, rootComponent.provide) }))
            vm.$mount(el, hydrating)
            return vm
          } else {
            return vm
          }
        },
        unmount: function () {
          if (vm) {
            vm.$destroy()
            vm = undefined
          }
        },
      }
      return app
    }
    VueDemi.createApp = createApp
  }
  // Vue 2.6.x
  else if (Vue.version.slice(0, 2) === '2.') {
    if (VueCompositionAPI) {
      for (var key in VueCompositionAPI) {
        VueDemi[key] = VueCompositionAPI[key]
      }
      VueDemi.isVue2 = true
      VueDemi.isVue3 = false
      VueDemi.install = function () {}
      VueDemi.Vue = Vue
      VueDemi.Vue2 = Vue
      VueDemi.version = Vue.version
    } else {
      console.error('[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`.')
    }
  }
  // Vue 3
  else if (Vue.version.slice(0, 2) === '3.') {
    for (var key in Vue) {
      VueDemi[key] = Vue[key]
    }
    VueDemi.isVue2 = false
    VueDemi.isVue3 = true
    VueDemi.install = function () {}
    VueDemi.Vue = Vue
    VueDemi.Vue2 = undefined
    VueDemi.version = Vue.version
    VueDemi.set = function (target, key, val) {
      if (Array.isArray(target)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
      }
      target[key] = val
      return val
    }
    VueDemi.del = function (target, key) {
      if (Array.isArray(target)) {
        target.splice(key, 1)
        return
      }
      delete target[key]
    }
  } else {
    console.error('[vue-demi] Vue version ' + Vue.version + ' is unsupported.')
  }
  return VueDemi
})(
  (this.VueDemi = this.VueDemi || (typeof VueDemi !== 'undefined' ? VueDemi : {})),
  this.Vue || (typeof Vue !== 'undefined' ? Vue : undefined),
  this.VueCompositionAPI || (typeof VueCompositionAPI !== 'undefined' ? VueCompositionAPI : undefined)
);
;
;(function (exports, vueDemi, shared, axios) {
  'use strict';

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
      instance(_url, __spreadProps(__spreadValues(__spreadValues({}, defaultConfig), typeof executeUrl === "object" ? executeUrl : config), { cancelToken: cancelToken.token })).then((r) => {
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
    return __spreadProps(__spreadValues({}, result), {
      then
    });
  }

  exports.useAxios = useAxios;

})(this.VueUse = this.VueUse || {}, VueDemi, VueUse, axios);
