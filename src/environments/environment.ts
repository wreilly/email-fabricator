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
// GET ADMIN USER TOKEN!
// tslint:disable-next-line:max-line-length
const adminUserTokenTwentyFourHours =  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJjaWQiOiI0YjM3N2EyYS1mMTc5LTQxMGUtOTM4Yy0yNzM3MGUwYTJhMTAiLCJraWQiOiJkYWM2N2I2MS1iZjE2LTRhYzYtOGU2Mi0yZmQ4MjVmZjQ5MmYifQ.JOVTlGwunDWxqaGnX9Dkn3N2efHt5aEZnxVonMDeqt7qAiuqb8nfxTagdtDWURkiA-8c9DKLsiqN9IvLAWirS69e47h0KrPMvI1JZpQN1thSFzExdbuyoaXqv83yDtrcKCry_640sNxj_yek98GgqbrVR3ST8f7AvhP_IGzSWUuRMcJCqMC5mXHmtRi-dK9geARYAxJuhM0RV0c9zAEmoIv-EHb9wxwmQqt7FCN8Q-j82gYoAGyv8Tpks4cHsP11qekgwDBvA-QIqOza_Gwf6G4iWfiZPhpWYP5QiePXcKbWsH4tfezn_DEA39KHThs4Z1fvuGGOHGJiL-0duVmiaA.SqvYBwMJ4HsQKfqt.PzSj4LvqL-O_PPPMr2gnLQ6rmw4UQY0uI4PAL3PU9uvhvv0uwQbyumMYU6KQdqpNm53CY95Y0SSdE4rtHd37vqiNO6OE91lMDI1Mc0_5w726PVwIL8FpimRiTxIr63GJTk7dqpVa9yMVfvye6So9LJ0Q5ZAZV5f6r_0hyf_2fIWbIe2mdkM49WT_FZVaVZe4KHDqeLH9W2MwPHv-AIod9jdWZHezTeiThiTeh_g1DV9X9ua-PF11v3TGMCbEidESbUA6QygDpwbXxUlaHzshson1crHF8hP_s8_R0zJFDy41O3OPGD1du3ws_l8CL7705OYlJeDeMIzEtDIFB8GCCGRUxAPAfuzqa_yc03syv4Ba76lpMdAg3QEBtDx6X6lZwMUjSIeqTv6YTuZT67nCDtvpKWS-AWbIrHBiN8tiDC7diiGCtpirDqDenevy_0GLi0okSWt3UHsDXErCnJcdkZhuaqMmHcM7oOy1uWG2w8zsyVULADf4zUO8Dvvpudr_Y-OsY5hbYXhGrJcXzJHAfU7t86EsvCJx_hx5cgOMnf8lG1_hoy27w1E4tU0qukh95QDpybJ36FOEtzSll7uFgAObApczmdhAUCdiI1ymNmcruIKHh7adDLGDMPlP8mHigk8PH-imiHPW-tfGvgiVNr9ck9cefp6PvlE2VyJQDPfA94BzMuETMSTFjVin7H9_rIXc7TirpSnLaAqpNz3P07yJ21-X6-VIgFMF0djD3gFRy9FyaQC0xaT9KEK0JG0wMPt3k7ChIuQ_88Skvj_nDRfmEYpMFMTkRgTLsu-M0hxLv-FSyH3q9s46itGiIhp1kzzW8Qt2olRCLoy3AQ.Pu2ovRLHAJ2dzr_WR-fULA';

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
