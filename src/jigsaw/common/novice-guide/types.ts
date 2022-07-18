export enum NoviceGuideType {
    bubble = 'bubble', dialog = 'dialog', stepped = 'stepped', wizard = 'wizard'
}

export interface NoviceGuideContent {
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

export interface NoviceGuideNotice extends NoviceGuideContent {
}

export interface NoviceGuideNotice extends NoviceGuidePicker {
}

export interface NoviceGuideNotice extends NoviceGuideOptions {
}

/**
 * version属性，再加上父类里的tagName等属性一起，共同组成了一个帮助内容的标识
 */
export interface BasicNoviceGuide {
    type: NoviceGuideType;
    notices: NoviceGuideNotice[];
    version: string;
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

export type ShowingInfo = {
    guideElements: HTMLElement[], cloneElements: HTMLElement[], guideKeys: string[],
    mutations: MutationObserver[], maxWaitMs: number
};
export type ShowResult = 'invalid-data' | 'conflict' | 'all-shown' | 'showing';

export type ShownNotice = {key: string, timestamp: number};
