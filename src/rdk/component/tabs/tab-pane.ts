/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, ContentChild, Input, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'rdk-tab-pane',
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
export class RdkTabPane {
    @Input()
    public title: string;

    @Input()
    public disabled: boolean = false;

    @Input()
    public hidden: boolean = false;

    @Input()
    public async: boolean;

    @ViewChild('label') label: TemplateRef<any>;
    @ViewChild('content') content: TemplateRef<any>;
}
