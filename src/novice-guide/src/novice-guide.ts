export enum NoviceGuideNoticeType {
    bubble = 'bubble', dialog = 'dialog', wizard = 'wizard'
}

export interface NoviceGuideNotice {
    type: NoviceGuideNoticeType;
    title?: string;
    notice?: string;
    useHtml?: boolean;
    button?: string;
    trigger?: 'click' | 'mouseover';
}

export interface BubbleNoviceGuideNotice extends NoviceGuideNotice {
    type: NoviceGuideNoticeType.bubble;
}

export interface DialogNoviceGuideNotice extends NoviceGuideNotice {
    type: NoviceGuideNoticeType.dialog;
}

export interface WizardNoviceGuideNotice extends NoviceGuideNotice {
    type: NoviceGuideNoticeType.wizard;
}

export interface DiscoverableNoviceGuide {
    tagName?: string;
    id?: string;
    classes?: string;
    property1?: { property: string, value: string | number };
    property2?: { property: string, value: string | number };
}

/**
 * version属性，再加上父类里的tagName等属性一起，共同组成了一个帮助内容的标识
 */
export interface BasicNoviceGuide extends DiscoverableNoviceGuide {
    version: string;
    position: 'top' | 'left' | 'right' | 'bottom'
    timeout?: number;
}

export interface SingularNoviceGuide extends BasicNoviceGuide {
    notice: string | BubbleNoviceGuideNotice | DialogNoviceGuideNotice;
}

export interface MultipleNoviceGuide extends BasicNoviceGuide {
    notices: DialogNoviceGuideNotice[] | (BubbleNoviceGuideNotice | string)[]
}

export interface WizardNoviceGuideStep extends DiscoverableNoviceGuide {
    notice: WizardNoviceGuideNotice;
}

export interface WizardNoviceGuide extends BasicNoviceGuide {
    steps: (WizardNoviceGuideStep | BubbleNoviceGuideNotice | string)[];
}

export type NoviceGuide = SingularNoviceGuide | MultipleNoviceGuide | WizardNoviceGuide;
export type NoviceGuideConfig = {
    localStorageItem: string, resetLocalStorage: boolean
}

class JigsawGuide {
    public show(guides: NoviceGuide[], config?: NoviceGuideConfig): void {
        if (!guides?.length) {
            console.error('There is no available guide data.');
            return;
        }

        if (this._showing.guideEle.length === 0) {
            const cancelDebounce = this._debounce(this.resize, 500);
            window.addEventListener('resize', cancelDebounce)
        }

        const localStorageItem = config?.localStorageItem || 'jigsaw.noviceGuide';
        if (config?.resetLocalStorage) {
            localStorage.setItem(localStorageItem, '[]');
        }

        let guideKeys;
        [guides, guideKeys] = this._filterShownGuides(guides, localStorageItem);
        guides = this._deduplicate(guides, guideKeys);

        if (guides.length == 0) {
            console.warn('All guides were shown.');
            return;
        }

        guides.forEach(guide => {
            const tagName = guide.tagName ? guide.tagName.toUpperCase() : '';
            const id = guide.id ? '#' + guide.id : '';
            const classes = guide.classes ? "." + guide.classes.replace(" ", ".") : '';
            const selector = `${tagName}${id}${classes}`;
            const opt = selector !== tagName && !guide.property1 && !guide.property2;

            const queryResult = document.body.querySelectorAll(selector);
            if (queryResult.length > 0) {
                const result = Array.from(queryResult).filter(node => {
                    const property1Checker = node[guide.property1?.property] === guide.property1?.value;
                    const property2Checker = node[guide.property2?.property] === guide.property2?.value;
                    return property1Checker && property2Checker;
                })

                if (result.length === 1) {
                    this._createNoviceGuide(guide, result[0] as HTMLElement, localStorageItem);
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
                            this._createNoviceGuide(guide, queryResult[0] as HTMLElement, localStorageItem);
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

                    if (guide.property1 && node.target[guide.property1.property] !== guide.property1.value) {
                        return false
                    }

                    if (guide.property2 && node.target[guide.property2.property] !== guide.property2.value) {
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
                this._createNoviceGuide(guide, filterResult[0].target as HTMLElement, localStorageItem)

                this.resize();
            })
            mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
            this._showing.mutation.push(mutationObserver)
        }
        )
    }

    private _showing: { guideEle: HTMLElement[], cloneEle: HTMLElement[], guideKey: string[], mutation: MutationObserver[] } = {
        guideEle: [],
        cloneEle: [],
        guideKey: [],
        mutation: []
    }

    private _createNoviceGuide(guide, targetEle: HTMLElement, localStorageItem: string) {
        const guideKey = this._toKeyString(guide);

        if (this._showing.guideKey.indexOf(guideKey) !== -1) {
            return;
        }

        let guideEle = document.createElement('div');
        this._getGuideContainer().appendChild(guideEle);
        this._relocateClone(targetEle, guideEle);

        // if ( guide.hasOwnProperty('notice') ){
        //     guide.notice =1;
        // }

        if (typeof guide.notice === 'string') {
            guide.notice = { type: NoviceGuideNoticeType.bubble, notice: guide.notice }
        }
        guideEle.classList.add('novice-guide-clone');
        guideEle.innerHTML = `
        <div class="${guide.notice.type} ${guide.notice.type}-${guide.position}">
            <div class="line">
                <div></div>
            </div>
            <div class="notice-cntr">
                <div class="text">${guide.notice.notice}</div>
                <i class="close iconfont iconfont-e14b"></i>
            </div>
        </div>`;
        guideEle.setAttribute('guideIndex', this._showing.cloneEle.length + '')

        this._showing.guideEle.push(targetEle)
        this._showing.cloneEle.push(guideEle)
        this._showing.guideKey.push(guideKey)

        guideEle.onclick = function (e) {
            if (!(e.target as HTMLElement).classList.contains('close')) {
                return;
            }
            const index = guideEle.getAttribute('guideIndex');
            jigsawGuide._showing.cloneEle[index] = false;
            jigsawGuide._showing.guideKey[index] = '';
            guideEle.remove();
            const shownKeys = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
            shownKeys.push(guideKey);
            localStorage.setItem(localStorageItem, JSON.stringify(shownKeys))

            const leftGuideCloneArr = jigsawGuide._showing.cloneEle.filter(clone => {
                return clone;
            })
            if (leftGuideCloneArr.length === 0) {
                jigsawGuide._removeGuideContainer();
                jigsawGuide._showing.guideEle = [];
                jigsawGuide._showing.cloneEle = [];
            }
        }
    }

    private _filterShownGuides(guides: NoviceGuide[], localStorageItem: string): [NoviceGuide[], string[]] {
        const keys = guides.map(g => this._toKeyString(g));
        const shownKeys = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
        const guidesCopy = [...guides];
        keys.forEach((key, idx) => {
            if (shownKeys.indexOf(key) == -1) {
                return;
            }
            guidesCopy[idx] = null;
            keys[idx] = null;
        });
        return [guidesCopy.filter(g => !!g), keys.filter(k => !!k)];
    }

    private _deduplicate(guides: NoviceGuide[], keys: string[]): NoviceGuide[] {
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

    private _toKeyString(guide: BasicNoviceGuide): string {
        let fields = [guide.version || 'v0'];
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

    private _getGuideContainer(): HTMLElement {
        const cntr = document.getElementById('novice-guide-container');
        if (cntr === null) {
            const guideCntr = document.createElement('div');
            guideCntr.id = 'novice-guide-container';
            document.body.appendChild(guideCntr);
            return guideCntr;
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
        jigsawGuide._showing.cloneEle.forEach((clone, i) => {
            if (!clone) {
                return;
            }

            jigsawGuide._relocateClone(jigsawGuide._showing.guideEle[i], clone)
        });
    }

    private _relocateClone(target: HTMLElement, clone: HTMLElement) {
        const { left, top, width, height } = target.getBoundingClientRect();
        if (left + top + width + height === 0) {
            return;
        }
        clone.style.top = top + 'px';
        clone.style.left = left + 'px';
        clone.style.width = width + 'px';
        clone.style.height = height + 'px';
    }

    public clear(): void {
        this._removeGuideContainer();
        this._showing.cloneEle.forEach(clone => {
            if (clone) {
                clone.remove();
            }
        })
        this._showing.mutation.forEach(mutation => {
            if (mutation) {
                mutation.disconnect();
            }
        })
        this._showing.guideKey = [];
        this._showing.guideEle = [];
    }
}
export const jigsawGuide = new JigsawGuide();


