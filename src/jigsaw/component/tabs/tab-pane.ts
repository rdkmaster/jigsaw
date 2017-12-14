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

    @Input()
    public lazy: boolean = true; // 默认异步加载

    @Input()
    public initData: Object;

    @ViewChild('label') label: TemplateRef<any> | Type<IDynamicInstantiatable>;
    @ContentChild(TemplateRef) content: TemplateRef<any> | Type<IDynamicInstantiatable>;
}


