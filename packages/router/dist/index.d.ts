import * as vue_demi from 'vue-demi';
import { Ref } from 'vue-demi';
import { MaybeRef } from '@vueuse/shared';
import { useRoute, useRouter } from 'vue-router';

interface ReactiveRouteOptions {
    /**
     * Mode to update the router query, ref is also acceptable
     *
     * @default 'replace'
     */
    mode?: MaybeRef<'replace' | 'push'>;
    /**
     * Route instance, use `useRoute()` if not given
     */
    route?: ReturnType<typeof useRoute>;
    /**
     * Router instance, use `useRouter()` if not given
     */
    router?: ReturnType<typeof useRouter>;
}

declare function useRouteHash(defaultValue?: string, { mode, route, router, }?: ReactiveRouteOptions): vue_demi.WritableComputedRef<string>;

declare function useRouteParams(name: string): Ref<null | string | string[]>;
declare function useRouteParams<T extends null | undefined | string | string[] = null | string | string[]>(name: string, defaultValue?: T, options?: ReactiveRouteOptions): Ref<T>;

declare function useRouteQuery(name: string): Ref<null | string | string[]>;
declare function useRouteQuery<T extends null | undefined | string | string[] = null | string | string[]>(name: string, defaultValue?: T, options?: ReactiveRouteOptions): Ref<T>;

export { useRouteHash, useRouteParams, useRouteQuery };
