'use strict';

var database = require('firebase/database');
var vueDemi = require('vue-demi');
var shared = require('@vueuse/shared');

function useRTDB(docRef, options = {}) {
  const {
    autoDispose = true
  } = options;
  const data = vueDemi.ref(void 0);
  function update(snapshot) {
    data.value = snapshot.val();
  }
  const off = database.onValue(docRef, update);
  if (autoDispose)
    shared.tryOnScopeDispose(() => off());
  return data;
}

exports.useRTDB = useRTDB;
