import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

Template.configureLoginServiceDialogForSlack.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForSlack.fields = function () {
  return [
    { property: "clientId", label: "Client ID" },
    { property: "secret", label: "Client Secret" },
  ];
};
