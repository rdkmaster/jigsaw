import {Component, ContentChild, Input, TemplateRef, Type, ViewChild} from '@angular/core';
import {IDynamicInstantiatable} from "../common";

@Component({
    selector: 'jigsaw-tab-pane, j-tab-pane',
    template: `
        <ng-template #label>
            {{title}}
            <ng-content select="[jigsaw-title]"></ng-content>
        </ng-template>
        <ng-content></ng-content>
    `
})
export class JigsawTabPane {
    @Input()
    public title: string;

    @Input()
    public disabled: boolean = false;

    @Input()
    public hidden: boolean = false;

    @Input()
    public async: boolean;

    @Input()
    public initData: Object;

    @ViewChild('label') label: TemplateRef<any> | Type<IDynamicInstantiatable>;
    @ContentChild(TemplateRef) content: TemplateRef<any> | Type<IDynamicInstantiatable>;
}


