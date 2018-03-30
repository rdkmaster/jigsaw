import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef, Type, ViewChild} from '@angular/core';
import {IDynamicInstantiatable} from "../common";

@Component({
    selector: 'jigsaw-tab-pane, j-tab-pane',
    template: `
        <ng-template #label>
            {{title}}
            <ng-content select="[jigsaw-title]"></ng-content>
            <span class="jigsaw-tabs-remove-bar" *ngIf="removable" (click)="closeTab($event)">&times;</span>
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
    public removable: boolean = false;//设置是否可以删除tab

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

    @Output()
    public close = new EventEmitter<any>();

    @ViewChild('label') label: TemplateRef<any> | Type<IDynamicInstantiatable>;
    @ContentChild(TemplateRef) content: TemplateRef<any> | Type<IDynamicInstantiatable>;

    closeTab(event){
        event.preventDefault();
        event.stopPropagation();
        this.close.emit();
    }
}


