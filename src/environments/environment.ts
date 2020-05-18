// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.




/*
  e.g. FabricatorService:
  import { environment } from '../../../environments/environment';
  environment['admin-user-token']

  GET ADMIN USER TOKEN 2020-05-12-0820AM good for 24 hours
  curl --location --request GET 'https://services.hbsp.harvard.edu/api/admin/users/authorization-status/PENDING?size=115' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJjdHkiO ... JUuEQ'

{{baseurl}}/oauth/token
*/

// 20200512-0820am
// 20200514-0728am
// 20200515-0749am
// 20200516-0835am
// 20200517-0919am
// 20200518-1346
// GET ADMIN USER TOKEN!
// tslint:disable-next-line:max-line-length
const hbspAdminUserTokenTwentyFourHours =  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJjaWQiOiI0YjM3N2EyYS1mMTc5LTQxMGUtOTM4Yy0yNzM3MGUwYTJhMTAiLCJraWQiOiJkYWM2N2I2MS1iZjE2LTRhYzYtOGU2Mi0yZmQ4MjVmZjQ5MmYifQ.eW83mEvXLwn2ekSH7WdOneiD8j0UHS6ev9qvi0Wy9S6N-d7vREkHWKdgVnPb1up0GqIB2HinETGoAieMKaZTOSnDJFmWu55dvbLl9th_qPHCwk3FF1zJ-jgfvks-o1Hu9vrejbCHw4gQ5NMw-368pAVx8AJfNiJ8GmFp3izYKc4fD8_nI9itUuOqQDa0stKRadKys28-fbhgAk0NojOZCdLrBi-YlcT2WwCzCfqorW5_f2d3LlGWIyKfC2c8XCtiKblXeKs6XMyX7DcgflwxV0XbFQHU_V6M_EWqOTWx-x31Fmo-luGzYo8c08JzSs5CAb9WgbqLORvzSj0zkpV4ow.gzRGPyCumAnL1_FC.IaqY52Un2SmmeKiPQRfQe5iaOknuS_u5bPaSKEGrAoAZ03ni1d2lNCw26kncVF-aRUErimThifYNzFM7sYkPedLYaPgZdHnU26lSO6M6gdPxK0wtnRw_cflBgz0c3pW5o8U9yaadnHyZI4TzRhERQxBFS-lZemKJkL_MANr6cGgp0ZQa9IildQm1W3dbEjejXoAnw1IP_vXFg8G3Nw2AmhcyrPOEqajwc_YRp2lfmuhfUdqXwTZkQIOpfbRw5WSOIReYuambwoBPj3Y8gjhIgs7XepTrzshSQr7tRlDwgGxxjeRUIr2g3p95uDymREYokLq6uxElxHvKc8rQBHDtGImOKIMcdkuKnBAXGgYRY2Dzayf6lAWMjAixvr4h6sF9gNUYozTPtzgJ2clBsGkkf-cJNNJYjhkw6OwrI2uGPGpAAI0KTAsv4y-lnmP7bWnC9R1HsbN6eKos2wDCYF9oR-FkzfvAfqs_Lt9MqpdU4pBI5MAYUvkXU7BQur52C0K89NZYZy6QNe-ixv2ugYjzam9sLSi1n0j4kW-5Mw6_9pF3bgz-E-vK9j_X0qWyTpD6UCZ2YKyudo3bV8E-XXRr2C0K2OtmaQrpi-GCy9ITUhk7Eu2s_tbpM5cgUCzukPO0rhsKERHjU3EiFtiRXXhzAkudpvqyBufFNg5ENvfcLm2fWyUVv8JsmjRl53XuxHjajZncWNGanWEhPvqPWl-EuZdi9GhNR6WKubTS0DCuaNDV8vi-wun4oxin_wiKKnCFU31C9zmtWDWLBRU4a4SFR6ODvXhHEykzfNZXyXg0mcFwUIsOViENHGWJ4oobb9XqaNMuwwK_OSmoHO5_0w.b88TSSew1HHMMMZgZ2-zfA';

export const environment = {
  production: false,
  'nytimes-api-key-top-stories': 'STMA4A1DcdjKxY68rwVzYFAlC2EficSF',
  'hbsp-admin-user-token': hbspAdminUserTokenTwentyFourHours,
};

/* NYTIMES API INFO
TOP STORIES API

App Name
email-fabricator

App ID
5a9e270b-2008-47b4-8fe9-c16ca3f30ee0

API Key
STMA4A1DcdjKxY68rwVzYFAlC2EficSF

API Secret
JilsH7FNtCHQUyb3

 */


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
