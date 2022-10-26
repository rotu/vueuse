import { DatabaseReference } from 'firebase/database';
import { Ref } from 'vue-demi';

interface UseRTDBOptions {
    autoDispose?: boolean;
}
/**
 * Reactive Firebase Realtime Database binding.
 *
 * @see https://vueuse.org/useRTDB
 */
declare function useRTDB<T = any>(docRef: DatabaseReference, options?: UseRTDBOptions): Ref<T | undefined>;

export { UseRTDBOptions, useRTDB };
