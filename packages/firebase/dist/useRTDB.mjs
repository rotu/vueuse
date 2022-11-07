import { onValue } from 'firebase/database';
import { ref } from 'vue-demi';
import { tryOnScopeDispose } from '@vueuse/shared';

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

export { useRTDB };
