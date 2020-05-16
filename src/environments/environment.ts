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
// GET ADMIN USER TOKEN!
// tslint:disable-next-line:max-line-length
const hbspAdminUserTokenTwentyFourHours =  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJjaWQiOiI0YjM3N2EyYS1mMTc5LTQxMGUtOTM4Yy0yNzM3MGUwYTJhMTAiLCJraWQiOiJkYWM2N2I2MS1iZjE2LTRhYzYtOGU2Mi0yZmQ4MjVmZjQ5MmYifQ.KiYsr_aJvK7jgaPz-RI4tZc1d8PHVF9lbNngxrMUoN-KeF4Exn-HGuHe4iK64Zu0BsBAR9uBr1u30Vw4auyH-tUngbV_S-rwyVKyTsGqUIMOsP0h_BcN9i_TY9g1dXLpixBFDOYSfdiRRaqjBrHiIjg7ftniKJg06-zWDGdes0-E3cw8k4A3Ze4urwmJxosqj4wV8g3JuxSFqtZ-P-2I2yVna-iLmVVOP08P2ocPkOnyABCnGjnEi0q6QaJBJqlNWPdtX7E0Kdgsv9erwYabcudegbi-Y_2EXxVZISASsA-s9WLjYdvpT2EUBhCYBElHLntPdYYODoxXkDfSLieqTw.UGVweCDRfXgEyqf3.xRz06QkewJ-GMrURuUCShrEal2JulaUkN0EeA7BHpIBiYqJiD_3bMTtIKxvc4D-F0bkAkGu8Klfp67xGe_VxhjylCyP-_iWHcT7-LnfEH5bNIE3hE3jfp-RZD070N6lCgjiBL2YEqAyewZefb1S-qEQ_-Km-_VvnbDVIAW_L3jEqzURDNE2wjMxjUB8OTpDCYbQOTFOP_G_rI6CGLKLW0NUt4c0PnvJxPlJzMqmzDLVaNvm2ITMOPbcvfn-BXsNUcS4zQO3JvGzKcotxRFkAQTtodPvE2OfnG3mP_UdHztlZhvE2zAkP65YJt-VNPAfGgSiqb53pp8OwN51v1aaburGqwwbi4SXLsXzx0xztZUWLAeUvvh7sF96wQEueitymDu4oloL0pwLKo_r5LGRcaKgqLPag-nXrDR4FTJ36D6Zw5COCGP-GDN2G-eaMraOJfhIjLiLgbBL7C2nJA_rjgoV2sMsCzLWFiojqVA3xMF_HwHxIy-g3E4Gfe-E1Lpc_GXfvuGi713dk5gNqBRKWEXE_g7yrk3HOWUOukzZ14OMTzwxXBabAwA6fpsQ9TAJA7VLw2hTcugCwdgifMaUYTiQ7OviAAWqQ8avW1bg-ouVdVA2EbTE18IA3wL8qkh6u8cZwIF2M5v6vLUpwU7bAyxCwNnUxEd_mb0-c5zqiJo3vMc0IIKBXzErKDaT9j1iqkmSDrO1gWFgoi03iqKjmrjKvK1RGuGb9UQAQsybNPagMCFJmImkCQZNu6hvLZ1FXqgDmhJ4mT1-SMSGXGi2joxQgvpGGIlHelsLVelNNevpAu05OsMEj6KB8iWhPCH1P-Vy7Y1n17zryQplRgg.DB0ymp-WaInjp4Lfosb8_Q';

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
