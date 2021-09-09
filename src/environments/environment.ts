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
// 20200519-1832
// 20200606-0658
// 20200618-0944
// >>> GET *ADMIN USER* TOKEN! <<<
/* Postman
https://platform.hbsp.harvard.edu/oauth/token
Header:
Authorization: Basic {{basic-authorization}}
Body:
grant_type: password
username: ____
password: ____
 */
// tslint:disable-next-line:max-line-length
const hbspAdminUserTokenTwentyFourHours =  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJjaWQiOiI0YjM3N2EyYS1mMTc5LTQxMGUtOTM4Yy0yNzM3MGUwYTJhMTAiLCJraWQiOiJkYWM2N2I2MS1iZjE2LTRhYzYtOGU2Mi0yZmQ4MjVmZjQ5MmYifQ.Smm9LuKO0agc51VwxGpdqNr1ffiEUzJrM1_ffbUk7Qt3S8_nFZ84n3LpP5G5PnqvmOPuETylpS__sITIhJG_2GBzSPKT7LQiHomj_n03qxLThYEZgahixXIzZgu52xfY69utBuoCpKVjFfCtMfH3-410UxIc1KBpr6IxJueiHS--fcbOO63JRTm8fvtjnfBl9LLZQvWWVqwU4ppvE1f-CvSkZl7Z15KzhK94Hq49Zj86N6iDe6xdzsqrNzZKDi8s7y2mGpFR23OCUiYRczPVYQQ2uoSNeVS-LjbnAlwGHd1srW3w86DeLbLQsBa8P9IjmCtHsNq-jUvDPaq-ZS5Lmg.c7gKNzWWSoTFkHTq.mrCr4mxgspZtxm5smm0YWJ-V9tmo6MTtksDAxJ8VdRYFsfH-_xzNKixMDoN9Y5SKIHL_eaAglbCdYF21AK5fT-nFpJjXkhCJCcEBQ997by11-NPVJW1LkGC84W204UTsxOvuDzE_hm79V7Svqn9lt0TngJzNgrUum68Gh5yI1EJFp39Iqzjc3yS-R4dGhUa-nkF41_qtp9zfooRNqjAKi4LMJcAGqS0AtwIyOhk1flgy-4LbQTF5cLAF2EO6IkDR_vXPXGeVeGtzC-n_45xNq7FDNfAg8NXEjzElcVQYDdJOLpTtXJpN2uGRprjVn9OfNlsLHmthWIF-IXgcOjeLi0OTbUHZ0O0JtTXjBdsw7FGIZ9skARS1NExUCQPkXWHHhztrHCj8496SLLxAddnmrY6bQ0Ylmz3Zta9VJ7t5f53sFkE95E51RMrdOkBZ5e8gGWSEQzU-lkxrjUkW2XD6OjInCki5NN6172vykpcD_6HbayWMkyogeHlIAiLwEv3VPEEGzKFCUaKF4m9uTZ0hGIROHXqjdQiMhTdjpnwQGPGTS8sk6z3p8Cd4jL45oUEHKq8Vyk2CpJYodB8bb5y1HwvI6j_1ApCrhlRdtN1MJ-w90GuhpUxVv4EV1Z-9_-cCCS5W9WuV9VJNJnvgdqZHSxoaEpsj6LBYj0WWTaORRz1mjFTqA_JoQ1jYckvtdTh_BI_lQ2qmF9W6z9w25r_6JhwkMtrLBE3PyvzkLebQxmLqiqNBs-PCgC4ljrQNv9awL5zww_tMYAHOE4SNWUHizTPncpCmQXtN195pzmK4HzZ-smhVs9QGWVKR3Dn5JGEuCz7_vV2rIUBOSkW1HA.e4MPOWqTtDE5q_SGMgmZGQ';

/* *** NO LONGER USED ***
Since Jira Server does NOT allow "CORS",
this Angular app does NOT send direct to Jira Server.
No "api token" used here.
Instead, this Angular app sends to my own
*PROXY* Server (Node/Express), which in turn
sends on to Jira Server (with the proper api token etc.)
cheers.

Atlassian Jira
User wreilly2001@gmail.com
api-token-01
https://id.atlassian.com/manage-profile/security/api-tokens
$ echo -n wreilly2001@gmail.com:Gc02Og0ZAk9VYhhJP4XF2282 | base64
d3JlaWxseTIwMDFAZ21haWwuY29tOkdjMDJPZzBaQWs5VlloaEpQNFhGMjI4Mg==
 */
// NOT USED:
const atlassianJiraBasicAuthApiToken = 'd3JlaWxseTIwMDFAZ21haWwuY29tOkdjMDJPZzBaQWs5VlloaEpQNFhGMjI4Mg==';


export const environment = {
  production: false,
  'nytimes-api-key-top-stories': 'STMA4A1DcdjKxY68rwVzYFAlC2EficSF',
  'hbsp-admin-user-token': hbspAdminUserTokenTwentyFourHours,
  'atlassian-jira-basic-auth': atlassianJiraBasicAuthApiToken, //  << NOT USED
  jiraProxyServer: {
    apiUrl: 'http://0.0.0.0',
    apiPort: '3000',
    apiVersion: 'api/v1',
  }
};

/* NYTIMES API INFO
TOP STORIES API

SEE:
../email-fabricator-assets-out-of-git/nytimes-api-key-top-stories.txt

I have learned (the not quite hard way)
to NOT keep this stuff in Comments
in "environment.ts" file.
It is all LEGIBLE as Git Out ;) on the INTERWEBS.

(In my (kinda) defense, I only do this silliness
in the NON-PRODUCTION environment.ts file.
NOT in the PRODUCTION one. Cheers.)

----------------------------
App Name
email-fabricator << okay you can have that

App ID
5a9FOOBARBUSTEDUP4-8fFOOBARBUSTEDUP30ee0 << sorry this is now FOOBARBUSTEDUP

API Key
STMA4A1DcdjKxY68rwVzYFAlC2EficSF << okay this one's already PUBLIC what can you do nothing

API Secret
JiFOOBARBUSTEDUPabcdFOOBARBUSTEDUPabcdFOOBARBUSTEDUPb3 << FOOBARBUSTEDUP sheesh. Boys and girls, you *don't want* to put your api SECRET
here in your "environment.ts" file.
No.
It may keep it outta Git (good, okay),
but it ain't keeping it offa
THE INTERNET.

oi!
SEE:
../email-fabricator-assets-out-of-git/nytimes-api-key-top-stories.txt
 */


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
