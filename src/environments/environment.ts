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
*/

// 20200512-0820am
// tslint:disable-next-line:max-line-length
const adminUserTokenTwentyFourHours =  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJjaWQiOiI0YjM3N2EyYS1mMTc5LTQxMGUtOTM4Yy0yNzM3MGUwYTJhMTAiLCJraWQiOiJkYWM2N2I2MS1iZjE2LTRhYzYtOGU2Mi0yZmQ4MjVmZjQ5MmYifQ.AVQro4W0lL2y2BG_actBSOQ--UGzQ8WOoQRYPe4P-YeLA6mRow9Lu44FG_7X3Ufo3zsUy-dQgUoOFERoLOxj1YbUrT7Z6xsEcCvLR6Jw6i442s-6H_QGNpoiFZ0utruR0qT4oSMp6G8Lx6X93hlCVzTKPSodf8zvLH8lPs87mqOphN3te5Nqks9Kv4_W30o7YlZ4-wZjEirUQv9-TPte4OYm5fVBnpfaHOg_DdfmjXPmOptqphkfwwNxK_UB8deRBKo2X5HtrMIGcj34ealV3HBVEH7IxD_8d48IBdOfXA3HmFuEhkUdRHt30Bt_Unx9n_zzjdtF6jNgrnit3XboRQ.hoqyhpY5o9FvsUaj.YKTnD34VtHyfFjkRABmWWJYRg8Gw408q8qWNbSFRJL9JlS7zWnPH7J9mO_LwRpgmsPW9-cF1mqK3GwnJW3G2iLaynN1rUTAwbUPgcqSd8rDn7poUYiF__G642oqG1PBy3GI8JqLPY5gpi2yaDnIOjnAx0mvncKtYOAEmqrmyuTWIuEG0hjCvP-4pYELSVZzlnwqRSuzGcx1TCwdw5L5gEQoEjTndIPiAfT9O8CEdKk_EH22Gi4e1MHDDnw4nLeQGm0AD01demJcHT-C3lnBRJSIH5zHRw1tVh8ZTdIxGxe_rqDOvhp94J9u2xs_g4KQXLtu6V0aAvpHjk8u5hc7vOcmZIzExP3HZdQd0229TrhuAdi51n-nedImX3AfbpO40wZUQDb9YIsA4MixRDBptRWW58cRkJqXvGaFh5_1QBwRN35RMYhspKWxvwTXoA5Gww5YoTLCq1f6bXrVwtoIsg9vw2zJvrWkRozWRaeXxTyab2c5Pj_aPlslI7Dopdxy6lV6hxdjg1I4kA16-yztpDBD6JwnKnaRz-eaOzqLQTskq1HpV66xXQcIrUryeURiqAJggJXxfJuhJRaauP_eWHVnB8H-13ix3_EHDqfB9WcYGtZVg4DNLTCwQEPSm3G_9SoOtm3uLtNDlEIFbT4_GkjqAItyQZqbAFS5-x5CAPuLCVS0S4QveUjT3HOee7voYH8HqVB57mcqdFTDRCnkgzICUBpDEK93qVWuziy4jHIz50MNJPCv6C6E0GZqtJ8q0dkKDki7XKkYbLVeq2K80W0EicaM9Kc-rYdkr5FgZD_nEuDEOUeUbbRV9vLIdHAk2yeiTKEML2e9quLk2Jg.K7-kohFPYUiCKscSRGzsJg';

export const environment = {
  production: false,
  'nytimes-api-key-top-stories': 'STMA4A1DcdjKxY68rwVzYFAlC2EficSF',
  'admin-user-token': adminUserTokenTwentyFourHours,
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
