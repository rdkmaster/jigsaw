import {IDynamicInstantiatable} from "../../common/common";
import {ChangeDetectorRef, Component, ViewChild} from "@angular/core";
import {JigsawInput} from "../input/input";
import {JigsawTabLabel} from "./tab-item";

/**
 * 此组件用于tab的可编辑的标题，主要通过addTab方法添加。
 */
@Component({
    template: `
        <div *ngIf="!_$editable">
            <span>{{title}}</span>
            <span class="fa fa-edit jigsaw-editable-tab-title-bar" (click)="_handleEditable($event)"></span>
        </div>
        <j-input *ngIf="_$editable" [(value)]="title" (blur)="_$handleTitleChange()"
                 class="jigsaw-editable-tab-title-input">
        </j-input>
    `
})
export class JigsawEditableTabTitleRenderer implements IDynamicInstantiatable {
    constructor(private _tabLabel: JigsawTabLabel, private _changeDetectorRef: ChangeDetectorRef) {
    }

    public initData: any;
    public title: string = 'New Tab';

    @ViewChild(JigsawInput)
    public input: JigsawInput;

    /**
     * @internal
     */
    public _$editable: boolean;

    /**
     * @internal
     */
    public _handleEditable(e) {
        e.preventDefault();
        e.stopPropagation();
        this._$editable = !this._$editable;
        setTimeout(() => {
            // 等待input渲染
            this.input.focus();
        });
    }

    /**
     * @internal
     */
    public _$handleTitleChange() {
        this._$editable = !this._$editable;
        this._tabLabel.change.emit({key: this._tabLabel.key, title: this.title});
        this._changeDetectorRef.detectChanges();
    }
}
