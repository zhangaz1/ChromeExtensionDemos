'use strict';

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({
  text: '\'Allo'
});

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var currentTime = new Date();
    if (isOfficeTime(currentTime) && isWeekday(currentTime)) {
      return {
        redirectUrl: chrome.extension.getURL('index.html')
      };
    }
    return details.url;
  }, {
    urls: [
      "*://*.facebook.com/*",
      "*://*.twitter.com/*",
      "*://*.gmail.com/*",
    ],
    types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
  }, ["blocking"]
);

function isOfficeTime(currentTime) {
  var hour = currentTime.getHours();
  return hour > 9 && hour < 18;
}

function isWeekday(currentTime) {
  var dayOfWeek = currentTime.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}