// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by sample.js.
import { Slack, bob, user } from "meteor/harveysanders:accounts-slack";

// Write your tests here!
// Here is an example.
Tinytest.add("Slack should be defined", function (test) {
  //   test.equal(bob, "client");
  test.isNotUndefined(Slack, "slack is undefined");
});

Tinytest.add("logan should be the user", function (test) {
  test.equal(user, "logan");
});

Tinytest.add("bob should be client", function (test) {
  test.equal(bob, "client");
});
