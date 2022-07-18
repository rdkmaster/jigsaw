export enum NoviceGuideType {
    bubble = 'bubble', dialog = 'dialog', stepped = 'stepped', wizard = 'wizard'
}

export interface NoviceGuideContent {
    notice: string;
    position: 'top' | 'left' | 'right' | 'bottom';
    title?: string;
    useHtml?: boolean;
    button?: string;
    trigger?: 'click' | 'mouseover';
    key?: string;
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

export interface NoviceGuideNotice extends NoviceGuideContent {
}

export interface NoviceGuideNotice extends NoviceGuidePicker {
}

export interface NoviceGuideOptions {
    /**
     * 一个指引显示出来之后，最大的过期时间；比如这个值设置了7天，那么7天之后，一个指引将会再被显示。
     */
    expire: number;
    /**
     * 从当前时刻往前回溯这个时长，计算在这个时长内显示了几次指引，主要目的是为了控制打扰次数。
     */
    duration: number;
    /**
     * 在 `duration` 时长内最大允许显示指引的次数，主要目的是为了控制打扰次数。
     */
    maxShowTimes: number;
    /**
     * 缓存的数据放在localeStorage里的主键名。
     */
    storageKey: string;
    /**
     * 如果show一个指引时，目标dom节点尚未存在，则会自动等待一段时间，一般这个情况都是时间差导致的，因此等待的时间不需要太长
     */
    maxWaitTargetTimeout: number;
}

/**
 * version属性，再加上父类里的tagName等属性一起，共同组成了一个帮助内容的标识
 */
export interface BasicNoviceGuide {
    type: NoviceGuideType;
    notices: NoviceGuideNotice[];
    version: string;
    key?: string;
}

export interface BubbleNoviceGuide extends BasicNoviceGuide {
    type: NoviceGuideType.bubble;
}

export interface DialogNoviceGuide extends BasicNoviceGuide {
    type: NoviceGuideType.dialog;
}

export interface SteppedNoviceGuide extends BasicNoviceGuide {
    type: NoviceGuideType.stepped;
}

export interface WizardNoviceGuide extends BasicNoviceGuide {
    type: NoviceGuideType.wizard;
}

export type NoviceGuide = BubbleNoviceGuide | DialogNoviceGuide | SteppedNoviceGuide | WizardNoviceGuide;

export type ShowingNotice = {
    noticeKey: string, guideElement?: HTMLElement, cloneElement?: HTMLElement, mutation?: MutationObserver
}

export type ShowResult = 'invalid-data' | 'conflict' | 'all-shown' | 'showing' | 'too-many-interruptions';

export type ShownGuideInfo = { guideKey: string, timestamp: number, notices: string[] };
