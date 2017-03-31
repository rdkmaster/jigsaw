/**
 * Created by 10177553 on 2017/3/29.
 */
import {Component, OnInit, Input, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'tab-pane',
    template: `
         <ng-template>
             <ng-content></ng-content>
        </ng-template>
    `
})
export class TabPane {
    @Input()
    public label: string;

    @Input()
    public disabled: boolean = false;

    @Input()
    public icon: string;

    @Input()
    public hidden: boolean = false;

    @ViewChild(TemplateRef) content: TemplateRef<any>;
}
