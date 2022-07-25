import { ServiceConfiguration } from "meteor/service-configuration";

export const Slack = {
  retrieveCredential(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
  },
};

OAuth.registerService("slack", 2, null, function (query) {
  const tokens = getTokens(query);
  const identity = getIdentity(tokens.access_token);

  return {
    serviceData: {
      id: identity.user_id,
      accessToken: tokens.access_token,
      profile: {
        name: identity.user,
        url: identity.url,
        team: identity.team,
        user_id: identity.user_id,
        team_id: identity.team_id,
      },
      tokens: tokens,
    },
    options: {
      profile: {
        name: identity.user,
        url: identity.url,
        team: identity.team,
        user_id: identity.user_id,
        team_id: identity.team_id,
      },
      slack: {
        tokens: tokens,
        identity: identity,
      },
    },
  };
});

function getTokens(query) {
  const config = ServiceConfiguration.configurations.findOne({
    service: "slack",
  });
  if (!config) throw new ServiceConfiguration.ConfigError();

  let response;
  try {
    response = HTTP.post("https://slack.com/api/oauth.access", {
      headers: {
        Accept: "application/json",
      },
      params: {
        code: query.code,
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        redirect_uri: OAuth._redirectUri("slack", config),
        state: query.state,
      },
    });
  } catch (err) {
    throw _.extend(
      new Error(
        "Failed to complete OAuth handshake with Slack. " + err.message
      ),
      { response: err.response }
    );
  }

  if (!response.data.ok) {
    // if the http response was a json object with an error attribute
    throw new Error(
      "Failed to complete OAuth handshake with Slack. " + response.data.error
    );
  } else {
    return response.data;
  }
}

function getIdentity(accessToken) {
  try {
    const response = HTTP.get("https://slack.com/api/auth.test", {
      params: { token: accessToken },
    });

    return response.data.ok && response.data;
  } catch (err) {
    throw _.extend(
      new Error("Failed to fetch identity from Slack. " + err.message),
      { response: err.response }
    );
  }
}
