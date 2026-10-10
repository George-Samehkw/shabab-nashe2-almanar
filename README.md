# Shabab Nashe2 Al Manar — website draft

The site is a bilingual, single-page website for Shabab Nashe2 Al Manar. Open `index.html` in a browser to view it. It is self-contained: its styling, interactions, and logo are embedded, so the main page does not need external assets to render.

## Included

- Arabic-first site with an English/Arabic toggle and RTL/LTR layout.
- Cinematic, dark-brown welcome hero with **مش مجرد اجتماع… دي عيلتنا**, the supplied logo in both the top bar and hero, a soft entrance animation, and the “اكتشف ناشئ” action.
- Live countdown to the next Friday gathering at 11:30 AM Kuwait time, plus the Beit El Aila, Salwa location and a one-tap Google Maps link.
- Daily verse in Arabic and English, a short explanation, a practical application, share action, and downloadable bilingual verse card. The verse rotates from the included set according to Kuwait time.
- A peaceful, no-account quiet-moment section with Matthew 11:28, a short reflection, and a question for overwhelming days.
- Nashe2 Streaks milestone cards (1, 4, 8, and 12 meetings) with an explicitly non-competitive, shame-free message.
- Friday QR Check-In instructions marked **Coming soon**. Attendance and personal streak tracking are not connected yet; a private backend and an identity/privacy plan are needed first.
- Nashe AI: bilingual chat UI for faith, everyday, and ministry questions, backed by a Netlify Function that calls Google AI Studio’s Gemini Developer API. It stays disabled until a trusted leader configures the Gemini model and secret key privately in Netlify; no API key is in the client.
- Mission and vision copy (draft wording for the ministry to approve).
- Team cards for Maged (Head Leader) and Andrew (Worship Leader), with role-based intro copy and no photos.
- Podcast episode cards for Andy & Peter (“The Fake Me”) and Nana & Gaby (“When Nobody Understands Me”), each linked to the reel assigned by the ministry.
- Dark Box question form using the supplied Formspree endpoint. It has no name/email field; it explains that authorized ministry leaders can read questions and selected questions may be answered publicly without names.
- Weekly challenge, reflection prompts, message-notes placeholder, prayer topics, and a 7-day Bible reading plan. Reading progress is stored locally in the visitor's browser.
- Student and bus registration buttons linking to the supplied Google Forms, plus an FAQ listing the bus service areas (Hawally, Salmiya, Jabriya, Shaab, and Salwa). Form responses are not shown on the website.
- Footer credit: “The creations of George Sameh.”
- A designed “Coming Soon” moments area; no placeholder photos or empty gallery boxes.

## Nashe AI: Google AI Studio + Netlify setup (not active until configured)

The chat is deliberately unavailable until a ministry leader completes these steps. The UI probes `/api/nashe-ai`; it enables sending only after the server-side function reports that the Gemini key and model are configured. A local/static preview without Netlify will say the service is not connected.

1. In Google AI Studio, choose a Gemini text model and create a Gemini API key. Review that model’s pricing, safety, and data-use terms. Google’s current pricing page shows free tiers for some models, but indicates free-tier content may be used to improve Google products; check the current terms carefully before using free access for youth chats. The system instructions in this project are best-effort guidance, not a content-moderation guarantee; decide whether provider-side moderation is needed before launch.
2. Deploy the project to Netlify from the project root. `netlify.toml` runs `node scripts/build-site.js`, publishes only `dist/`, and deploys `netlify/functions/nashe-ai.js` as the function behind `/api/nashe-ai`.
3. In Netlify’s site environment-variable settings, add these **server-side** variables (Functions scope), then redeploy:
   - `GEMINI_API_KEY` — the secret key created in Google AI Studio.
   - `GEMINI_MODEL` — the exact model ID selected in Google AI Studio (for example, a Gemini Flash model if its current pricing/terms fit the ministry).
4. Test Arabic and English Bible/faith questions, everyday questions, ministry FAQs, uncertainty, private-data prompts, and sensitive/urgent scenarios with non-personal examples before announcing it. Confirm that the answers do not make up ministry details, and that the meeting/location facts, forms, and “QR/streaks are not live” status are accurate.
5. Set provider-side spending limits and abuse controls before making the endpoint public. The function limits message sizes/history, uses a 25-second timeout, and applies an **in-memory, per-function-instance** limit of 8 requests per minute per Netlify client IP. That limiter is best-effort—not a durable/global quota—so it is not a substitute for provider-side caps or monitoring.

**Never put `GEMINI_API_KEY` in `index.html`, a public environment variable, source control, or a chat message.** Only the Netlify Function reads it, using Google’s `x-goog-api-key` request header. The function does not log chat text or save it to a database; messages are kept in browser memory for the active page and sent to Google’s Gemini API when the user submits. Netlify and Google may process request data under their own terms. The interface warns users not to share identifying details and says the assistant can be wrong and is not a pastor or counselor. Do not describe the chat as confidential or as a crisis service.

## Before publishing

- Review the draft mission and vision text, team introductions, Arabic wording, and the age range (the current registration forms list Grades 6–8).
- Review the podcast and Friday Q&A links to confirm each reel opens the intended clip (Instagram video contents could not be previewed here).
- Ask the ministry to confirm the Formspree notification/inbox settings. No test submission was sent. The Dark Box avoids requesting a name or email, but the form provider may still process technical metadata; do not promise absolute anonymity.
- Before enabling QR attendance or individual streaks, choose a private attendance system, decide who can view records, and get any required parent/guardian approval. The page currently explains the planned flow but does not record attendance.
- Registration forms request personal and family information. Keep access to their response sheets restricted to authorized ministry organizers and encourage a parent/guardian to complete them.
- Add approved event photos only after receiving permission from the people pictured and, for minors, their parent/guardian.

## Updating content

`index.html` contains all site content and code. Search for the section heading to edit regular copy. The daily verse list is in the `verses` array near the end of the file; the weekly prompts are in `challenges`; the reading plan is in `readingPlan`. Update registration URLs, team details, meeting information, and Instagram links in the matching sections as needed.
