// ==UserScript==
// @name         Y键网页全屏
// @namespace    https://github.com/Nouchi-Kousu/KeyY_webFullScreen/
// @version      2024-11-27
// @description  B 站播放页面 Y 键网页全屏
// @author       Nouchi
// @match        *://www.bilibili.com/video/*
// @match        *://www.bilibili.com/list/*
// @icon         http://bilibili.com/favicon.ico
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
    'use strict'
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const webFullScreen = document.querySelector('div[aria-label="网页全屏"]')
                if (webFullScreen) {
                    console.log('目标元素已加载:', webFullScreen)
                    document.addEventListener('keydown',(e)=>{
                        if(e.code == 'KeyY'){
                            webFullScreen.click()
                        }
                    })
                    observer.disconnect()
                    break
                }
            }
        }
    })

    observer.observe(document.body, { childList: true, subtree: true })


})()
