import { shallowRef, ref } from 'vue-demi';
import { isString, until } from '@vueuse/shared';
import axios from 'axios';

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
  const argsPlaceholder = isString(url) ? 1 : 0;
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
  const response = shallowRef();
  const data = options.shallow ? shallowRef() : ref();
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef();
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
    until(isFinished).toBe(true).then(() => resolve(result)).catch(reject);
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

export { useAxios };
