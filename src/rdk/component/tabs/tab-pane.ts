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
export class TabPane implements OnInit {
    @Input()
    public label: string;

    @Input()
    public disabled: boolean = false;

    @ViewChild(TemplateRef) content: TemplateRef<any>;

    constructor() { }

    ngOnInit() { }

}
