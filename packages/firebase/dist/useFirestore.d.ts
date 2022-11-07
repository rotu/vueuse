import { Ref } from 'vue-demi';
import { Query, DocumentReference, DocumentData } from 'firebase/firestore';
import { MaybeRef } from '@vueuse/shared';

interface UseFirestoreOptions {
    errorHandler?: (err: Error) => void;
    autoDispose?: boolean;
}
declare type FirebaseDocRef<T> = Query<T> | DocumentReference<T>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<DocumentReference<T> | false>, initialValue: T, options?: UseFirestoreOptions): Ref<T | null>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<Query<T> | false>, initialValue: T[], options?: UseFirestoreOptions): Ref<T[]>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<DocumentReference<T> | false>, initialValue?: T | undefined, options?: UseFirestoreOptions): Ref<T | undefined | null>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<Query<T> | false>, initialValue?: T[], options?: UseFirestoreOptions): Ref<T[] | undefined>;

export { FirebaseDocRef, UseFirestoreOptions, useFirestore };
