var keyPrefix = "_PS_";

var clear_on_signout = true;
if (Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.persistent_session) {
  clear_on_signout = Meteor.settings.public.persistent_session.clear_on_signout;
}

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

Session.old_setDefault = Session.setDefault;
Session.setDefault = function _psSetDefault(key, value) {
  if (!Session.get(key)) {
    Session.set(key, value);
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

Session.old_equals = Session.equals;
Session.equals = function _psEquals(key, value) {
  return Session.old_equals(keyPrefix + key, value);
};

Session.clear = function _psClear() {
  var self = this;
  _.each(self.keys, function(value, key) {
    if (key.lastIndexOf(keyPrefix, 0) === 0) {
      self.set(key, undefined);
    }
  });
};

if (Meteor.isClient) {
  if (clear_on_signout) {
    var _logout = Meteor.logout;
    Meteor.logout = function _psLogout() {
      Session.clear();
      _logout.apply(Meteor, arguments);
    }
  }
}
