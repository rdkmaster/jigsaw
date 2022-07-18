import {NoviceGuide, NoviceGuideNotice, NoviceGuideOptions, ShowingNotice, ShownGuideInfo} from "./types";

export const options: NoviceGuideOptions = {
    // 7 days
    expire: 7 * 24 * 3600 * 1000,
    // 2 hours
    duration: 2 * 3600 * 1000,
    maxShowTimes: 3,
    storageKey: 'jigsaw.noviceGuide',
    maxWaitTargetTimeout: 5000
}
export let shownGuides: ShownGuideInfo[] = JSON.parse(localStorage.getItem(options.storageKey) || '[]');
export const showingNotices: ShowingNotice[] = [];

export function onGoing(): boolean {
    return showingNotices.length > 0 ? !!showingNotices.find(sn => !!sn.mutation) : false;
}

export function clearExpiredGuides() {
    const now = Date.now();
    shownGuides = shownGuides.filter(item => now - item.timestamp < options.expire);
    localStorage.setItem(options.storageKey, JSON.stringify(shownGuides));
}

export function tooManyInterruptions(): boolean {
    const now = Date.now();
    const shown = shownGuides.filter(item => now - item.timestamp < options.duration);
    return shown.length >= options.maxShowTimes;
}

export function copyAndNormalize(guide: NoviceGuide): NoviceGuide {
    const copy = JSON.parse(JSON.stringify(guide));
    copy.notices.forEach(notice => {
        notice.key = toKeyString(notice);
        // 把version复制到notice里，方便后续使用
        notice.version = notice.version || guide.version;
    });
    copy.key = [...copy.notices].sort((n1, n2) => n1.key.localeCompare(n2.key)).map(n => n.key).join();
    return copy;
}

export function debounce(fn: Function, delay: number): () => void {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
    }
}

export function resize() {
    const mask = document.getElementById('novice-guide-mask');
    if (mask) {
        mask.innerHTML = `<rect fill="white" width="100%" height="100%"/>`
    }
    showingNotices.filter(sn => sn.cloneElement).forEach(sn => relocateClone(sn.guideElement, sn.cloneElement, mask));
}

export const debouncedResize = debounce(resize, 300);

export function closeNoviceGuideNotice(noticeKey: string, checkMask: boolean) {
    const idx = showingNotices.findIndex(sn => sn.noticeKey == noticeKey);
    if (idx == -1) {
        return;
    }
    const showing = showingNotices[idx];
    showing.cloneElement.remove();
    showing.mutation?.disconnect();
    showing.mutation = null;
    showingNotices.splice(idx, 1);
    if (!showingNotices.find(sn => sn.cloneElement)) {
        removeGuideContainer();
    }

    if (checkMask) {
        const dialogClone = document.querySelectorAll('.novice-guide-clone .dialog');
        const mask = document.getElementById('novice-guide-mask');
        if (mask) {
            mask.innerHTML = '';
        }
        if (dialogClone.length === 0 && mask) {
            mask.remove();
        }
    }
    resize();
}

export function getGuideContainer(hasMask: boolean): HTMLElement {
    const container = document.getElementById('novice-guide-container');
    if (container === null) {
        const guideContainer = document.createElement('div');
        guideContainer.id = 'novice-guide-container';
        document.body.appendChild(guideContainer);

        if (hasMask) {
            guideContainer.appendChild(createMask())
        }

        checkStyle();
        return guideContainer;
    }

    const mask = document.getElementById('novice-guide-mask');
    if (hasMask && mask === null) {
        container.appendChild(createMask());
    }

    checkStyle();
    return container;
}

export function relocateClone(target: HTMLElement, clone: HTMLElement, mask?: HTMLElement) {
    const {left, top, width, height} = target.getBoundingClientRect();
    if (left + top + width + height === 0) {
        return;
    }

    clone.style.top = top + 'px';
    clone.style.left = left + 'px';
    clone.style.width = width + 'px';
    clone.style.height = height + 'px';
    if (mask) {
        mask.innerHTML += `<rect x="${left}" y="${top}" width="${width}" height="${height}"/>`
    }
    const container = getGuideContainer(false);
    if (container.classList.contains('wizard')) {
        container.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${left}px ${top + height}px, ${left + width}px ${top + height}px, ${left + width}px ${top}px, ${left}px ${top}px, ${left}px ${top + height}px`
    }
}

export function toKeyString(notice: NoviceGuideNotice): string {
    const fields = [notice.version || 'v0'];
    fields.push(notice.selector || '');
    fields.push(notice.tagName || '');
    fields.push(notice.id || '');
    fields.push(notice.classes || '');
    if (notice.attribute1 && notice.attribute1.hasOwnProperty('name') && notice.attribute1.hasOwnProperty('value')) {
        fields.push(`${notice.attribute1.name}=${notice.attribute1.value}`);
    }
    if (notice.attribute2 && notice.attribute2.hasOwnProperty('name') && notice.attribute2.hasOwnProperty('value')) {
        fields.push(`${notice.attribute2.name}=${notice.attribute2.value}`);
    }
    return fields.filter(f => !!f).join('$_$');
}

export function removeGuideContainer(): void {
    const container = document.getElementById('novice-guide-container');
    if (container === null) {
        return;
    }
    container.remove();
}

export function createMask(): Element {
    const svgNS = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";
    const svg = document.createElementNS(svgNS, 'svg');

    svg.setAttributeNS(xlink, 'width', '100%');
    svg.setAttributeNS(xlink, 'height', '100%');
    svg.setAttribute('id', 'novice-guide-svg');

    svg.innerHTML = `
            <mask id="novice-guide-mask"></mask>
            <rect mask="url(#novice-guide-mask)" fill="#00000099" width="100%" height="100%"/>
        `;
    return svg;
}

export function getSelector(notice: NoviceGuideNotice): string {
    if (notice.selector) {
        return notice.selector;
    }

    const tagName = notice.tagName ? notice.tagName.toUpperCase() : '';
    const id = notice.id ? '#' + notice.id : '';
    const classes = notice.classes?.replace(/^\s*/, '.').split(/\s+/).join(".") || '';
    let selector = `${tagName}${id}${classes}`;
    if (notice.attribute1) {
        selector += `[${notice.attribute1.name}=${fixPropValue(notice.attribute1.value)}]`;
    }
    if (notice.attribute2) {
        selector += `[${notice.attribute2.name}=${fixPropValue(notice.attribute2.value)}]`;
    }
    return selector;

    // 替换掉属性值里的部分已知敏感字符
    function fixPropValue(propValue: string | number): string {
        return String(propValue).replace(/([<>[\]'"=])/g, '\\$1')
    }
}

export function removeStyle(): void {
    const noviceGuideStyle = document.getElementById("jigsaw-novice-guide-style-sheet") as HTMLLinkElement;
    if (noviceGuideStyle) {
        document.head.removeChild(noviceGuideStyle);
    }
}

export function checkStyle(): void {
    const id = 'jigsaw-novice-guide-style-sheet';
    const noviceGuideStyle = document.getElementById(id) as HTMLLinkElement;
    if (noviceGuideStyle) {
        return;
    }
    const style = document.createElement('style');
    style.id = id;
    document.getElementsByTagName('head')[0].appendChild(style);
    style.type = 'text/css';
    style.innerHTML = `
        #novice-guide-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: var(--zindex-novice-guide);
        }

        #novice-guide-container.wizard {
            background: #00000099;
        }

        #novice-guide-svg {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%
        }

        .novice-guide-clone {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .novice-guide-clone:hover {
            z-index: 1;
        }

        .novice-guide-clone .bubble {
            position: relative;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            outline: 2px solid var(--brand-default);
        }

        .novice-guide-clone .bubble .line {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .novice-guide-clone .bubble .line>div {
            background: var(--brand-default);
        }

        .novice-guide-clone .bubble.bubble-bottom .line {
            top: 8px;
            left: 0;
            width: 100%;
            height: 80px;
        }

        .novice-guide-clone .bubble.bubble-top .line {
            left: 0;
            bottom: 8px;
            width: 100%;
            height: 80px;
        }

        .novice-guide-clone .bubble.bubble-bottom .line>div,
        .novice-guide-clone .bubble.bubble-top .line>div {
            width: 1px;
            height: 100%;
        }

        .novice-guide-clone .bubble.bubble-right .line {
            top: 0;
            left: 8px;
            width: 80px;
            height: 100%;
        }

        .novice-guide-clone .bubble.bubble-left .line {
            top: 0;
            right: 8px;
            width: 80px;
            height: 100%;
        }

        .novice-guide-clone .bubble.bubble-right .line>div,
        .novice-guide-clone .bubble.bubble-left .line>div {
            width: 100%;
            height: 1px;
        }

        .novice-guide-clone .bubble .notice-cntr {
            position: absolute;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 400px;
            padding: 16px;
            border-radius: 3px;
            background: var(--brand-default);
            box-shadow: var(--box-shadow-lv3);
        }

        .novice-guide-clone .bubble .notice-cntr .text {
            width: 95%;
            color: #fff;
            font-size: var(--font-size-text-base);
        }

        .novice-guide-clone .bubble .notice-cntr .close {
            color: #fff;
            cursor: pointer;
        }

        .novice-guide-clone .bubble.bubble-bottom .notice-cntr {
            top: 88px;
            left: -192px;
        }

        .novice-guide-clone .bubble.bubble-top .notice-cntr {
            bottom: 88px;
            left: -192px;
        }

        .novice-guide-clone .bubble.bubble-right .notice-cntr {
            top: 50%;
            left: 88px;
            transform: translateY(-50%);
        }

        .novice-guide-clone .bubble.bubble-left .notice-cntr {
            top: 50%;
            right: 88px;
            transform: translateY(-50%);
        }

        .novice-guide-clone .dialog .notice-cntr {
            position: absolute;
            width: 400px;
            padding: 16px;
            border-radius: 3px;
            background: var(--bg-component);
        }

        .novice-guide-clone .dialog .notice-cntr .title {
            position: relative;
            font-size: 14px;
            font-weight: bold;
        }

        .novice-guide-clone .dialog .notice-cntr .text {
            min-height: 64px;
            font-size: var(--font-size-text-base);
        }

        .novice-guide-clone .dialog .notice-cntr .button-cntr {
            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        .novice-guide-clone .dialog .notice-cntr .button-cntr .progress {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            height: 32px;
        }

        .novice-guide-clone .dialog .notice-cntr .title .close-arrow {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }

        .novice-guide-clone .dialog .notice-cntr .button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 4px;
            padding: 0 16px;
            min-width: 80px;
            height: 32px;
            border-radius: 3px;
            background: var(--brand-default);
            color: white;
            cursor: pointer;
        }

        .novice-guide-clone .dialog .notice-cntr::after {
            content: '';
            position: absolute;
            background: var(--bg-component);
            height: 20px;
            width: 20px;
            transform: rotate(45deg);
            z-index: -1;
        }

        .novice-guide-clone .dialog.dialog-right .notice-cntr {
            top: 50%;
            left: calc(100% + 20px);
            transform: translateY(-50%);
        }

        .novice-guide-clone .dialog.dialog-right .notice-cntr::after {
            top: 50%;
            left: -10px;
            margin-top: -10px;
        }

        .novice-guide-clone .dialog.dialog-left .notice-cntr {
            top: 50%;
            right: calc(100% + 20px);
            transform: translateY(-50%);
        }

        .novice-guide-clone .dialog.dialog-left .notice-cntr::after {
            top: 50%;
            right: -10px;
            margin-top: -10px;
        }

        .novice-guide-clone .dialog.dialog-bottom .notice-cntr {
            top: calc(100% + 20px);
            left: 50%;
            transform: translateX(-50%);
        }

        .novice-guide-clone .dialog.dialog-bottom .notice-cntr::after {
            top: -10px;
            left: 50%;
            margin-left: -5px;
        }

        .novice-guide-clone .dialog.dialog-top .notice-cntr {
            bottom: calc(100% + 20px);
            left: 50%;
            transform: translateX(-50%);
        }

        .novice-guide-clone .dialog.dialog-top .notice-cntr::after {
            bottom: -10px;
            left: 50%;
            margin-left: -5px;
        }

        .novice-guide-clone .wizard {
            position: absolute;
            width: 300px;
        }

        .novice-guide-clone .wizard .arrow-cntr {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
        }

        .novice-guide-clone .wizard .arrow-cntr .arrow {
            color: #fff;
            font-size: 24px;
            animation: 0.3s ease-out infinite alternate bounce_arrow;
        }

        .novice-guide-clone .wizard .close {
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -6px;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
        }

        .novice-guide-clone .wizard .notice-cntr {
            position: relative;
            padding: 0 16px;
            color: #fff;
            font-size: 24px;
        }

        .novice-guide-clone .wizard.wizard-bottom {
            top: 100%;
        }

        .novice-guide-clone .wizard.wizard-bottom .arrow-cntr {
            transform: rotate(90deg);
        }

        @keyframes bounce_arrow {
            0% {
                transform: translateX(-10px);
            }

            100% {
                transform: translateX(10px);
            }
        }`;
}
