import {AbstractJigsawViewBase, IDynamicInstantiatable} from "../../common/common";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild} from "@angular/core";
import {JigsawInput} from "../input/input";
import {JigsawTabLabel} from "./tab-item";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawTabBar} from "./tab";

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
        <div *ngIf="!_$editable" class="jigsaw-tabs-title-editor">
            <span #titleElement>{{title}}</span>
            <span class="jigsaw-tabs-title-editor-bar iconfont iconfont-ea0c" (click)="_handleEditable($event)"></span>
        </div>
        <j-input *ngIf="_$editable" [(value)]="title" [icon]="'iconfont iconfont-ea18'" class="jigsaw-tabs-title-editor-input"
                 (blur)="_$handleTitleChange()" (iconSelect)="_$handleTitleChange()" [width]="_$width"></j-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawEditableTabTitleRenderer extends AbstractJigsawViewBase implements IJigsawTabTitleRenderer {
    constructor(private _tabLabel: JigsawTabLabel, private _tabsBar: JigsawTabBar,
                private _changeDetectorRef: ChangeDetectorRef, protected _zone: NgZone) {
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
    private _input: JigsawInput;

    @ViewChild('titleElement')
    private _titleElement: ElementRef;

    /**
     * @internal
     */
    public _$editable: boolean;

    /**
     * @internal
     */
    public _$width: string;

    /**
     * @internal
     */
    public _handleEditable(e) {
        e.preventDefault();
        e.stopPropagation();
        this._$editable = !this._$editable;
        // 计算输入框的宽度：1：取文字宽度时，需要加上input的图标和内边距等元素的尺寸；2：取整个tab页宽度时，要去除标题之间的边距和右侧可能出现的下拉列表的宽度
        this._$width = this._titleElement.nativeElement.offsetWidth < (this._tabsBar.elementRef.nativeElement.offsetWidth - 80) ?
            this._titleElement.nativeElement.offsetWidth + 42 :
            this._tabsBar.elementRef.nativeElement.offsetWidth - 80;
        this._$width = this._$width + 'px'
        this.runAfterMicrotasks(() => {
            // 等待input渲染
            this._input.focus();
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
