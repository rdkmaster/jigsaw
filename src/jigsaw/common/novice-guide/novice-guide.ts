import {NoviceGuide, NoviceGuideNotice, NoviceGuideType, ShowResult, ShownNotice} from "./types";
import {
    clearExceptMutations,
    closeNoviceGuideNotice,
    debouncedResize,
    getGuideContainer,
    getSelector,
    localStorageItem,
    onGoing,
    removeGuideContainer,
    removeStyle,
    resize,
    showing,
    toKeyString
} from "./utils";

/**
 * 由于 novice guide 需要在js上下文中直接使用，因此这里通过noviceGuide这个变量来起到命名空间的作用
 * 从而统一ts和js两种上下文的引入用法一致。
 */
export const noviceGuide = {show, reset, clear};
declare const window: any;
if (window) {
    window.jigsaw = window.jigsaw || {};
    window.jigsaw.noviceGuide = noviceGuide;
}

function reset() {
    localStorage.setItem(localStorageItem, '[]');
}

function clear() {
    clearExceptMutations();
    showing.mutations.forEach(mutation => mutation.disconnect());
    showing.mutations = [];
    removeStyle();
    window.removeEventListener('resize', debouncedResize);
}

function show(guide: NoviceGuide, maxWaitMs: number = 10000): ShowResult {
    if (!guide || !guide.notices?.length) {
        console.error('There is no available guide data.');
        return 'invalid-data';
    }
    if (onGoing()) {
        console.log('Conflict, there is a novice guide showing...');
        return 'conflict';
    }
    // 把version复制到notice里，方便后续使用
    guide.notices.forEach(n => n.version = n.version || guide.version);
    const notices: NoviceGuideNotice[] = filterGuide(guide);
    if (notices.length == 0) {
        console.warn('All guides were shown.');
        return 'all-shown';
    }

    showing.maxWaitMs = maxWaitMs;
    window.addEventListener('resize', debouncedResize);

    if (guide.type === NoviceGuideType.bubble || guide.type === NoviceGuideType.dialog) {
        notices.forEach((notice) => {
            createNoviceGuideNotice(guide.type, notices, notice);
        });
    }
    if (guide.type === NoviceGuideType.stepped) {
        createNoviceGuideNotice(guide.type, notices, notices[0]);
    }
    if (guide.type === NoviceGuideType.wizard) {
        const container = getGuideContainer(false);
        container.classList.add('wizard');
        createNoviceGuideNotice(guide.type, notices, notices[0]);
    }
    return 'showing';
}

function createNoviceGuideNotice(guideType: NoviceGuideType, notices: NoviceGuideNotice[], notice: NoviceGuideNotice) {
    const selector = getSelector(notice);
    // 如果有多个，就用浏览器找到的第一个，不管其他的了
    const found = document.querySelector(selector);
    if (found) {
        createNotice(found as HTMLElement);
        return;
    }

    // 当前还找不到，那就要等着了
    let clearTimer;
    const mutationObserver = new MutationObserver(() => {
        // 实测querySelector的性能可以接受（万次耗时500~700ms）
        const found = document.querySelector(selector);
        if (!found) {
            return;
        }
        createNotice(found as HTMLElement);
        resize();
        clearObserver();
    });
    mutationObserver.observe(document.body, {childList: true, subtree: true});
    clearTimer = setTimeout(() => clearObserver(), showing.maxWaitMs);
    showing.mutations.push(mutationObserver);

    function createNotice(targetEle: HTMLElement) {
        if (guideType === NoviceGuideType.bubble || guideType === NoviceGuideType.dialog) {
            createBubbleOrDialogNotice(guideType, notice, targetEle);
        } else if (guideType === NoviceGuideType.stepped) {
            createSteppedNotice(notices, notice, targetEle);
        } else if (guideType === NoviceGuideType.wizard) {
            createWizardStep(notices, notice, targetEle)
        } else {
            console.error("Error: unsupported novice notice type:", guideType);
        }
    }

    function clearObserver() {
        clearTimeout(clearTimer);
        mutationObserver.disconnect();
        const idx = showing.mutations.indexOf(mutationObserver);
        if (idx != -1) {
            showing.mutations.splice(idx, 1);
        }
    }
}

function createBubbleOrDialogNotice(type: NoviceGuideType, notice: NoviceGuideNotice, targetEle: HTMLElement) {
    const guideKey: string = toKeyString(notice);
    if (showing.guideKeys.indexOf(guideKey) !== -1) {
        return;
    }

    const hasMask = type === NoviceGuideType.dialog;
    let html = '';
    if (type === NoviceGuideType.bubble) {
        html = `
            <div class="${type} ${type}-${notice.position}">
                <div class="line">
                    <div></div>
                </div>
                <div class="notice-cntr">
                    <div class="text">${notice.notice}</div>
                    <i class="close iconfont iconfont-e14b"></i>
                </div>
            </div>`;
    }
    if (type === NoviceGuideType.dialog) {
        html = `
            <div class="${type} ${type}-${notice.position}">
                <div class="notice-cntr">
                    <div class="title">${notice.title}</div>
                    <div class="text">${notice.notice}</div>
                    <div class="button-cntr">
                        <div class="close button">${notice.button}</div>
                    </div>
                </div>
            </div>`;
    }

    const cloneEle = createCloneElement(targetEle, guideKey);
    cloneEle.innerHTML = html;
    cloneEle.onclick = (e) => {
        if (!(e.target as HTMLElement).classList.contains('close')) {
            return;
        }
        cloneEle.onclick = null;
        saveShownKeys(guideKey);
        closeNoviceGuideNotice(cloneEle, hasMask);
    };

    getGuideContainer(hasMask).appendChild(cloneEle);
    resize();
}

function createSteppedNotice(notices: NoviceGuideNotice[], notice: NoviceGuideNotice, targetEle: HTMLElement) {
    const key = toKeyString(notice);
    if (showing.guideKeys.indexOf(key) !== -1) {
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

    const cloneEle = createCloneElement(targetEle, key);
    cloneEle.innerHTML = `
        <div class="${NoviceGuideType.dialog} ${NoviceGuideType.dialog}-${notice.position}">
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
                saveShownKeys(guideKeys.join());
            }
            closeNoviceGuideNotice(cloneEle, true);
        }

        if ((e.target as HTMLElement).classList.contains('next')) {
            onButtonClicked('next', notices, current, cloneEle);
        }
        if ((e.target as HTMLElement).classList.contains('pre')) {
            onButtonClicked('pre', notices, current, cloneEle);
        }
    };

    getGuideContainer(true).appendChild(cloneEle);
    resize();
}

function createWizardStep(notices: NoviceGuideNotice[], notice: NoviceGuideNotice, targetEle: HTMLElement) {
    const key = toKeyString(notice);
    if (showing.guideKeys.indexOf(key) !== -1) {
        return;
    }

    const cloneEle = createCloneElement(targetEle, key);
    cloneEle.innerHTML = `
        <div class="${NoviceGuideType.wizard} ${NoviceGuideType.wizard}-${notice.position}">
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
            saveShownKeys(guideKeys.join());
        }
        closeNoviceGuideNotice(cloneEle, false);
    };

    const handleClick = () => {
        targetEle.removeEventListener('click', handleClick);
        if (current === notices.length - 1) {
            saveShownKeys(guideKeys.join());
            closeNoviceGuideNotice(cloneEle, false);
        } else {
            createNoviceGuideNotice(NoviceGuideType.wizard, notices, notices[current + 1]);
            closeNoviceGuideNotice(cloneEle, false);
        }
    };
    targetEle.addEventListener('click', handleClick);

    getGuideContainer(false).appendChild(cloneEle);
    resize();
}

function filterGuide(guide: NoviceGuide): NoviceGuideNotice[] {
    let keys = guide.notices.map(notice => toKeyString(notice));
    const shownItems: ShownNotice[] = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
    if (guide.type === NoviceGuideType.stepped || guide.type === NoviceGuideType.wizard) {
        const joinKey = keys.join();
        if (shownItems.find(item => item.key == joinKey)) {
            return [];
        }
    }

    let filtered = keys.filter((key, idx, arr) => idx == arr.indexOf(key));
    if (guide.type === NoviceGuideType.bubble) {
        filtered = filtered.filter(key => !shownItems.find(i => i.key == key));
    }
    return filtered.map(key => keys.indexOf(key)).map(idx => guide.notices[idx]);
}

function createCloneElement(targetEle: HTMLElement, guideKey: string): HTMLDivElement {
    const cloneEle = document.createElement('div');
    cloneEle.classList.add('novice-guide-clone');
    showing.guideElements.push(targetEle);
    showing.cloneElements.push(cloneEle);
    showing.guideKeys.push(guideKey);
    return cloneEle;
}

function saveShownKeys(guideKey: string) {
    const shownKeys: ShownNotice[] = JSON.parse(localStorage.getItem(localStorageItem) || '[]');
    const idx = shownKeys.findIndex(i => i.key == guideKey);
    let item;
    if (idx != -1) {
        item = shownKeys[idx];
        item.timestamp = Date.now();
        // 挪到最前面去，这样后面就可以直接从第一个读取到最近一次显示指引的时间戳了。
        shownKeys.splice(idx, 1);
    } else {
        item = {key: guideKey, timestamp: Date.now()}
    }
    shownKeys.unshift(item);
    localStorage.setItem(localStorageItem, JSON.stringify(shownKeys))
}

function onButtonClicked(type: 'pre' | 'next', notices: NoviceGuideNotice[], current: number, cloneEle: HTMLDivElement) {
    const offset = type === 'pre' ? -1 : 1;
    const notice = notices[current + offset];
    const selector = getSelector(notice);
    const target = document.querySelector(selector);
    if (!target) {
        return;
    }

    createSteppedNotice(notices, notice, target as HTMLElement);
    const index = showing.cloneElements.indexOf(cloneEle);
    showing.cloneElements.splice(index, 1);
    showing.guideKeys.splice(index, 1);
    showing.guideElements.splice(index, 1);
    cloneEle.remove();

    const dialogClone = document.querySelectorAll('.novice-guide-clone .dialog');
    const mask = document.getElementById('novice-guide-mask');
    if (dialogClone.length === 0 && mask) {
        mask.remove();
    }
    if (mask) {
        mask.innerHTML = '';
    }
    if (showing.cloneElements.length === 0) {
        removeGuideContainer();
        showing.guideElements = [];
        showing.cloneElements = [];
    }
    resize();
}
