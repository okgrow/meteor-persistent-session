Tinytest.add("defaults to temporary", function(test) {
  var TestSession = new PersistentSession(Random.id());

  test.equal('temporary', TestSession.default_method);
});

// this isnt testing anything yet...
Tinytest.add("alternate mode", function(test) {
  var TestSession = new PersistentSession(Random.id());

  // TODO: This should probably be a reactive var, just for sanity now
  TestSession.default_method = 'authenticated';
  test.equal('authenticated', TestSession.default_method);

  // reset to default
  TestSession.default_method = 'temporary';
  test.equal('temporary', TestSession.default_method);
});

Tinytest.add("clear all keys", function(test) {
  var TestSession = new PersistentSession(Random.id());

  test.equal(_.keys(TestSession._dict.keys).length, 0);

  TestSession.set('foobar', 'woo');
  var result = TestSession.get('foobar');
  test.equal('woo', result);

  test.equal(_.keys(TestSession._dict.keys).length, 1);

  TestSession.clear();

  test.equal(_.keys(TestSession._dict.keys).length, 0);

  var result = TestSession.get('foobar');
  test.equal(undefined, result);
});

Tinytest.add("clear single key", function(test) {
  var TestSession = new PersistentSession(Random.id());

  test.equal(_.keys(TestSession._dict.keys).length, 0);

  TestSession.set('foobar', 'woo');
  var result = TestSession.get('foobar');
  test.equal('woo', result);

  TestSession.set('barfoo', 'oow');
  var result = TestSession.get('barfoo');
  test.equal('oow', result);

  test.equal(_.keys(TestSession._dict.keys).length, 2);

  TestSession.clear('foobar');

  test.equal(_.keys(TestSession._dict.keys).length, 1);

  var result = TestSession.get('foobar');
  test.equal(undefined, result);

  var result = TestSession.get('barfoo');
  test.equal('oow', result);
});

Tinytest.add("clear multiple keys", function(test) {
  var TestSession = new PersistentSession(Random.id());

  test.equal(_.keys(TestSession._dict.keys).length, 0);

  TestSession.set('foobar', 'woo');
  var result = TestSession.get('foobar');
  test.equal('woo', result);

  TestSession.set('barfoo', 'oow');
  var result = TestSession.get('barfoo');
  test.equal('oow', result);

  test.equal(_.keys(TestSession._dict.keys).length, 2);

  TestSession.clear(undefined, ['foobar', 'barfoo']);

  test.equal(_.keys(TestSession._dict.keys).length, 0);

  var result = TestSession.get('foobar');
  test.equal(undefined, result);

  var result = TestSession.get('barfoo');
  test.equal(undefined, result);
});


Tinytest.add("gets undefined", function(test) {
  var TestSession = new PersistentSession(Random.id());

  var result = TestSession.get('foobar');
  test.equal(void 0, result);
});

Tinytest.add("sets & gets", function(test) {
  var TestSession = new PersistentSession(Random.id());

  // set never returns anything although it probably should...
  var result = TestSession.set('something', 'amazing');
  test.equal(void 0, result);
  // did it set?
  result = TestSession.get('something');
  test.equal('amazing', result);
});

Tinytest.add("sets defaults", function(test) {
  var TestSession = new PersistentSession(Random.id());

  // set never returns anything although it probably should...
  var result = TestSession.setDefault('something', 'amazing');
  test.equal(void 0, result);

  // did it set?
  result = TestSession.get('something');
  test.equal('amazing', result);
});

Tinytest.add("sets defaults with an object", function(test) {
  var TestSession = new PersistentSession(Random.id());

  // set never returns anything although it probably should...
  var result = TestSession.setDefault({ something: 'amazing', foobar: 'awesome'});
  test.equal(void 0, result);

  // did it set?
  result = TestSession.get('something');
  test.equal('amazing', result);

  result = TestSession.get('foobar');
  test.equal('awesome', result);
});

Tinytest.add("sets defaults but doesn't change if set", function(test) {
  var TestSession = new PersistentSession(Random.id());

  // set never returns anything although it probably should...
  TestSession.set('something', 'amazing');

  var result = TestSession.setDefault('something', 'awesome');
  test.equal(void 0, result);

  // did it set?
  result = TestSession.get('something');
  test.equal('amazing', result);
});

Tinytest.add("multiple sessions don't effect each other (never cross the streams)", function(test) {
  var TestSessionFoo = new PersistentSession(Random.id());
  var TestSessionBar = new PersistentSession(Random.id());

  TestSessionFoo.set('something', 'amazing');
  var result = TestSessionFoo.get('something');
  test.equal('amazing', result);

  TestSessionBar.set('something', 'awesome');
  var result = TestSessionBar.get('something');
  test.equal('awesome', result);

  var result = TestSessionFoo.get('something');
  test.equal('amazing', result);
});


Tinytest.add("store gets persisted value", function(test) {
  var dictName = Random.id();
  amplify.store(dictName + 'foo', EJSON.stringify("awesome"));

  var TestSession = new PersistentSession(dictName);
  var result = TestSession.get('foo');
  test.equal('awesome', result);
});


Tinytest.add("setDefaultPersistent sets with an object", function(test) {
  var TestSession = new PersistentSession(Random.id());

  TestSession.setDefaultPersistent({
    'id': 'foobarid',
    'room_id': 'foobarroomid'
  });

  var result = TestSession.get('id');
  test.equal('foobarid', result);

  var result = TestSession.get('room_id');
  test.equal('foobarroomid', result);

});

Tinytest.add("setDefaultPersistent only sets unset keys (gh #32)", function(test) {
  var TestSession = new PersistentSession(Random.id());

  TestSession.set('room_id', 'awesome');
  var result = TestSession.get('room_id');
  test.equal('awesome', result);

  TestSession.setDefaultPersistent({
    'id': 'foobarid',
    'room_id': 'foobarroomid'
  });

  var result = TestSession.get('id');
  test.equal('foobarid', result);

  var result = TestSession.get('room_id');
  test.equal('awesome', result);

});


Tinytest.add("setDefaultPersistent should not override an existing persisted value", function(test) {
  var dictName = Random.id();
  amplify.store(dictName + 'foo', EJSON.stringify("awesome"));

  var TestSession = new PersistentSession(dictName);

  var result = TestSession.get('foo');
  test.equal('awesome', result);

  TestSession.setDefaultPersistent('foo', 'foobarid');

  var result = TestSession.get('foo');
  test.equal('awesome', result);
});


Tinytest.add("equals works", function(test) {
  var dictName = Random.id();
  amplify.store(dictName + 'foo', EJSON.stringify("awesome"));

  var TestSession = new PersistentSession(dictName);

  var result = TestSession.get('foo');
  test.equal('awesome', result);

  var result = TestSession.equals('foo', 'awesome');
  test.equal(true, result);
});

Tinytest.add("all works", function(test) {
  var dictName = Random.id();
  // default the session with some data before creating it
  amplify.store(dictName + 'foo', EJSON.stringify("awesome"));
  // since we set foo, we'll also need it's key to be set to `set` is called
  // and it ends up in the `dict.keys`
  amplify.store('__PSKEYS__' + dictName, ['foo']);

  var TestSession = new PersistentSession(dictName);

  var result = TestSession.get('foo');
  test.equal('awesome', result);

  TestSession.set('bar', 'thing');
  var result = TestSession.get('bar');
  test.equal('thing', result);

  TestSession.setDefaultPersistent('foobar', 'stuff');
  TestSession.setAuth('foobarfoo', 'fact');
  TestSession.setPersistent('barfoobar', 'entity');

  var result = TestSession.all();

  test.equal({
    "foo"       : "awesome",
    "bar"       : "thing",
    "foobar"    : "stuff",
    "foobarfoo" : "fact",
    "barfoobar" : "entity"
  }, result);
});

