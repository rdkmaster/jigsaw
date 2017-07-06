import {Component, Input, TemplateRef, Type, ViewChild} from '@angular/core';
import {IDynamicInstantiatable} from "../core";

@Component({
    selector: 'jigsaw-tab-pane',
    template: `
        <ng-template #label>
            {{title}}
            <ng-content select="[jigsaw-title]"></ng-content>
        </ng-template>
        <ng-template #content>
            <ng-content></ng-content>
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

    @Input()
    public async: boolean;

    @Input()
    public initData: Object;

    @ViewChild('label') label: TemplateRef<any> | Type<IDynamicInstantiatable>;
    @ViewChild('content') content: TemplateRef<any> | Type<IDynamicInstantiatable>;
}


