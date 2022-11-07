import { ref, computed } from 'vue-demi';

function useAuth(auth) {
  const user = ref(auth.currentUser);
  const isAuthenticated = computed(() => !!user.value);
  auth.onIdTokenChanged((authUser) => user.value = authUser);
  return {
    isAuthenticated,
    user
  };
}

export { useAuth };
