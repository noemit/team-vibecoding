# How to make an applet

1. Copy this `_template` folder and rename it to your applet's short name
   (for example `feedback-form`).
2. Edit `metadata.json`:
   - `title`: what shows on the home page
   - `creator`: who built it
   - `lastModified`: today's date (ISO format)
   - `lastModifiedBy`: who changed it last
   - `expiryOverride`: `standard` (30 days), `90days`, or `permalive`
3. Put your page code in `applet.tsx`.
4. Drop large files (CSVs, PDFs) in `resources/` and images in `images/`.

Your AI agent does all of this for you — just describe what you want.
