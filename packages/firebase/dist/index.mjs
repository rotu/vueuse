import { ref, computed, isRef, watch } from 'vue-demi';
import { isDef, tryOnScopeDispose } from '@vueuse/shared';
import { onSnapshot } from 'firebase/firestore';
import { onValue } from 'firebase/database';

function useAuth(auth) {
  const user = ref(auth.currentUser);
  const isAuthenticated = computed(() => !!user.value);
  auth.onIdTokenChanged((authUser) => user.value = authUser);
  return {
    isAuthenticated,
    user
  };
}

function getData(docRef) {
  const data = docRef.data();
  if (data) {
    Object.defineProperty(data, "id", {
      value: docRef.id.toString(),
      writable: false
    });
  }
  return data;
}
function isDocumentReference(docRef) {
  var _a;
  return (((_a = docRef.path) == null ? void 0 : _a.match(/\//g)) || []).length % 2 !== 0;
}
function useFirestore(maybeDocRef, initialValue = void 0, options = {}) {
  const {
    errorHandler = (err) => console.error(err),
    autoDispose = true
  } = options;
  const refOfDocRef = isRef(maybeDocRef) ? maybeDocRef : computed(() => maybeDocRef);
  let close = () => {
  };
  const data = ref(initialValue);
  watch(refOfDocRef, (docRef) => {
    close();
    if (!refOfDocRef.value) {
      data.value = initialValue;
    } else if (isDocumentReference(refOfDocRef.value)) {
      close = onSnapshot(docRef, (snapshot) => {
        data.value = getData(snapshot) || null;
      }, errorHandler);
    } else {
      close = onSnapshot(docRef, (snapshot) => {
        data.value = snapshot.docs.map(getData).filter(isDef);
      }, errorHandler);
    }
  }, { immediate: true });
  if (autoDispose) {
    tryOnScopeDispose(() => {
      close();
    });
  }
  return data;
}

function useRTDB(docRef, options = {}) {
  const {
    autoDispose = true
  } = options;
  const data = ref(void 0);
  function update(snapshot) {
    data.value = snapshot.val();
  }
  const off = onValue(docRef, update);
  if (autoDispose)
    tryOnScopeDispose(() => off());
  return data;
}

export { useAuth, useFirestore, useRTDB };
