import { computed } from 'vue-demi';
import { resolveUnref } from '@vueuse/shared';
import jwt_decode from 'jwt-decode';

function useJwt(encodedJwt, options = {}) {
  const {
    onError,
    fallbackValue = null
  } = options;
  const decodeWithFallback = (encodedJwt2, options2) => {
    try {
      return jwt_decode(encodedJwt2, options2);
    } catch (err) {
      onError == null ? void 0 : onError(err);
      return fallbackValue;
    }
  };
  const header = computed(() => decodeWithFallback(resolveUnref(encodedJwt), { header: true }));
  const payload = computed(() => decodeWithFallback(resolveUnref(encodedJwt)));
  return {
    header,
    payload
  };
}

export { useJwt };
