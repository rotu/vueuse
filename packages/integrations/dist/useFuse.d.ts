import * as vue_demi from 'vue-demi';
import { ComputedRef } from 'vue-demi';
import Fuse from 'fuse.js';
import { MaybeComputedRef } from '@vueuse/shared';

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

export { FuseOptions, UseFuseOptions, UseFuseReturn, useFuse };
