import {IDynamicInstantiatable} from "../../common/common";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from "@angular/core";
import {JigsawInput} from "../input/input";
import {JigsawTabLabel} from "./tab-item";

/**
 * 自定义Tab标题渲染器需要实现该接口，并将界面显示的标题放在title属性上
 */
export interface IJigsawTabTitleRenderer extends IDynamicInstantiatable {
    title: string;
}

/**
 * 此组件用于tab的可编辑的标题，主要通过addTab方法添加。
 */
@Component({
    template: `
        <div *ngIf="!_$editable">
            <span>{{title}}</span>
            <span class="iconfont iconfont-e105 jigsaw-editable-tab-title-bar" (click)="_handleEditable($event)"></span>
        </div>
        <j-input *ngIf="_$editable" [(value)]="title" (blur)="_$handleTitleChange()" style="height: 100%;"
                 class="jigsaw-editable-tab-title-input">
        </j-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawEditableTabTitleRenderer implements IJigsawTabTitleRenderer {
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
        Promise.resolve().then(() => {
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
