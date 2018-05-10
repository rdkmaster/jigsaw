import {Component, ContentChild, Input, TemplateRef, Type, ViewChild} from '@angular/core';
import {IDynamicInstantiatable} from "../common";

@Component({
    selector: 'jigsaw-tab-pane, j-tab-pane',
    template: `
        <ng-template #label>
            {{title}}
            <ng-content select="[jigsaw-title]"></ng-content>
        </ng-template>
    `
})
export class JigsawTabPane {
    @Input()
    public title: string;

    @Input()
    public disabled: boolean = false;

    @Input()
    public hidden: boolean = false;

    /**
     * @deprecated use `lazy` instead
     *
     * @internal
     */
    @Input()
    public async: boolean = true; // 默认异步加载

    /**
     * 为true时，Tab页的视图延将被迟到该Tab页被打开的时候才被初始化。
     *
     * @type {boolean}
     */
    @Input()
    public lazy: boolean = true;

    @Input()
    public initData: Object;

    @ViewChild('label') label: TemplateRef<any> | Type<IDynamicInstantiatable>;
    @ContentChild(TemplateRef) content: TemplateRef<any> | Type<IDynamicInstantiatable>;
}


