import { Meteor } from "meteor/meteor";

const Slack = {};

if (Meteor.isClient) {
  Slack.requestCredential = require("./slack_client.js").requestCredential;
} else {
  Slack.retrieveCredential = require("./slack_server.js").retrieveCredential;
}

export { Slack };
