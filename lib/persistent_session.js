// === INITIALIZE KEY TRACKING ===
Session.psKeys = {};
Session.psKeyList = [];
Session.psaKeys = {};
Session.psaKeyList = [];

// initialize default method setting
var default_method = 'persistent'; // valid options: 'temporary', 'persistent', 'authenticated'
if (Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.persistent_session) {
  default_method = Meteor.settings.public.persistent_session.default_method;
}

// === LOCAL STORAGE INTERACTION ===
Session.store = function _psStore(type, key, value) {

  this.psKeyList  = amplify.store('__PSKEYS__') || [];
  this.psaKeyList = amplify.store('__PSAKEYS__')|| [];
  
  if (type == 'get') {
    return amplify.store(key);
    
  } else {

    this.psKeyList  = _.without(this.psKeyList, key);
    this.psaKeyList = _.without(this.psaKeyList, key);
    delete this.psKeys[key];
    delete this.psaKeys[key];

    switch (type) {

      case 'temporary':
        value = null;
        break;

      case 'persistent':
        this.psKeys[key] = EJSON.stringify(value);
        this.psKeyList = _.union(this.psKeyList, [key]);
        break;

      case 'authenticated':
        this.psaKeys[key] = EJSON.stringify(value);
        this.psaKeyList = _.union(this.psaKeyList, [key]);
        break;
    }

    amplify.store('__PSKEYS__', this.psKeyList);
    amplify.store('__PSAKEYS__', this.psaKeyList);
    amplify.store(key, value);
  }

}

// === GET ===
Session.old_get = Session.get;
Session.get = function _psGet(key) {
  var val = this.old_get(key);
  var psVal = Session.store('get', key);
  return psVal || val;
};

// === SET ===
// defaults to a persistent, non-authenticated variable
Session.old_set = Session.set;
Session.set = function _psSet(key, value, persist, auth) {
  this.old_set(key, value);
  var type = 'temporary';
  if (persist || (persist===undefined && (default_method=='persistent' || default_method=='authenticated'))) {
    if (auth || (auth==undefined && default_method=='authenticated') {
      type = 'authenticated';
    } else {
      type = 'persistent';
    }
  }
  Session.store(type, key, value);
};

// === SET TEMPORARY ===
// alias to Session.set(); sets a non-persistent variable
Session.setTemp = function _psSetTemp(key, value) {
  this.set(key, value, false, false);
};

// === SET PERSISTENT ===
// alias to Session.set(); sets a persistent variable
Session.setPersistent = function _psSetPersistent(key, value) {
  this.set(key, value, true, false);
}

// === SET AUTHENTICATED ===
// alias to Session.set(); sets a persistent variable that will be removed on logout
Session.setAuth = function _psSetAuth(key, value) {
  this.set(key, value, true, true);
}

// === MAKE TEMP / PERSISTENT / AUTH ===
// change the type of session var
Session.makeTemp = function _psMakeTemp(key) {
  this.store('temporary', key);
}
Session.makePersistent = function _psMakePersistent(key) {
  var val = this.get(key);
  this.store('persistent', key, val);
}
Session.makeAuth = function _psMakeAuth(key) {
  var val = this.get(key);
  this.store('authenticated', key, val);
}

// === CLEAR ===
Session.clear = function _psClear(key, list) {

  // remove all keys with Session.clear();
  if (key === undefined) {
    if (list===undefined) { list = this.keys; }
    for (var k in list) {
      this.set(k, undefined, false, false);
    }

  // remove a single key with Session.clear('key');
  } else {
    this.set(key, undefined, false, false);
  }

};

// === CLEAR TEMP ===
// clears all the temporary keys
Session.clearTemp = function _psClearTemp() {
  this.clear(undefined, _.keys(_.omit(this.keys, this.psKeys, this.psaKeys)));
}

// === CLEAR PERSISTENT ===
// clears all persistent keys
Session.clearPersistent = function _psClearPersistent() {
  this.clear(undefined, this.psKeys);
}

// === CLEAR AUTH ===
// clears all authenticated keys
Session.clearAuth = function _psClearAuth() {
  this.clear(undefined, this.psaKeys);
}

// === SET DEFAULT ===
Session.old_setDefault = Session.setDefault;
Session.setDefault = function _psSetDefault(key, value, persist, auth) {
  if ( this.get(key) === undefined) {
    this.set(key, value, persist, auth);
  }
}

// === SET DEFAULT TEMP ===
Session.setDefaultTemp = function _psSetDefaultTemp(key, value) {
  this.setDefault(key, value, false, false);
}

// === SET DEFAULT PERSISTENT ===
Session.setDefaultPersistent = function _psSetDefaultPersistent(key, value) {
  this.setDefault(key, value, true, false);
}

// === SET DEFAULT AUTH ===
Session.setDefaultAuth = function _psSetDefaultAuth(key, value) {
  this.setDefault(key, value, true, true);
}


// === HOUSEKEEPING ===
if (Meteor.isClient) {

  // --- on startup, load persistent data back into meteor session ---
  Meteor.startup(function(){
    var val;
    
    // persistent data
    var psList = amplify.store('__PSKEYS__');
    if ( typeof psList == "object" && psList.length!==undefined ) {
      for (var i=0; i<psList.length; i++) {
        if (!_.has(Session.keys, psList[i])) {
          val = Session.get(psList[i]);
          Session.set(psList[i], val, true, false);
        }
      }
    }

    // authenticated data
    var psaList = amplify.store('__PSAKEYS__');
    if ( typeof psaList == "object" && psaList.length!==undefined ) {
      for (var i=0; i<psaList.length; i++) {
        if (!_.has(Session.keys, psaList[i])) {
          val = Session.get(psaList[i]);
          Session.setAuth(psaList[i], val, true, true);
        }
      }
    }

  });

  // --- clear authenticated data on logout ---
  var _logout = Meteor.logout;
  Meteor.logout = function _psLogout() {
    Session.clearAuth();
    _logout.apply(Meteor, arguments);
  }

}
