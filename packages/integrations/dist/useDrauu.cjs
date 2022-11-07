'use strict';

var vueDemi = require('vue-demi');
var drauu = require('drauu');
var core = require('@vueuse/core');
var shared = require('@vueuse/shared');

var __defProp = Object.defineProperty;
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
    drauuInstance.value = drauu.createDrauu(__spreadValues({ el }, options));
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

exports.useDrauu = useDrauu;
