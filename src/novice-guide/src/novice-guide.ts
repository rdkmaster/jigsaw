export enum NoviceGuideNoticeType {
    bubble = 'bubble', dialog = 'dialog', wizard = 'wizard'
}

export interface NoviceGuideNotice {
    type: NoviceGuideNoticeType;
    title?: string;
    notice?: string;
    useHtml?: boolean;
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

export function noviceGuide(guides: NoviceGuide[], config?: NoviceGuideConfig): void {
    if (!guides?.length) {
        console.error('There is no available guide data.');
        return;
    }

    if (noviceGuide.noviceGuideEleArr.length === 0) {
        const cancelDebounce = debounce(resize, 500);
        window.addEventListener('resize', cancelDebounce)
    }

    const localStorageItem = config?.localStorageItem || 'jigsaw.noviceGuide';
    if (config?.resetLocalStorage) {
        localStorage.setItem(localStorageItem, '[]');
    }

    let guideKeys;
    [guides, guideKeys] = _filterShownGuides(guides, localStorageItem);
    console.log(guides, guideKeys)
    guides = _deduplicate(guides, guideKeys);
    if (guides.length == 0) {
        console.warn('All guides were shown.');
        return;
    }

    guides.forEach(guide => {
        const tagName = guide.tagName ? guide.tagName.toUpperCase() : '';
        const id = guide.id ? '#' + guide.id : '';
        const classes = guide.classes ? guide.id : '';
        const selector = `${tagName}${id}`;
        const queryResult = document.body.querySelectorAll(selector);

        if (queryResult.length === 1) {
            _createNoviceGuide(guide, queryResult[0], localStorageItem);

            // const observer = new IntersectionObserver(entries => {
            // })
            // observer.observe(queryResult[0])

        } else {
            const mutationObserver = new MutationObserver(entries => {
                const addedNodes = entries.filter(m => m.addedNodes?.length > 0);
                if (addedNodes.length == 0) {
                    return;
                }
                const filterResult = addedNodes.filter(node => {
                    const tagFilter = node.target.nodeName === tagName;
                    const idFilter = node.target["id"] === id;
                    const classFilter = node.target["classList"] === classes;
                    const property1Filter = node.target[guide.property1.property] === guide.property1.value;
                    return tagFilter && idFilter && property1Filter;
                })

                if (filterResult.length !== 1) {
                    return
                }

                _createNoviceGuide(guide, (filterResult[0].target as HTMLElement), localStorageItem)

            })
            mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
        }
    })
}

noviceGuide.noviceGuideEleArr = [];
noviceGuide.noviceGuideCloneArr = [];

function _filterShownGuides(guides: NoviceGuide[], localStorageItem: string): [NoviceGuide[], string[]] {
    const keys = guides.map(g => _toKeyString(g));
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

function _deduplicate(guides: NoviceGuide[], keys: string[]): NoviceGuide[] {
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

function _toKeyString(guide: BasicNoviceGuide): string {
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

function _getGuideContainer() {
    const cntr = document.getElementById('novice-guide-container');
    if (cntr === null) {
        const guideCntr = document.createElement('div');
        guideCntr.id = 'novice-guide-container';
        document.body.appendChild(guideCntr);
        return guideCntr;
    }
    return cntr;
}

function _removeGuideContainer() {
    const cntr = document.getElementById('novice-guide-container');
    if (cntr === null) {
        return
    }
    cntr.remove();
}

function debounce(fn, delay) {
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

function resize() {
    noviceGuide.noviceGuideCloneArr.forEach((clone, i) => {
        if (!clone) {
            return;
        }

        _relocateClone(noviceGuide.noviceGuideEleArr[i], clone)
    });
}

function _relocateClone(target, clone) {
    const { left, top, width, height } = target.getBoundingClientRect();
    if (left + top + width + height === 0) {
        return;
    }
    clone.style.top = top + 'px';
    clone.style.left = left + 'px';
    clone.style.width = width + 'px';
    clone.style.height = height + 'px';
}

function _createNoviceGuide(guide, targetEle, localStorageItem) {
    let guideEle = document.createElement('div');
    _getGuideContainer().appendChild(guideEle);
    _relocateClone(targetEle, guideEle);
    guideEle.classList.add('novice-guide-clone');
    guideEle.innerHTML = `
    <div class="spot">
        <div class="line">
            <div></div>
        </div>
        <div class="notice-cntr">
            <div class="text">${guide.notice}</div>
            <i class="close iconfont iconfont-e14b"></i>
        </div>
    </div>`;
    guideEle.setAttribute('guideIndex', noviceGuide.noviceGuideCloneArr.length + '')
    noviceGuide.noviceGuideEleArr.push(targetEle)
    noviceGuide.noviceGuideCloneArr.push(guideEle)

    guideEle.onclick = function (e) {
        if (!(e.target as HTMLElement).classList.contains('close')) {
            return;
        }
        const index = guideEle.getAttribute('guideIndex');
        noviceGuide.noviceGuideCloneArr[index] = false;
        guideEle.remove();
        const shownKeys = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
        shownKeys.push(_toKeyString(guide));
        localStorage.setItem(localStorageItem, JSON.stringify(shownKeys))

        const leftGuideCloneArr = noviceGuide.noviceGuideCloneArr.filter(clone => {
            return clone;
        })
        if (leftGuideCloneArr.length === 0) {
            _removeGuideContainer();
            noviceGuide.noviceGuideEleArr = [];
            noviceGuide.noviceGuideCloneArr = [];
        }
    }
}
