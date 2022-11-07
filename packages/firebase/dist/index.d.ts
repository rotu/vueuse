import * as _firebase_auth from '@firebase/auth';
import { ComputedRef, Ref } from 'vue-demi';
import { User, Auth } from 'firebase/auth';
import { Query, DocumentReference, DocumentData } from 'firebase/firestore';
import { MaybeRef } from '@vueuse/shared';
import { DatabaseReference } from 'firebase/database';

interface UseFirebaseAuthOptions {
    isAuthenticated: ComputedRef<boolean>;
    user: Ref<User | null>;
}
/**
 * Reactive Firebase Auth binding
 *
 * @see https://vueuse.org/useAuth
 */
declare function useAuth(auth: Auth): {
    isAuthenticated: ComputedRef<boolean>;
    user: Ref<{
        readonly emailVerified: boolean;
        readonly isAnonymous: boolean;
        readonly metadata: {
            readonly creationTime?: string | undefined;
            readonly lastSignInTime?: string | undefined;
        };
        readonly providerData: {
            readonly displayName: string | null;
            readonly email: string | null;
            readonly phoneNumber: string | null;
            readonly photoURL: string | null;
            readonly providerId: string;
            readonly uid: string;
        }[];
        readonly refreshToken: string;
        readonly tenantId: string | null;
        delete: () => Promise<void>;
        getIdToken: (forceRefresh?: boolean | undefined) => Promise<string>;
        getIdTokenResult: (forceRefresh?: boolean | undefined) => Promise<_firebase_auth.IdTokenResult>;
        reload: () => Promise<void>;
        toJSON: () => object;
        readonly displayName: string | null;
        readonly email: string | null;
        readonly phoneNumber: string | null;
        readonly photoURL: string | null;
        readonly providerId: string;
        readonly uid: string;
    } | null>;
};

interface UseFirestoreOptions {
    errorHandler?: (err: Error) => void;
    autoDispose?: boolean;
}
declare type FirebaseDocRef<T> = Query<T> | DocumentReference<T>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<DocumentReference<T> | false>, initialValue: T, options?: UseFirestoreOptions): Ref<T | null>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<Query<T> | false>, initialValue: T[], options?: UseFirestoreOptions): Ref<T[]>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<DocumentReference<T> | false>, initialValue?: T | undefined, options?: UseFirestoreOptions): Ref<T | undefined | null>;
declare function useFirestore<T extends DocumentData>(maybeDocRef: MaybeRef<Query<T> | false>, initialValue?: T[], options?: UseFirestoreOptions): Ref<T[] | undefined>;

interface UseRTDBOptions {
    autoDispose?: boolean;
}
/**
 * Reactive Firebase Realtime Database binding.
 *
 * @see https://vueuse.org/useRTDB
 */
declare function useRTDB<T = any>(docRef: DatabaseReference, options?: UseRTDBOptions): Ref<T | undefined>;

export { FirebaseDocRef, UseFirebaseAuthOptions, UseFirestoreOptions, UseRTDBOptions, useAuth, useFirestore, useRTDB };
