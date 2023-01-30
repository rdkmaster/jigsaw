import {
    NoviceGuide,
    NoviceGuideNotice,
    NoviceGuideNoticeWithAttributes,
    NoviceGuideNoticeWithInnerText,
    NoviceGuideNoticeWithSelector,
    NoviceGuideOptions,
    ShowingNotice,
    ShownGuideInfo
} from "./types";

export const options: NoviceGuideOptions = {
    // 7 days
    expire: 30 * 24 * 3600 * 1000,
    // 2 hours
    duration: 2 * 3600 * 1000,
    maxShowTimes: 3,
    storageKey: 'jigsaw.noviceGuide',
    maxWaitTargetTimeout: 25000
}
export const shownGuides: ShownGuideInfo[] = [];
try {
    const storage = JSON.parse(localStorage.getItem(options.storageKey) || '[]');
    if (storage instanceof Array) {
        shownGuides.push(...storage);
    } else {
        (<any>shownGuides).disabled = true;
    }
} catch (e) {
    // 避免单测等非浏览器场景下报错
    console.warn('Warn: do not run jigsaw in none browser environment!');
}

export const showingNotices: ShowingNotice[] = [];

export function onGoing(): boolean {
    return showingNotices.length > 0;
}

export function clearExpiredGuides() {
    const now = Date.now();
    const filtered = shownGuides.filter(item => now - item.timestamp < options.expire);
    shownGuides.splice(0, shownGuides.length);
    shownGuides.push(...filtered);
    localStorage.setItem(options.storageKey, JSON.stringify(shownGuides));
}

export function tooManyInterruptions(): boolean {
    const now = Date.now();
    const shown = shownGuides.filter(item => now - item.timestamp < options.duration);
    return shown.length >= options.maxShowTimes;
}

export function copyAndNormalize(guide: NoviceGuide): NoviceGuide {
    const copy = {...guide};
    copy.notices = [...guide.notices];
    copy.notices.forEach(notice => {
        notice.key = toKeyString(notice);
        // 把version复制到notice里，方便后续使用
        notice.version = notice.version || guide.version;
    });
    copy.key = [...copy.notices].sort((n1, n2) => n1.key.localeCompare(n2.key)).map(n => n.key).join(';');
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
        const dialogClone = document.querySelectorAll('.novice-guide-clone .novice-guide-dialog');
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
    if (container.classList.contains('novice-guide-wizard')) {
        container.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${left}px ${top + height}px, ${left + width}px ${top + height}px, ${left + width}px ${top}px, ${left}px ${top}px, ${left}px ${top + height}px`
    }
}

export function toKeyString(notice: NoviceGuideNotice): string {
    const fields = [notice.version || 'v0'];
    const selectorNotice = <NoviceGuideNoticeWithSelector>notice;
    fields.push(selectorNotice.selector || null);

    const attributesNotice = <NoviceGuideNoticeWithAttributes>notice;
    fields.push(attributesNotice.tagName || null);
    fields.push(attributesNotice.id || null);
    fields.push(attributesNotice.classes || null);
    if (attributesNotice.attribute1?.hasOwnProperty('name') && attributesNotice.attribute1?.hasOwnProperty('value')) {
        fields.push(`${attributesNotice.attribute1.name}=${attributesNotice.attribute1.value}`);
    }
    if (attributesNotice.attribute2?.hasOwnProperty('name') && attributesNotice.attribute2?.hasOwnProperty('value')) {
        fields.push(`${attributesNotice.attribute2.name}=${attributesNotice.attribute2.value}`);
    }

    const innerTextNotice = <NoviceGuideNoticeWithInnerText>notice;
    fields.push(innerTextNotice.innerText?.toString() || null);

    return fields.filter(f => f != null).join(',');
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

export function queryNode(notice: NoviceGuideNotice): HTMLElement {
    const innerTextNotice = <NoviceGuideNoticeWithInnerText>notice;
    if (innerTextNotice.innerText != null) {
        let selector = (<any>innerTextNotice).selector;
        if (typeof selector != 'string') {
            selector = getSelector(innerTextNotice)
        }
        // 实测querySelector的性能可以接受（万次耗时500~700ms）
        const nodes = document.querySelectorAll(selector);
        return <HTMLElement>Array.from(nodes).find((node: HTMLElement) => {
            if (typeof innerTextNotice.innerText == 'string') {
                return node.innerText?.trim() == innerTextNotice.innerText;
            } else {
                return innerTextNotice.innerText.test(node.innerText);
            }
        });
    }

    const selectorNotice = <NoviceGuideNoticeWithSelector>notice;
    if (selectorNotice.selector) {
        // 如果有多个，就用浏览器找到的第一个，不管其他的了
        return document.querySelector(selectorNotice.selector);
    }

    const attributesNotice = <NoviceGuideNoticeWithAttributes>notice;
    // 如果有多个，就用浏览器找到的第一个，不管其他的了
    return document.querySelector(getSelector(attributesNotice));
}

function getSelector(notice: NoviceGuideNoticeWithAttributes): string {
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
            z-index: var(--novice-guide-z-index, ${Number.MAX_SAFE_INTEGER});
        }

        #novice-guide-container.novice-guide-wizard {
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

        .novice-guide-clone .novice-guide-bubble {
            position: relative;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            outline: 2px solid var(--brand-default, #1a93ff);
        }

        .novice-guide-clone .novice-guide-bubble .novice-guide-line {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .novice-guide-clone .novice-guide-bubble .novice-guide-line>div {
            background: var(--brand-default, #1a93ff);
        }

        .novice-guide-clone .novice-guide-bubble.bubble-bottom .novice-guide-line {
            top: 8px;
            left: 0;
            width: 100%;
            height: 80px;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-top .novice-guide-line {
            left: 0;
            bottom: 8px;
            width: 100%;
            height: 80px;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-bottom .novice-guide-line>div,
        .novice-guide-clone .novice-guide-bubble.bubble-top .novice-guide-line>div {
            width: 1px;
            height: 100%;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-right .novice-guide-line {
            top: 0;
            left: 8px;
            width: 80px;
            height: 100%;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-left .novice-guide-line {
            top: 0;
            right: 8px;
            width: 80px;
            height: 100%;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-right .novice-guide-line>div,
        .novice-guide-clone .novice-guide-bubble.bubble-left .novice-guide-line>div {
            width: 100%;
            height: 1px;
        }

        .novice-guide-clone .novice-guide-bubble .notice-cntr {
            position: absolute;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 400px;
            padding: 16px;
            border-radius: 3px;
            background: var(--brand-default, #1a93ff);
            box-shadow: var(--box-shadow-lv3, 0px 5px 12px rgba(0, 0, 0, 0.12));
        }

        .novice-guide-clone .novice-guide-bubble .notice-cntr .novice-guide-text {
            width: 95%;
            color: #fff;
            font-size: var(--font-size-text-base, 12px);
        }

        .novice-guide-clone .novice-guide-bubble .notice-cntr .novice-guide-close {
            color: #fff;
            cursor: pointer;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-bottom .notice-cntr {
            top: 88px;
            left: -192px;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-top .notice-cntr {
            bottom: 88px;
            left: -192px;
        }

        .novice-guide-clone .novice-guide-bubble.bubble-right .notice-cntr {
            top: 50%;
            left: 88px;
            transform: translateY(-50%);
        }

        .novice-guide-clone .novice-guide-bubble.bubble-left .notice-cntr {
            top: 50%;
            right: 88px;
            transform: translateY(-50%);
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr {
            position: absolute;
            width: 400px;
            padding: 16px;
            border-radius: 3px;
            background: var(--bg-component, #f5f5f5);
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr .novice-guide-title {
            position: relative;
            font-size: 14px;
            font-weight: bold;
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr .novice-guide-text {
            min-height: 64px;
            font-size: var(--font-size-text-base, 12px);
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr .button-cntr {
            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr .button-cntr .progress {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            height: 32px;
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr .novice-guide-title .close-arrow {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr .novice-guide-button {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 4px;
            padding: 0 8px;
            min-width: 64px;
            height: 32px;
            border-radius: 3px;
            background: var(--brand-default, #1a93ff);
            color: white;
            cursor: pointer;
            font-size: 14px;
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr .novice-guide-button:hover {
            background: var(--brand-hover, #1178d9);
        }

        .novice-guide-clone .novice-guide-dialog .notice-cntr::after {
            content: '';
            position: absolute;
            background: var(--bg-component, #f5f5f5);
            height: 20px;
            width: 20px;
            transform: rotate(45deg);
            z-index: -1;
        }

        .novice-guide-clone .novice-guide-dialog.dialog-right .notice-cntr {
            top: 50%;
            left: calc(100% + 20px);
            transform: translateY(-50%);
        }

        .novice-guide-clone .novice-guide-dialog.dialog-right .notice-cntr::after {
            top: 50%;
            left: -10px;
            margin-top: -10px;
        }

        .novice-guide-clone .novice-guide-dialog.dialog-left .notice-cntr {
            top: 50%;
            right: calc(100% + 20px);
            transform: translateY(-50%);
        }

        .novice-guide-clone .novice-guide-dialog.dialog-left .notice-cntr::after {
            top: 50%;
            right: -10px;
            margin-top: -10px;
        }

        .novice-guide-clone .novice-guide-dialog.dialog-bottom .notice-cntr {
            top: calc(100% + 20px);
            left: 50%;
            transform: translateX(-50%);
        }

        .novice-guide-clone .novice-guide-dialog.dialog-bottom .notice-cntr::after {
            top: -10px;
            left: 50%;
            margin-left: -5px;
        }

        .novice-guide-clone .novice-guide-dialog.dialog-top .notice-cntr {
            bottom: calc(100% + 20px);
            left: 50%;
            transform: translateX(-50%);
        }

        .novice-guide-clone .novice-guide-dialog.dialog-top .notice-cntr::after {
            bottom: -10px;
            left: 50%;
            margin-left: -5px;
        }

        .novice-guide-clone .novice-guide-wizard {
            position: absolute;
            width: 300px;
        }

        .novice-guide-clone .novice-guide-wizard .arrow-cntr {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
        }

        .novice-guide-clone .novice-guide-wizard .arrow-cntr .arrow {
            color: #fff;
            font-size: 24px;
            animation: 0.3s ease-out infinite alternate bounce_arrow;
        }

        .novice-guide-clone .novice-guide-wizard .novice-guide-close {
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -6px;
            color: #fff;
            font-size: (var --icon-size-status-sm, 24px);
            cursor: pointer;
        }

        .novice-guide-clone .novice-guide-wizard .notice-cntr {
            position: relative;
            padding: 0 16px;
            color: #fff;
            font-size: var(--font-title-lg, 16px);
            text-align: center;
        }

        .novice-guide-clone .novice-guide-wizard.wizard-bottom {
            top: 100%;
        }

        .novice-guide-clone .novice-guide-wizard.wizard-bottom .arrow-cntr {
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
