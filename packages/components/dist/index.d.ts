import * as vue_demi from 'vue-demi';
import { ComponentPublicInstance, ObjectDirective, Ref, UnwrapNestedRefs, ComputedRef, FunctionDirective } from 'vue-demi';
import { MaybeRef, MaybeComputedRef, ConfigurableEventFilter, ConfigurableFlush } from '@vueuse/shared';
import { UseDarkOptions, UseDevicesListOptions, UseDraggableOptions, ElementSize as ElementSize$1, UseGeolocationOptions, UseIdleOptions, UseMouseOptions, MouseInElementOptions, MousePressedOptions, UseNowOptions, UsePointerOptions, UseTimeAgoOptions, UseTimestampOptions, UseVirtualListOptions, UseWindowSizeOptions } from '@vueuse/core';

interface ConfigurableWindow {
    window?: Window;
}

interface RenderableComponent {
    /**
     * The element that the component should be rendered as
     *
     * @default 'div'
     */
    as?: Object | string;
}

declare type VueInstance = ComponentPublicInstance;
declare type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
declare type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>;
declare type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null;

interface OnClickOutsideOptions extends ConfigurableWindow {
    /**
     * List of elements that should not trigger the event.
     */
    ignore?: MaybeElementRef[];
    /**
     * Use capturing phase for internal event listener.
     * @default true
     */
    capture?: boolean;
    /**
     * Run handler function if focus moves to an iframe.
     * @default false
     */
    detectIframe?: boolean;
}
declare type OnClickOutsideHandler<T extends {
    detectIframe: OnClickOutsideOptions['detectIframe'];
} = {
    detectIframe: false;
}> = (evt: T['detectIframe'] extends true ? PointerEvent | FocusEvent : PointerEvent) => void;

interface OnClickOutsideProps extends RenderableComponent {
    options?: OnClickOutsideOptions;
}
declare const OnClickOutside: vue_demi.DefineComponent<OnClickOutsideProps, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<OnClickOutsideProps>, {}>;

declare const vOnClickOutside: ObjectDirective<HTMLElement, OnClickOutsideHandler | [(evt: any) => void, OnClickOutsideOptions]>;

declare type KeyStrokeEventName = 'keydown' | 'keypress' | 'keyup';
interface OnKeyStrokeOptions {
    eventName?: KeyStrokeEventName;
    target?: MaybeComputedRef<EventTarget>;
    passive?: boolean;
}

declare type BindingValueFunction$7 = (event: KeyboardEvent) => void;
declare type BindingValueArray$6 = [BindingValueFunction$7, OnKeyStrokeOptions];
declare const vOnKeyStroke: ObjectDirective<HTMLElement, BindingValueFunction$7 | BindingValueArray$6>;

interface OnLongPressOptions {
    /**
     * Time in ms till `longpress` gets called
     *
     * @default 500
     */
    delay?: number;
    modifiers?: OnLongPressModifiers;
}
interface OnLongPressModifiers {
    stop?: boolean;
    once?: boolean;
    prevent?: boolean;
    capture?: boolean;
    self?: boolean;
}

interface OnLongPressProps extends RenderableComponent {
    options?: OnLongPressOptions;
}
declare const OnLongPress: vue_demi.DefineComponent<OnLongPressProps, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<OnLongPressProps>, {}>;

declare type BindingValueFunction$6 = (evt: PointerEvent) => void;
declare type BindingValueArray$5 = [
    BindingValueFunction$6,
    OnLongPressOptions
];
declare const vOnLongPress: ObjectDirective<HTMLElement, BindingValueFunction$6 | BindingValueArray$5>;

declare const UseActiveElement: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseBattery: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseBrowserLocation: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

interface StorageLike {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

interface Serializer<T> {
    read(raw: string): T;
    write(value: T): string;
}
interface UseStorageOptions<T> extends ConfigurableEventFilter, ConfigurableWindow, ConfigurableFlush {
    /**
     * Watch for deep changes
     *
     * @default true
     */
    deep?: boolean;
    /**
     * Listen to storage changes, useful for multiple tabs application
     *
     * @default true
     */
    listenToStorageChanges?: boolean;
    /**
     * Write the default value to the storage when it does not exist
     *
     * @default true
     */
    writeDefaults?: boolean;
    /**
     * Merge the default value with the value read from the storage.
     *
     * When setting it to true, it will perform a **shallow merge** for objects.
     * You can pass a function to perform custom merge (e.g. deep merge), for example:
     *
     * @default false
     */
    mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T);
    /**
     * Custom data serialization
     */
    serializer?: Serializer<T>;
    /**
     * On error callback
     *
     * Default log error to `console.error`
     */
    onError?: (error: unknown) => void;
    /**
     * Use shallow ref as reference
     *
     * @default false
     */
    shallow?: boolean;
}

declare type BasicColorSchema = 'light' | 'dark' | 'auto';
interface UseColorModeOptions<T extends string = BasicColorSchema> extends UseStorageOptions<T | BasicColorSchema> {
    /**
     * CSS Selector for the target element applying to
     *
     * @default 'html'
     */
    selector?: string;
    /**
     * HTML attribute applying the target element
     *
     * @default 'class'
     */
    attribute?: string;
    /**
     * The initial color mode
     *
     * @default 'auto'
     */
    initialValue?: T | BasicColorSchema;
    /**
     * Prefix when adding value to the attribute
     */
    modes?: Partial<Record<T | BasicColorSchema, string>>;
    /**
     * A custom handler for handle the updates.
     * When specified, the default behavior will be overridden.
     *
     * @default undefined
     */
    onChanged?: (mode: T | BasicColorSchema, defaultHandler: ((mode: T | BasicColorSchema) => void)) => void;
    /**
     * Custom storage ref
     *
     * When provided, `useStorage` will be skipped
     */
    storageRef?: Ref<T | BasicColorSchema>;
    /**
     * Key to persist the data into localStorage/sessionStorage.
     *
     * Pass `null` to disable persistence
     *
     * @default 'vueuse-color-scheme'
     */
    storageKey?: string | null;
    /**
     * Storage object, can be localStorage or sessionStorage
     *
     * @default localStorage
     */
    storage?: StorageLike;
    /**
     * Emit `auto` mode from state
     *
     * When set to `true`, preferred mode won't be translated into `light` or `dark`.
     * This is useful when the fact that `auto` mode was selected needs to be known.
     *
     * @default undefined
     */
    emitAuto?: boolean;
}

declare const UseColorMode: vue_demi.DefineComponent<UseColorModeOptions<BasicColorSchema>, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseColorModeOptions<BasicColorSchema>>, {}>;

declare const UseDark: vue_demi.DefineComponent<UseDarkOptions, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseDarkOptions>, {}>;

declare const UseDeviceMotion: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseDeviceOrientation: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseDevicePixelRatio: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseDevicesList: vue_demi.DefineComponent<UseDevicesListOptions, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseDevicesListOptions>, {}>;

declare const UseDocumentVisibility: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

interface UseDraggableProps extends UseDraggableOptions, RenderableComponent {
    /**
     * When provided, use `useStorage` to preserve element's position
     */
    storageKey?: string;
    /**
     * Storage type
     *
     * @default 'local'
     */
    storageType?: 'local' | 'session';
}
declare const UseDraggable: vue_demi.DefineComponent<UseDraggableProps, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseDraggableProps>, {}>;

interface UseResizeObserverOptions extends ConfigurableWindow {
    /**
     * Sets which box model the observer will observe changes to. Possible values
     * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
     *
     * @default 'content-box'
     */
    box?: ResizeObserverBoxOptions;
}

declare const UseElementBounding: vue_demi.DefineComponent<UseResizeObserverOptions & RenderableComponent, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseResizeObserverOptions & RenderableComponent>, {}>;

declare type BindingValueFunction$5 = (state: boolean) => void;
declare const vElementHover: ObjectDirective<HTMLElement, BindingValueFunction$5>;

declare const UseElementSize: vue_demi.DefineComponent<ElementSize$1 & UseResizeObserverOptions & RenderableComponent, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<ElementSize$1 & UseResizeObserverOptions & RenderableComponent>, {}>;

interface ElementSize {
    width: number;
    height: number;
}
/**
 * Reactive size of an HTML element.
 *
 * @see https://vueuse.org/useElementSize
 * @param target
 * @param callback
 * @param options
 */
declare function useElementSize(target: MaybeComputedElementRef, initialSize?: ElementSize, options?: UseResizeObserverOptions): {
    width: vue_demi.Ref<number>;
    height: vue_demi.Ref<number>;
};

declare type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0 ? undefined : (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : []);
declare type BindingValueFunction$4 = (size: ElementSize) => void;
declare type VElementSizeOptions = RemoveFirstFromTuple<Parameters<typeof useElementSize>>;
declare type BindingValueArray$4 = [BindingValueFunction$4, ...VElementSizeOptions];
declare const vElementSize: ObjectDirective<HTMLElement, BindingValueFunction$4 | BindingValueArray$4>;

declare const UseElementVisibility: vue_demi.DefineComponent<RenderableComponent, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<RenderableComponent>, {}>;

interface UseElementVisibilityOptions extends ConfigurableWindow {
    scrollTarget?: MaybeComputedRef<HTMLElement | undefined | null>;
}

declare type BindingValueFunction$3 = (state: boolean) => void;
declare type BindingValueArray$3 = [BindingValueFunction$3, UseElementVisibilityOptions];
declare const vElementVisibility: ObjectDirective<HTMLElement, BindingValueFunction$3 | BindingValueArray$3>;

declare const UseEyeDropper: vue_demi.DefineComponent<{
    sRGBHex: StringConstructor;
}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{
    sRGBHex: StringConstructor;
}>>, {}>;

declare const UseFullscreen: vue_demi.DefineComponent<RenderableComponent, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<RenderableComponent>, {}>;

declare const UseGeolocation: vue_demi.DefineComponent<UseGeolocationOptions, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseGeolocationOptions>, {}>;

declare const UseIdle: vue_demi.DefineComponent<UseIdleOptions & {
    timeout: number;
}, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseIdleOptions & {
    timeout: number;
}>, {}>;

interface UseImageOptions {
    /** Address of the resource */
    src: string;
    /** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
    srcset?: string;
    /** Image sizes for different page layouts */
    sizes?: string;
}

declare const UseImage: vue_demi.DefineComponent<UseImageOptions & RenderableComponent, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseImageOptions & RenderableComponent>, {}>;

interface UseScrollOptions {
    /**
     * Throttle time for scroll event, it’s disabled by default.
     *
     * @default 0
     */
    throttle?: number;
    /**
     * The check time when scrolling ends.
     * This configuration will be setting to (throttle + idle) when the `throttle` is configured.
     *
     * @default 200
     */
    idle?: number;
    /**
     * Offset arrived states by x pixels
     *
     */
    offset?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
    /**
     * Trigger it when scrolling.
     *
     */
    onScroll?: (e: Event) => void;
    /**
     * Trigger it when scrolling ends.
     *
     */
    onStop?: (e: Event) => void;
    /**
     * Listener options for scroll event.
     *
     * @default {capture: false, passive: true}
     */
    eventListenerOptions?: boolean | AddEventListenerOptions;
    /**
     * Optionally specify a scroll behavior of `auto` (default, not smooth scrolling) or
     * `smooth` (for smooth scrolling) which takes effect when changing the `x` or `y` refs.
     *
     * @default 'auto'
     */
    behavior?: MaybeComputedRef<ScrollBehavior>;
}
/**
 * Reactive scroll.
 *
 * @see https://vueuse.org/useScroll
 * @param element
 * @param options
 */
declare function useScroll(element: MaybeComputedRef<HTMLElement | SVGElement | Window | Document | null | undefined>, options?: UseScrollOptions): {
    x: vue_demi.WritableComputedRef<number>;
    y: vue_demi.WritableComputedRef<number>;
    isScrolling: vue_demi.Ref<boolean>;
    arrivedState: {
        left: boolean;
        right: boolean;
        top: boolean;
        bottom: boolean;
    };
    directions: {
        left: boolean;
        right: boolean;
        top: boolean;
        bottom: boolean;
    };
};
declare type UseScrollReturn = ReturnType<typeof useScroll>;

interface UseInfiniteScrollOptions extends UseScrollOptions {
    /**
     * The minimum distance between the bottom of the element and the bottom of the viewport
     *
     * @default 0
     */
    distance?: number;
    /**
     * The direction in which to listen the scroll.
     *
     * @default 'bottom'
     */
    direction?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Whether to preserve the current scroll position when loading more items.
     *
     * @default false
     */
    preserveScrollPosition?: boolean;
}
/**
 * Reactive infinite scroll.
 *
 * @see https://vueuse.org/useInfiniteScroll
 */
declare function useInfiniteScroll(element: MaybeComputedRef<HTMLElement | SVGElement | Window | Document | null | undefined>, onLoadMore: (state: UnwrapNestedRefs<ReturnType<typeof useScroll>>) => void | Promise<void>, options?: UseInfiniteScrollOptions): void;

declare type BindingValueFunction$2 = Parameters<typeof useInfiniteScroll>[1];
declare type BindingValueArray$2 = [BindingValueFunction$2, UseInfiniteScrollOptions];
declare const vInfiniteScroll: ObjectDirective<HTMLElement, BindingValueFunction$2 | BindingValueArray$2>;

interface UseIntersectionObserverOptions extends ConfigurableWindow {
    /**
     * The Element or Document whose bounds are used as the bounding box when testing for intersection.
     */
    root?: MaybeElementRef;
    /**
     * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
     */
    rootMargin?: string;
    /**
     * Either a single number or an array of numbers between 0.0 and 1.
     */
    threshold?: number | number[];
}

declare type BindingValueFunction$1 = IntersectionObserverCallback;
declare type BindingValueArray$1 = [BindingValueFunction$1, UseIntersectionObserverOptions];
declare const vIntersectionObserver: ObjectDirective<HTMLElement, BindingValueFunction$1 | BindingValueArray$1>;

declare const UseMouse: vue_demi.DefineComponent<UseMouseOptions, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseMouseOptions>, {}>;

declare const UseMouseInElement: vue_demi.DefineComponent<MouseInElementOptions & RenderableComponent, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<MouseInElementOptions & RenderableComponent>, {}>;

declare const UseMousePressed: vue_demi.DefineComponent<Omit<MousePressedOptions, "target"> & RenderableComponent, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<Omit<MousePressedOptions, "target"> & RenderableComponent>, {}>;

declare const UseNetwork: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseNow: vue_demi.DefineComponent<Omit<UseNowOptions<true>, "controls">, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<Omit<UseNowOptions<true>, "controls">>, {}>;

interface UseObjectUrlProps {
    object: Blob | MediaSource | undefined;
}
declare const UseObjectUrl: vue_demi.DefineComponent<UseObjectUrlProps, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseObjectUrlProps>, {}>;

interface UseOffsetPaginationOptions {
    /**
     * Total number of items.
     */
    total?: MaybeRef<number>;
    /**
     * The number of items to display per page.
     * @default 10
     */
    pageSize?: MaybeRef<number>;
    /**
     * The current page number.
     * @default 1
     */
    page?: MaybeRef<number>;
    /**
     * Callback when the `page` change.
     */
    onPageChange?: (returnValue: UnwrapNestedRefs<UseOffsetPaginationReturn>) => unknown;
    /**
     * Callback when the `pageSize` change.
     */
    onPageSizeChange?: (returnValue: UnwrapNestedRefs<UseOffsetPaginationReturn>) => unknown;
    /**
     * Callback when the `pageCount` change.
     */
    onPageCountChange?: (returnValue: UnwrapNestedRefs<UseOffsetPaginationReturn>) => unknown;
}
interface UseOffsetPaginationReturn {
    currentPage: Ref<number>;
    currentPageSize: Ref<number>;
    pageCount: ComputedRef<number>;
    isFirstPage: ComputedRef<boolean>;
    isLastPage: ComputedRef<boolean>;
    prev: () => void;
    next: () => void;
}

declare const UseOffsetPagination: vue_demi.DefineComponent<UseOffsetPaginationOptions, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseOffsetPaginationOptions>, {}>;

declare const UseOnline: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UsePageLeave: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UsePointer: vue_demi.DefineComponent<Omit<UsePointerOptions, "target"> & {
    target: 'window' | 'self';
}, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<Omit<UsePointerOptions, "target"> & {
    target: 'window' | 'self';
}>, {}>;

declare const UsePreferredColorScheme: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UsePreferredContrast: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UsePreferredDark: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UsePreferredLanguages: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UsePreferredReducedMotion: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseScreenSafeArea: vue_demi.DefineComponent<{
    top: BooleanConstructor;
    right: BooleanConstructor;
    bottom: BooleanConstructor;
    left: BooleanConstructor;
}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}> | undefined, unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{
    top: BooleanConstructor;
    right: BooleanConstructor;
    bottom: BooleanConstructor;
    left: BooleanConstructor;
}>>, {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}>;

declare type BindingValueFunction = (state: UseScrollReturn) => void;
declare type BindingValueArray = [BindingValueFunction, UseScrollOptions];
declare const vScroll: ObjectDirective<HTMLElement, BindingValueFunction | BindingValueArray>;

declare const vScrollLock: FunctionDirective<HTMLElement, boolean>;

interface UseTimeAgoComponentOptions extends Omit<UseTimeAgoOptions<true>, 'controls'> {
    time: MaybeRef<Date | number | string>;
}
declare const UseTimeAgo: vue_demi.DefineComponent<UseTimeAgoComponentOptions, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseTimeAgoComponentOptions>, {}>;

declare const UseTimestamp: vue_demi.DefineComponent<Omit<UseTimestampOptions<true>, "controls">, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<Omit<UseTimestampOptions<true>, "controls">>, {}>;

interface UseVirtualListProps {
    /**
     * data of scrollable list
     *
     * @default []
     */
    list: Array<any>;
    /**
     * useVirtualList's options
     *
     * @default {}
     */
    options: UseVirtualListOptions;
    /**
     * virtualList's height
     *
     * @default 300px
     */
    height: string;
}
declare const UseVirtualList: vue_demi.DefineComponent<UseVirtualListProps, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseVirtualListProps>, {}>;

declare const UseWindowFocus: vue_demi.DefineComponent<{}, () => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<vue_demi.ExtractPropTypes<{}>>, {}>;

declare const UseWindowSize: vue_demi.DefineComponent<UseWindowSizeOptions, {}, {}, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, {}, string, vue_demi.VNodeProps & vue_demi.AllowedComponentProps & vue_demi.ComponentCustomProps, Readonly<UseWindowSizeOptions>, {}>;

export { OnClickOutside, OnClickOutsideProps, OnLongPress, OnLongPressProps, UseActiveElement, UseBattery, UseBrowserLocation, UseColorMode, UseDark, UseDeviceMotion, UseDeviceOrientation, UseDevicePixelRatio, UseDevicesList, UseDocumentVisibility, UseDraggable, UseDraggableProps, UseElementBounding, UseElementSize, UseElementVisibility, UseEyeDropper, UseFullscreen, UseGeolocation, UseIdle, UseImage, UseMouse, UseMouseInElement, UseMousePressed, UseNetwork, UseNow, UseObjectUrl, UseObjectUrlProps, UseOffsetPagination, UseOnline, UsePageLeave, UsePointer, UsePreferredColorScheme, UsePreferredContrast, UsePreferredDark, UsePreferredLanguages, UsePreferredReducedMotion, UseScreenSafeArea, UseTimeAgo, UseTimestamp, UseVirtualList, UseVirtualListProps, UseWindowFocus, UseWindowSize, vOnClickOutside as VOnClickOutside, vOnLongPress as VOnLongPress, vElementHover, vElementSize, vElementVisibility, vInfiniteScroll, vIntersectionObserver, vOnClickOutside, vOnKeyStroke, vOnLongPress, vScroll, vScrollLock };
