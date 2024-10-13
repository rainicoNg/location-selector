### Description

This is a web application for getting a driving route by submitting 1 pick up location and 1 drop off location, the route will be shown on the map.
This web app is compatible with latest Chrome, Safari and FireFox

### Deployed website

[https://deploy.d37c3lm37ecftk.amplifyapp.com/](https://deploy.d37c3lm37ecftk.amplifyapp.com/)

### Instruction

1. enter the website (or run `npm run dev` for local run, create `.env.local` on root folder with the env stated below)
2. Type a pick up location (no auto-complete)
3. Type a drop off location (no auto-complete)
4. Click Submit button
5. Wait for the result
6. If the result is success, the returned driving route with location markers will be displayed on the right (laptop) or below (mobile)
7. If the result is failed, you can click Re-Submit button to trigger submission again, or Clear to clean all inputs

### Create a production build

1. run `npm i`
2. run `npm run build`
3. get the build files in `out` folder
4. add the env (refer to the following) on your site, or in `.env` if you run locally

### env list

- `NEXT_PUBLIC_MOCK_API`: the api endpoint for getting a token and route response
- `NEXT_PUBLIC_GOOGLE_MAP_API_KEY`: the api key of google maps api, you can get it from Google Map Platform > API and Services
- `NEXT_PUBLIC_GOOGLE_MAP_ID`: a google maps Map ID, you can get it from Google Map Platform > Map Management
