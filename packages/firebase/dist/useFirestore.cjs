'use strict';

var vueDemi = require('vue-demi');
var shared = require('@vueuse/shared');
var firestore = require('firebase/firestore');

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
  const refOfDocRef = vueDemi.isRef(maybeDocRef) ? maybeDocRef : vueDemi.computed(() => maybeDocRef);
  let close = () => {
  };
  const data = vueDemi.ref(initialValue);
  vueDemi.watch(refOfDocRef, (docRef) => {
    close();
    if (!refOfDocRef.value) {
      data.value = initialValue;
    } else if (isDocumentReference(refOfDocRef.value)) {
      close = firestore.onSnapshot(docRef, (snapshot) => {
        data.value = getData(snapshot) || null;
      }, errorHandler);
    } else {
      close = firestore.onSnapshot(docRef, (snapshot) => {
        data.value = snapshot.docs.map(getData).filter(shared.isDef);
      }, errorHandler);
    }
  }, { immediate: true });
  if (autoDispose) {
    shared.tryOnScopeDispose(() => {
      close();
    });
  }
  return data;
}

exports.useFirestore = useFirestore;
