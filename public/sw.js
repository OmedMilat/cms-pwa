importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.routing.registerRoute(
    new RegExp('.*/wp-json/.*'),
    workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
    new RegExp('https://dev-cmshowest.pantheonsite.io/wp-content/uploads/.*'),
    workbox.strategies.networkFirst()
);

workbox.routing.registerNavigationRoute('./index.html');

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/fonts/Formula1-Bold.ttf",
    "revision": "0819be9f7b49bc08416fb2f43b00fa0f"
  },
  {
    "url": "assets/fonts/Formula1-Regular.ttf",
    "revision": "90c10fedcba64d6d4ec43309b0971b4b"
  },
  {
    "url": "assets/fonts/TitilliumWeb-Bold.ttf",
    "revision": "a9f517c1ea874345a3951d5ec4ea545c"
  },
  {
    "url": "assets/fonts/TitilliumWeb-Regular.ttf",
    "revision": "4f5848e6a415f5a4964a272d8b633164"
  },
  {
    "url": "assets/fonts/TitilliumWeb-SemiBold.ttf",
    "revision": "600f2d0861eeddb39f0d8b0ff13ef59c"
  },
  {
    "url": "assets/images/icons/f1tv.png",
    "revision": "ad6c95b6b18407344e69c0074ef6f71b"
  },
  {
    "url": "assets/images/icons/logo/f1_logo_red.svg",
    "revision": "b3063b9049c7d32c7f5f23a753935b2a"
  },
  {
    "url": "assets/images/icons/logo/f1_logo.svg",
    "revision": "66d73a5c70a27de79bfff0bd4eb5d695"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-128x128.png",
    "revision": "156a15a846b1823e6e7d38afc82fa97c"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-144x144.png",
    "revision": "a341dfb65ad89f3bbaafdcfb1e83ab4e"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-152x152.png",
    "revision": "b3f4d2f4f02d5afff7a4c26a2843ce77"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-192x192.png",
    "revision": "4a024d8698a4e8d748ff6751fb9fb428"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-384x384.png",
    "revision": "32629e52bf0d2293ded3c9b0bebcf3d4"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-512x512.png",
    "revision": "46efb0f0c19581f28c4e9f1fde49ba8a"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-72x72.png",
    "revision": "0401fdb3aaac3f721352d2837df0944e"
  },
  {
    "url": "assets/images/icons/pwa-manifest/icon-96x96.png",
    "revision": "0a19fcfd74c7194aded9a74b463b478f"
  },
  {
    "url": "assets/logo.png",
    "revision": "82b9c7a5a3f405032b1db71a25f67021"
  },
  {
    "url": "favicon.ico",
    "revision": "fe9b18a71d1001176d957206b36ffc13"
  },
  {
    "url": "index.html",
    "revision": "30be22317a0299b4757bda4f2a0bd62c"
  },
  {
    "url": "manifest.json",
    "revision": "8796083d169ecaf4ac782bea0b5ba178"
  },
  {
    "url": "robots.txt",
    "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
  },
  {
    "url": "src-sw.js",
    "revision": "6ef7a6c57903c3bf1439477ffe737f6b"
  },
  "/app.js"
]);