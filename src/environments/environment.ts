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
// GET ADMIN USER TOKEN!
// tslint:disable-next-line:max-line-length
const hbspAdminUserTokenTwentyFourHours =  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAiLCJjaWQiOiI0YjM3N2EyYS1mMTc5LTQxMGUtOTM4Yy0yNzM3MGUwYTJhMTAiLCJraWQiOiJkYWM2N2I2MS1iZjE2LTRhYzYtOGU2Mi0yZmQ4MjVmZjQ5MmYifQ.oGBn3tpsS9ytvKstTFpff5wKwfRyWzQ6K-95cjUGqOf49j2gFXxfwAs3VYENVEWjGoju0rs3XTRARhq3pMAc6HktVBkfxSs676ieuR6ffMWb-1jUjpnKQc798jT4WLY8BYx6yvky2JJAn7J5zq3rhiuPxCVQR2-VdX8HbEjVByilfZb_jmf_qKw5Ja6uNWenEOK-InsD6zlTCLtriSIgHatAmSO7s-udXkQo7eLrFPPxzk4j3SYaqml7wU4XVb07UnmKmyNp9SuG1gH-vWYyzujLV87t9M4a9ubeUVcMupcBxSXoxomfkwyGmlNYWe__L-6q-3CEfxLvMH8YONMLbA.NIIf-fhwhi8Kw5ZN.hgBTJPCQxKjwNooYP1z1yJkyM5GZnvx71MFFvN3KpwLvr6JY057WgS01-vCuk9hH_3msU_yxds4GHmccDtcAZPJtVQj35cW3JEvUn5l3Yk5--1NcgxrSPPRoUp6altKaAnbg3cuYiis1hBMAwpTfdWp_6YCa50rIjhA3wl_2BXbX7twhJSxa-dC5Bf167tQPCVdP8KVGDBFP2jy--j9gs-j7WI4moBzcnCx3QLl9Bgg4ldEctpJVMnwH9uKuhPiueEzebViDxQEwaeD44XE271sAth7XZCtW0ch0TY97opXPhZwQPCXUJqXrL2GhmI4srB8OjnM7NOOMtkPHvNfBLjdLK9vYa0VEr6ulBIii2-DHL_uE92DPIN1fFS4TRpXj1wjzMueaOxCqpJ2nFkpLFLRHLhj4LV4PW1iqd7pcWHCdGzIt1vWYyb-vYuGxe9-xSGfI1qCJ1n0BpJFq4ahzqPvflacYaYwGfGs72aIUAeeBZvg5QkGvOVxemP3t585rQP6eKfkJGMxPlc77ca3q0Fi3XIgudOZNmwvhnkUuUmtdx9PEOm5CUx6dkF8ONZCL_zhUCkz0FYqyT6KBEEAvLb03r6GHxB4cJ4AqQs01_O_tcHlOW9Y3i2O9HaqMw_41VStwazoE8QN7mD5LZu2lr0pCOideMJ_Gt4nfUk8GPpcFBhsUTrjkV9J1w8FeOo29utPIYEzhzMpasssiJBLpHOdXO5AEAZDJDwDnClPl3vTHV2irDZQYURVC7gFM4D2q0PT8L-Q0AatR-wl1JPVIem0UWBXa-1AF_A5VvrHw4lxoQZUQOTPg294VE0UQ8FNRC9UCkZSb3DhKJqImtA.ccG5om9obOo7VgoIcpdYJA';

export const environment = {
  production: false,
  'nytimes-api-key-top-stories': 'STMA4A1DcdjKxY68rwVzYFAlC2EficSF',
  'hbsp-admin-user-token': hbspAdminUserTokenTwentyFourHours,
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
