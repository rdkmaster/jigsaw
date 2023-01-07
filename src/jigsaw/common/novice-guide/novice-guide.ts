import {NoviceGuide, NoviceGuideNotice, NoviceGuideOptions, NoviceGuideType, ShowingNotice, ShowResult} from "./types";
import {
    clearExpiredGuides,
    closeNoviceGuideNotice, copyAndNormalize,
    debouncedResize,
    getGuideContainer,
    onGoing,
    options, queryNode,
    removeStyle,
    resize,
    showingNotices,
    shownGuides,
    tooManyInterruptions
} from "./utils";

function reset() {
    shownGuides.splice(0, shownGuides.length);
    localStorage.setItem(options.storageKey, '[]');
}

function clear() {
    showingNotices.forEach(sn => {
        sn.cloneElement?.remove();
        sn.mutation?.disconnect();
    });
    showingNotices.splice(0, showingNotices.length);
    removeStyle();
    window.removeEventListener('resize', debouncedResize);
}

function updateOptions(opt: NoviceGuideOptions) {
    options.expire = opt?.expire || options.expire;
    options.duration = opt?.duration || options.duration;
    options.maxShowTimes = opt?.maxShowTimes || options.maxShowTimes;
    options.storageKey = opt?.storageKey || options.storageKey;
    options.maxWaitTargetTimeout = opt?.maxWaitTargetTimeout || options.maxWaitTargetTimeout;
    options.ngZone = opt?.ngZone || options.ngZone;
}

function show(guide: NoviceGuide, force: boolean = false): ShowResult {
    if (!document.body) {
        console.error('document.body is not ready right now, try invoke this function later...');
        return;
    }
    if (!guide || !guide.notices?.length) {
        console.error('There is no available guide data.');
        return 'invalid-data';
    }
    if (onGoing()) {
        return 'conflict';
    }
    if (tooManyInterruptions()) {
        return 'too-many-interruptions';
    }

    clearExpiredGuides();
    guide = copyAndNormalize(guide);
    const notices: NoviceGuideNotice[] = filterGuide(guide, force);
    if (notices.length == 0) {
        console.warn('All notices of this guide were shown.');
        return 'all-shown';
    }

    window.addEventListener('resize', debouncedResize);

    if (guide.type === NoviceGuideType.bubble || guide.type === NoviceGuideType.dialog) {
        notices.forEach((notice) => {
            createNoviceGuideNotice(guide, notices, notice);
        });
    }
    if (guide.type === NoviceGuideType.stepped) {
        // 分步指引中，若存在页面无法找到的元素则退出
        if (notices.find(notice => !queryNode(notice))) {
            return 'not-all-steps-ready';
        }
        createNoviceGuideNotice(guide, notices, notices[0]);
    }
    if (guide.type === NoviceGuideType.wizard) {
        createNoviceGuideNotice(guide, notices, notices[0]);
    }
    return 'showing';
}

function createNoviceGuideNotice(guide: NoviceGuide, notices: NoviceGuideNotice[], notice: NoviceGuideNotice) {
    const showingNotice: ShowingNotice = {noticeKey: notice.key};
    showingNotices.push(showingNotice);

    const found = queryNode(notice);
    if (found) {
        createNoticeWithDelay(guide, notice, found as HTMLElement, showingNotice);
        return;
    }

    // 当前还找不到，那就要等着了
    let observerTimer;
    showingNotice.mutation = new MutationObserver(() => {
        // 实测querySelector的性能可以接受（万次耗时500~700ms）
        const found = queryNode(notice);
        if (!found) {
            return;
        }
        createNoticeWithDelay(guide, notice, found as HTMLElement, showingNotice, observerTimer);
    });
    showingNotice.mutation.observe(document.body, {childList: true, subtree: true});
    observerTimer = setTimeout(() => disconnectMutationObserver(showingNotice, observerTimer), options.maxWaitTargetTimeout);
}

function createNoticeWithDelay(guide: NoviceGuide, notice: NoviceGuideNotice, targetEle: HTMLElement,
                               showingNotice: ShowingNotice, observerTimer?: number) {
    if (isNaN(notice.delay)) {
        func();
    } else {
        setTimeout(func, notice.delay);
    }

    function func() {
        createNotice(guide, notice, targetEle);
        if (!isNaN(observerTimer)) {
            disconnectMutationObserver(showingNotice, observerTimer);
        }
    }
}

function createNotice(guide: NoviceGuide, notice: NoviceGuideNotice, targetEle: HTMLElement) {
    // 用微任务触发resize，避免setTimeout引起Angular的变更检测
    Promise.resolve().then(resize);

    if (guide.type === NoviceGuideType.bubble || guide.type === NoviceGuideType.dialog) {
        createBubbleOrDialogNotice(guide, notice, targetEle);
    } else if (guide.type === NoviceGuideType.stepped) {
        createSteppedNotice(guide, notice, targetEle);
    } else if (guide.type === NoviceGuideType.wizard) {
        createWizardStep(guide, notice, targetEle);
    } else {
        console.error("Error: unsupported novice notice type:", (<any>guide).type);
    }
}

function disconnectMutationObserver(showingNotice: ShowingNotice, timer: number) {
    clearTimeout(timer);
    showingNotice.mutation?.disconnect();
    showingNotice.mutation = null;
    if (!showingNotice.cloneElement) {
        const idx = showingNotices.indexOf(showingNotice);
        if (idx != -1) {
            showingNotices.splice(idx, 1);
        }
    }
}

function createBubbleOrDialogNotice(guide: NoviceGuide, notice: NoviceGuideNotice, targetEle: HTMLElement) {
    if (showingNotices.find(sn => sn.noticeKey == notice.key)?.cloneElement) {
        return;
    }

    const hasMask = guide.type === NoviceGuideType.dialog;
    const style = notice.width ? `style="width: ${notice.width}"` : '';
    let html: string;
    if (guide.type === NoviceGuideType.bubble) {
        html = `
            <div class="novice-guide-${guide.type} ${guide.type}-${notice.position}">
                <div class="novice-guide-line">
                    <div></div>
                </div>
                <div class="notice-cntr" ${style}>
                    <div class="novice-guide-text">${notice.notice}</div>
                    <i class="novice-guide-close iconfont iconfont-e14b"></i>
                </div>
            </div>`;
    } else if (guide.type === NoviceGuideType.dialog) {
        html = `
            <div class="novice-guide-${guide.type} ${guide.type}-${notice.position}">
                <div class="notice-cntr" ${style}>
                    <div class="novice-guide-title">${notice.title}</div>
                    <div class="novice-guide-text">${notice.notice}</div>
                    <div class="button-cntr">
                        <div class="novice-guide-close novice-guide-button">${notice.button}</div>
                    </div>
                </div>
            </div>`;
    }

    const cloneEle = createCloneElement(targetEle, notice.key);
    cloneEle.innerHTML = html;
    cloneEle.onclick = (e) => {
        if (!(e.target as HTMLElement).classList.contains('novice-guide-close')) {
            return;
        }
        cloneEle.onclick = null;
        saveShownGuide(guide, notice);
        closeNoviceGuideNotice(notice.key, hasMask);
    };

    getGuideContainer(hasMask).appendChild(cloneEle);
}

function createSteppedNotice(guide: NoviceGuide, notice: NoviceGuideNotice, targetEle: HTMLElement) {
    if (showingNotices.find(sn => sn.noticeKey == notice.key)?.cloneElement) {
        return;
    }

    const current = guide.notices.indexOf(notice);
    const isLast = current === guide.notices.length - 1;
    let buttonHtml: string;
    if (current === 0) {
        buttonHtml = `<div class="novice-guide-next novice-guide-button">&rarr;</div>`
    } else if (isLast) {
        buttonHtml = `<div class="novice-guide-pre novice-guide-button">&larr;</div><div class="novice-guide-close novice-guide-button">&times;</div>`
    } else {
        buttonHtml = `<div class="novice-guide-pre novice-guide-button">&larr;</div><div class="novice-guide-next novice-guide-button">&rarr;</div>`
    }

    const cloneEle = createCloneElement(targetEle, notice.key);
    const style = notice.width ? `style="width: ${notice.width}"` : '';
    cloneEle.innerHTML = `
        <div class="novice-guide-${NoviceGuideType.dialog} ${NoviceGuideType.dialog}-${notice.position}">
            <div class="notice-cntr" ${style}>
                <div class="novice-guide-title">${notice.title}
                    <div class="novice-guide-close iconfont iconfont-e14b close-arrow"></div>
                </div>
                <div class="novice-guide-text">${notice.notice}</div>
                <div class="button-cntr">
                    <div class="progress">${current + 1}/${guide.notices.length}</div>
                    ${buttonHtml}
                </div>

            </div>
        </div>`;

    cloneEle.onclick = (e) => {
        // 处理提示里的叉叉按钮，鼠标点击了它后，鼠标事件冒泡到最外头被这个函数抓住
        if ((e.target as HTMLElement).classList.contains('novice-guide-close')) {
            cloneEle.onclick = null;
            closeNoviceGuideNotice(notice.key, true);
            saveShownGuide(guide, notice);
            return;
        }

        if ((e.target as HTMLElement).classList.contains('novice-guide-next')) {
            onClicked('novice-guide-next');
        } else if ((e.target as HTMLElement).classList.contains('novice-guide-pre')) {
            onClicked('novice-guide-pre');
        }
    };

    getGuideContainer(true).appendChild(cloneEle);
    resize();

    function onClicked(type: 'novice-guide-pre' | 'novice-guide-next') {
        const offset = type === 'novice-guide-pre' ? -1 : 1;
        const nextNotice = guide.notices[current + offset];
        const target = queryNode(nextNotice);
        if (!target) {
            return;
        }

        showingNotices.push({noticeKey: nextNotice.key});
        createSteppedNotice(guide, nextNotice, target as HTMLElement);
        closeNoviceGuideNotice(notice.key, true);
    }
}

function createWizardStep(guide: NoviceGuide, notice: NoviceGuideNotice, targetEle: HTMLElement) {
    if (showingNotices.find(sn => sn.noticeKey == notice.key)?.cloneElement) {
        return;
    }

    const cloneEle = createCloneElement(targetEle, notice.key);
    cloneEle.innerHTML = `
        <div class="novice-guide-${NoviceGuideType.wizard} ${NoviceGuideType.wizard}-${notice.position || 'bottom'}">
            <div class="arrow-cntr">
                <i class="arrow iconfont iconfont-e250"></i>
            </div>
            <div class="notice-cntr">
                <div class="novice-guide-text">${notice.notice}</div>
                <i class="novice-guide-close iconfont iconfont-e14b"></i>
            </div>
        </div>
    `;

    const current = guide.notices.indexOf(notice);
    cloneEle.onclick = (e) => {
        if (!(e.target as HTMLElement).classList.contains('novice-guide-close')) {
            return;
        }
        cloneEle.onclick = null;
        if (current === guide.notices.length - 1) {
            saveShownGuide(guide, notice);
        }
        closeNoviceGuideNotice(notice.key, false);
    };

    const handleClick = () => {
        targetEle.removeEventListener('click', handleClick);
        if (current === guide.notices.length - 1) {
            saveShownGuide(guide, notice);
            closeNoviceGuideNotice(notice.key, false);
        } else {
            createNoviceGuideNotice(guide, guide.notices, guide.notices[current + 1]);
            closeNoviceGuideNotice(notice.key, false);
        }
    };
    targetEle.addEventListener('click', handleClick);

    const container = getGuideContainer(false);
    container.appendChild(cloneEle);
    container.classList.add('novice-guide-wizard');
    resize();
}

function filterGuide(guide: NoviceGuide, force: boolean = false): NoviceGuideNotice[] {
    if (force) {
        return guide.notices;
    }
    const guideInfo = shownGuides.find(g => g.guideKey == guide.key);
    if (!guideInfo) {
        return guide.notices;
    }

    if (guide.type === NoviceGuideType.stepped || guide.type === NoviceGuideType.wizard) {
        return [];
    }

    const keys = guide.notices.map(notice => notice.key);
    const filtered = keys
        // 去重
        .filter((key, idx, arr) => idx == arr.indexOf(key))
        // 去掉已经显示过的
        .filter(key => guideInfo.notices.indexOf(key) == -1);
    return filtered.map(key => keys.indexOf(key)).map(idx => guide.notices[idx]);
}

function createCloneElement(targetEle: HTMLElement, noticeKey: string): HTMLDivElement {
    const cloneEle = document.createElement('div');
    cloneEle.classList.add('novice-guide-clone');
    const sn = showingNotices.find(sn => sn.noticeKey == noticeKey);
    sn.cloneElement = cloneEle;
    sn.guideElement = targetEle;
    sn.mutation?.disconnect();
    sn.mutation = null;
    return cloneEle;
}

function saveShownGuide(guide: NoviceGuide, notice: NoviceGuideNotice) {
    const shownGuide = shownGuides.find(g => g.guideKey == guide.key);
    if (shownGuide) {
        shownGuide.timestamp = Date.now();
        if (shownGuide.notices.indexOf(notice.key) == -1) {
            shownGuide.notices.push(notice.key);
        }
    } else {
        shownGuides.push({guideKey: guide.key, timestamp: Date.now(), notices: [notice.key]});
    }
    localStorage.setItem(options.storageKey, JSON.stringify(shownGuides));
}

type NoviceGuideWrapper = {
    show: (guide: NoviceGuide, force?: boolean) => ShowResult;
    reset: () => void;
    clear: () => void;
    updateOptions: (opt: NoviceGuideOptions) => void;
};
/**
 * 由于 novice guide 需要在js上下文中直接使用，因此这里通过noviceGuide这个变量来起到命名空间的作用
 * 从而统一ts和js两种上下文的引入用法一致。
 */
export const noviceGuide: NoviceGuideWrapper = {
    show: (guide: NoviceGuide, force: boolean = false) => {
        if ((<any>shownGuides).disabled) {
            return 'disabled';
        }
        if (options.ngZone) {
            return <ShowResult>options.ngZone.runOutsideAngular(() => show(guide, force));
        } else {
            return show(guide, force);
        }
    },
    reset: () => {
        if (options.ngZone) {
            options.ngZone.runOutsideAngular(reset);
        } else {
            reset();
        }
    },
    clear: () => {
        if (options.ngZone) {
            options.ngZone.runOutsideAngular(clear);
        } else {
            clear();
        }
    },
    updateOptions: (opt: NoviceGuideOptions) => {
        if (options.ngZone) {
            options.ngZone.runOutsideAngular(() => updateOptions(opt));
        } else {
            updateOptions(opt);
        }
    }
};
