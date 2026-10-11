# Shabab Nashe2 Al Manar — website draft

The site is a bilingual, single-page website for Shabab Nashe2 Al Manar. Serve the project through Cloudflare Workers, Netlify, or another web server to use every feature. The styling, interactions, and logos are local; the full Bible text is bundled in `assets/bible/bible-data.json`. Opening `index.html` directly as a `file://` URL can block the browser from loading that JSON because of browser security rules.

## Included

- Arabic-first site with an English/Arabic toggle and RTL/LTR layout.
- Cinematic, dark-brown welcome hero with **مش مجرد اجتماع… دي عيلتنا**, the supplied logo in both the top bar and hero, a soft entrance animation, and the “اكتشف ناشئ” action.
- Live countdown to the next Friday gathering at 11:30 AM Kuwait time, plus the Beit El Aila, Salwa location and a one-tap Google Maps link.
- Daily verse in Arabic and English, a short explanation, a practical application, share action, and downloadable bilingual verse card. The verse rotates from the included set according to Kuwait time.
- A peaceful, no-account quiet-moment section with Matthew 11:28, a short reflection, and a question for overwhelming days.
- Nashe2 Streaks milestone cards (1, 4, 8, and 12 meetings) with an explicitly non-competitive, shame-free message.
- Friday QR Check-In instructions marked **Coming soon**. Attendance and personal streak tracking are not connected yet; a private backend and an identity/privacy plan are needed first.
- Nashe AI: bilingual chat UI for faith, everyday, and ministry questions, backed by a server-side Netlify Function or the Cloudflare Worker in `cloudflare/worker.js`. It stays disabled until a trusted leader configures the Gemini model and secret key privately in the hosting provider; no API key is in the client.
- Mission and vision copy (draft wording for the ministry to approve).
- Team cards for Maged (Head Leader) and Andrew (Worship Leader), with role-based intro copy and no photos.
- Podcast episode cards for Andy & Peter (“The Fake Me”) and Nana & Gaby (“When Nobody Understands Me”), each linked to the reel assigned by the ministry.
- Dark Box question form using the supplied Formspree endpoint. It has no name/email field; it explains that authorized ministry leaders can read questions and selected questions may be answered publicly without names.
- Weekly challenge, reflection prompts, message-notes placeholder, prayer topics, and a 7-day Bible reading plan. Reading-plan progress is stored locally in the visitor's browser.
- Full Bible reader: all 66 books in Arabic Van Dyck (AVD/VDV) and the World English Bible (WEB), both listed as public domain by eBible.org. Readers can browse books/chapters, display Arabic and English together or separately, and search in either language. The 66-book Protestant canon is included; Deuterocanonical/Apocryphal books are not. Text is bundled locally in `assets/bible/bible-data.json`; the Bible reader makes no Bible-text API calls.
- Student and bus registration buttons linking to the supplied Google Forms, plus an FAQ listing the bus service areas (Hawally, Salmiya, Jabriya, Shaab, and Salwa). Form responses are not shown on the website.
- Footer credit: “The creations of George Sameh.”
- A designed “Coming Soon” moments area; no placeholder photos or empty gallery boxes.

## Legacy Netlify setup (only if continuing to use Netlify)

The chat is deliberately unavailable until a ministry leader completes these steps. The UI probes `/api/nashe-ai`; it enables sending only after the server-side function reports that the Gemini key and model are configured. A local/static preview without a deployed server function will say the service is not connected.

1. In Google AI Studio, choose a Gemini text model and create a Gemini API key. Review that model’s pricing, safety, and data-use terms. Google’s current pricing page shows free tiers for some models, but indicates free-tier content may be used to improve Google products; check the current terms carefully before using free access for youth chats. The system instructions in this project are best-effort guidance, not a content-moderation guarantee; decide whether provider-side moderation is needed before launch.
2. Deploy the project to Netlify from the project root. `netlify.toml` runs `node scripts/build-site.js`, publishes only `dist/`, and deploys `netlify/functions/nashe-ai.js` as the function behind `/api/nashe-ai`.
3. In Netlify’s site environment-variable settings, add these **server-side** variables (Functions scope), then redeploy:
   - `GEMINI_API_KEY` — the secret key created in Google AI Studio.
   - `GEMINI_MODEL` — the exact model ID selected in Google AI Studio (for example, a Gemini Flash model if its current pricing/terms fit the ministry).
4. Test Arabic and English Bible/faith questions, everyday questions, ministry FAQs, uncertainty, private-data prompts, and sensitive/urgent scenarios with non-personal examples before announcing it. Confirm that the answers do not make up ministry details, and that the meeting/location facts, forms, and “QR/streaks are not live” status are accurate.
5. Set provider-side spending limits and abuse controls before making the endpoint public. The function limits message sizes/history, uses a 25-second timeout, and applies an **in-memory, per-function-instance** limit of 8 requests per minute per Netlify client IP. That limiter is best-effort—not a durable/global quota—so it is not a substitute for provider-side caps or monitoring.

**Never put `GEMINI_API_KEY` in `index.html`, a public environment variable, source control, or a chat message.** Only the Netlify Function reads it, using Google’s `x-goog-api-key` request header. The function does not log chat text or save it to a database; messages are kept in browser memory for the active page and sent to Google’s Gemini API when the user submits. Netlify and Google may process request data under their own terms. The interface warns users not to share identifying details and says the assistant can be wrong and is not a pastor or counselor. Do not describe the chat as confidential or as a crisis service.

## Vercel setup

The Vercel function is `api/nashe-ai.js`; Vercel serves it at `/api/nashe-ai`. Use Framework Preset **Other**, Root Directory `./`, Build Command `node scripts/build-site.js`, and Output Directory `dist`. The Bible JSON must stay at `assets/bible/bible-data.json`; the build script copies it into `dist/assets/bible/`.

In Vercel Project Settings → Environment Variables, add `GEMINI_API_KEY` as a sensitive value (do not place it in Git or a build command) and `GEMINI_MODEL=gemini-3.8-flash`. Enable Production and Preview as needed, then redeploy after saving variables. The API key that was saved in Netlify does not automatically transfer to Vercel.

## Cloudflare Workers Builds setup

This repository now includes a Cloudflare Worker entry point (`cloudflare/worker.js`) and `wrangler.jsonc`. Use these values in Cloudflare **Workers Builds** (not the Pages import form):

- Root directory: repository root (leave blank or `.`)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler preview`

The build command prepares `dist/`; `wrangler.jsonc` serves it as static assets and routes `/api/nashe-ai` to the Cloudflare Worker. The old Netlify Function remains in place for the former Netlify deployment.

The `GEMINI_API_KEY` you had saved in Netlify does not transfer automatically. In Cloudflare, add it as a **runtime Secret** named `GEMINI_API_KEY` under the Worker’s **Settings → Variables and Secrets**. Never put its value in `wrangler.jsonc`, source code, GitHub, or a build command. `GEMINI_MODEL` is set to `gemini-3.8-flash` in `wrangler.jsonc`. If you enable preview builds, configure the secret in the Preview environment too; preview variables/secrets may be separate from production.

## Before publishing

- Review the draft mission and vision text, team introductions, Arabic wording, the Bible canon/translation choices, and the age range (the current registration forms list Grades 6–8). The WEB and Arabic Van Dyck public-domain/source links are included in the Bible reader.
- Review the podcast and Friday Q&A links to confirm each reel opens the intended clip (Instagram video contents could not be previewed here).
- Ask the ministry to confirm the Formspree notification/inbox settings. No test submission was sent. The Dark Box avoids requesting a name or email, but the form provider may still process technical metadata; do not promise absolute anonymity.
- Before enabling QR attendance or individual streaks, choose a private attendance system, decide who can view records, and get any required parent/guardian approval. The page currently explains the planned flow but does not record attendance.
- Registration forms request personal and family information. Keep access to their response sheets restricted to authorized ministry organizers and encourage a parent/guardian to complete them.
- Add approved event photos only after receiving permission from the people pictured and, for minors, their parent/guardian.

## Publishing the full Bible reader

To publish the reader, commit the updated root `index.html` and `assets/bible/bible-data.json` while preserving that exact folder path. `scripts/build-site.js` copies the `assets/` folder into `dist/`; neither a Bible API key nor a Bible-reading function is needed. Cloudflare or Netlify will rebuild after the GitHub commit if automatic deploys are enabled. When testing on your computer, use a web server; directly opening `index.html` as `file://` can block the Bible JSON request.

## Updating content

`index.html` contains the site layout and code. Search for the section heading to edit regular copy. The full Bible text is in `assets/bible/bible-data.json`; if replacing it, keep the same schema and file path so the reader continues to work. The daily verse list is in the `verses` array near the end of `index.html`; the weekly prompts are in `challenges`; the short reading plan is in `readingPlan`. Update registration URLs, team details, meeting information, and Instagram links in the matching sections as needed.
