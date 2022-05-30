export enum NoviceGuideNoticeType {
    bubble = 'bubble', dialog = 'dialog', wizard = 'wizard'
}

export interface NoviceGuideContent {
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
export interface WizardNoviceGuide extends BasicNoviceGuideNotice { type: NoviceGuideNoticeType.wizard; }


export enum NoviceGuideType {
    singular = 'singular', multiple = 'multiple', wizard = 'wizard'
}

export type NoviceGuideNotice = BubbleNoviceGuide | DialogNoviceGuide | WizardNoviceGuide;
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
export interface WizardNoviceGuideSteps extends BasicNoviceGuide {
    type: NoviceGuideType.wizard;
}

export type NoviceGuide = SingularNoviceGuide | MultipleNoviceGuide | WizardNoviceGuideSteps;
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

        const localStorageItem = config?.localStorageItem || 'jigsaw.noviceGuide';
        if (config?.resetLocalStorage) {
            localStorage.setItem(localStorageItem, '[]');
        }

        let guideKeys, guides: NoviceGuideNotice[];
        [guides, guideKeys] = this._filterShownGuides(guide, localStorageItem);
        guides = this._deduplicate(guides, guideKeys);

        if (guides.length == 0) {
            console.warn('All guides were shown.');
            return;
        }

        guides.forEach(g => {
            const tagName = g.tagName ? g.tagName.toUpperCase() : '';
            const id = g.id ? '#' + g.id : '';
            const classes = g.classes ? "." + g.classes.replace(" ", ".") : '';
            const selector = `${tagName}${id}${classes}`;
            const opt = selector !== tagName && !g.property1 && !g.property2;

            const queryResult = document.body.querySelectorAll(selector);
            if (queryResult.length > 0) {
                const result = Array.from(queryResult).filter(node => {
                    const property1Checker = node[g.property1?.property] === g.property1?.value;
                    const property2Checker = node[g.property2?.property] === g.property2?.value;
                    return property1Checker && property2Checker;
                })

                if (result.length === 1) {
                    this._createNoviceGuide(g, result[0] as HTMLElement, localStorageItem);
                    return;
                }

                console.warn('Find more than 1 target element.');
                return;
            }

            const mutationObserver = new MutationObserver(entries => {
                if (opt) {
                    console.log('xxxx')
                    const queryResult = document.body.querySelectorAll(selector);
                    if (queryResult.length > 0) {
                        mutationObserver.disconnect();
                        if (queryResult.length === 1) {
                            this._createNoviceGuide(g, queryResult[0] as HTMLElement, localStorageItem);
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

                    if (g.property1 && node.target[g.property1.property] !== g.property1.value) {
                        return false
                    }

                    if (g.property2 && node.target[g.property2.property] !== g.property2.value) {
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
                this._createNoviceGuide(g, filterResult[0].target as HTMLElement, localStorageItem)

                this.resize();
            })
            mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
            this._showing.mutations.push(mutationObserver)
        }
        )
    }

    private _showing: { guideEles: HTMLElement[], cloneEles: HTMLElement[], guideKeys: string[], mutations: MutationObserver[] } = {
        guideEles: [],
        cloneEles: [],
        guideKeys: [],
        mutations: []
    }

    private _createNoviceGuide(guide: NoviceGuideNotice, targetEle: HTMLElement, localStorageItem: string) {
        const guideKey = this._toKeyString(guide, "");

        if (this._showing.guideKeys.indexOf(guideKey) !== -1) {
            return;
        }

        let html = '';
        let hasMask = false;
        if (guide.type === NoviceGuideNoticeType.bubble) {
            html = `
            <div class="${guide.type} ${guide.type}-${guide.position}">
                <div class="line">
                    <div></div>
                </div>
                <div class="notice-cntr">
                    <div class="text">${guide.notice}</div>
                    <i class="close iconfont iconfont-e14b"></i>
                </div>
            </div>`
        }

        if (guide.type === NoviceGuideNoticeType.dialog) {
            hasMask = true;
            html = `
            <div class="${guide.type} ${guide.type}-${guide.position}">
                <div class="notice-cntr">
                    <div class="title">${guide.title}</div>
                    <div class="text">${guide.notice}</div>
                    <div class="button-cntr">
                        <div class="close button">${guide.button}</div>
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
            const index = cloneEle.getAttribute('guideIndex');
            jigsawGuide._showing.cloneEles[index] = false;
            jigsawGuide._showing.guideKeys[index] = '';
            cloneEle.remove();
            const shownKeys = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
            shownKeys.push(guideKey);
            localStorage.setItem(localStorageItem, JSON.stringify(shownKeys))

            const leftGuideCloneArr = jigsawGuide._showing.cloneEles.filter(clone => {
                return clone;
            })
            const dialogClone = document.querySelectorAll('.novice-guide-clone .dialog');
            if (dialogClone.length === 0) {
                const mask = document.getElementById('novice-guide-mask');
                if (mask) {
                    mask.remove();
                }
            }
            if (leftGuideCloneArr.length === 0) {
                jigsawGuide._removeGuideContainer();
                jigsawGuide._showing.guideEles = [];
                jigsawGuide._showing.cloneEles = [];
            }
        }

        this._getGuideContainer(hasMask).appendChild(cloneEle);
        this.resize();
    }

    private _filterShownGuides(guide: NoviceGuide, localStorageItem: string): [NoviceGuideNotice[], string[]] {
        let keys = guide.data.map(g => this._toKeyString(g, guide.version));
        const shownKeys = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
        const guidesCopy = [...guide.data];

        if (guide.type !== 'singular') {
            keys = [keys.join()];
        }

        keys.forEach((key, idx) => {
            if (shownKeys.indexOf(key) == -1) {
                return;
            }
            guidesCopy[idx] = null;
            keys[idx] = null;
        });
        return [guidesCopy.filter(g => !!g), keys.filter(k => !!k)];
    }

    private _deduplicate(guides: NoviceGuideNotice[], keys: string[]): NoviceGuideNotice[] {
        const len = guides.length;
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
                guides[pos] = null;
            }));
            guides = guides.filter(g => !!g);
        }
        return guides;
    }

    private _toKeyString(guide: BasicNoviceGuideNotice, version: string): string {
        let fields = [version || 'v0'];
        fields.push(guide.tagName || '');
        fields.push(guide.id || '');
        fields.push(guide.classes || '');
        fields.push(guide.tagName || '');
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
        <rect mask="url(#novice-guide-mask)" fill="#00000099" width="100%" height="100%"/>`

        return svg;
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
    }

    public clear(): void {
        this._removeGuideContainer();
        this._showing.cloneEles.forEach(clone => {
            if (clone) {
                clone.remove();
            }
        })
        this._showing.mutations.forEach(mutation => {
            if (mutation) {
                mutation.disconnect();
            }
        })
        this._showing.cloneEles = [];
        this._showing.mutations = [];
        this._showing.guideKeys = [];
        this._showing.guideEles = [];
    }
}
export const jigsawGuide = new JigsawGuide();


