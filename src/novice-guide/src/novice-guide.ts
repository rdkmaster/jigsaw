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

export function noviceGuide(data, config?: NoviceGuideConfig): void {
    // export function noviceGuide(guides: NoviceGuide[], config?: NoviceGuideConfig): void {
    // console.log(1)
    // if (!guides?.length) {
    //     console.error('There is no available guide data.');
    //     return;
    // }

    // const localStorageItem = config?.localStorageItem || 'jigsaw.noviceGuide';
    // if (config?.resetLocalStorage) {
    //     localStorage.setItem(localStorageItem, '[]');
    // }

    // let guideKeys;
    // [guides, guideKeys] = _filterShownGuides(guides, localStorageItem);
    // guides = _deduplicate(guides, guideKeys);
    // if (guides.length == 0) {
    //     console.warn('All guides were shown.');
    //     return;
    // }
    // const observer = new MutationObserver(observe);
    // observer.observe(document.body, { childList: true, subtree: true });

    // function observe(mutations) {
    //     const addedNodes = mutations.filter(m => m.addedNodes?.length > 0);
    //     if (addedNodes.length == 0) {
    //         return;
    //     }
    //     addedNodes.filter(node => {
    //         node.tagName == guide.tagName
    //         if (guide.id) {
    //             node.id == guide.id
    //         }
    //     })
    // }
    const tagName = data.tagName ? data.tagName.toUpperCase() : '';
    const id = data.id ? '#' + data.id : '';
    const classes = data.classes ? data.id : '';
    const selector = `${tagName}${id}`;
    const queryResult = document.body.querySelectorAll(selector);

    if (queryResult.length === 1) {
        let guideEle = document.createElement('div');
        console.log(queryResult[0])
        const { left, top, width, height } = queryResult[0].getBoundingClientRect();
        _getGuideContainer().appendChild(guideEle);
        guideEle.classList.add('novice-guide-clone');
        guideEle.style.top = top + 'px';
        guideEle.style.left = left + 'px';
        guideEle.style.width = width + 'px';
        guideEle.style.height = height + 'px';
        guideEle.style.background = "cyan";
        // guideEle.setAttribute('hostEleIndex', this.noviceGuideEleArr.length.toString())
        noviceGuide.noviceGuideEleArr.push(queryResult[0])

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
                const property1Filter = node.target[data.property1.property] === data.property1.value;
                return tagFilter && idFilter && property1Filter;
            })

            if (filterResult.length !== 1) {
                return
            }

            let guideEle = document.createElement('div');
            const { left, top, width, height } = (filterResult[0].target as HTMLElement).getBoundingClientRect();
            _getGuideContainer().appendChild(guideEle);
            guideEle.classList.add('novice-guide-clone');
            guideEle.style.top = top + 'px';
            guideEle.style.left = left + 'px';
            guideEle.style.width = width + 'px';
            guideEle.style.height = height + 'px';
            guideEle.style.background = "cyan";
            // guideEle.setAttribute('hostEle', JSON.stringify(filterResult[0].target))
            // console.log(JSON.stringify(filterResult[0].target))
        })
        mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
    }
}

noviceGuide.noviceGuideEleArr = [];

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