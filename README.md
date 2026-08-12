# 🛡️ CleanWeb Shield

> A lightweight family-safety userscript that detects and redirects adult or explicit webpages using domain, URL, title, metadata, image-text, and visible-content signals.

[![Install CleanWeb Shield](https://img.shields.io/badge/Install_CleanWeb_Shield-2ea44f?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/deactivated0/cleanweb-shield/main/p.user.js)
[![GitHub stars](https://img.shields.io/github/stars/deactivated0/cleanweb-shield?style=for-the-badge&color=gold)](https://github.com/deactivated0/cleanweb-shield/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

## ⚡ Quick install

1. Install [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), [ScriptCat](https://scriptcat.org/), or another compatible userscript manager.
2. Open the [direct userscript link](https://raw.githubusercontent.com/deactivated0/cleanweb-shield/main/p.user.js).
3. Confirm the installation in your userscript manager.

> If the raw link opens as plain text, create a new userscript, paste the contents of `p.user.js`, and save it.

## 🌟 Features

- **Early domain and URL checks:** Runs at `document-start` and can block known adult domains, risky domain patterns, explicit URL paths, and the `.xxx`, `.porn`, `.sex`, and `.adult` TLDs before page-content scanning.
- **Weighted content detection:** Scores the page title, URL, selected metadata, image `alt` and `title` attributes, and a bounded section of visible text.
- **Layered host handling:** Uses a strict safe allowlist for low-risk reference, government, education, medical, and developer sites, plus a trusted-site tier that still checks user-generated content and explicit URLs.
- **Multilingual detection:** Covers common explicit terms in English, Arabic, Kurdish, Persian, Chinese, Japanese, Korean, Russian, Turkish, Hindi, Indonesian, Vietnamese, and several European languages.
- **Obfuscation detection:** Normalizes Unicode, common leetspeak, punctuation, spacing, and repeated letters before scoring.
- **SPA support:** Rescans after supported single-page navigation events without continuous polling.
- **Dynamic-page protection:** Uses short-lived, debounced `MutationObserver` checks and disconnects observers automatically.
- **Temporary blacklist:** Stores confirmed blocked hosts locally for 30 days, avoiding repeated expensive scans.
- **Private and dependency-free:** Runs locally, uses no external libraries, sends no telemetry, and requests only the storage and URL-change permissions it needs.
- **Low-resource design:** Uses bounded text extraction, grouped regular expressions, early exits, cached host classification, debounced scans, and no permanent interval.

## 🧠 How it works

```text
Incoming page
    │
    ├─ Strict safe host ────────────────────────────────► Allow
    │
    ├─ Previously blocked host ─────────────────────────► Redirect
    │
    ├─ Known adult domain, risky host, or adult TLD ───► Redirect
    │
    ├─ Explicit title or URL score reaches threshold ──► Redirect
    │
    ├─ Content score reaches threshold ────────────────► Redirect
    │
    └─ Otherwise, watch major changes briefly ─────────► Allow
```

On a blocked page, CleanWeb Shield stops loading when possible, records the host locally, and redirects to DuckDuckGo.

## ⚙️ Detection layers

| Layer | What it checks | Performance strategy |
| --- | --- | --- |
| Host classification | Safe hosts, trusted hosts, adult TLDs, known domains, risky labels | Cached string lookup and compact regular expressions |
| URL scan | Path, query, and hash | Runs before DOM scanning and exits early |
| Title scan | Initial title and title changes | Small targeted scan with a dedicated observer |
| Content scan | Metadata, image labels, and visible body text | Bounded input and threshold-based early exit |
| Dynamic scan | Major DOM additions during initial loading or SPA updates | Debounced, limited to six scans, stopped after 20 seconds |
| Blacklist | Locally stored blocked hosts | In-memory `Set` after one storage load |

## 🔧 Configuration

Edit these constants near the top of `p.user.js`:

```javascript
const REDIRECT_URL = 'https://duckduckgo.com/';
const BLOCK_THRESHOLD = 6;
const CONTENT_THRESHOLD = 18;
const TRUSTED_CONTENT_THRESHOLD = 30;
const TITLE_THRESHOLD = 5;
const PATH_THRESHOLD = 5;
const WATCH_TIME = 20000;
```

Lower thresholds make the filter stricter but increase false-positive risk. Higher thresholds reduce false positives but may miss less-obvious explicit pages.

Host rules are separated into two tiers:

- `SAFE_HOSTS` bypass content scanning. Reserve this tier for sites whose full domain tree should always remain accessible.
- `TRUSTED_HOSTS` receive higher thresholds but are still scanned. Use this tier for search engines, social networks, media sites, hosting platforms, and other user-generated services.

Do not add broad hosting, social, search, or file-sharing platforms to `SAFE_HOSTS`, because one safe root domain can host explicit user content.

## 🌐 Compatibility

CleanWeb Shield is a standard userscript and is intended for modern browsers that support `MutationObserver`, Unicode-aware regular expressions, `async`/`await`, and a userscript manager implementing `GM_getValue` and `GM_setValue`.

Test installation in your exact browser and userscript manager. Mobile extension support varies by browser and operating system.

## 🔒 Privacy and limitations

- All scoring happens inside the browser.
- No browsing history, page text, or detection results are transmitted by this script.
- Block decisions are stored only through the userscript manager's local value storage.
- CleanWeb Shield is a heuristic page filter, not a DNS filter, antivirus, malware scanner, image classifier, or complete parental-control system.
- No content filter can guarantee perfect detection or zero false positives. Review the thresholds and host lists for your environment.
- For stronger device-wide protection, combine the userscript with operating-system parental controls, enforced SafeSearch, and a family-filtering DNS service.

## 🤝 Contributing

Issues and pull requests are welcome at the [GitHub repository](https://github.com/deactivated0/cleanweb-shield).

When proposing a host rule, specify whether it belongs in `SAFE_HOSTS`, `TRUSTED_HOSTS`, or the adult-domain detector, and explain the false-positive risk.

## 📝 License

Distributed under the [MIT License](LICENSE). Free for personal, educational, and commercial use under the license terms.

---

<p align="center">
  Maintained by <a href="https://github.com/deactivated0"><strong>deactivated0</strong></a>
</p>
