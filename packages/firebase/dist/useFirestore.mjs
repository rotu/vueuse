import { isRef, computed, ref, watch } from 'vue-demi';
import { isDef, tryOnScopeDispose } from '@vueuse/shared';
import { onSnapshot } from 'firebase/firestore';

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

export { useFirestore };
