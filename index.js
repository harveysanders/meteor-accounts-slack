import { Meteor } from "meteor/meteor";

if (Meteor.isClient) {
  module.exports.Slack = require("./slack_client.js").Slack;
} else {
  module.exports.Slack = require("./slack_server.js").Slack;
}
