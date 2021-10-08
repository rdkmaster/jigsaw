import {AbstractJigsawViewBase, IDynamicInstantiatable} from "../../common/common";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, ViewChild} from "@angular/core";
import {JigsawInput} from "../input/input";
import {JigsawTabLabel} from "./tab-item";
import {CommonUtils} from "../../common/core/utils/common-utils";

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
        <div *ngIf="!_$editable" style="display: flex; align-items: center;">
            <span>{{title}}</span>
            <span class="iconfont iconfont-ea0c" style="margin-left: 5px;" (click)="_handleEditable($event)"></span>
        </div>
        <j-input *ngIf="_$editable" [(value)]="title" [icon]="'iconfont iconfont-ea18'"
                 (blur)="_$handleTitleChange()" (iconSelect)="_$handleTitleChange()"></j-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawEditableTabTitleRenderer extends AbstractJigsawViewBase implements IJigsawTabTitleRenderer {
    constructor(private _tabLabel: JigsawTabLabel, private _changeDetectorRef: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
    }

    public initData: any;

    private _title: string = 'New Tab';

    public get title(): string {
        return this._title;
    }

    public set title(newValue: string) {
        if (this._title === newValue || CommonUtils.isUndefined(newValue) || newValue === '') {
            return;
        }
        this._title = newValue;
        this._changeDetectorRef.markForCheck();
    }

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
        this.runAfterMicrotasks(() => {
            // 等待input渲染
            this.input.focus();
        });
    }

    /**
     * @internal
     */
    public _$handleTitleChange() {
        this._$editable = !this._$editable;
        this._tabLabel.labelChange.emit({key: this._tabLabel.key, title: this.title});
        this._changeDetectorRef.detectChanges();
    }
}
