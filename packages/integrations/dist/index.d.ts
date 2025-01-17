import { MaybeComputedRef, MaybeRef } from '@vueuse/shared';
import { ValidateError, ValidateOption, Rules } from 'async-validator';
import * as vue_demi from 'vue-demi';
import { Ref, ShallowRef, WritableComputedRef, ComputedRef } from 'vue-demi';
import { AxiosResponse, AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios';
import { camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase, Options } from 'change-case';
import * as universal_cookie from 'universal-cookie';
import universal_cookie__default from 'universal-cookie';
import { IncomingMessage } from 'http';
import { Options as Options$1, Drauu, Brush } from 'drauu';
import { EventHookOn, MaybeComputedElementRef, Fn, MaybeElementRef } from '@vueuse/core';
import { Options as Options$2, ActivateOptions, DeactivateOptions } from 'focus-trap';
import Fuse from 'fuse.js';
import { JwtPayload, JwtHeader } from 'jwt-decode';
import nprogress, { NProgressOptions } from 'nprogress';
import QRCode from 'qrcode';

declare type AsyncValidatorError = Error & {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
};
interface UseAsyncValidatorReturn {
    pass: Ref<boolean>;
    errorInfo: Ref<AsyncValidatorError | null>;
    isFinished: Ref<boolean>;
    errors: Ref<AsyncValidatorError['errors'] | undefined>;
    errorFields: Ref<AsyncValidatorError['fields'] | undefined>;
}
interface UseAsyncValidatorOptions {
    /**
     * @see https://github.com/yiminghe/async-validator#options
     */
    validateOption?: ValidateOption;
}
/**
 * Wrapper for async-validator.
 *
 * @see https://vueuse.org/useAsyncValidator
 * @see https://github.com/yiminghe/async-validator
 */
declare function useAsyncValidator(value: MaybeComputedRef<Record<string, any>>, rules: MaybeComputedRef<Rules>, options?: UseAsyncValidatorOptions): UseAsyncValidatorReturn & PromiseLike<UseAsyncValidatorReturn>;

interface UseAxiosReturn<T, R = AxiosResponse<T>, D = any> {
    /**
     * Axios Response
     */
    response: ShallowRef<R | undefined>;
    /**
     * Axios response data
     */
    data: Ref<T | undefined>;
    /**
     * Indicates if the request has finished
     */
    isFinished: Ref<boolean>;
    /**
     * Indicates if the request is currently loading
     */
    isLoading: Ref<boolean>;
    /**
     * Indicates if the request was canceled
     */
    isAborted: Ref<boolean>;
    /**
     * Any errors that may have occurred
     */
    error: ShallowRef<AxiosError<T, D> | undefined>;
    /**
     * Aborts the current request
     */
    abort: (message?: string | undefined) => void;
    /**
     * isFinished alias
     * @deprecated use `isFinished` instead
     */
    finished: Ref<boolean>;
    /**
     * isLoading alias
     * @deprecated use `isLoading` instead
     */
    loading: Ref<boolean>;
    /**
     * isAborted alias
     * @deprecated use `isAborted` instead
     */
    aborted: Ref<boolean>;
    /**
     * abort alias
     */
    cancel: (message?: string | undefined) => void;
    /**
     * isAborted alias
     * @deprecated use `isCanceled` instead
     */
    canceled: Ref<boolean>;
    /**
     * isAborted alias
     */
    isCanceled: Ref<boolean>;
}
interface StrictUseAxiosReturn<T, R, D> extends UseAxiosReturn<T, R, D> {
    /**
     * Manually call the axios request
     */
    execute: (url?: string | AxiosRequestConfig<D>, config?: AxiosRequestConfig<D>) => PromiseLike<StrictUseAxiosReturn<T, R, D>>;
}
interface EasyUseAxiosReturn<T, R, D> extends UseAxiosReturn<T, R, D> {
    /**
     * Manually call the axios request
     */
    execute: (url: string, config?: AxiosRequestConfig<D>) => PromiseLike<EasyUseAxiosReturn<T, R, D>>;
}
interface UseAxiosOptions {
    /**
     * Will automatically run axios request when `useAxios` is used
     *
     */
    immediate?: boolean;
    /**
     * Use shallowRef.
     *
     * @default true
     */
    shallow?: boolean;
}
declare function useAxios<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>, options?: UseAxiosOptions): StrictUseAxiosReturn<T, R, D> & PromiseLike<StrictUseAxiosReturn<T, R, D>>;
declare function useAxios<T = any, R = AxiosResponse<T>, D = any>(url: string, instance?: AxiosInstance, options?: UseAxiosOptions): StrictUseAxiosReturn<T, R, D> & PromiseLike<StrictUseAxiosReturn<T, R, D>>;
declare function useAxios<T = any, R = AxiosResponse<T>, D = any>(url: string, config: AxiosRequestConfig<D>, instance: AxiosInstance, options?: UseAxiosOptions): StrictUseAxiosReturn<T, R, D> & PromiseLike<StrictUseAxiosReturn<T, R, D>>;
declare function useAxios<T = any, R = AxiosResponse<T>, D = any>(config?: AxiosRequestConfig<D>): EasyUseAxiosReturn<T, R, D> & PromiseLike<EasyUseAxiosReturn<T, R, D>>;
declare function useAxios<T = any, R = AxiosResponse<T>, D = any>(instance?: AxiosInstance): EasyUseAxiosReturn<T, R, D> & PromiseLike<EasyUseAxiosReturn<T, R, D>>;
declare function useAxios<T = any, R = AxiosResponse<T>, D = any>(config?: AxiosRequestConfig<D>, instance?: AxiosInstance): EasyUseAxiosReturn<T, R, D> & PromiseLike<EasyUseAxiosReturn<T, R, D>>;

declare const changeCase_camelCase: typeof camelCase;
declare const changeCase_capitalCase: typeof capitalCase;
declare const changeCase_constantCase: typeof constantCase;
declare const changeCase_dotCase: typeof dotCase;
declare const changeCase_headerCase: typeof headerCase;
declare const changeCase_noCase: typeof noCase;
declare const changeCase_paramCase: typeof paramCase;
declare const changeCase_pascalCase: typeof pascalCase;
declare const changeCase_pathCase: typeof pathCase;
declare const changeCase_sentenceCase: typeof sentenceCase;
declare const changeCase_snakeCase: typeof snakeCase;
declare namespace changeCase {
  export {
    changeCase_camelCase as camelCase,
    changeCase_capitalCase as capitalCase,
    changeCase_constantCase as constantCase,
    changeCase_dotCase as dotCase,
    changeCase_headerCase as headerCase,
    changeCase_noCase as noCase,
    changeCase_paramCase as paramCase,
    changeCase_pascalCase as pascalCase,
    changeCase_pathCase as pathCase,
    changeCase_sentenceCase as sentenceCase,
    changeCase_snakeCase as snakeCase,
  };
}

declare type ChangeCaseType = keyof typeof changeCase;
declare function useChangeCase(input: MaybeRef<string>, type: ChangeCaseType, options?: Options | undefined): WritableComputedRef<string>;
declare function useChangeCase(input: MaybeComputedRef<string>, type: ChangeCaseType, options?: Options | undefined): ComputedRef<string>;

/**
 * Creates a new {@link useCookies} function
 * @param {Object} req - incoming http request (for SSR)
 * @see https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie universal-cookie
 * @description Creates universal-cookie instance using request (default is window.document.cookie) and returns {@link useCookies} function with provided universal-cookie instance
 */
declare function createCookies(req?: IncomingMessage): (dependencies?: string[] | null, { doNotParse, autoUpdateDependencies }?: {
    doNotParse?: boolean | undefined;
    autoUpdateDependencies?: boolean | undefined;
}) => {
    /**
     * Reactive get cookie by name. If **autoUpdateDependencies = true** then it will update watching dependencies
     */
    get: <T = any>(name: string, options?: universal_cookie.CookieGetOptions | undefined) => T;
    /**
     * Reactive get all cookies
     */
    getAll: <T_1 = any>(options?: universal_cookie.CookieGetOptions | undefined) => T_1;
    set: (name: string, value: any, options?: universal_cookie.CookieSetOptions | undefined) => void;
    remove: (name: string, options?: universal_cookie.CookieSetOptions | undefined) => void;
    addChangeListener: (callback: universal_cookie.CookieChangeListener) => void;
    removeChangeListener: (callback: universal_cookie.CookieChangeListener) => void;
};
/**
 * Reactive methods to work with cookies (use {@link createCookies} method instead if you are using SSR)
 * @param {string[]|null|undefined} dependencies - array of watching cookie's names. Pass empty array if don't want to watch cookies changes.
 * @param {Object} options
 * @param {boolean} options.doNotParse - don't try parse value as JSON
 * @param {boolean} options.autoUpdateDependencies - automatically update watching dependencies
 * @param {Object} cookies - universal-cookie instance
 */
declare function useCookies(dependencies?: string[] | null, { doNotParse, autoUpdateDependencies }?: {
    doNotParse?: boolean | undefined;
    autoUpdateDependencies?: boolean | undefined;
}, cookies?: universal_cookie__default): {
    /**
     * Reactive get cookie by name. If **autoUpdateDependencies = true** then it will update watching dependencies
     */
    get: <T = any>(name: string, options?: universal_cookie.CookieGetOptions | undefined) => T;
    /**
     * Reactive get all cookies
     */
    getAll: <T_1 = any>(options?: universal_cookie.CookieGetOptions | undefined) => T_1;
    set: (name: string, value: any, options?: universal_cookie.CookieSetOptions | undefined) => void;
    remove: (name: string, options?: universal_cookie.CookieSetOptions | undefined) => void;
    addChangeListener: (callback: universal_cookie.CookieChangeListener) => void;
    removeChangeListener: (callback: universal_cookie.CookieChangeListener) => void;
};

declare type UseDrauuOptions = Omit<Options$1, 'el'>;
interface UseDrauuReturn {
    drauuInstance: Ref<Drauu | undefined>;
    load: (svg: string) => void;
    dump: () => string | undefined;
    clear: () => void;
    cancel: () => void;
    undo: () => boolean | undefined;
    redo: () => boolean | undefined;
    canUndo: Ref<boolean>;
    canRedo: Ref<boolean>;
    brush: Ref<Brush>;
    onChanged: EventHookOn;
    onCommitted: EventHookOn;
    onStart: EventHookOn;
    onEnd: EventHookOn;
    onCanceled: EventHookOn;
}
/**
 * Reactive drauu
 *
 * @see https://vueuse.org/useDrauu
 * @param target The target svg element
 * @param options Drauu Options
 */
declare function useDrauu(target: MaybeComputedElementRef, options?: UseDrauuOptions): UseDrauuReturn;

interface UseFocusTrapOptions extends Options$2 {
    /**
     * Immediately activate the trap
     */
    immediate?: boolean;
}
interface UseFocusTrapReturn {
    /**
     * Indicates if the focus trap is currently active
     */
    hasFocus: Ref<boolean>;
    /**
     * Indicates if the focus trap is currently paused
     */
    isPaused: Ref<boolean>;
    /**
     * Activate the focus trap
     *
     * @see https://github.com/focus-trap/focus-trap#trapactivateactivateoptions
     * @param opts Activate focus trap options
     */
    activate: (opts?: ActivateOptions) => void;
    /**
     * Deactivate the focus trap
     *
     * @see https://github.com/focus-trap/focus-trap#trapdeactivatedeactivateoptions
     * @param opts Deactivate focus trap options
     */
    deactivate: (opts?: DeactivateOptions) => void;
    /**
     * Pause the focus trap
     *
     * @see https://github.com/focus-trap/focus-trap#trappause
     */
    pause: Fn;
    /**
     * Unpauses the focus trap
     *
     * @see https://github.com/focus-trap/focus-trap#trapunpause
     */
    unpause: Fn;
}
/**
 * Reactive focus-trap
 *
 * @see https://vueuse.org/useFocusTrap
 * @param target The target element to trap focus within
 * @param options Focus trap options
 * @param autoFocus Focus trap automatically when mounted
 */
declare function useFocusTrap(target: MaybeElementRef, options?: UseFocusTrapOptions): UseFocusTrapReturn;

declare type FuseOptions<T> = Fuse.IFuseOptions<T>;
interface UseFuseOptions<T> {
    fuseOptions?: FuseOptions<T>;
    resultLimit?: number;
    matchAllWhenSearchEmpty?: boolean;
}
declare function useFuse<DataItem>(search: MaybeComputedRef<string>, data: MaybeComputedRef<DataItem[]>, options?: MaybeComputedRef<UseFuseOptions<DataItem>>): {
    fuse: vue_demi.Ref<{
        search: <R = DataItem>(pattern: string | Fuse.Expression, options?: Fuse.FuseSearchOptions | undefined) => Fuse.FuseResult<R>[];
        setCollection: (docs: readonly DataItem[], index?: Fuse.FuseIndex<DataItem> | undefined) => void;
        add: (doc: DataItem) => void;
        remove: (predicate: (doc: DataItem, idx: number) => boolean) => DataItem[];
        removeAt: (idx: number) => void;
        getIndex: () => Fuse.FuseIndex<DataItem>;
    }>;
    results: ComputedRef<Fuse.FuseResult<DataItem>[]>;
};
declare type UseFuseReturn = ReturnType<typeof useFuse>;

interface UseJwtOptions<Fallback> {
    /**
     * Value returned when encounter error on decoding
     *
     * @default null
     */
    fallbackValue?: Fallback;
    /**
     * Error callback for decoding
     */
    onError?: (error: unknown) => void;
}
interface UseJwtReturn<Payload, Header, Fallback> {
    header: ComputedRef<Header | Fallback>;
    payload: ComputedRef<Payload | Fallback>;
}
/**
 * Reactive decoded jwt token.
 *
 * @see https://vueuse.org/useJwt
 * @param jwt
 */
declare function useJwt<Payload extends object = JwtPayload, Header extends object = JwtHeader, Fallback = null>(encodedJwt: MaybeComputedRef<string>, options?: UseJwtOptions<Fallback>): UseJwtReturn<Payload, Header, Fallback>;

declare type UseNProgressOptions = Partial<NProgressOptions>;
/**
 * Reactive progress bar.
 *
 * @see https://vueuse.org/useNProgress
 */
declare function useNProgress(currentProgress?: MaybeComputedRef<number | null | undefined>, options?: UseNProgressOptions): {
    isLoading: vue_demi.WritableComputedRef<boolean>;
    progress: vue_demi.Ref<number | (() => number | null | undefined) | null | undefined>;
    start: () => nprogress.NProgress;
    done: (force?: boolean | undefined) => nprogress.NProgress;
    remove: () => void;
};
declare type UseNProgressReturn = ReturnType<typeof useNProgress>;

/**
 * Wrapper for qrcode.
 *
 * @see https://vueuse.org/useQRCode
 * @param text
 * @param options
 */
declare function useQRCode(text: MaybeComputedRef<string>, options?: QRCode.QRCodeToDataURLOptions): vue_demi.Ref<string>;

export { AsyncValidatorError, ChangeCaseType, EasyUseAxiosReturn, FuseOptions, StrictUseAxiosReturn, UseAsyncValidatorOptions, UseAsyncValidatorReturn, UseAxiosOptions, UseAxiosReturn, UseDrauuOptions, UseDrauuReturn, UseFocusTrapOptions, UseFocusTrapReturn, UseFuseOptions, UseFuseReturn, UseJwtOptions, UseJwtReturn, UseNProgressOptions, UseNProgressReturn, createCookies, useAsyncValidator, useAxios, useChangeCase, useCookies, useDrauu, useFocusTrap, useFuse, useJwt, useNProgress, useQRCode };
