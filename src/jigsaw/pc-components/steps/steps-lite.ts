import {
    Component, forwardRef, Input, NgModule, EventEmitter, Output, ViewChild, ElementRef
} from "@angular/core";

import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "./index";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent} from "../../common/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

/**
 * 一个轻量的list控件，是在list控件基础上做的封装，做了一些功能的拓展
 * - 支持单选和多选
 * - 支持同步异步数据，和预设数据
 * - 支持设置option显示个数，自动产生滚动条
 * - 支持搜索功能
 * - 支持文本溢出显示省略号，鼠标移入会有提示信息
 * - 可以和combo结合起来使用
 *
 */
// @dynamic
@Component({
    selector: 'jigsaw-steps-lite, j-steps-lite',
    template: `
        <div [perfectScrollbar]="{wheelSpeed: 0.5, wheelPropagation: true,suppressScrollY:true}">
            <div #step>
                <jigsaw-steps [preSize]="preSize"
                              *ngFor="let item of stepsData;odd as odd;even as even; index as index;last as last"
                              [ngClass]="{'jigsaw-steps-lite-odd':odd,'jigsaw-steps-lite-even':even,'jigsaw-steps-lite-single': numInline == 1}">
                    <jigsaw-step-item *ngFor="let step of _$getData(index)" [status]="step.status" (click)="_$handleItemClick(step)"
                                      [ngClass]="{'jigsaw-step-item-last': data && step == data[data.length-1]}"
                                      [style.flex]="_$getFlex(last)" title="{{step.subTitle}}">
                        <div jigsaw-title>{{step.title}}</div>
                    </jigsaw-step-item>
                </jigsaw-steps>
            </div>
        </div>
    `,
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawStepsLite), multi: true},
    ]
})
export class JigsawStepsLite extends AbstractJigsawComponent {
    constructor() {
        super();
    }

    /**
     * 设置步骤条图标的预设尺寸
     *
     * $demo = steps/basic
     */
    @Input() public preSize: 'small' | 'default' | 'large' = "default";

    /**
     * 设置步骤条图标的预设尺寸
     *
     * $demo = steps/basic
     */
    @Input() public data = [];

    /**
     * 设置步骤条图标的预设尺寸
     *
     * $demo = steps/basic
     */
    @Input()
    public get numInline(): number {
        return this._numInline;
    };

    public set numInline(value: number) {
        if (value == this._numInline || value < 1) {
            return;
        }
        this._numInline = value;
        this._initData();
        this._setWidth();
    }

    private _numInline: number = 1;

    private _selectedStep: any;

    /**
     * 设置步骤条图标的预设尺寸
     *
     * $demo = steps/basic
     */
    @Input()
    public get selectedStep(): any {
        return this._selectedStep;
    }

    public set selectedStep(value) {
        if (value != this._selectedStep) {
            this._selectedStep = value;
            this.selectChange.emit(value);
        }
    }

    @Output() public selectChange = new EventEmitter<any>();


    /**
     * @internal
     */
    public row: number;
    /**
     * @internal
     */
    public stepsData = [];

    /**
     * @internal
     */
    public _$handleItemClick(step: any) {
        this.selectedStep = step;
    }

    /**
     * @internal
     */
    public _$getData(index) {
        let stepsItemData = [];
        for (let i = 0; i < this.numInline; i++) {
            if (index * this.numInline + i < this.data.length) {
                stepsItemData.push(this.data[index * this.numInline + i]);
            }
        }
        return stepsItemData;
    }

    public _$getFlex(last = true): number | string {
        return this.data && this.numInline > 1 && last ? 1 / (this.numInline - 1) : '';
    }

    ngOnInit() {
        this._initData();
    }

    ngAfterViewInit() {
        this._setWidth();
    }

    @ViewChild('step', {static: false})
    private _step: ElementRef;

    private _initData() {
        this.row = this.data && this.numInline ? Math.ceil(this.data.length / this.numInline) : 1;
        this.stepsData = [];
        for (let i = 0; i < this.row; i++) {
            this.stepsData.push(i);
        }
    }


    private _setWidth() {
        //146是presize为default的最小宽度，140和150分别是presize为small和large的宽度，200是两边的留白之和
        let minWidth = 146;
        if (this.preSize == 'small') {
            minWidth = 140;
        } else if (this.preSize == 'large') {
            minWidth = 150;
        }
        if (this._step && minWidth * this.numInline + 200 > parseInt(this._step.nativeElement.offsetWidth)) {
            this._step.nativeElement.style.width = minWidth * this.numInline + 200 + 'px';
        }
    };
}

@NgModule({
    imports: [CommonModule, JigsawStepsModule, PerfectScrollbarModule],
    declarations: [JigsawStepsLite],
    exports: [JigsawStepsLite]
})
export class JigsawStepsLiteModule {

}
