Package.describe({
  name: "u2622:persistent-session",
  version: "0.3.5",
  summary: "Persistently store Session data on the client",
  git: "https://github.com/okgrow/meteor-persistent-session"
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.1'),
  api.use(['jquery', 'amplify', 'session', 'underscore', 'ejson']);
  // If `accounts-base` is loaded, we have to make sure that this package is
  // loaded after `accounts-base` is, so we specify `weak: true` here
  api.use('accounts-base', { weak: true });
  api.export("PersistentSession");
  api.addFiles('lib/persistent_session.js', 'client');
});
