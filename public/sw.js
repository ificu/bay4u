/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('push', (event) => {
    console.log('Push Message : ', event);
});
  
self.addEventListener('notificationclick', (event) => {
    //console.log('Notificationclick Message : ', event);
    var notification = event.notification;

    clients.matchAll()
        .then(function(clis) {
            var client = clis.find(function(c) {
                return c.visibilityState === 'visible';
            });

            if(client !== undefined) {
                client.navigate("http://localhost:8080/Chat");
                client.focus();
            }
            else {
                client.openWindow("http://localhost:8080/Chat");
            }
            notification.close();
        })


});
    

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "robots.txt",
    "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
