'use strict';

var vueDemi = require('vue-demi');

function useAuth(auth) {
  const user = vueDemi.ref(auth.currentUser);
  const isAuthenticated = vueDemi.computed(() => !!user.value);
  auth.onIdTokenChanged((authUser) => user.value = authUser);
  return {
    isAuthenticated,
    user
  };
}

exports.useAuth = useAuth;
