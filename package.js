Package.describe({
  name: "u2622:persistent-session",
  version: "0.3.4",
  summary: "Persistently store Session data on the client",
  git: "https://github.com/okgrow/meteor-persistent-session"
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.1'),
  api.use(['jquery', 'amplify', 'tracker', 'reactive-dict', 'session', 'underscore', 'ejson']);
  // If `accounts-base` is loaded, we have to make sure that this package is
  // loaded after `accounts-base` is, so we specify `weak: true` here
  api.use('accounts-base', { weak: true });
  api.addFiles('lib/persistent_session.js', 'client');
  api.export('PersistentSession', ['client']);
});

Package.onTest(function (api) {
  api.use("tinytest");
  api.use("amplify");
  api.use("reactive-dict"); // we only need this exposed for testing
  api.use("u2622:persistent-session");

  // expose for derping around in console
  api.export('PersistentSession', ['client']);
  api.export('ReactiveDict', ['client']);

  api.addFiles("tests/client/persistent_session.js", "client");
});
