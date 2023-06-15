import { Amplify, Auth } from "aws-amplify";

export default defineNuxtPlugin((nuxtApp) => {
    Amplify.configure({
        Auth: {
          region: "us-east-1",
          identityPoolId: "us-east-1:345b1e99-213e-4f40-bc70-1e013970fd33",
          userPoolId: "us-east-1_uDAIkJd2y",
          userPoolWebClientId: "5ddfkn0v3fsb80keniulioo44i",
          mandatorySignIn: true,
        },
        oauth: {
            domain: 'mikeai-cfzero.auth.us-east-1.amazoncognito.com',
            scope: [
              'email',
              'openid',
            ],
            redirectSignIn: 'https://chatgpt.tcanationals.com/',
            redirectSignOut: 'https://chatgpt.tcanationals.com/',
            clientId: '5ddfkn0v3fsb80keniulioo44i',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
          },
    });

  return {
    provide: {
      auth: Auth,
    },
  };
});
