// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://evening-mesa-93885.herokuapp.com',
  apiUrl: 'http://35.193.196.62', //GCP Server
  // apiUrl: 'http://localhost:8000', 
  //apiUrl: 'http://ec2-3-17-5-56.us-east-2.compute.amazonaws.com',
  // oauth: {
  //   clientId: '2', // Heroku and Localhost API
  //   clientSecret: 'kwuNG08lA3y9zhQFD8rgytWvL7GJyij1DASJ25FR'
  // }
  oauth: {
    clientId: '2', // GCP Server
    clientSecret: 'tDc7hEvRly7RgpBOlGT6OtNne1no98FP39NaZpkC'
    // clientId: '1', //localhost
    // clientSecret: 'ZZQcopDEIHYzoxr3FtcHZ1IhEJwEnY7aPrQshgmd'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
