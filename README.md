# Vesper House | Boutique Hotel Website Concept

An independent fictional hospitality concept designed and built for the FORM11 TECH STUDIOS portfolio. Vesper House, its property, contact details, guest quotes and services are invented. This is not a live hotel website.

## Design direction

Editorial coastal calm: warm chalk, weathered olive, ink-charcoal and muted clay; Italiana display typography paired with DM Sans; generous whitespace, tactile photography, considered typography and restrained motion.

## Features

- Five connected pages: Home, Rooms & Suites, Experiences, Our Story, Contact, plus a dedicated booking demo page.
- Responsive desktop/mobile navigation with Escape-key support.
- Scroll reveal animations, hero image drift, image hover transitions, subtle link interactions, and reduced-motion support.
- Quick availability form routes dates and guest count into the booking demo.
- Booking demonstration with date validation, room selection, guest count, indicative GBP pricing, night totals, review step, and explicit demo completion state.
- Contact form client-side validation and transparent non-sending success state.
- Concept testimonials clearly identified as fictional.
- Semantic page structure, metadata, accessible labels, visible focus states, lazy-loaded below-the-fold imagery and no build dependencies.
- Static HTML/CSS/JS, ready for GitHub Pages.

## Run locally

No build step or package install is required. Open `index.html` in a browser, or run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Build and deployment

There is no compilation step. The static files in this folder are the production build.

### GitHub Pages

1. Create a new GitHub repository, for example `vesper-house`.
2. Upload/push the contents of this folder to the repository root (not the enclosing parent folder).
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. GitHub will publish the site at `https://YOUR-USERNAME.github.io/vesper-house/` after its deployment workflow completes. Replace the URL with the actual repository URL after deployment.
5. Test every page and the booking flow on the published URL.

For a user/organisation site repository named `YOUR-USERNAME.github.io`, publish the files at that repository's root and the URL will be `https://YOUR-USERNAME.github.io/`.

## Image and font notes

Google Fonts and image photography load from external providers and require an internet connection. The photography uses Unsplash image URLs for this concept. For a commercial production launch, verify the chosen images' licensing and download/optimise approved assets locally for reliable long-term delivery.

## Demo limitations

- No live inventory, reservations, email sending, database, authentication, payment processing or backend.
- Prices are indicative concept prices in GBP, not an offer to sell a real stay.
- The fictional address is `14 Shoreline Lane, Northumberland Coast, NE fictional, United Kingdom` and is not a real address.
- The booking completion reference is generated in the browser and is not a real reservation number.

## FORM11 portfolio notes

**Suggested case-study title:** Vesper House: Designing the Luxury of Slowing Down

**Project description:** A complete multi-page boutique-hotel website concept for a fictional coastal retreat, combining editorial storytelling, cinematic imagery, restrained motion and a transparent booking-flow prototype.

**Fictional client industry:** Boutique hospitality / luxury accommodation.

**Target audience:** Design-conscious couples, solo travellers and short-break guests seeking a calm, considered coastal escape.

**Objectives:** Create a distinctive hotel identity, communicate the property's imagined character, present rooms and experiences clearly, and prototype a booking journey without implying real inventory or payment processing.

**Implemented:** Responsive multi-page website, accommodation details, experiences, brand story, contact validation, booking date/guest/room selection, indicative totals, review/confirmation demo, responsive navigation, motion accessibility and GitHub Pages-friendly static delivery.

**Screenshot plan:** Capture (1) full homepage hero with navigation; (2) homepage room cards and editorial sections; (3) rooms page with its staggered editorial layout; (4) experiences page; (5) mobile homepage; (6) booking review screen with the demo banner visible. Use consistent browser chrome or crop it out, and label the case study as an independent concept.

**Deployment URL:** Not deployed yet. Add the real URL only after GitHub Pages has published successfully.
