# 🛡️ CleanWeb Shield | Smart Family Safeguard & Adult Content Blocker

> **The Most Advanced, Intelligent, & Lightweight Safe Browsing & Family Protection Userscript**  
> Automatically filters adult content, NSFW websites, explicit chatrooms, malware domains, and obfuscated text across the web in real-time. Designed for productivity, focus, and family safety.

---

## ⚡ Quick Install

Click the button below to instantly install **CleanWeb Shield** into your userscript manager (*Tampermonkey*, *ScriptCat*, *Violentmonkey*, or *Greasemonkey*):

<p align="center">
  <a href="https://raw.githubusercontent.com/deactivated0/cleanweb-shield/main/p.user.js">
    <img src="https://img.shields.io/badge/🚀_CLICK_HERE_TO_INSTALL_CLEANWEB_SHIELD-2ea44f?style=for-the-badge&logo=tampermonkey&logoColor=white" alt="Install CleanWeb Shield Userscript" width="650" />
  </a>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/deactivated0/cleanweb-shield/main/p.user.js"><strong>Direct Script Link (p.user.js)</strong></a> • 
  <a href="https://github.com/deactivated0/cleanweb-shield"><strong>GitHub Repository</strong></a>
</p>

---

<p align="center">
  <a href="https://raw.githubusercontent.com/deactivated0/cleanweb-shield/main/p.user.js">
    <img src="https://img.shields.io/badge/Install_Script-Direct_Link-success?style=for-the-badge&logo=tampermonkey" alt="Install Button" />
  </a>
  <a href="https://github.com/deactivated0/cleanweb-shield/stargazers">
    <img src="https://img.shields.io/github/stars/deactivated0/cleanweb-shield?style=for-the-badge&color=gold" alt="GitHub Stars" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
  </a>
  <a href="https://www.tampermonkey.net/">
    <img src="https://img.shields.io/badge/Tampermonkey-Compatible-darkgreen?style=for-the-badge&logo=tampermonkey" alt="Tampermonkey" />
  </a>
  <a href="https://scriptcat.org/">
    <img src="https://img.shields.io/badge/ScriptCat-Compatible-orange?style=for-the-badge" alt="ScriptCat" />
  </a>
  <a href="https://violentmonkey.github.io/">
    <img src="https://img.shields.io/badge/Violentmonkey-Compatible-purple?style=for-the-badge" alt="Violentmonkey" />
  </a>
</p>

---

## 🌟 Why Choose CleanWeb Shield?

**CleanWeb Shield** is engineered from the ground up to keep your browser free from explicit content, dangerous adult TLDs, and hidden adult chat overlays without slowing down your internet speed or compromising your privacy.

### 🛡️ Key Features

- ⚡ **Zero-Latency `document-start` Execution**: Intercepts and block explicit sites **before** images, text, or layout render to prevent unintended exposure.
- 🧠 **Smart Heuristic Scoring Engine**: Evaluates page title, URL paths, meta descriptors, and DOM text density to detect adult material accurately.
- 🔏 **Evasive Obfuscation & Leetspeak Protection**: Unmasks sneaky typosquatting, leetspeak text replacement, and hidden chatroom overlays.
- 🌐 **Dangerous TLD Shielding**: Blocks high-risk adult top-level domains (`.xxx`, `.porn`, `.sex`, `.adult`) immediately on DNS lookup.
- 🟢 **100+ Trusted Domain Allowlist**: Built-in whitelist covering major search engines, AI assistants (*ChatGPT, Claude, Gemini, DeepSeek*), educational databases (*Wikipedia, JSTOR, arXiv*), coding platforms (*GitHub, StackOverflow*), and cloud services ensures **zero false positives** on productive websites.
- 🔄 **Automatic Safe Redirect**: Safely routes blocked traffic directly to DuckDuckGo SafeSearch or your chosen safe homepage.
- ⚡ **Ultra-Fast Local Storage Caching**: Persists block decisions locally using Userscript API (`GM_setValue`/`GM_getValue`) for instant page loads.

---

## 🚀 How to Install & Use

### Step 1: Install a Userscript Manager
Select your preferred browser extension:
* **[Tampermonkey](https://www.tampermonkey.net/)** *(Recommended for Chrome, Edge, Firefox, Brave, Safari, Opera)*
* **[ScriptCat](https://scriptcat.org/)** *(Open-source & modern userscript engine)*
* **[Violentmonkey](https://violentmonkey.github.io/)** *(Lightweight open-source manager)*
* **[Greasemonkey](https://www.greasespot.net/)** *(Firefox)*

### Step 2: Install CleanWeb Shield
Click the installation button below:

<p align="center">
  <a href="https://raw.githubusercontent.com/deactivated0/cleanweb-shield/main/p.user.js">
    <img src="https://img.shields.io/badge/👇_CLICK_TO_INSTALL_CLEANWEB_SHIELD-0078D4?style=for-the-badge&logo=javascript&logoColor=white" alt="Install CleanWeb Shield" width="500" />
  </a>
</p>

### Step 3: Confirm & Protect
Your userscript manager will automatically pop up an installation window. Click **Install**, and your protection is instantly active!

---

## ⚙️ How It Works (Architecture Overview)

```
[ Incoming Web Page Request ]
              │
              ▼
   Is Domain in Safe Allowlist? ──► YES ──► [ Allow Page Immediately ]
              │
             NO
              ▼
   Is TLD Dangerous (.xxx/.porn)? ─► YES ──► [ Block & Redirect ]
              │
             NO
              ▼
   Calculate Threat Score:
   ├── Page Title & Meta Keywords
   ├── URL Path Patterns & Subdomains
   ├── Text Density & Leetspeak Obfuscation
   └── Hidden Chatroom & Adult Overlay Detection
              │
              ▼
   Threat Score >= Threshold? ───► YES ──► [ Save Local Cache & Safe Redirect ]
              │
             NO
              ▼
       [ Allow Access ]
```

---

## 🌐 Browser & Platform Compatibility

| Operating System / Device | Browser | Supported Extension | Status |
| :--- | :--- | :--- | :---: |
| **Windows / macOS / Linux** | Google Chrome | Tampermonkey / ScriptCat / Violentmonkey | ✅ Active |
| **Windows / macOS / Linux** | Mozilla Firefox | Tampermonkey / Violentmonkey / Greasemonkey | ✅ Active |
| **Windows / macOS / Linux** | Brave Browser | Tampermonkey / ScriptCat | ✅ Active |
| **Windows / macOS / Linux** | Microsoft Edge | Tampermonkey / ScriptCat | ✅ Active |
| **Windows / macOS / Linux** | Opera / Vivaldi | Tampermonkey / Violentmonkey | ✅ Active |
| **Android / Mobile** | Kiwi Browser / Firefox Nightly | Tampermonkey / ScriptCat / Violentmonkey | ✅ Active |

---

## 🛠️ Configuration & Customization

You can easily adjust sensitivity thresholds or changing the redirect destination by editing `p.user.js` in your extension editor:

```javascript
const REDIRECT_URL = 'https://duckduckgo.com/'; // Redirect URL for blocked sites
const BLOCK_THRESHOLD = 6;                       // Overall score sensitivity (lower = stricter)
const CONTENT_THRESHOLD = 18;                    // Body text keyword sensitivity threshold
```

---

## 🔒 Security & Privacy Commitments

- **100% Client-Side Processing**: Every scan and decision occurs entirely within your browser engine.
- **Zero Third-Party Telemetry**: CleanWeb Shield does not collect, store, or transmit your browsing history to external servers.
- **Open-Source Integrity**: Full transparency with 100% readable source code.

---

## 🔍 Search Keywords & SEO Tags

`cleanweb-shield` • `adult-content-blocker` • `nsfw-blocker` • `family-shield` • `safe-browsing` • `parental-controls` • `tampermonkey-script` • `scriptcat` • `violentmonkey` • `greasemonkey` • `userscript` • `focus-guard` • `nofap-blocker` • `porn-blocker` • `content-filter` • `browser-extension` • `anti-porn` • `chrome-blocker` • `firefox-blocker` • `safe-search`

---

## 📝 License

Distributed under the open-source **[MIT License](LICENSE)**. Free for personal, commercial, and educational use.

---

<p align="center">
  Maintained with ❤️ by <a href="https://github.com/deactivated0"><strong>deactivated0</strong></a>
</p>
