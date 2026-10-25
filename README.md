# J Gupta, Tax Litigators & Advisors: Careers Portal

A static, single page careers portal. Plain HTML, CSS and JavaScript. No build step, no framework, no backend, no tracking.

Applications go to the existing Google Form: https://forms.gle/QvP4aGrnqUatjFGR8
Email applications go to: ea.jkgupta@gmail.com

## File tree

```
jkgupta-careers/
├── index.html              Page content and metadata
├── styles.css              Design system and layout
├── script.js               Mobile menu, header border, scroll reveal (optional enhancement)
├── favicon.ico             From the official logo mark
├── apple-touch-icon.png    From the official logo mark
├── robots.txt
├── _headers                Security and cache headers for Cloudflare Pages
├── README.md
└── assets/
    ├── logo-lockup.png         Horizontal logo, dark text (header)
    ├── logo-lockup-light.png   Horizontal logo, light text (footer)
    ├── logo-mark.png           Logo mark only
    ├── icon-512.png            Large icon
    ├── favicon-64.png
    ├── og-image.png            Social sharing image, 1200 x 630
    └── fonts/
        ├── montserrat-latin.woff2
        ├── source-serif-4-latin.woff2
        ├── LICENSE-Montserrat.txt      SIL Open Font Licence 1.1
        └── LICENSE-SourceSerif4.txt    SIL Open Font Licence 1.1
```

Fonts are self hosted, so the page makes no request to Google Fonts or any other third party. If a font fails to load, the page falls back to system fonts (Georgia or Palatino for headings, Segoe UI, Helvetica or Arial for text).

## Preview locally

Open a terminal in the `jkgupta-careers` folder and run one of these:

```
python3 -m http.server 8080
```

or

```
npx serve .
```

Then open http://localhost:8080 (or the address shown). Opening `index.html` directly by double clicking also works, but a local server is closer to how Cloudflare serves it.

## Deploy to Cloudflare Pages

### Option A: Direct upload (simplest, no Git)

1. Log in to the Cloudflare dashboard.
2. Go to **Workers & Pages**, then **Create**, then the **Pages** tab, then **Upload assets**.
3. Give the project a name, for example `jkgupta-careers`.
4. Upload the contents of the `jkgupta-careers` folder (the folder that contains `index.html`).
5. Click **Deploy site**. Cloudflare gives you a `*.pages.dev` address.

To update later, open the project and choose **Create new deployment**, then upload the folder again.

### Option B: Connect a Git repository

1. Push this folder to a GitHub or GitLab repository.
2. In Cloudflare: **Workers & Pages**, then **Create**, then **Pages**, then **Connect to Git**, and select the repository.
3. Build settings:
   * Framework preset: **None**
   * Build command: leave empty
   * Build output directory: `/` if `index.html` is at the repository root. If this folder sits inside a larger repository, enter the folder name instead, for example `jkgupta-careers`.
4. Save and deploy. Every push to the main branch will redeploy the site.

### Option C: Wrangler command line

```
npx wrangler pages deploy . --project-name=jkgupta-careers
```

Run it from inside the `jkgupta-careers` folder.

### Custom domain (optional)

In the Pages project, open **Custom domains** and add, for example, `careers.jkgupta.in`. Cloudflare shows the DNS record to add.

## Steps to complete after deployment

1. **Social sharing image.** Open `index.html` and change `assets/og-image.png` in the `og:image` and `twitter:image` tags to the full address, for example `https://careers.jkgupta.in/assets/og-image.png`. WhatsApp, LinkedIn and Facebook need the full address to show the preview. Also add `<meta property="og:url" content="https://your-final-address/">` once the address is fixed.
2. **Google Form access.** Open the form link in a private or incognito window and check that a candidate can open and submit it.
3. **Resume upload.** Google Forms allows file upload questions only when respondents sign in with a Google account. Candidates without a Google account can use the email option shown on the page.
4. **Position dropdown.** The page tells candidates to choose one of these exact names in the form. Keep the form options the same:
   * Chartered Accountant / CA Final Candidate
   * CA Articles / Trainee
   * GST / Taxation Executive
5. **Test application.** Submit one test response with a sample resume and confirm it appears in the form responses and the linked sheet. Delete the test response afterwards.
6. **Response sheet privacy.** Keep the responses sheet and the Drive folder holding uploaded resumes private to the office.

## What is tested and what is not

Tested locally in Chromium at widths of 320, 390, 768, 1024 and 1440 pixels:
* No console errors and no failed requests.
* No horizontal scrolling at any of these widths.
* Mobile menu opens, closes with the Escape key, closes after a link is chosen, and returns focus to the menu button.
* Keyboard tab order starts with the skip link, then the logo, navigation and Apply button. Focus outlines are visible.
* Every Apply button points to https://forms.gle/QvP4aGrnqUatjFGR8 and opens in a new tab.
* All in page links point to sections that exist.
* With JavaScript off, all content stays visible and the menu shows as plain links.
* With reduced motion turned on, no reveal animation runs.

Not tested from here:
* The Google Form itself (sign in, upload, confirmation message, notifications).
* The final live address on Cloudflare, and social previews, which depend on the full image address in step 1.
* Real devices (iOS Safari, older Android browsers).

## Editing content

All text is in `index.html`. The roles are in the section with `id="roles"`. Colours, fonts and spacing are set once at the top of `styles.css` under "Design tokens".
