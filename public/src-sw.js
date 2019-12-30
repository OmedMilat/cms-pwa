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

workbox.precaching.precacheAndRoute([]);