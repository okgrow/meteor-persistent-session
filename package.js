Package.describe({
  summary: "Persistently store session data on the client"
});

Package.on_use(function(api) {
  api.use(['jquery', 'amplify', 'session', 'underscore']);
  api.export("PersistentSession");
  api.add_files('lib/persistent_session.js', 'client');
});
