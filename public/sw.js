import { precacheAndRoute } from 'workbox-precaching';
importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');
precacheAndRoute(self.__WB_MANIFEST);
