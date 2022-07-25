import { Meteor } from "meteor/meteor";

export const Slack = {};

if (Meteor.isClient) {
  Slack.requestCredential = require("./slack_client.js").requestCredential;
} else {
  Slack.retrieveCredential = require("./slack_server.js").retrieveCredential;
}
