DETAILPANEL CSS FIX PATCH

Fixes the broken right-side destination detail panel where text, chips and highlights were stuck together.

Root cause confirmed from the uploaded project:
- DetailPanel.jsx already uses the newer visual classes.
- src/index.css was missing the corresponding DetailPanel visual CSS, most likely overwritten by a later patch.
- Contextual Storyteller styles were also missing, so they are restored in the same CSS file.

Files changed:
- src/index.css only

How to apply:
1. Commit/back up your current web project.
2. Extract this ZIP.
3. Copy its `src` folder into the root of your current web project.
4. Choose Replace for `src/index.css`.
5. Run `npm run dev`.
6. Hard refresh browser with Ctrl+Shift+R.

Not modified:
- App.jsx
- DetailPanel.jsx
- LandingPage
- Globe Explorer / currency converter logic
- itinerary logic
- data/content
