export enum NoviceGuideNoticeType {
    bubble = 'bubble', dialog = 'dialog', wizard = 'wizard'
}

export interface NoviceGuideContent {
    type: NoviceGuideNoticeType;
    title?: string;
    notice: string;
    useHtml?: boolean;
    button?: string;
    trigger?: 'click' | 'mouseover';
}

export interface NoviceGuidePicker {
    version?: string;
    tagName?: string;
    id?: string;
    classes?: string;
    attribute1?: { name: string, value: string | number };
    attribute2?: { name: string, value: string | number };
    selector?: string;
}

export interface NoviceGuideOptions {
    position: 'top' | 'left' | 'right' | 'bottom';
    timeout?: number;
    // 若不设置disconnect，默认为60000ms
    disconnect?: number;
}

export interface BasicNoviceGuideNotice extends NoviceGuideContent {
}

export interface BasicNoviceGuideNotice extends NoviceGuidePicker {
}

export interface BasicNoviceGuideNotice extends NoviceGuideOptions {
}

export interface BubbleNoviceGuide extends BasicNoviceGuideNotice {
    type: NoviceGuideNoticeType.bubble;
}

export interface DialogNoviceGuide extends BasicNoviceGuideNotice {
    type: NoviceGuideNoticeType.dialog;
}

export interface WizardStepNoviceGuide extends BasicNoviceGuideNotice {
    type: NoviceGuideNoticeType.wizard;
}


export enum NoviceGuideType {
    singular = 'singular', multiple = 'multiple', wizard = 'wizard'
}

export type NoviceGuideNotice = BubbleNoviceGuide | DialogNoviceGuide | WizardStepNoviceGuide;

/**
 * version属性，再加上父类里的tagName等属性一起，共同组成了一个帮助内容的标识
 */
export interface BasicNoviceGuide {
    type: NoviceGuideType;
    data: NoviceGuideNotice[];
    version: string;
}

export interface SingularNoviceGuide extends BasicNoviceGuide {
    type: NoviceGuideType.singular;
}

export interface MultipleNoviceGuide extends BasicNoviceGuide {
    type: NoviceGuideType.multiple;
}

export interface WizardNoviceGuide extends BasicNoviceGuide {
    type: NoviceGuideType.wizard;
}

export type NoviceGuide = SingularNoviceGuide | MultipleNoviceGuide | WizardNoviceGuide;
export type NoviceGuideConfig = { localStorageItem?: string }

type ShowingInfo = {
    guideElements: HTMLElement[], cloneElements: HTMLElement[], guideKeys: string[], mutations: MutationObserver[]
};

export class JigsawNoviceGuide {
    private _config: NoviceGuideConfig = { localStorageItem: 'jigsaw.noviceGuide' };

    constructor(config?: NoviceGuideConfig) {
        this._config.localStorageItem = config?.localStorageItem;
    }

    public resetStatus(): void {
        localStorage.setItem(this._config.localStorageItem, '[]');
    }

    public clear(): void {
        this._clearWithoutMutations();
        this._showing.mutations.forEach(mutation => mutation.disconnect());
        removeStyle();
    }

    public show(guide: NoviceGuide): void {
        if (!guide || !guide.data?.length) {
            console.error('There is no available guide data.');
            return;
        }

        if (this._showing.guideElements.length === 0) {
            window.addEventListener('resize', this._debounce(this._resize, 500));
        }

        const notices: NoviceGuideNotice[] = this._filterShownGuides(guide);
        if (notices.length == 0) {
            console.warn('All guides were shown.');
            return;
        }
        // 把version复制到notice里，方便后续使用
        notices.forEach(n => n.version = guide.version);

        if (guide.type === 'singular') {
            notices.forEach((notice) => {
                this._createNoviceGuideNotice(guide.type, notices, notice);
            });
        }

        if (guide.type === 'multiple') {
            this._createNoviceGuideNotice(guide.type, notices, notices[0]);
        }

        if (guide.type === 'wizard') {
            const container = getGuideContainer(false);
            container.classList.add('wizard')
            this._createNoviceGuideNotice(guide.type, notices, notices[0]);
        }
    }

    private _showing: ShowingInfo = {
        guideElements: [],
        cloneElements: [],
        guideKeys: [],
        mutations: []
    }

    private _createNoviceGuideNotice(guideType: NoviceGuideType, notices: NoviceGuideNotice[], notice: NoviceGuideNotice) {
        const selector = getSelector(notice);
        // 如果有多个，就用浏览器找到的第一个，不管其他的了
        const found = document.querySelector(selector);
        if (found) {
            this._createNoviceGuide(guideType, notices, notice, found as HTMLElement);
            return;
        }

        // 当前还找不到，那就要等着了
        let _clearTimer;
        const mutationObserver = new MutationObserver(() => {
            // 实测querySelector的性能可以接受（万次耗时500~700ms）
            const found = document.querySelector(selector);
            if (!found) {
                return;
            }
            this._createNoviceGuide(guideType, notices, notice, found as HTMLElement);
            this._resize();
            if (_clearTimer) {
                clearTimeout(_clearTimer);
            }
            mutationObserver.disconnect();
            const idx = this._showing.mutations.indexOf(mutationObserver);
            if (idx != -1) {
                this._showing.mutations.splice(idx, 1);
            }
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });
        _clearTimer = setTimeout(() => {
            mutationObserver.disconnect();
        }, notice.disconnect ? notice.disconnect : 60000);
        this._showing.mutations.push(mutationObserver);
    }

    private _createNoviceGuide(type: NoviceGuideType, notices: NoviceGuideNotice[], notice: NoviceGuideNotice, targetEle: HTMLElement) {
        if (type === NoviceGuideType.singular) {
            if (notice.type !== NoviceGuideNoticeType.bubble && notice.type !== NoviceGuideNoticeType.dialog) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.singular} novice guide`)
                return;
            }
            this._createSingular(notice, targetEle);
        } else if (type === NoviceGuideType.multiple) {
            if (notice.type !== NoviceGuideNoticeType.dialog) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.multiple} novice guide`)
                return;
            }
            this._createMultiple(notices, notice, targetEle);
        } else if (type === NoviceGuideType.wizard) {
            if (notice.type !== NoviceGuideNoticeType.wizard) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.wizard} novice guide`)
                return;
            }
            this._createWizardStep(notices, notice, targetEle)
        }
    }

    private _createSingular(notice: NoviceGuideNotice, targetEle: HTMLElement) {
        const guideKey: string = toKeyString(notice);
        if (this._showing.guideKeys.indexOf(guideKey) !== -1) {
            return;
        }

        let html = '';
        let hasMask = false;
        if (notice.type === NoviceGuideNoticeType.bubble) {
            html = `
                <div class="${notice.type} ${notice.type}-${notice.position}">
                    <div class="line">
                        <div></div>
                    </div>
                    <div class="notice-cntr">
                        <div class="text">${notice.notice}</div>
                        <i class="close iconfont iconfont-e14b"></i>
                    </div>
                </div>`;
        }

        if (notice.type === NoviceGuideNoticeType.dialog) {
            hasMask = true;
            html = `
                <div class="${notice.type} ${notice.type}-${notice.position}">
                    <div class="notice-cntr">
                        <div class="title">${notice.title}</div>
                        <div class="text">${notice.notice}</div>
                        <div class="button-cntr">
                            <div class="close button">${notice.button}</div>
                        </div>
                    </div>
                </div>`;
        }

        const cloneEle = this._createCloneElement(targetEle, guideKey);
        cloneEle.innerHTML = html;

        cloneEle.onclick = (e) => {
            if (!(e.target as HTMLElement).classList.contains('close')) {
                return;
            }
            cloneEle.onclick = null;
            this._saveShownKeys(guideKey);
            this._closeNoviceGuideNotice(cloneEle, notice.type === NoviceGuideNoticeType.dialog);
        }

        getGuideContainer(hasMask).appendChild(cloneEle);
        this._resize();
    }

    private _createMultiple(notices: NoviceGuideNotice[], notice: NoviceGuideNotice, targetEle: HTMLElement) {
        const key = toKeyString(notice);
        if (this._showing.guideKeys.indexOf(key) !== -1) {
            return;
        }

        const current = notices.indexOf(notice);
        const isLast = current === notices.length - 1;
        let buttonHtml: string;
        if (current === 0) {
            buttonHtml = `<div class="next button">下一步</div>`
        } else if (isLast) {
            buttonHtml = `<div class="pre button">上一步</div><div class="close button">结束</div>`
        } else {
            buttonHtml = `<div class="pre button">上一步</div><div class="next button">下一步</div>`
        }

        const cloneEle = this._createCloneElement(targetEle, key);
        cloneEle.innerHTML = `
            <div class="${notice.type} ${notice.type}-${notice.position}">
                <div class="notice-cntr">
                    <div class="title">${notice.title}
                        <div class="close iconfont iconfont-e14b close-arrow"></div>
                    </div>
                    <div class="text">${notice.notice}</div>
                    <div class="button-cntr">
                        <div class="progress">${current + 1}/${notices.length}</div>
                        ${buttonHtml}
                    </div>

                </div>
            </div>`;

        cloneEle.onclick = (e) => {
            // 处理提示里的叉叉按钮，鼠标点击了它后，鼠标事件冒泡到最外头被这个函数抓住
            if ((e.target as HTMLElement).classList.contains('close')) {
                cloneEle.onclick = null;
                if (isLast) {
                    const guideKeys = notices.map(notice => toKeyString(notice));
                    this._saveShownKeys(guideKeys.join());
                }
                this._closeNoviceGuideNotice(cloneEle, notice.type === NoviceGuideNoticeType.dialog);
            }

            if ((e.target as HTMLElement).classList.contains('next')) {
                this._onButtonClicked('next', notices, current, cloneEle);
            }
            if ((e.target as HTMLElement).classList.contains('pre')) {
                this._onButtonClicked('pre', notices, current, cloneEle);
            }
        }

        getGuideContainer(true).appendChild(cloneEle);
        this._resize();
    }

    private _createWizardStep(notices: NoviceGuideNotice[], notice: NoviceGuideNotice, targetEle: HTMLElement) {
        const key = toKeyString(notice);
        if (this._showing.guideKeys.indexOf(key) !== -1) {
            return;
        }

        const cloneEle = this._createCloneElement(targetEle, key);
        cloneEle.innerHTML = `
            <div class="${notice.type} ${notice.type}-${notice.position}">
                <div class="arrow-cntr">
                    <i class="arrow iconfont iconfont-e250"></i>
                </div>
                <div class="notice-cntr">
                    <div class="text">${notice.notice}</div>
                    <i class="close iconfont iconfont-e14b"></i>
                </div>
            </div>
        `;

        const current = notices.indexOf(notice);
        const guideKeys = notices.map(n => toKeyString(n));
        cloneEle.onclick = (e) => {
            if (!(e.target as HTMLElement).classList.contains('close')) {
                return;
            }
            cloneEle.onclick = null;
            if (current === notices.length - 1) {
                this._saveShownKeys(guideKeys.join());
            }
            this._closeNoviceGuideNotice(cloneEle, false);
        }

        const handleClick = () => {
            targetEle.removeEventListener('click', handleClick);
            if (current === notices.length - 1) {
                this._saveShownKeys(guideKeys.join());
                this._closeNoviceGuideNotice(cloneEle, false);
            } else {
                this._createNoviceGuideNotice(NoviceGuideType.wizard, notices, notices[current + 1]);
                this._closeNoviceGuideNotice(cloneEle, false);
            }
        }
        targetEle.addEventListener('click', handleClick);

        getGuideContainer(false).appendChild(cloneEle);
        this._resize();
    }

    private _filterShownGuides(guide: NoviceGuide): NoviceGuideNotice[] {
        const keys = guide.data.map(notice => toKeyString(notice));
        const shownKeys = JSON.parse(localStorage.getItem(this._config.localStorageItem) || '[]');
        if (guide.type === 'multiple' || guide.type === 'wizard') {
            const joinKey = keys.join();
            if (shownKeys.indexOf(joinKey) !== -1) {
                return [];
            }
        }

        const guidesCopy = [...guide.data];
        if (guide.type === 'singular') {
            keys.forEach((key, idx) => {
                if (shownKeys.indexOf(key) == -1) {
                    return;
                }
                guidesCopy[idx] = null;
            });
        }
        return this._deduplicate(guidesCopy.filter(g => !!g), keys.filter(k => !!k));
    }

    private _deduplicate(notices: NoviceGuideNotice[], keys: string[]): NoviceGuideNotice[] {
        const len = notices.length;
        const duplicates: number[][] = keys.map((key, idx) => {
            const arr = [idx];
            for (let i = idx + 1; i < len; i++) {
                if (keys[i] == key) {
                    arr.push(i);
                }
            }
            return arr;
        }).filter(i => i.length > 1);
        if (duplicates.length > 0) {
            console.warn('The following guides are duplicated:\n', duplicates);
            duplicates.forEach(row => row.forEach((pos, idx) => {
                if (idx == row.length - 1) {
                    return;
                }
                notices[pos] = null;
            }));
            notices = notices.filter(g => !!g);
        }
        return notices;
    }

    private _createCloneElement(targetEle: HTMLElement, guideKey: string): HTMLDivElement {
        const cloneEle = document.createElement('div');
        cloneEle.classList.add('novice-guide-clone');
        this._showing.guideElements.push(targetEle);
        this._showing.cloneElements.push(cloneEle);
        this._showing.guideKeys.push(guideKey);
        return cloneEle;
    }

    private _saveShownKeys(guideKey: string) {
        const shownKeys = JSON.parse(localStorage.getItem(this._config.localStorageItem) || '[]');
        shownKeys.push(guideKey);
        localStorage.setItem(this._config.localStorageItem, JSON.stringify(shownKeys))
    }

    private _debounce(fn: Function, delay: number): () => void {
        let timer;
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(fn, delay)
        }
    }

    private _onButtonClicked(type: 'pre' | 'next', notices: NoviceGuideNotice[], current: number, cloneEle: HTMLDivElement) {
        const offset = type === 'pre' ? -1 : 1;
        const notice = notices[current + offset];
        const selector = getSelector(notice);
        const target = document.querySelector(selector);
        if (!target) {
            return;
        }

        this._createMultiple(notices, notice, target as HTMLElement);
        const index = this._showing.cloneElements.indexOf(cloneEle);
        this._showing.cloneElements.splice(index, 1);
        this._showing.guideKeys.splice(index, 1);
        this._showing.guideElements.splice(index, 1);
        cloneEle.remove();

        const dialogClone = document.querySelectorAll('.novice-guide-clone .dialog');
        const mask = document.getElementById('novice-guide-mask');
        if (dialogClone.length === 0 && mask) {
            mask.remove();
        }
        if (mask) {
            mask.innerHTML = '';
        }
        if (this._showing.cloneElements.length === 0) {
            removeGuideContainer();
            this._showing.guideElements = [];
            this._showing.cloneElements = [];
        }
        this._resize();
    }

    private _resize = () => {
        const mask = document.getElementById('novice-guide-mask');
        if (mask) {
            mask.innerHTML = `<rect fill="white" width="100%" height="100%"/>`
        }

        this._showing.cloneElements.forEach((clone, i) => {
            if (!clone) {
                return;
            }
            relocateClone(this._showing.guideElements[i], clone, mask);
        });
    }

    private _clearWithoutMutations(): void {
        removeGuideContainer();
        this._showing.cloneElements.filter(e => !!e).forEach(clone => clone.remove());
        this._showing.cloneElements = [];
        this._showing.guideKeys = [];
        this._showing.guideElements = [];
    }

    private _closeNoviceGuideNotice(cloneEle: HTMLDivElement, checkMask: boolean) {
        const index = this._showing.cloneElements.indexOf(cloneEle);
        this._showing.cloneElements.splice(index, 1);
        this._showing.guideKeys.splice(index, 1);
        this._showing.guideElements.splice(index, 1);
        cloneEle.remove();

        if (this._showing.cloneElements.length == 0) {
            this._clearWithoutMutations();
            return;
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
        this._resize();
    }
}

function getGuideContainer(hasMask: boolean): HTMLElement {
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

function relocateClone(target: HTMLElement, clone: HTMLElement, mask?: HTMLElement) {
    const { left, top, width, height } = target.getBoundingClientRect();
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

function toKeyString(notice: BasicNoviceGuideNotice): string {
    const fields = [notice.version || 'v0'];
    fields.push(notice.type || '');
    fields.push(notice.position || '');
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
    return fields.join('$_$');
}

function removeGuideContainer(): void {
    const container = document.getElementById('novice-guide-container');
    if (container === null) {
        return;
    }
    container.remove();
}

function createMask(): Element {
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

function getSelector(notice: NoviceGuideNotice): string {
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

function removeStyle(): void {
    const noviceGuideStyle = document.getElementById("jigsaw-novice-guide-style-sheet") as HTMLLinkElement;
    if (noviceGuideStyle) {
        document.head.removeChild(noviceGuideStyle);
    }
}

function checkStyle(): void {
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
