import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Accounts.oauth.registerService("slack");

if (Meteor.isClient) {
  const { Slack } = require("./slack_client");
  Meteor.loginWithSlack = function (options, callback) {
    // support a callback without options
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    const credentialRequestCompleteCallback =
      Accounts.oauth.credentialRequestCompleteHandler(callback);
    Slack.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately
    // be used from the client (if transmitted over ssl or on
    // localhost). http://www.meetup.com/meetup_api/auth/#oauth2implicit
    forLoggedInUser: ["services.slack"],
    forOtherUsers: ["services.slack.id"],
  });
}
