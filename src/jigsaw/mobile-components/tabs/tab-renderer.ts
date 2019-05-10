import {IDynamicInstantiatable} from "../../common/common";
import {ChangeDetectorRef, Component, ViewChild} from "@angular/core";
import {JigsawMobileInput} from "../input/input";
import {JigsawMobileTabLabel} from "./tab-item";

/**
 * 此组件用于tab的可编辑的标题，主要通过addTab方法添加。
 * 在{@link JigsawTabsWrapper}中运用的比较多。
 *
 * $demo = editable-box/custom-scene-layout
 *
 */
@Component({
    template: `
        <div *ngIf="!_$editable">
            <span>{{title}}</span>
            <span class="fa fa-edit jigsaw-mobileeditable-tab-title-bar" (click)="_handleEditable($event)"></span>
        </div>
        <jm-input *ngIf="_$editable" [(value)]="title" (blur)="_$handleTitleChange()" class="jigsaw-mobileeditable-tab-title-input"></jm-input>
    `
})
export class JigsawMobileEditableTabTitleRenderer implements IDynamicInstantiatable {
    constructor(private _tabLabel: JigsawMobileTabLabel, private _changeDetectorRef: ChangeDetectorRef) {
    }

    public initData: any;
    public title: string = 'New Tab';

    @ViewChild(JigsawMobileInput)
    public input: JigsawMobileInput;

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
