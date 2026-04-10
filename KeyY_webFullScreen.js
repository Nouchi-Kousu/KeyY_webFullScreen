// ==UserScript==
// @name         Y键网页全屏
// @namespace    https://github.com/Nouchi-Kousu/KeyY_webFullScreen/
// @version      2026-04-10.1
// @description  B 站播放页面 Y 键网页全屏
// @author       Nouchi
// @match        *://www.bilibili.com/video/*
// @match        *://www.bilibili.com/list/*
// @match        *://live.bilibili.com/*
// @icon         http://bilibili.com/favicon.ico
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
    "use strict";
    const video_observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                const webFullScreen = document.querySelector(
                    'div[aria-label="网页全屏"]',
                );
                if (webFullScreen) {
                    document.addEventListener("keydown", (e) => {
                        const target = e.target;
                        if (
                            target.tagName === "INPUT" ||
                            target.tagName === "TEXTAREA" ||
                            target.isContentEditable
                        )
                            return;
                        if (e.code == "KeyY") {
                            webFullScreen.click();
                        }
                    });
                    video_observer.disconnect();
                    break;
                }
            }
        }
    });

    const live_observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            const livePlayer = window.top && window.top.livePlayer;
            if (!livePlayer) continue;
            document.addEventListener("keydown", (e) => {
                const target = e.target;
                if (
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable
                )
                    return;
                if (e.code == "KeyY") {
                    const isWebFullscreenNow =
                        document.body &&
                        document.body.classList &&
                        document.body.classList.contains("player-full-win");
                    const nextStatus = isWebFullscreenNow ? 0 : 1;
                    livePlayer.setFullscreenStatus(nextStatus);
                }
            });
            live_observer.disconnect();
            break;
        }
    });

    if (/live\.bilibili\.com\/\d+/.test(window.location.href)) {
        live_observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    } else {
        video_observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
})();
