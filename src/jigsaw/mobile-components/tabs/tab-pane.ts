import {Component, ContentChild, Input, TemplateRef, Type, ViewChild} from '@angular/core';
import {IDynamicInstantiatable} from "../../common/common";

@Component({
    selector: 'jigsaw-mobile-tab-pane, jm-tab-pane',
    template: `
        <ng-template #label>
            {{title}}
            <ng-content select="[jigsaw-mobile-title]"></ng-content>
        </ng-template>
    `
})
export class JigsawMobileTabPane {
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

    @ViewChild('label', {static: false}) label: TemplateRef<any> | Type<IDynamicInstantiatable>;
    @ContentChild(TemplateRef, {static: false}) content: TemplateRef<any> | Type<IDynamicInstantiatable>;
}


