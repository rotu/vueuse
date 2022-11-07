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
;(function (exports, vueDemi, vueRouter) {
  'use strict';

  var __defProp$2 = Object.defineProperty;
  var __defProps$2 = Object.defineProperties;
  var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
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
  var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
  function useRouteHash(defaultValue, {
    mode = "replace",
    route = vueRouter.useRoute(),
    router = vueRouter.useRouter()
  } = {}) {
    return vueDemi.computed({
      get() {
        var _a;
        return (_a = route.hash) != null ? _a : defaultValue;
      },
      set(v) {
        vueDemi.nextTick(() => {
          router[vueDemi.unref(mode)](__spreadProps$2(__spreadValues$2({}, route), { hash: v }));
        });
      }
    });
  }

  var __defProp$1 = Object.defineProperty;
  var __defProps$1 = Object.defineProperties;
  var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
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
  var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
  function useRouteParams(name, defaultValue, {
    mode = "replace",
    route = vueRouter.useRoute(),
    router = vueRouter.useRouter()
  } = {}) {
    return vueDemi.computed({
      get() {
        const data = route.params[name];
        if (data == null)
          return defaultValue != null ? defaultValue : null;
        if (Array.isArray(data))
          return data.filter(Boolean);
        return data;
      },
      set(v) {
        vueDemi.nextTick(() => {
          router[vueDemi.unref(mode)](__spreadProps$1(__spreadValues$1({}, route), { params: __spreadProps$1(__spreadValues$1({}, route.params), { [name]: v }) }));
        });
      }
    });
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
  function useRouteQuery(name, defaultValue, {
    mode = "replace",
    route = vueRouter.useRoute(),
    router = vueRouter.useRouter()
  } = {}) {
    return vueDemi.computed({
      get() {
        const data = route.query[name];
        if (data == null)
          return defaultValue != null ? defaultValue : null;
        if (Array.isArray(data))
          return data.filter(Boolean);
        return data;
      },
      set(v) {
        vueDemi.nextTick(() => {
          router[vueDemi.unref(mode)](__spreadProps(__spreadValues({}, route), { query: __spreadProps(__spreadValues({}, route.query), { [name]: v === defaultValue || v === null ? void 0 : v }) }));
        });
      }
    });
  }

  exports.useRouteHash = useRouteHash;
  exports.useRouteParams = useRouteParams;
  exports.useRouteQuery = useRouteQuery;

})(this.VueUse = this.VueUse || {}, VueDemi, VueRouter);
