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
    tagName?: string;
    id?: string;
    classes?: string;
    property1?: { property: string, value: string | number };
    property2?: { property: string, value: string | number };
}

export interface NoviceGuideOptions {
    position: 'top' | 'left' | 'right' | 'bottom';
    timeout?: number;
}

export interface BasicNoviceGuideNotice extends NoviceGuideContent { }
export interface BasicNoviceGuideNotice extends NoviceGuidePicker { }
export interface BasicNoviceGuideNotice extends NoviceGuideOptions { }

export interface BubbleNoviceGuide extends BasicNoviceGuideNotice { type: NoviceGuideNoticeType.bubble; }
export interface DialogNoviceGuide extends BasicNoviceGuideNotice { type: NoviceGuideNoticeType.dialog; }
export interface WizardStepNoviceGuide extends BasicNoviceGuideNotice { type: NoviceGuideNoticeType.wizard; }


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
export type NoviceGuideConfig = {
    localStorageItem: string, resetLocalStorage: boolean
}

class JigsawGuide {
    public show(guide: NoviceGuide, config?: NoviceGuideConfig): void {
        if (!guide || !guide.data?.length) {
            console.error('There is no available guide data.');
            return;
        }

        if (this._showing.guideEles.length === 0) {
            const cancelDebounce = this._debounce(this.resize, 500);
            window.addEventListener('resize', cancelDebounce)
        }

        this._localStorageItem = config?.localStorageItem || 'jigsaw.noviceGuide';
        if (config?.resetLocalStorage) {
            localStorage.setItem(this._localStorageItem, '[]');
        }

        let notices: NoviceGuideNotice[], guideKeys: string[];
        [notices, guideKeys] = this._filterShownGuides(guide, this._localStorageItem);
        notices = this._deduplicate(notices, guideKeys);

        if (notices.length == 0) {
            console.warn('All guides were shown.');
            return;
        }

        if (guide.type === 'singular') {
            notices.forEach((g, i) => {
                this._createNoviceGuideNotice(guide.type, g, i, guideKeys, notices);
            })
        }

        if (guide.type === 'multiple') {
            const g = notices[0];
            this._createNoviceGuideNotice(guide.type, g, 0, guideKeys, notices);
        }

        if (guide.type === 'wizard') {
            const container = this._getGuideContainer(false);
            container.classList.add('wizard')

            const g = notices[0];
            this._createNoviceGuideNotice(guide.type, g, 0, guideKeys, notices);
        }
    }

    private _showing: { guideEles: HTMLElement[], cloneEles: HTMLElement[], guideKeys: string[], mutations: MutationObserver[] } = {
        guideEles: [],
        cloneEles: [],
        guideKeys: [],
        mutations: []
    }

    private _localStorageItem: string;

    private _createNoviceGuideNotice(guideType: NoviceGuideType, notice: NoviceGuideNotice, index: number, guideKeys: string[], notices: NoviceGuideNotice[]) {
        const selector = this._getSelector(notice);
        const result = this._getResultBySelector(selector, notice);
        if (result.length === 1) {
            this._createNoviceGuide(guideType, notice, result[0] as HTMLElement, guideKeys, index, notices);
            return;
        }

        if (result.length > 1) {
            console.warn('Find more than 1 target element.');
            return;
        }

        const [opt, tagName, id, classes] = this._checkOptimizable(notice);
        const mutationObserver = new MutationObserver(entries => {
            if (opt) {
                const queryResult = document.body.querySelectorAll(selector);
                if (queryResult.length > 0) {
                    mutationObserver.disconnect();
                    if (queryResult.length === 1) {
                        this._createNoviceGuide(guideType, notice, queryResult[0] as HTMLElement, guideKeys, index, notices);
                        return;
                    }

                    console.warn('Find more than 1 target element.');
                    return;
                }
            }

            const addedNodes = entries.filter(m => m.addedNodes?.length > 0);
            if (addedNodes.length == 0) {
                return;
            }
            const filterResult = addedNodes.filter(node => {
                const element = node.target as HTMLElement;

                if (tagName && element.nodeName !== tagName) {
                    return false
                }

                if (id && element.id !== id) {
                    return false
                }

                if (notice.property1 && element[notice.property1.property] !== notice.property1.value) {
                    return false
                }

                if (notice.property2 && element[notice.property2.property] !== notice.property2.value) {
                    return false
                }

                if (classes) {
                    const target: any = element;
                    return classes.find(item => !target.classList.contains(item)) === undefined ? true : false;
                }
            })

            if (filterResult.length !== 1) {
                return
            }

            mutationObserver.disconnect();
            this._createNoviceGuide(guideType, notice, filterResult[0].target as HTMLElement, guideKeys, index, notices)

            this.resize();
        })
        mutationObserver.observe(document.body, { childList: true, subtree: true })
        this._showing.mutations.push(mutationObserver)
    }

    private _createNoviceGuide(type: NoviceGuideType, notice: NoviceGuideNotice, targetEle: HTMLElement, guideKeys: string[], index: number, notices: NoviceGuideNotice[]) {
        if (type === NoviceGuideType.singular) {
            if (notice.type !== NoviceGuideNoticeType.bubble && notice.type !== NoviceGuideNoticeType.dialog) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.singular} novice guide`)
                return;
            }
            this._createSingular(notice, targetEle, guideKeys[index]);
        } else if (type === NoviceGuideType.multiple) {
            if (notice.type !== NoviceGuideNoticeType.dialog) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.multiple} novice guide`)
                return;
            }
            this._createMultiple(notice, targetEle, guideKeys, index, notices);
        } else if (type === NoviceGuideType.wizard) {
            if (notice.type !== NoviceGuideNoticeType.wizard) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.wizard} novice guide`)
                return;
            }
            this._createWizardStep(notice, targetEle, guideKeys, index, notices)
        }
    }

    private _createSingular(notice: NoviceGuideNotice, targetEle: HTMLElement, guideKey: string) {
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
            </div>`
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

        let cloneEle = document.createElement('div');
        cloneEle.classList.add('novice-guide-clone');
        cloneEle.innerHTML = html;
        cloneEle.setAttribute('guideIndex', this._showing.cloneEles.length + '')

        this._showing.guideEles.push(targetEle)
        this._showing.cloneEles.push(cloneEle)
        this._showing.guideKeys.push(guideKey)

        cloneEle.onclick = (e) => {
            if (!(e.target as HTMLElement).classList.contains('close')) {
                return;
            }
            this._saveShownKeys(guideKey);
            this._closeNoviceGuideNotice(cloneEle, notice.type === NoviceGuideNoticeType.dialog);
        }

        this._getGuideContainer(hasMask).appendChild(cloneEle);
        this.resize();
    }

    private _createMultiple(notice: NoviceGuideNotice, targetEle: HTMLElement, guideKeys: string[], current: number, notices: NoviceGuideNotice[]) {
        if (this._showing.guideKeys.indexOf(guideKeys[current]) !== -1) {
            return;
        }

        const isLast = current === notices.length - 1;
        let buttonHtml = '';
        if (current === 0) {
            buttonHtml = `<div class="next button">下一步</div>`
        } else if (isLast) {
            buttonHtml = `<div class="pre button">上一步</div><div class="close button">结束</div>`
        } else {
            buttonHtml = `<div class="pre button">上一步</div><div class="next button">下一步</div>`
        }

        const cloneEle = this._createCloneEle(targetEle, guideKeys, current)
        const html = `
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
        cloneEle.innerHTML = html;

        cloneEle.onclick = (e) => {
            // 处理提示里的叉叉按钮，鼠标点击了它后，鼠标事件冒泡到最外头被这个函数抓住
            if ((e.target as HTMLElement).classList.contains('close')) {
                if (isLast) {
                    this._saveShownKeys(guideKeys.join());
                }

                this._closeNoviceGuideNotice(cloneEle, notice.type === NoviceGuideNoticeType.dialog);
            }

            if ((e.target as HTMLElement).classList.contains('next')) {
                this._clickDialogButton('next', guideKeys, current, notices, cloneEle)
            }

            if ((e.target as HTMLElement).classList.contains('pre')) {
                this._clickDialogButton('pre', guideKeys, current, notices, cloneEle)
            }
        }

        this._getGuideContainer(true).appendChild(cloneEle);
        this.resize();
    }

    private _createWizardStep(guide: NoviceGuideNotice, targetEle: HTMLElement, guideKeys: string[], current: number, notices: NoviceGuideNotice[]) {
        if (this._showing.guideKeys.indexOf(guideKeys[current]) !== -1) {
            return;
        }

        const cloneEle = this._createCloneEle(targetEle, guideKeys, current);
        const html = `
            <div class="${guide.type} ${guide.type}-${guide.position}">
                <div class="arrow-cntr">
                    <i class="arrow iconfont iconfont-e250"></i>
                </div>
                <div class="notice-cntr">
                    <div class="text">${guide.notice}</div>
                    <i class="close iconfont iconfont-e14b"></i>
                </div>
            </div>
        `;
        cloneEle.innerHTML = html;

        if (current > 0) {
            this._showing.cloneEles[current - 1].remove();
            this._showing.cloneEles[current - 1] = undefined;
        }

        cloneEle.onclick = (e) => {
            if (!(e.target as HTMLElement).classList.contains('close')) {
                return;
            }

            if (current === notices.length - 1) {
                this._saveShownKeys(guideKeys.join());
            }

            this._closeNoviceGuideNotice(cloneEle, false);
        }

        targetEle.addEventListener('click', function handleClick() {
            targetEle.removeEventListener('click', handleClick);
            if (current === notices.length - 1) {
                jigsawGuide._saveShownKeys(guideKeys.join());
                jigsawGuide._closeNoviceGuideNotice(cloneEle, false);
            } else {
                jigsawGuide._createNoviceGuideNotice(NoviceGuideType.wizard, notices[current + 1], current + 1, guideKeys, notices);
            }
        });

        this._getGuideContainer(false).appendChild(cloneEle);
        this.resize();
    }

    private _filterShownGuides(guide: NoviceGuide, localStorageItem: string): [NoviceGuideNotice[], string[]] {
        const keys = guide.data.map(g => this._toKeyString(g, guide.version));
        const shownKeys = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
        const guidesCopy = [...guide.data];

        if (guide.type === 'singular') {
            keys.forEach((key, idx) => {
                if (shownKeys.indexOf(key) == -1) {
                    return;
                }
                guidesCopy[idx] = null;
                keys[idx] = null;
            });
        } else if (guide.type === 'multiple' || guide.type === 'wizard') {
            const joinKey = keys.join();
            if (shownKeys.indexOf(joinKey) !== -1) {
                return [[], []];
            }
        }

        return [guidesCopy.filter(g => !!g), keys.filter(k => !!k)];
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

    private _toKeyString(guide: BasicNoviceGuideNotice, version: string): string {
        const fields = [version || 'v0'];
        fields.push(guide.type || '');
        fields.push(guide.tagName || '');
        fields.push(guide.id || '');
        fields.push(guide.classes || '');
        fields.push(guide.tagName || '');
        fields.push(guide.position || '');
        if (guide.property1 && guide.property1.hasOwnProperty('property') && guide.property1.hasOwnProperty('value')) {
            fields.push(`${guide.property1.property}=${guide.property1.value}`);
        }
        if (guide.property2 && guide.property2.hasOwnProperty('property') && guide.property2.hasOwnProperty('value')) {
            fields.push(`${guide.property2.property}=${guide.property2.value}`);
        }
        return fields.join('$_$');
    }

    private _getGuideContainer(hasMask: boolean): HTMLElement {
        const container = document.getElementById('novice-guide-container');
        if (container === null) {
            const guideContainer = document.createElement('div');
            guideContainer.id = 'novice-guide-container';
            document.body.appendChild(guideContainer);

            if (hasMask) {
                guideContainer.appendChild(this._createMask())
            }

            this._checkStyle();
            return guideContainer;
        }

        const mask = document.getElementById('novice-guide-mask');
        if (hasMask && mask === null) {
            container.appendChild(this._createMask());
        }

        this._checkStyle();
        return container;
    }

    private _removeGuideContainer(): void {
        const container = document.getElementById('novice-guide-container');
        if (container === null) {
            return
        }
        container.remove();
    }

    private _createMask(): Element {
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

    private _createCloneEle(targetEle: HTMLElement, guideKeys: string[], current: number): HTMLDivElement {
        const cloneEle = document.createElement('div');
        cloneEle.classList.add('novice-guide-clone');
        cloneEle.setAttribute('guideIndex', this._showing.cloneEles.length + '')

        this._showing.guideEles.push(targetEle)
        this._showing.cloneEles.push(cloneEle)
        this._showing.guideKeys.push(guideKeys[current])
        return cloneEle;
    }

    private _checkOptimizable(notice: NoviceGuideNotice): [boolean, string, string, string[]] {
        const tagName = notice.tagName ? notice.tagName.toUpperCase() : '';
        const id = notice.id ? '#' + notice.id : '';
        const classes = notice.classes?.split(/\s+/);
        const opt = (id || notice.classes) && !notice.property1 && !notice.property2;

        return [opt, tagName, id, classes]
    }

    private _getSelector(notice: NoviceGuideNotice): string {
        const tagName = notice.tagName ? notice.tagName.toUpperCase() : '';
        const id = notice.id ? '#' + notice.id : '';
        const classes = notice.classes?.replace(/^\s*/, '.').split(/\s+/).join(".") || '';

        return `${tagName}${id}${classes}`;
    }

    private _getResultBySelector(selector: string, notice: NoviceGuideNotice) {
        const queryResult = document.body.querySelectorAll(selector);
        if (queryResult.length === 0) {
            return [];
        }
        return Array.from(queryResult).filter(node => {
            const property1Checker = node[notice.property1?.property] === notice.property1?.value;
            const property2Checker = node[notice.property2?.property] === notice.property2?.value;
            return property1Checker && property2Checker;
        });
    }

    private _saveShownKeys(guideKey: string) {
        const shownKeys = JSON.parse(localStorage.getItem(this._localStorageItem) || '[]');
        shownKeys.push(guideKey);
        localStorage.setItem(this._localStorageItem, JSON.stringify(shownKeys))
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

    private _clickDialogButton(type: 'pre' | 'next', guideKeys: string[], current: number, notices: NoviceGuideNotice[], cloneEle: HTMLDivElement) {
        const fix = type === 'pre' ? -1 : 1;
        const g = notices[current + fix];
        const selector = this._getSelector(g);

        const queryResult = document.body.querySelectorAll(selector);
        if (queryResult.length > 0) {
            const result = Array.from(queryResult).filter(node => {
                const property1Checker = node[g.property1?.property] === g.property1?.value;
                const property2Checker = node[g.property2?.property] === g.property2?.value;
                return property1Checker && property2Checker;
            })

            if (result.length === 1) {
                this._createMultiple(g, result[0] as HTMLElement, guideKeys, current + fix, notices);

                const index = cloneEle.getAttribute('guideIndex');
                this._showing.cloneEles[index] = undefined;
                this._showing.guideKeys[index] = '';
                cloneEle.remove();

                const leftGuideCloneArr = this._showing.cloneEles.filter(clone => !!clone);
                const dialogClone = document.querySelectorAll('.novice-guide-clone .dialog');
                const mask = document.getElementById('novice-guide-mask');

                if (dialogClone.length === 0 && mask) {
                    mask.remove();
                }

                if (mask) {
                    mask.innerHTML = '';
                }

                if (leftGuideCloneArr.length === 0) {
                    this._removeGuideContainer();
                    this._showing.guideEles = [];
                    this._showing.cloneEles = [];
                }

                this.resize();
                return;
            }

            console.warn('Find more than 1 target element.');
            return;
        }
    }

    public resize(): void {
        const mask = document.getElementById('novice-guide-mask');
        if (mask) {
            mask.innerHTML = `<rect fill="white" width="100%" height="100%"/>`
        }

        this._showing.cloneEles.forEach((clone, i) => {
            if (!clone) {
                return;
            }

            this._relocateClone(this._showing.guideEles[i], clone, mask)
        });
    }

    private _relocateClone(target: HTMLElement, clone: HTMLElement, mask?: HTMLElement) {
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

        const container = this._getGuideContainer(false);
        if (container.classList.contains('wizard')) {
            container.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${left}px ${top + height}px, ${left + width}px ${top + height}px, ${left + width}px ${top}px, ${left}px ${top}px, ${left}px ${top + height}px`
        }
    }

    public clear(): void {
        this._clearWithoutMutations();
        this._showing.mutations.filter(m => !!m).forEach(mutation => mutation.disconnect());
        this._removeStyle();
    }

    private _clearWithoutMutations(): void {
        this._removeGuideContainer();
        this._showing.cloneEles.forEach(clone => {
            if (clone) {
                clone.remove();
            }
        })
        this._showing.cloneEles = [];
        this._showing.guideKeys = [];
        this._showing.guideEles = [];
    }

    private _closeNoviceGuideNotice(cloneEle: HTMLDivElement, checkMask: boolean) {
        const index = cloneEle.getAttribute('guideIndex');
        this._showing.cloneEles[index] = undefined;
        this._showing.guideKeys[index] = '';
        cloneEle.remove();

        if (!this._showing.cloneEles.find(clone => !!clone)) {
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

        this.resize();
    }

    private _removeStyle(): void {
        const noviceGuideStyle = document.getElementById("jigsaw-novice-guide-style-sheet") as HTMLLinkElement;
        if (noviceGuideStyle) {
            document.head.removeChild(noviceGuideStyle);
        }
    }

    private _checkStyle(): void {
        const id = 'jigsaw-novice-guide-style-sheet';
        const noviceGuideStyle = document.getElementById(id) as HTMLLinkElement;
        if (noviceGuideStyle) {
            return;
        }
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `#novice-guide-container {
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
        style.id = id;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}
export const jigsawGuide = new JigsawGuide();
