/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, Input, TemplateRef, Type, ViewChild} from '@angular/core';
import {ITabDefine} from "./tab-item";

@Component({
    selector: 'rdk-pane',
    template: `
        <ng-template #label>
            {{title}}
            <ng-content select="[rdk-title]"></ng-content>
        </ng-template>
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>

    `
})
export class RdkPane {
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

    @ViewChild('label') label: TemplateRef<any> | Type<ITabDefine>;
    @ViewChild('content') content: TemplateRef<any> | Type<ITabDefine>;
}


