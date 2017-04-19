'use strict';

import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';

//import { currentScrollTop} from './util';
var rafID;
var initTime;
var toTop;
export default function scrollToAnim(initTimeTmp, toTopTmp) {
    initTime = initTimeTmp;
    toTop = toTopTmp;
    rafID = undefined;
    requestAnimationFrame(raf);
}


function raf() {
    if (rafID === -1) {
        return;
    }
    const duration = 1450;
    const now = Date.now();
    const scrollTop = currentScrollTop();
    const progressTime = now - initTime > duration ? duration : now - initTime;
    const easeValue = easingTypes['easeInOutQuad'](progressTime, scrollTop, toTop, duration);
    window.scrollTo(window.scrollX, easeValue);
    console.log("easeValue=" + easeValue + ";toTop=" + toTop + ";progressTime=" + progressTime + ";duration=" + duration);
    if (progressTime === duration) {
        cancelRequestAnimationFrame();
    } else {
        rafID = requestAnimationFrame(raf);
    }
}

function cancelRequestAnimationFrame() {
    requestAnimationFrame.cancel(rafID);
    rafID = -1;
}
export function currentScrollTop() {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}
