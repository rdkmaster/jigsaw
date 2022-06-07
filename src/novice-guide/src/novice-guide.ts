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

        let guideKeys: string[], notices: NoviceGuideNotice[];
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
            const cntr = this._getGuideContainer(false);
            cntr.classList.add('wizard')

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
        let tagName: string, id: string, classes: string, opt: boolean;
        [opt, [tagName, id, classes]] = this._checkOptimizable(notice);

        const result = this._getResultBySelector(selector, notice);
        if (result.length === 1) {
            this._createNoviceGuide(guideType, notice, result[0] as HTMLElement, guideKeys, index, notices);
            return;
        }

        if (result.length > 1) {
            console.warn('Find more than 1 target element.');
            return;
        }

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
                if (tagName && node.target.nodeName !== tagName) {
                    return false
                }

                if (id && node.target["id"] !== id) {
                    return false
                }

                if (notice.property1 && node.target[notice.property1.property] !== notice.property1.value) {
                    return false
                }

                if (notice.property2 && node.target[notice.property2.property] !== notice.property2.value) {
                    return false
                }

                let classesChecker = true;
                if (classes) {
                    const classArr = classes.split(".");
                    classArr.shift();
                    classArr.forEach(item => {
                        if (!node.target["classList"].contains(item)) {
                            classesChecker = false;
                        }
                    })
                }
                return classesChecker;
            })

            if (filterResult.length !== 1) {
                return
            }

            mutationObserver.disconnect();
            this._createNoviceGuide(guideType, notice, filterResult[0].target as HTMLElement, guideKeys, index, notices)

            this.resize();
        })
        mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
        this._showing.mutations.push(mutationObserver)
    }

    private _createNoviceGuide(type: NoviceGuideType, notice: NoviceGuideNotice, targetEle: HTMLElement, guideKeys: string[], index: number, notices: NoviceGuideNotice[]) {
        if (type === NoviceGuideType.singular) {
            if (notice.type !== NoviceGuideNoticeType.bubble && notice.type !== NoviceGuideNoticeType.dialog) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.singular} novice guide`)
                return;
            }
            this._createSingularNoviceGuide(notice, targetEle, guideKeys[index]);
        } else if (type === NoviceGuideType.multiple) {
            if (notice.type !== NoviceGuideNoticeType.dialog) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.multiple} novice guide`)
                return;
            }
            this._createMultipleNoviceGuide(notice, targetEle, guideKeys, index, notices);
        } else if (type === NoviceGuideType.wizard) {
            if (notice.type !== NoviceGuideNoticeType.wizard) {
                console.warn(`Notice type ${notice.type} is not allowed in ${NoviceGuideType.wizard} novice guide`)
                return;
            }
            this._createWizardStepNoviceGuide(notice, targetEle, guideKeys, index, notices)
        }
    }

    private _createSingularNoviceGuide(notice: NoviceGuideNotice, targetEle: HTMLElement, guideKey: string) {
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

        cloneEle.onclick = function (e) {
            if (!(e.target as HTMLElement).classList.contains('close')) {
                return;
            }
            jigsawGuide._saveShownKeys(guideKey);
            jigsawGuide._closeNoviceGuideNotice(cloneEle, notice.type === NoviceGuideNoticeType.dialog);
        }

        this._getGuideContainer(hasMask).appendChild(cloneEle);
        this.resize();
    }

    private _createMultipleNoviceGuide(notice: NoviceGuideNotice, targetEle: HTMLElement, guideKeys: string[], current: number, notices: NoviceGuideNotice[]) {
        if (this._showing.guideKeys.indexOf(guideKeys[current]) !== -1) {
            return;
        }

        let html = '';
        const isLast = current === notices.length - 1;

        let buttonHtml = '';
        if (current === 0) {
            buttonHtml = `<div class="next button">下一步</div>`
        } else if (isLast) {
            buttonHtml = `<div class="pre button">上一步</div><div class="close button">结束</div>`
        } else {
            buttonHtml = `<div class="pre button">上一步</div><div class="next button">下一步</div>`
        }

        html = `
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

        let cloneEle = document.createElement('div');
        cloneEle.classList.add('novice-guide-clone');
        cloneEle.innerHTML = html;
        cloneEle.setAttribute('guideIndex', this._showing.cloneEles.length + '')

        this._showing.guideEles.push(targetEle)
        this._showing.cloneEles.push(cloneEle)
        this._showing.guideKeys.push(guideKeys[current])

        cloneEle.onclick = function (e) {
            if ((e.target as HTMLElement).classList.contains('close')) {
                if (isLast) {
                    jigsawGuide._saveShownKeys(guideKeys.join());
                }

                jigsawGuide._closeNoviceGuideNotice(cloneEle, notice.type === NoviceGuideNoticeType.dialog);
            }

            if ((e.target as HTMLElement).classList.contains('next')) {
                const g = notices[current + 1];
                const selector = jigsawGuide._getSelector(g);

                const queryResult = document.body.querySelectorAll(selector);
                if (queryResult.length > 0) {
                    const result = Array.from(queryResult).filter(node => {
                        const property1Checker = node[g.property1?.property] === g.property1?.value;
                        const property2Checker = node[g.property2?.property] === g.property2?.value;
                        return property1Checker && property2Checker;
                    })

                    if (result.length === 1) {
                        jigsawGuide._createMultipleNoviceGuide(g, result[0] as HTMLElement, guideKeys, current + 1, notices);

                        const index = cloneEle.getAttribute('guideIndex');
                        jigsawGuide._showing.cloneEles[index] = undefined;
                        jigsawGuide._showing.guideKeys[index] = '';
                        cloneEle.remove();

                        const leftGuideCloneArr = jigsawGuide._showing.cloneEles.filter(clone => {
                            return clone;
                        })
                        const dialogClone = document.querySelectorAll('.novice-guide-clone .dialog');
                        const mask = document.getElementById('novice-guide-mask');

                        if (dialogClone.length === 0 && mask) {
                            mask.remove();
                        }

                        if (mask) {
                            mask.innerHTML = '';
                        }

                        if (leftGuideCloneArr.length === 0) {
                            jigsawGuide._removeGuideContainer();
                            jigsawGuide._showing.guideEles = [];
                            jigsawGuide._showing.cloneEles = [];
                        }

                        jigsawGuide.resize();
                        return;
                    }

                    console.warn('Find more than 1 target element.');
                    return;
                }


            }

            if ((e.target as HTMLElement).classList.contains('pre')) {
                const g = notices[current - 1];
                const selector = jigsawGuide._getSelector(g);

                const queryResult = document.body.querySelectorAll(selector);
                if (queryResult.length > 0) {
                    const result = Array.from(queryResult).filter(node => {
                        const property1Checker = node[g.property1?.property] === g.property1?.value;
                        const property2Checker = node[g.property2?.property] === g.property2?.value;
                        return property1Checker && property2Checker;
                    })

                    if (result.length === 1) {
                        jigsawGuide._createMultipleNoviceGuide(g, result[0] as HTMLElement, guideKeys, current - 1, notices);

                        const index = cloneEle.getAttribute('guideIndex');
                        jigsawGuide._showing.cloneEles[index] = undefined;
                        jigsawGuide._showing.guideKeys[index] = '';
                        cloneEle.remove();
                        const shownKeys = JSON.parse(localStorage.getItem(jigsawGuide._localStorageItem) || '[]');
                        shownKeys.push(guideKeys[current]);
                        localStorage.setItem(jigsawGuide._localStorageItem, JSON.stringify(shownKeys))

                        const leftGuideCloneArr = jigsawGuide._showing.cloneEles.filter(clone => {
                            return clone;
                        })
                        const dialogClone = document.querySelectorAll('.novice-guide-clone .dialog');
                        const mask = document.getElementById('novice-guide-mask');

                        if (dialogClone.length === 0 && mask) {
                            mask.remove();
                        }

                        if (mask) {
                            mask.innerHTML = '';
                        }

                        if (leftGuideCloneArr.length === 0) {
                            jigsawGuide._removeGuideContainer();
                            jigsawGuide._showing.guideEles = [];
                            jigsawGuide._showing.cloneEles = [];
                        }

                        jigsawGuide.resize();
                        return;
                    }

                    console.warn('Find more than 1 target element.');
                    return;
                }
            }
        }

        this._getGuideContainer(true).appendChild(cloneEle);
        this.resize();
    }

    private _createWizardStepNoviceGuide(guide: NoviceGuideNotice, targetEle: HTMLElement, guideKeys: string[], current: number, notices: NoviceGuideNotice[]) {
        if (this._showing.guideKeys.indexOf(guideKeys[current]) !== -1) {
            return;
        }

        let html = '';
        html = `
        <div class="${guide.type} ${guide.type}-${guide.position}">
            <div class="arrow-cntr">
                <i class="arrow iconfont iconfont-e250"></i>
            </div>
            <div class="notice-cntr">
                <div class="text">${guide.notice}</div>
                <i class="close iconfont iconfont-e14b"></i>
            </div>
        </div>
        `

        let cloneEle = document.createElement('div');
        cloneEle.classList.add('novice-guide-clone');
        cloneEle.innerHTML = html;
        cloneEle.setAttribute('guideIndex', this._showing.cloneEles.length + '')

        this._showing.guideEles.push(targetEle)
        this._showing.cloneEles.push(cloneEle)
        this._showing.guideKeys.push(guideKeys[current])

        if (current > 0) {
            this._showing.cloneEles[current - 1].remove();
            this._showing.cloneEles[current - 1] = undefined;
        }

        cloneEle.onclick = function (e) {
            if (!(e.target as HTMLElement).classList.contains('close')) {
                return;
            }

            if (current === notices.length - 1) {
                jigsawGuide._saveShownKeys(guideKeys.join());
            }

            jigsawGuide._closeNoviceGuideNotice(cloneEle, false);
        }

        targetEle.addEventListener('click', function handleClick() {
            if (current === notices.length - 1) {
                jigsawGuide._saveShownKeys(guideKeys.join());
                jigsawGuide._closeNoviceGuideNotice(cloneEle, false);
            } else {
                jigsawGuide._createNoviceGuideNotice(NoviceGuideType.wizard, notices[current + 1], current + 1, guideKeys, notices);
            }

            targetEle.removeEventListener('click', handleClick)
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
            const joinKey = [keys.join()];
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
        let fields = [version || 'v0'];
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
        const cntr = document.getElementById('novice-guide-container');
        if (cntr === null) {
            const guideCntr = document.createElement('div');
            guideCntr.id = 'novice-guide-container';
            document.body.appendChild(guideCntr);

            if (hasMask) {
                guideCntr.appendChild(this._createMask())
            }

            return guideCntr;
        }

        const mask = document.getElementById('novice-guide-mask');
        if (hasMask && mask === null) {
            cntr.appendChild(this._createMask());
        }

        return cntr;
    }

    private _removeGuideContainer(): void {
        const cntr = document.getElementById('novice-guide-container');
        if (cntr === null) {
            return
        }
        cntr.remove();
    }

    private _createMask(): Element {
        var svgNS = "http://www.w3.org/2000/svg";
        var xlinkns = "http://www.w3.org/1999/xlink";
        const svg = document.createElementNS(svgNS, 'svg');

        svg.setAttributeNS(xlinkns, 'width', '100%');
        svg.setAttributeNS(xlinkns, 'height', '100%');
        svg.setAttribute('id', 'novice-guide-svg');

        svg.innerHTML = `
        <mask id="novice-guide-mask"></mask>
        <rect mask="url(#novice-guide-mask)" fill="#00000099" width="100%" height="100%"/>
        `

        return svg;
    }

    private _checkOptimizable(notice: NoviceGuideNotice): [boolean, string[]] {
        const tagName = notice.tagName ? notice.tagName.toUpperCase() : '';
        const id = notice.id ? '#' + notice.id : '';
        const classes = notice.classes ? "." + notice.classes.split(" ").join(".") : '';

        const selector = `${tagName}${id}${classes}`;
        const opt = selector !== tagName && !notice.property1 && !notice.property2;

        return [opt, [tagName, id, classes]]
    }

    private _getSelector(notice: NoviceGuideNotice): string {
        const tagName = notice.tagName ? notice.tagName.toUpperCase() : '';
        const id = notice.id ? '#' + notice.id : '';
        const classes = notice.classes ? "." + notice.classes.split(" ").join(".") : '';

        return `${tagName}${id}${classes}`;;
    }

    private _getResultBySelector(selector: string, notice: NoviceGuideNotice) {
        const queryResult = document.body.querySelectorAll(selector);
        if (queryResult.length === 0) {
            return [];
        }
        const result = Array.from(queryResult).filter(node => {
            const property1Checker = node[notice.property1?.property] === notice.property1?.value;
            const property2Checker = node[notice.property2?.property] === notice.property2?.value;
            return property1Checker && property2Checker;
        })

        return result;
    }

    private _saveShownKeys(guideKey: string) {
        const shownKeys = JSON.parse(localStorage.getItem(jigsawGuide._localStorageItem) || '[]');
        shownKeys.push(guideKey);
        localStorage.setItem(jigsawGuide._localStorageItem, JSON.stringify(shownKeys))
    }

    private _debounce(fn: Function, delay: number) {
        let timer;
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn();
            }, delay)
        }
    }

    public resize(): void {
        const mask = document.getElementById('novice-guide-mask');
        if (mask) {
            mask.innerHTML = `<rect fill="white" width="100%" height="100%"/>`
        }

        jigsawGuide._showing.cloneEles.forEach((clone, i) => {
            if (!clone) {
                return;
            }

            jigsawGuide._relocateClone(jigsawGuide._showing.guideEles[i], clone, mask)
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

        const cntr = this._getGuideContainer(false);
        if (cntr.classList.contains('wizard')) {
            cntr.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${left}px ${top + height}px, ${left + width}px ${top + height}px, ${left + width}px ${top}px, ${left}px ${top}px, ${left}px ${top + height}px`
        }
    }

    public clear(): void {
        this._clearWithoutMutations();
        this._showing.mutations.forEach(mutation => {
            if (mutation) {
                mutation.disconnect();
            }
        })
    }

    private _clearWithoutMutations(): void {
        this._removeGuideContainer();
        this._showing.cloneEles.forEach(clone => {
            if (clone) {
                clone.remove();
            }
        })
        this._showing.cloneEles = [];
        this._showing.mutations = [];
        this._showing.guideKeys = [];
        this._showing.guideEles = [];
    }

    private _closeNoviceGuideNotice(cloneEle: HTMLDivElement, checkMask: boolean) {
        const index = cloneEle.getAttribute('guideIndex');
        jigsawGuide._showing.cloneEles[index] = undefined;
        jigsawGuide._showing.guideKeys[index] = '';
        cloneEle.remove();

        const leftGuideCloneArr = jigsawGuide._showing.cloneEles.filter(clone => {
            return clone;
        })

        if (leftGuideCloneArr.length === 0) {
            jigsawGuide._clearWithoutMutations();
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

        jigsawGuide.resize();
    }
}
export const jigsawGuide = new JigsawGuide();


