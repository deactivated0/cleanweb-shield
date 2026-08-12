// ==UserScript==
// @name         CleanWeb Shield | Smart Family Safeguard & Content Filter
// @namespace    https://github.com/deactivated0/
// @version      2.0.0
// @description  Lightweight family-safe content filter with trusted-site handling, weighted multilingual detection, SPA support, and temporary blacklisting.
// @author       https://github.com/deactivated0/
// @match        *://*/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        window.onurlchange
// ==/UserScript==

(() => {
  'use strict';

  const INIT = Symbol.for('CleanWebShield.v2');
  if (globalThis[INIT]) return;
  globalThis[INIT] = 1;

  const REDIRECT_URL = 'https://duckduckgo.com/';
  const BL_KEY = 'pornblocker-blacklist';
  const BL_VER = '5';
  const EXPIRE = 2592000000;
  const BLOCK_THRESHOLD = 6;
  const CONTENT_THRESHOLD = 18;
  const TRUSTED_CONTENT_THRESHOLD = 30;
  const TITLE_THRESHOLD = 5;
  const TRUSTED_TITLE_THRESHOLD = 6;
  const PATH_THRESHOLD = 5;
  const TRUSTED_PATH_THRESHOLD = 6;
  const WATCH_TIME = 20000;
  const MAX_BODY_TEXT = 20000;
  const MAX_PAGE_TEXT = 28000;

  const SAFE_HOSTS =
    '|wikipedia.org|wikimedia.org|wikidata.org|wiktionary.org|wikisource.org|wikiquote.org|wikibooks.org|wikiversity.org|britannica.com|encyclopedia.com|merriam-webster.com|dictionary.com|thesaurus.com|etymonline.com|gutenberg.org|openlibrary.org|worldcat.org|' +
    'khanacademy.org|coursera.org|edx.org|udemy.com|futurelearn.com|brilliant.org|codecademy.com|freecodecamp.org|duolingo.com|wolframalpha.com|quizlet.com|openstax.org|ck12.org|edutopia.org|ted.com|ocw.mit.edu|' +
    'arxiv.org|jstor.org|nature.com|science.org|cell.com|sciencedirect.com|springer.com|wiley.com|plos.org|biorxiv.org|medrxiv.org|researchgate.net|semanticscholar.org|crossref.org|doi.org|' +
    'mit.edu|stanford.edu|harvard.edu|berkeley.edu|cmu.edu|caltech.edu|princeton.edu|yale.edu|columbia.edu|cornell.edu|ox.ac.uk|cam.ac.uk|imperial.ac.uk|ucl.ac.uk|ethz.ch|epfl.ch|ac.uk|ac.jp|ac.in|ac.nz|edu.au|edu.cn|edu.in|edu.tr|edu.iq|' +
    'nih.gov|cdc.gov|fda.gov|nasa.gov|noaa.gov|nist.gov|nsf.gov|loc.gov|usa.gov|whitehouse.gov|congress.gov|irs.gov|who.int|un.org|unesco.org|unicef.org|europa.eu|gov.uk|service.gov.uk|canada.ca|gc.ca|australia.gov.au|gov.au|gov.br|gov.in|go.jp|gov.cn|gov.tr|gov.iq|gov.sa|gov.ae|gov.kr|gov.sg|gov.nz|gob.es|gob.mx|gouv.fr|bund.de|gouvernement.fr|elysee.fr|' +
    'mayoclinic.org|webmd.com|clevelandclinic.org|healthline.com|medlineplus.gov|nhs.uk|nhsinform.scot|kidshealth.org|plannedparenthood.org|' +
    'reuters.com|apnews.com|bbc.com|bbc.co.uk|npr.org|pbs.org|theguardian.com|nytimes.com|washingtonpost.com|cnn.com|aljazeera.com|dw.com|france24.com|cnbc.com|bloomberg.com|economist.com|ft.com|time.com|newsweek.com|' +
    'stackoverflow.com|stackexchange.com|superuser.com|serverfault.com|askubuntu.com|github.com|gitlab.com|gitee.com|codeberg.org|bitbucket.org|sourceforge.net|npmjs.com|pypi.org|crates.io|rubygems.org|packagist.org|nuget.org|maven.apache.org|gradle.org|docker.com|kubernetes.io|helm.sh|terraform.io|hashicorp.com|' +
    'python.org|nodejs.org|deno.com|bun.sh|rust-lang.org|go.dev|java.com|oracle.com|kotlinlang.org|swift.org|php.net|ruby-lang.org|perl.org|r-project.org|julialang.org|lua.org|gnu.org|kernel.org|linux.org|linuxfoundation.org|freedesktop.org|apache.org|nginx.org|caddyserver.com|openssl.org|letsencrypt.org|owasp.org|ietf.org|rfc-editor.org|icann.org|git-scm.com|' +
    'mozilla.org|developer.mozilla.org|w3.org|web.dev|caniuse.com|devdocs.io|readthedocs.io|docs.rs|developer.android.com|developer.apple.com|developer.chrome.com|chromium.org|developers.google.com|learn.microsoft.com|docs.microsoft.com|' +
    'archlinux.org|cachyos.org|debian.org|ubuntu.com|fedora.org|opensuse.org|linuxmint.com|manjaro.org|alpinelinux.org|gentoo.org|voidlinux.org|distrowatch.com|' +
    'apple.com|microsoft.com|adobe.com|intel.com|amd.com|nvidia.com|ibm.com|samsung.com|sony.com|asus.com|gigabyte.com|msi.com|lenovo.com|dell.com|hp.com|acer.com|qualcomm.com|mediatek.com|raspberrypi.com|' +
    'cloudflare.com|digitalocean.com|linode.com|akamai.com|aws.amazon.com|azure.microsoft.com|cloud.google.com|firebase.google.com|vercel.com|netlify.com|heroku.com|render.com|supabase.com|' +
    'paypal.com|stripe.com|wise.com|visa.com|mastercard.com|americanexpress.com|westernunion.com|worldbank.org|imf.org|oecd.org|' +
    'proton.me|protonmail.com|signal.org|firefox.com|opera.com|vivaldi.com|zoom.us|openai.com|anthropic.com|deepmind.google|huggingface.co|kaggle.com|pytorch.org|tensorflow.org|jupyter.org|colab.research.google.com|overleaf.com|grammarly.com|deepl.com|translate.google.com|maps.google.com|earth.google.com|scholar.google.com|books.google.com|fonts.google.com|patents.google.com|';

  const TRUSTED_HOSTS =
    '|google.com|bing.com|duckduckgo.com|brave.com|ecosia.org|qwant.com|startpage.com|you.com|yahoo.com|baidu.com|yandex.com|naver.com|daum.net|so.com|sogou.com|sm.cn|ask.com|aol.com|searx.me|' +
    'chatgpt.com|claude.ai|gemini.google.com|copilot.microsoft.com|meta.ai|perplexity.ai|mistral.ai|x.ai|deepseek.com|character.ai|poe.com|groq.com|cohere.com|openrouter.ai|together.ai|fireworks.ai|phind.com|' +
    'youtube.com|youtu.be|vimeo.com|dailymotion.com|twitch.tv|reddit.com|old.reddit.com|facebook.com|instagram.com|threads.net|x.com|twitter.com|tiktok.com|pinterest.com|snapchat.com|tumblr.com|discord.com|telegram.org|t.me|vk.com|weibo.com|douyin.com|zhihu.com|quora.com|' +
    'spotify.com|genius.com|music.apple.com|music.youtube.com|soundcloud.com|bandcamp.com|tidal.com|deezer.com|music.amazon.com|pandora.com|qobuz.com|audiomack.com|musixmatch.com|last.fm|discogs.com|musicbrainz.org|rateyourmusic.com|allmusic.com|beatport.com|traxsource.com|iheart.com|tunein.com|azlyrics.com|songlyrics.com|setlist.fm|distrokid.com|tunecore.com|cdbaby.com|splice.com|looperman.com|music.yandex.ru|y.qq.com|music.163.com|anghami.com|jiosaavn.com|gaana.com|' +
    'dropbox.com|drive.google.com|onedrive.live.com|box.com|mega.io|pcloud.com|icloud.com|docs.google.com|sheets.google.com|slides.google.com|mail.google.com|calendar.google.com|meet.google.com|classroom.google.com|' +
    'archive.org|wordpress.com|wordpress.org|blogger.com|blogspot.com|medium.com|substack.com|notion.so|notion.site|evernote.com|trello.com|asana.com|todoist.com|slack.com|discordapp.com|github.io|gitlab.io|replit.com|fandom.com|' +
    'amazon.com|ebay.com|etsy.com|walmart.com|aliexpress.com|alibaba.com|target.com|bestbuy.com|ikea.com|booking.com|airbnb.com|tripadvisor.com|expedia.com|skyscanner.com|kayak.com|uber.com|lyft.com|' +
    'netflix.com|disneyplus.com|hulu.com|max.com|primevideo.com|paramountplus.com|peacocktv.com|crunchyroll.com|imdb.com|rottentomatoes.com|goodreads.com|steamcommunity.com|steampowered.com|epicgames.com|xbox.com|playstation.com|itch.io|deviantart.com|artstation.com|pixiv.net|flickr.com|imgur.com|mastodon.social|bsky.app|';

  const DANGEROUS_TLD = /^(?:xxx|porn|sex|adult)$/;
  const KNOWN_ADULT_HOST = /(?:pornhub|xvideos?|redtube|xnxx|xhamster|youporn|spankbang|eporner|tnaflix|tube8|drtuber|youjizz|beeg|motherless|thumbzilla|keezmovies|empflix|nuvid|hclips|hotmovs|hqporner|porntrex|porndig|pornone|pornhd|sunporno|txxx|pornpics|imagefap|theporndude|redgifs|fapello|erome|missav|javhd|javlibrary|javguru|javmost|javdb|javbus|supjav|jable|nhentai|hanime|hentaihaven|hentaifox|hentai2read|ehentai|exhentai|rule34|gelbooru|danbooru|onlyfans|fansly|manyvids|myfreecams|chaturbate|stripchat|bongacams|livejasmin|camsoda|flirt4free|cam4|brazzers|bangbros|realitykings|naughtyamerica|teamskeet|mofos|digitalplayground|vixen|tushy|blacked|adulttime|literotica|fetlife|f95zone|kemono|coomer|simpcity|adultfriendfinder|omegle|ometv|umingle|chatrandom|chatroulette|coomeet|emeraldchat|shagle|dirtyroulette|flingster|bazoocam|flirtymania)/i;
  const STRONG_ADULT_HOST = /(?:porn|porno|pr0n|p0rn|xxx|hentai|nsfw|rule34|sexcam|sexchat|sexvideo|sextube|liveporn|adultcam|adultvideo|adulttube|nudecam|nakedcam|camgirl|camwhore|brothel|prostitut|escort)/i;
  const RISK_HOST_LABEL = /(?:^|[.-])(?:adult|sex|nude|naked|erotic|fetish|bdsm|escort|escorts|stripclub)(?:[.-]|$)/i;

  let contentRules;
  let blacklistCache;
  let blacklistHosts;
  let blacklistLoading;
  let cachedHost = '';
  let cachedHostClass = 0;
  let redirecting = false;
  let scanId = 0;
  let lastUrl = '';
  let navigationTimer = 0;
  let mutationTimer = 0;
  let watcherTimer = 0;
  let bodyObserver;
  let titleObserver;
  let dynamicRuns = 0;
  let activeHost = '';
  let activeTrusted = false;
  let activeScanId = 0;

  function listed(list, host) {
    if (list.indexOf('|' + host + '|') !== -1) return true;
    for (let i = host.indexOf('.'); i >= 0; i = host.indexOf('.', i + 1)) {
      if (list.indexOf('|' + host.slice(i + 1) + '|') !== -1) return true;
    }
    return false;
  }

  function hostClass(host) {
    if (host === cachedHost) return cachedHostClass;
    cachedHost = host;
    const tld = host.slice(host.lastIndexOf('.') + 1);
    if (tld === 'edu' || tld === 'gov' || tld === 'mil' || listed(SAFE_HOSTS, host)) return cachedHostClass = 1;
    return cachedHostClass = listed(TRUSTED_HOSTS, host) ? 2 : 0;
  }

  function mapLeet(c) {
    return 'aaeiosstbii'['4@310$578!|'.indexOf(c)];
  }

  function normalizeText(text) {
    return String(text || '')
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[4@310$578!|]/g, mapLeet)
      .replace(/[\s._*~`'’"“”|\/\\:;,+()\[\]{}<>=?%&#^\-]+/g, ' ')
      .replace(/([a-z])\1{2,}/g, '$1');
  }

  function scoreText(text, limit) {
    const value = normalizeText(text);
    if (!value) return 0;

    if (!contentRules) {
      contentRules = [
        8, /\b(?:child\s*(?:porn|sexual\s*abuse\s*material)|csam|lolicon|shotacon|bestiality|zoophilia|necrophilia|incest\s*porn|pornhub|xvideos?|xnxx|xhamster|redtube|youporn|spankbang|chaturbate|stripchat|bongacams|livejasmin|nhentai|rule\s*34|literotica|fetlife|redgifs)\b/giu,
        6, /\b(?:porn(?:ography|ographic|videos?|movies?|images?|pics?|sites?)?|porno|pron|prawn|nsfw|hentai|xxx|adult\s*(?:content|videos?|movies?|images?|sites?|cams?|chat)|sex\s*(?:videos?|movies?|cams?|chat|sites?|tapes?)|nudes?|nudity|naked|topless|bottomless|upskirt|creampie|cumshots?|bukkake|gangbang|org(?:y|ies)|threesomes?|blow\s*job|hand\s*job|rim\s*job|foot\s*job|deep\s*throat|masturbat(?:e|ion|ing)|onlyfans|fansly|manyvids|myfreecams|camgirls?|camwhore|prostitut(?:e|ion)\w*|brothels?|escorts?|stripclubs?|cyber\s*sex|live\s*cams?)\b|色情|成人内容|成人视频|成人网站|成人影片|成人图片|性交|性爱|性奴|裸照|裸图|淫秽|约炮|约啪|口交|肛交|吞精|内射|乳交|射精|潮吹|狂操|轮奸|乱伦|ポルノ|エロ画像|エロ動画|無修正|オナニー|手コキ|パイズリ|中出し|섹스|야동|음란물|성인영상|성인사이트|порно|порнография|إباحي|اباحي|إباحية|اباحية|بورنو|محتوى\s*للبالغين|أفلام\s*للكبار|افلام\s*للكبار|صور\s*عارية|جماع|استمناء|عادة\s*سرية|دعارة|پۆرن|سێکس|پورن|مستهجن|رابطه\s*جنسی|pornografía|pornografia|pornographie|pornografie|pornografia|pornô|contenido\s*para\s*adultos|contenu\s*adulte|conteúdo\s*adulto|inhalt\s*für\s*erwachsene|porno|bokep|telanjang|अश्लील|पोर्न|सेक्स|çıplak|khiêu\s*dâm|phim\s*người\s*lớn/giu,
        5, /\b(?:fetish(?:es|ism)?|bdsm|bondage|dominatrix|stripper(?:s|ing)?|sex\s*worker|sex\s*work|erotic(?:a)?|lewd(?:ness)?|anal\s*sex|oral\s*sex|cuckold|shemale|tranny|p\s+o\s+r\s+n|p\s+r\s+o\s+n|n\s+s\s+f\s+w|h\s+e\s+n\s+t\s+a\s+i|l\s+o\s+l\s+i|s\s+h\s+o\s+t\s+a|n\s+u\s+d\s+e|n\s+a\s+k\s+e\s+d)\b|裸体|全裸|淫荡|淫乱|女优|男优|痴女|음란|성인물|обнажённый|обнаженная|эротика|عري|عارية|برهنه|desnudos?|nackt|nudo|nuda|nuas?|erótico|erotico|érotique|erotik/giu,
        3, /\b(?:sex|sexy|sexting|horny|fap(?:ping)?|milfs?|gilfs?|webcams?|virginity|genitals?)\b|性行为|阴茎|阴道|高潮|涩图|涩涩|色图|エロ|エロい|エッチ|えっち|えちえち|성인|누드|야짤|야설|노출|секс|سكس|نيك|زب|جنس\s*فموي|جنس\s*شرجي|sexo|sexe|sesso|seks/giu,
        2, /\b(?:cum|cums|cumming|thicc|bussy|sloot|noods?)\b|🔞/giu
      ];
    }

    let score = 0;
    for (let i = 0; i < contentRules.length; i += 2) {
      const weight = contentRules[i];
      const re = contentRules[i + 1];
      re.lastIndex = 0;
      while (re.exec(value)) {
        score += weight;
        if (score >= limit) return score;
      }
    }
    return score;
  }

  function scoreDomain(host) {
    const tld = host.slice(host.lastIndexOf('.') + 1);
    if (DANGEROUS_TLD.test(tld)) return 20;
    const compact = host.replace(/[^a-z0-9\u0080-\uffff]/gi, '');
    if (KNOWN_ADULT_HOST.test(compact)) return 20;
    let score = 0;
    if (STRONG_ADULT_HOST.test(compact)) score += 8;
    if (RISK_HOST_LABEL.test(host)) score += 6;
    return score;
  }

  function urlText(url) {
    let text = (url.pathname || '') + ' ' + (url.search || '') + ' ' + (url.hash || '');
    text = text.replace(/\+/g, ' ');
    if (text.indexOf('%') === -1) return text;
    try {
      return decodeURIComponent(text);
    } catch {
      return text;
    }
  }

  function pageText(url) {
    let text = (document.title || '') + '\n' + urlText(url);
    const metas = document.querySelectorAll('meta[name="description"],meta[name="keywords"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"],meta[property="twitter:title"],meta[property="twitter:description"]');

    for (let i = 0; i < metas.length && text.length < 5000; i++) {
      const value = metas[i].content;
      if (value) text += '\n' + value;
    }

    const images = document.images;
    for (let i = 0; i < images.length && i < 160 && text.length < 8000; i++) {
      const value = (images[i].alt || '') + ' ' + (images[i].title || '');
      if (value.trim()) text += '\n' + value;
    }

    if (document.body) text += '\n' + (document.body.innerText || '').slice(0, MAX_BODY_TEXT);
    return text.slice(0, MAX_PAGE_TEXT);
  }

  async function gmGet(key, fallback) {
    try {
      const value = await GM_getValue(key);
      return value === undefined ? fallback : value;
    } catch {
      return fallback;
    }
  }

  async function gmSet(key, value) {
    try {
      await GM_setValue(key, value);
    } catch {}
  }

  async function loadBlacklist() {
    if (await gmGet('pornblocker-ver', null) !== BL_VER) {
      await gmSet('pornblocker-ver', BL_VER);
      await gmSet(BL_KEY, []);
      blacklistHosts = new Set();
      return blacklistCache = [];
    }

    const now = Date.now();
    const stored = await gmGet(BL_KEY, []);
    const source = Array.isArray(stored) ? stored : [];
    const list = [];
    const hosts = new Set();
    let changed = !Array.isArray(stored);

    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      if (typeof item === 'string') {
        const host = item.toLowerCase();
        list.push({ host, reason: 'legacy', added: now, expire: now + EXPIRE });
        hosts.add(host);
        changed = true;
      } else if (item && item.host && item.expire > now) {
        list.push(item);
        hosts.add(item.host);
      } else {
        changed = true;
      }
    }

    blacklistCache = list;
    blacklistHosts = hosts;
    if (changed) await gmSet(BL_KEY, list);
    return list;
  }

  async function getBlacklist() {
    if (blacklistCache) return blacklistCache;
    if (!blacklistLoading) blacklistLoading = loadBlacklist();
    try {
      return await blacklistLoading;
    } finally {
      blacklistLoading = null;
    }
  }

  async function inBlacklist(host) {
    await getBlacklist();
    return blacklistHosts.has(host);
  }

  async function addBlacklist(host, reason) {
    if (hostClass(host) === 1) return;
    const list = await getBlacklist();
    if (blacklistHosts.has(host)) return;
    const now = Date.now();
    list.push({ host, reason, added: now, expire: now + EXPIRE });
    blacklistHosts.add(host);
    await gmSet(BL_KEY, list);
  }

  function stopWatchers() {
    clearTimeout(mutationTimer);
    clearTimeout(watcherTimer);
    mutationTimer = watcherTimer = 0;
    if (bodyObserver) {
      bodyObserver.disconnect();
      bodyObserver = null;
    }
    if (titleObserver) {
      titleObserver.disconnect();
      titleObserver = null;
    }
  }

  function go() {
    if (redirecting) return;
    redirecting = true;
    clearTimeout(navigationTimer);
    stopWatchers();
    try {
      window.stop();
    } catch {}
    try {
      location.replace(REDIRECT_URL);
    } catch {
      location.href = REDIRECT_URL;
    }
  }

  async function block(host, reason) {
    await addBlacklist(host, reason);
    go();
  }

  function scheduleDynamicScan(delay) {
    clearTimeout(mutationTimer);
    mutationTimer = setTimeout(async () => {
      mutationTimer = 0;
      if (redirecting || activeScanId !== scanId || !document.body) return;
      if (location.href !== lastUrl) {
        scheduleScan(30);
        return;
      }
      if (++dynamicRuns > 6) {
        stopWatchers();
        return;
      }
      const url = new URL(location.href);
      const threshold = activeTrusted ? TRUSTED_CONTENT_THRESHOLD : CONTENT_THRESHOLD;
      if (scoreText(pageText(url), threshold) >= threshold) await block(activeHost, 'dynamic');
    }, delay);
  }

  function startWatchers(host, trusted, id) {
    stopWatchers();
    if (!document.body || redirecting) return;

    activeHost = host;
    activeTrusted = trusted;
    activeScanId = id;
    dynamicRuns = 0;

    bodyObserver = new MutationObserver(mutations => {
      if (redirecting || activeScanId !== scanId) return;
      if (location.href !== lastUrl) {
        scheduleScan(30);
        return;
      }

      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i];
        const target = mutation.target;
        if (
          mutation.addedNodes.length > 3 ||
          target === document.body ||
          (target && target.nodeType === 1 && /^(?:MAIN|ARTICLE|SECTION)$/.test(target.tagName))
        ) {
          scheduleDynamicScan(600);
          return;
        }
      }
    });

    try {
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    } catch {}

    const title = document.querySelector('title');
    if (title) {
      const observer = titleObserver = new MutationObserver(() => {
        if (redirecting || activeScanId !== scanId) return;
        const limit = trusted ? TRUSTED_TITLE_THRESHOLD : TITLE_THRESHOLD;
        if (scoreText(document.title, limit) >= limit) {
          observer.disconnect();
          if (titleObserver === observer) titleObserver = null;
          block(host, 'title-change');
        } else {
          scheduleDynamicScan(350);
        }
      });
      try {
        observer.observe(title, { childList: true, characterData: true, subtree: true });
      } catch {}
    }

    scheduleDynamicScan(800);
    watcherTimer = setTimeout(stopWatchers, WATCH_TIME);
  }

  async function scanNow() {
    const id = ++scanId;
    stopWatchers();

    let url;
    try {
      url = new URL(location.href);
    } catch {
      return;
    }

    const host = url.hostname.toLowerCase();
    if (!host) return;
    lastUrl = url.href;

    const type = hostClass(host);
    if (type === 1) return;

    if (await inBlacklist(host)) {
      if (id === scanId) go();
      return;
    }
    if (id !== scanId || redirecting) return;

    const trusted = type === 2;
    if (!trusted && scoreDomain(host) >= BLOCK_THRESHOLD) {
      await block(host, 'domain');
      return;
    }

    const titleLimit = trusted ? TRUSTED_TITLE_THRESHOLD : TITLE_THRESHOLD;
    if (scoreText(document.title, titleLimit) >= titleLimit) {
      await block(host, 'title');
      return;
    }

    const pathLimit = trusted ? TRUSTED_PATH_THRESHOLD : PATH_THRESHOLD;
    if (scoreText(urlText(url), pathLimit) >= pathLimit) {
      await block(host, 'path');
      return;
    }

    if (!document.body) return;

    const contentLimit = trusted ? TRUSTED_CONTENT_THRESHOLD : CONTENT_THRESHOLD;
    if (scoreText(pageText(url), contentLimit) >= contentLimit) {
      await block(host, 'content');
      return;
    }

    if (id === scanId && !redirecting) startWatchers(host, trusted, id);
  }

  function scheduleScan(delay) {
    if (redirecting) return;
    clearTimeout(navigationTimer);
    navigationTimer = setTimeout(scanNow, delay);
  }

  function patchHistory(name) {
    const original = history[name];
    if (typeof original !== 'function') return;
    try {
      history[name] = function () {
        const result = original.apply(this, arguments);
        scheduleScan(30);
        return result;
      };
    } catch {}
  }

  if (window.onurlchange === null) {
    addEventListener('urlchange', () => scheduleScan(30));
  } else {
    addEventListener('popstate', () => scheduleScan(30), { passive: true });
    addEventListener('hashchange', () => scheduleScan(30), { passive: true });
    if (window.navigation && typeof window.navigation.addEventListener === 'function') {
      window.navigation.addEventListener('navigatesuccess', () => scheduleScan(30));
    } else {
      patchHistory('pushState');
      patchHistory('replaceState');
    }
  }

  document.addEventListener('DOMContentLoaded', () => scheduleScan(0), { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopWatchers();
    else scheduleScan(30);
  }, { passive: true });
  addEventListener('pagehide', stopWatchers, { passive: true });
  addEventListener('pageshow', event => {
    if (event.persisted) scheduleScan(0);
  }, { passive: true });

  scanNow();
})();
