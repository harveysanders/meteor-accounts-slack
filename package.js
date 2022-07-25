Package.describe({
  summary: "Login service for Slack accounts",
  version: "0.0.1",
  git: "https://github.com/harveysanders/meteor-accounts-slack",
  name: "harveysanders:accounts-slack",
});

Package.onUse(function (api) {
  api.versionsFrom("2.7.3");
  api.use("ecmascript");
  api.mainModule("index.js");
  api.use("oauth2", ["client", "server"]);
  api.use("oauth", ["client", "server"]);
  // Remove http and use fetch instead
  api.use("http", ["server"]);
  api.use("templating", "client");
  api.use("underscore", "client");
  api.use("random", "client");
  api.use("service-configuration", ["client", "server"]);
  api.use("accounts-base", ["client", "server"]);
  api.use("accounts-oauth", ["client", "server"]);

  api.addFiles("slack_server.js", "server");

  api.addFiles(
    [
      "slack_login_button.css",
      "slack_client.js",
      "slack_configure.html",
      "slack_configure.js",
    ],
    "client"
  );

  api.addFiles("slack.js", ["server", "client"]);
});

Package.onTest(function (api) {
  api.use("ecmascript");
  api.use("tinytest");
  api.use("harveysanders:accounts-slack");
  api.mainModule("slack_client-tests.js");
});
