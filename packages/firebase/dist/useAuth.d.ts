import * as _firebase_auth from '@firebase/auth';
import { ComputedRef, Ref } from 'vue-demi';
import { User, Auth } from 'firebase/auth';

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

export { UseFirebaseAuthOptions, useAuth };
