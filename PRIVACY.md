# Privacy Policy

_Last updated: 2026_

## The short version

MealMind does not collect, transmit, or have access to any of your data. There is no server for it to go to.

## What MealMind stores, and where

| Data | Where it lives | Leaves the device? |
|---|---|---|
| Logged meals | Browser IndexedDB (`food_log`) | No |
| Water intake | Browser IndexedDB (`water_log`) | No |
| Preferences / goals | Browser IndexedDB (`settings`) | No |
| Custom foods you add | Browser IndexedDB (`custom_foods`) | No |
| The dish database (1,600+ dishes) | Bundled inside the app itself | Never fetched remotely |

## What MealMind does not do

- No user accounts or login
- No analytics, crash reporting, or telemetry of any kind
- No third-party SDKs (no Firebase, no ad networks, no fonts or scripts loaded from a remote server)
- No network requests of any kind after the page has loaded, beyond the service worker occasionally re-fetching its own cached files from wherever you're hosting the app
- No location data, contacts, or device identifiers accessed

## Your data, your device, your control

Because everything lives in your browser's local storage for this app, clearing that browser's site data for MealMind — or uninstalling/reinstalling in a fresh browser profile — deletes your data completely and irreversibly. There is no cloud copy to restore from, by design.

MealMind includes a built-in export feature that writes all of your data to a single JSON file, which you control (save it, back it up, move it to another device). Import validates that a file is a genuine MealMind backup before applying it, and never writes partial or malformed data.

## Changes to this policy

If MealMind ever changes this model — for example, by adding an optional sync feature — that will be off by default, clearly disclosed, and this document will be updated to describe exactly what is sent, where, and why, before any such feature ships.
