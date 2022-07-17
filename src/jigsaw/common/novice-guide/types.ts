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

export type ShowingInfo = {
    guideElements: HTMLElement[], cloneElements: HTMLElement[], guideKeys: string[],
    mutations: MutationObserver[], maxWaitMs: number
};
export type ShowResult = 'invalid-data' | 'conflict' | 'all-shown' | 'showing';

export type StoragedNotice = {key: string, timestamp: number};
