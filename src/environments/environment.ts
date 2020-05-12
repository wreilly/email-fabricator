// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



/*
curl --location -DING?size=115' \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer [TOKEN]'
*/

// 20200512-0820am
// tslint:disable-next-line:max-line-length
const adminUserTokenTwentyFourHours =  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJjaWQiOiI0YjM3N2EyYS1mMTc5LTQxMGUtOTM4Yy0yNzM3MGUwYTJhMTAiLCJraWQiOiJkYWM2N2I2MS1iZjE2LTRhYzYtOGU2Mi0yZmQ4MjVmZjQ5MmYifQ.LvbEDvB3s2gveOzzSXq2xXlE9LASljg0Gmn06lZguzMk-u8YqcnvDp2FF1rglmtHIDBWy5OujXkq5mdI_NWDmleP-i0J_yuVWS9xOzMkXPSMRfwGGIVs1EBAP7NM3W0rQhG1HnAOqRe07yxzA8DF8PUPOfinNQvtnfAX4Yn7EXcljkz0nl8rJvdTrTMKvf4wroVtccSWd6Uv9N6xMPwVwlarK3WlPXxOZ-KFQh_rfblnVzfkyGeHMA_hRPMQgEkgu2DYXk9qhXe_f0EL0UuXNqfUapsUu3Za29PW9a29_bfnbV3dOjG-yadalQstgvcIGJTxmTb-CyID8e49ydl_hg.DtunoiQH5ocVxyXW.mAbL6n365Ka6xXRNBIFZM2GstY7FDqb2XoWz7fT1telIfglapQiRBWeA3i3zuIlgm4gIcfn-uY0idcb4C26mNd3OGKDKjRXjewdkotogwSccVnP3Jm7QC5PQ68q_Sgd1KJ304myO2-YOueSYXyvDoSmVOLlYza-m8YzqQglsJz7i8lq20fd-MnRDgDzEOWixokGus2-7sipbKcaq1-BXYKyELjqj2hupBjsFO5pCsV3V00EoX9Mh-o0yyLYwSBxORBkiYdoqv5UVto8ujpaqMX7B7QFA-YaSSUpLvGN4ToagmpGIg3-mNVvu16vOaqL7v0VHtRvwZkU2DmBH1rjk4tJePkq5QMwdV8tZrHAd4AcHO_ukXkCxiY5vP9C6Jjk77V4UMnIN7HyTAZX2PdGbh_LWw5poLszlWum7atweIdZ95p-4PbRA0Z6rLodnIujE63UBTWjJ3ZiGqzAH47ve-nyL_JxgJWzLS-GjCQQQm7duelNzODsP6Rask6a4ieEFVhVhMRnx13lOfXaQ-tPQ8TFnJRoQMkO1kNwM3jeO4-pa-wOxm_QafuFJC4EvHih97GTlACuGscr1a4AbWfsTsr4n5U4wMXWPa5OZYAy58cAhigs_sTLg5QnhqFkhtL2qa0FLpgBDoUeX5RZpJuxhMqAcH8mVOC8o3B5cFksqpQQ0DVH0BtWjtY1P6s5_q4fnKECltuIwn9Zxx-bJiWHbwuLqWk_1m2gsdnldD7x7MGvU9j90EZHBaVkVZSYBd4B_MIxTHNdquMflnu9MO8Ofq0qye2WNtA1TKAIOmgPJMgJonrLBobT9yeWFRM1dtzsmY4GY7ZL_Y_IKHE1g3A.ZfB-cg0TOVMc_cm20JUuEQ';

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
