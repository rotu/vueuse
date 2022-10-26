'use strict';

var vueDemi = require('vue-demi');
var shared = require('@vueuse/shared');

function useIpcRendererInvoke(...args) {
  let ipcRenderer;
  let channel;
  let invokeArgs;
  if (shared.isString(args[0])) {
    [channel, ...invokeArgs] = args;
    ipcRenderer = window.require ? window.require("electron").ipcRenderer : void 0;
  } else {
    [ipcRenderer, channel, ...invokeArgs] = args;
  }
  if (!ipcRenderer)
    throw new Error("please provide IpcRenderer module or enable nodeIntegration");
  const result = vueDemi.shallowRef(null);
  ipcRenderer.invoke(channel, ...invokeArgs).then((response) => {
    result.value = response;
  });
  return result;
}

function useIpcRendererOn(...args) {
  let ipcRenderer;
  let channel;
  let listener;
  if (shared.isString(args[0])) {
    [channel, listener] = args;
    ipcRenderer = window.require ? window.require("electron").ipcRenderer : void 0;
  } else {
    [ipcRenderer, channel, listener] = args;
  }
  if (!ipcRenderer)
    throw new Error("please provide IpcRenderer module or enable nodeIntegration");
  shared.tryOnScopeDispose(() => {
    ipcRenderer.removeListener(channel, listener);
  });
  return ipcRenderer.on(channel, listener);
}

function setSendSync(ipcRenderer) {
  return (channel, ...args) => {
    const result = vueDemi.shallowRef(null);
    result.value = ipcRenderer.sendSync(channel, ...args);
    return result;
  };
}
function useIpcRenderer(ipcRenderer) {
  if (!ipcRenderer)
    ipcRenderer = window == null ? void 0 : window.require("electron").ipcRenderer;
  if (!ipcRenderer)
    throw new Error("provide IpcRenderer module or enable nodeIntegration");
  return {
    on: (channel, listener) => useIpcRendererOn(channel, listener),
    once: ipcRenderer.once.bind(ipcRenderer),
    removeListener: ipcRenderer.removeListener.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
    send: ipcRenderer.send,
    invoke: (channel, ...args) => useIpcRendererInvoke(ipcRenderer, channel, ...args),
    sendSync: setSendSync(ipcRenderer),
    postMessage: ipcRenderer.postMessage,
    sendTo: ipcRenderer.sendTo,
    sendToHost: ipcRenderer.sendToHost
  };
}

function useZoomFactor(...args) {
  let webFrame;
  let newFactor = null;
  if (args.length === 0 || vueDemi.isRef(args[0]) && shared.isNumber(args[0].value) || shared.isNumber(args[0])) {
    webFrame = window.require ? window.require("electron").webFrame : void 0;
    newFactor = args.length > 0 ? vueDemi.ref(args[0]) : null;
  } else {
    webFrame = args[0];
    newFactor = args.length > 1 ? vueDemi.ref(args[1]) : null;
  }
  if (!webFrame)
    throw new Error("provide WebFrame module or enable nodeIntegration");
  if (newFactor && newFactor.value === 0)
    throw new Error("the factor must be greater than 0.0.");
  const factor = vueDemi.ref(newFactor != null ? newFactor : webFrame.getZoomFactor());
  vueDemi.watch(factor, (f, o) => {
    if (shared.isNumber(f) && f === 0)
      throw new Error("the factor must be greater than 0.0.");
    if (shared.isNumber(f) && f !== o)
      webFrame == null ? void 0 : webFrame.setZoomFactor(f);
  }, { immediate: true });
  return factor;
}

function useZoomLevel(...args) {
  let webFrame;
  let newLevel = null;
  if (args.length === 0 || vueDemi.isRef(args[0]) && shared.isNumber(args[0].value) || shared.isNumber(args[0])) {
    webFrame = window.require ? window.require("electron").webFrame : void 0;
    newLevel = args.length > 0 ? vueDemi.ref(args[0]) : null;
  } else {
    webFrame = args[0];
    newLevel = args.length > 1 ? vueDemi.ref(args[1]) : null;
  }
  if (!webFrame)
    throw new Error("provide WebFrame module or enable nodeIntegration");
  const level = vueDemi.ref(newLevel != null ? newLevel : webFrame.getZoomLevel());
  vueDemi.watch(level, (f, o) => {
    if (shared.isNumber(f) && f !== o)
      webFrame == null ? void 0 : webFrame.setZoomLevel(f);
  }, { immediate: true });
  return level;
}

exports.useIpcRenderer = useIpcRenderer;
exports.useIpcRendererInvoke = useIpcRendererInvoke;
exports.useIpcRendererOn = useIpcRendererOn;
exports.useZoomFactor = useZoomFactor;
exports.useZoomLevel = useZoomLevel;
