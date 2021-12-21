// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44333/api/', /* this should end with slash */
  carouselInterval: 6000,
  googleAuthSettings: {
    "clientId": "71954085878-1sgkrm6ce4bhghfi6tsrd9qevcmkij7n.apps.googleusercontent.com"
  },
  facebookAuthSettings: {
    "appId": "235134741781480"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
