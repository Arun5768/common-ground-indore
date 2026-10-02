# Common Ground / Indore

A small, map-first tool for one community-organising decision: **which meeting area is closer to the people you hope to bring together?**

By Arun Chandel / The Origin Guild. Independent, AI-assisted proof of work, not an official Stadia Maps product or a confirmed sponsorship.

[Live project](https://common-ground-indore.arunchandel1780.workers.dev/) · [GitHub](https://github.com/Arun5768/common-ground-indore)

## What works

- Live Stadia Maps Alidade Smooth raster basemap, rendered with Leaflet.
- Three illustrative candidate areas, ranked by weighted mean straight-line distance.
- Six approximate Indore neighbourhood centres and editable sample audience counts.
- Radius coverage, weighted mean and farthest-area distance.
- Custom candidate by map click or accessible coordinate form.
- JSON planning-brief export, with inputs, results and limitations.
- Keyboard controls, mobile layout, a method dialog and local-only scenario state.

## The important distinction

The six coordinates are approximate illustrative neighbourhood centres, **not verified venues**. Counts are fictional examples, **not registrations or measured community distribution**. Haversine distance is not road distance, travel time, transit access or a routed isochrone. Candidate ranking is not a booking recommendation. Verify capacity, accessibility, safety, travel conditions and availability separately.

No attendee names, home addresses or GPS location are collected. Scenario inputs stay in page memory and reset on refresh. Exports are downloaded locally. Stadia receives ordinary basemap tile requests, including network metadata and map extent; Google Fonts receives font requests.

## Run and test

Requires Node.js 22+.

```sh
npm ci
npm test
npm run build
npm run dev
```

Open `http://localhost:4193/`. Localhost map tiles use Stadia's documented development access. Production domains must be added to a Stadia Maps property. No API key is embedded in the site or repository.

Optional browser checks: install Playwright and Chrome, set `BROWSER_MODULES` to the Playwright module location if necessary, and run `node scripts/ui-check.mjs`. Set `BASE_URL` to test a deployed copy.

Verification on 2 October 2026: nine calculation/export tests and eleven local browser checks passed, including real Stadia tile loading, custom points, empty audience handling, export and mobile overflow checks. The native WebMCP tool is feature-detected and optional; its execution is not covered by the browser script.

## Deploy

```sh
npm run build
npx wrangler@4.92.0 deploy
```

Authenticate to your own Cloudflare account and change the Worker name when deploying a copy. Add only your exact published hostname to the Stadia Maps domain allowlist. GitHub pushes do not automatically deploy this project.

Stadia Maps usage is subject to the account's quota and plan terms. A free trial is **not** proof of eligibility for the paying-customer meetup sponsorship programme. No subscription was purchased for this project.

## Method and sources

`site/geo.mjs` contains the sample dataset, Haversine calculation, weighted mean, coverage, ranking and export format. The formula uses mean Earth radius 6371.0088 km. Empty audiences yield no distance result; counts must be whole numbers from 0 to 500. No geocoding or routing API is used.

- [Stadia authentication](https://docs.stadiamaps.com/authentication/)
- [Alidade Smooth endpoints and attribution](https://docs.stadiamaps.com/map-styles/alidade-smooth/)
- [Leaflet documentation](https://leafletjs.com/reference.html)
- [Stadia meetup programme](https://stadiamaps.com/meetup-sponsorships/)

Map attribution is visible on the map: Stadia Maps, OpenMapTiles and OpenStreetMap contributors. Leaflet's license is bundled in `dist/vendor/LEAFLET-LICENSE.txt`.

## Suggested workshop use

Ask participants to change the sample audience and compare how the lowest-mean location differs from the largest-radius-coverage location. Add a custom candidate and export a brief. Discuss what a straight-line analysis misses before discussing venue selection. This is a proposed teaching use, not evidence of an event already delivered.
