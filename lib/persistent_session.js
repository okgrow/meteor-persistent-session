var keyPrefix = "_PS_";

Session.old_set = Session.set;
Session.set = function _psSet(key, value, persist) {
  if (persist === undefined) {
    persist = true;
  }
  if (key.lastIndexOf(keyPrefix, 0) !== 0) {
    key = keyPrefix + key;
  }
  Session.old_set(key, value);
  if (persist) {
    if (value === undefined) {
      value = null; // we can't pass (key, undefined) to amplify.store() to unset a value
    }
    amplify.store(key, value);
  }
};

Session.setTemporary = function _psSetTemp(key, value) {
  this.set(key, value, false);
};

Session.old_get = Session.get;
Session.get = function _psGet(key) {
  key = keyPrefix + key;
  Session.old_get(key); // Required for reactivity
  var val = amplify.store(key);
  if (val === undefined) {
    return Session.old_get(key);
  }
  return val;
};
