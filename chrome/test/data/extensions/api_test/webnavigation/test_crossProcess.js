// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

onload = function() {
  var getURL = chrome.extension.getURL;
  var URL_REGULAR =
      "http://127.0.0.1:PORT/files/extensions/api_test/webnavigation/crossProcess/empty.html";
  var URL_REDIRECT = "http://www.a.com:PORT/server-redirect";
  var URL_TEST = "http://127.0.0.1:PORT/test";
  chrome.tabs.create({"url": "about:blank"}, function(tab) {
    var tabId = tab.id;
    chrome.test.getConfig(function(config) {
      var fixPort = function(url) {
        return url.replace(/PORT/g, config.testServer.port);
      };
      URL_REGULAR = fixPort(URL_REGULAR);
      URL_REDIRECT = fixPort(URL_REDIRECT);
      URL_TEST = fixPort(URL_TEST);

      chrome.test.runTests([
        // Navigates from an extension page to a HTTP page which causes a
        // process switch.
        function crossProcess() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/a.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/a.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/a.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/a.html') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REGULAR }},
            { label: "b-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: URL_REGULAR }},
            { label: "b-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REGULAR }},
            { label: "b-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REGULAR }}],
            [ navigationOrder("a-"), navigationOrder("b-") ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/a.html?' + config.testServer.port) });
        },

        // Redirects through an app extent, should cause two process switches.
        function crossProcessRedirect() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/c.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/c.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/c.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/c.html') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REDIRECT }},
            { label: "b-onErrorOccurred",
              event: "onErrorOccurred",
              details: { error: "net::ERR_ABORTED",
                         frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REDIRECT }},
            { label: "c-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 2,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REGULAR }},
            { label: "c-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 2,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: URL_REGULAR }},
            { label: "c-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 2,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REGULAR }},
            { label: "c-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 2,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_REGULAR }}],
            [ navigationOrder("a-"),
              navigationOrder("c-"),
              [ "a-onCompleted", "b-onBeforeNavigate", "b-onErrorOccurred",
                "c-onBeforeNavigate"] ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/c.html?' + config.testServer.port) });
        },

        // Navigates to a different site, but then aborts the navigation by
        // starting a new one.
        function crossProcessAbort() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/d.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/d.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/d.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/d.html') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "1" }},
            { label: "b-onErrorOccurred",
              event: "onErrorOccurred",
              details: { error: "net::ERR_ABORTED",
                         frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "1" }},
            { label: "c-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/empty.html') }},
            { label: "c-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: ["client_redirect"],
                         transitionType: "link",
                         url: getURL('crossProcess/empty.html') }},
            { label: "c-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/empty.html') }},
            { label: "c-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/empty.html') }}],
            [ navigationOrder("a-"),
              navigationOrder("c-"),
              [ "a-onCompleted", "b-onBeforeNavigate", "b-onErrorOccurred",
                "c-onCommitted"] ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/d.html?' + config.testServer.port) });
        },

        // Navigates to a different site, but then modifies the history using
        // history.pushState().
        function crossProcessHistory() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/e.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/e.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/e.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/e.html') }},
            { label: "a-onHistoryStateUpdated",
              event: "onHistoryStateUpdated",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                       transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/empty.html') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "2" }},
            { label: "b-onErrorOccurred",
              event: "onErrorOccurred",
              details: { error: "net::ERR_ABORTED",
                         frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "2" }}],
            [ navigationOrder("a-"),
              [ "a-onCompleted", "b-onBeforeNavigate",
                "a-onHistoryStateUpdated"] ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/e.html?' + config.testServer.port) });
        },

        // Navigates to a different site, but then modifies the reference
        // framgent.
        function crossProcessFragment() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/f.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/f.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/f.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/f.html') }},
            { label: "a-onReferenceFragmentUpdated",
              event: "onReferenceFragmentUpdated",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/f.html#foo') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "3" }},
            { label: "b-onErrorOccurred",
              event: "onErrorOccurred",
              details: { error: "net::ERR_ABORTED",
                         frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "3" }}],
            [ navigationOrder("a-"),
              [ "a-onCompleted", "b-onBeforeNavigate",
                "a-onReferenceFragmentUpdated"] ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/f.html?' + config.testServer.port) });
        },

        // A page with an iframe that changes its reference fragment before
        // the iframe committed.
        function crossProcessFragmentIFrame() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/g.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/g.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/g.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/g.html') }},
            { label: "a-onReferenceFragmentUpdated",
              event: "onReferenceFragmentUpdated",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/g.html#foo') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "4" }},
            { label: "b-onCommitted",
              event: "onCommitted",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "auto_subframe",
                         url: URL_TEST + "4" }},
            { label: "b-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "4" }},
            { label: "b-onCompleted",
              event: "onCompleted",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "4" }}],
            [ navigationOrder("a-"), navigationOrder("b-"),
              [ "a-onCompleted", "b-onBeforeNavigate",
                "a-onReferenceFragmentUpdated"] ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/g.html?' + config.testServer.port) });
        },

        // A page with an iframe that changes its history state using
        // history.pushState before the iframe is committed.
        function crossProcessHistoryIFrame() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/h.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/h.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/h.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/h.html') }},
            { label: "a-onHistoryStateUpdated",
              event: "onHistoryStateUpdated",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/empty.html') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "5" }},
            { label: "b-onCommitted",
              event: "onCommitted",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "auto_subframe",
                         url: URL_TEST + "5" }},
            { label: "b-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "5" }},
            { label: "b-onCompleted",
              event: "onCompleted",
              details: { frameId: 1,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "5" }}],
            [ navigationOrder("a-"), navigationOrder("b-"),
              [ "a-onCompleted", "b-onBeforeNavigate",
                "a-onHistoryStateUpdated"] ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/h.html?' + config.testServer.port) });
        },

        // Navigates to a different site, but then modifies the history using
        // history.replaceState().
        function crossProcessHistoryReplace() {
          expect([
            { label: "a-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/i.html') }},
            { label: "a-onCommitted",
              event: "onCommitted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/i.html') }},
            { label: "a-onDOMContentLoaded",
              event: "onDOMContentLoaded",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/i.html') }},
            { label: "a-onCompleted",
              event: "onCompleted",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                         url: getURL('crossProcess/i.html') }},
            { label: "a-onHistoryStateUpdated",
              event: "onHistoryStateUpdated",
              details: { frameId: 0,
                         processId: 0,
                         tabId: 0,
                         timeStamp: 0,
                       transitionQualifiers: [],
                         transitionType: "link",
                         url: getURL('crossProcess/empty.html') }},
            { label: "b-onBeforeNavigate",
              event: "onBeforeNavigate",
              details: { frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "6" }},
            { label: "b-onErrorOccurred",
              event: "onErrorOccurred",
              details: { error: "net::ERR_ABORTED",
                         frameId: 0,
                         processId: 1,
                         tabId: 0,
                         timeStamp: 0,
                         url: URL_TEST + "6" }}],
            [ navigationOrder("a-"),
              [ "a-onCompleted", "b-onBeforeNavigate",
                "a-onHistoryStateUpdated"] ]);

          chrome.tabs.update(
              tabId,
              { url: getURL('crossProcess/i.html?' + config.testServer.port) });
        },

      ]);
    });
  });
};
