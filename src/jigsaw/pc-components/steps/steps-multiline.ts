import {
    Component, forwardRef, Input, NgModule, EventEmitter, Output, ViewChild, ElementRef, Renderer2, NgZone, HostListener
} from "@angular/core";

import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "./index";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent} from "../../common/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawTrustedHtmlModule} from "../../common/directive/trusted-html/trusted-html";

export type StepsData =
    {
        status: string,
        title?: string,
        subTitle: string,
        waitingIcon?: string,
        doneIcon?: string,
        processingIcon?: string,
        errorIcon?: string,
        warningIcon?: string,
        skippedIcon?: string,
        context?: any,
    }


@Component({
    selector: 'jigsaw-steps-multiline, j-steps-multiline',
    template: `
        <div [perfectScrollbar]="{wheelSpeed: 0.5, wheelPropagation: true,suppressScrollY:true}" style="width: 100%;height: 100%">
            <div #step>
                <div *ngFor="let item of stepsData;odd as odd;even as even; index as index;last as last" style="width: 100%;height: 100%">
                    <jigsaw-steps [preSize]="preSize"
                                  [ngClass]="{'jigsaw-steps-multiline-odd':odd,'jigsaw-steps-multiline-even':even}">
                        <jigsaw-step-item *ngFor="let step of _$getData(index);index as ind" [status]="step.status"
                                          [waitingIcon]="step.waitingIcon"
                                          [doneIcon]="step.doneIcon"
                                          [processingIcon]="step.processingIcon"
                                          [errorIcon]="step.errorIcon"
                                          [warningIcon]="step.warningIcon"
                                          [skippedIcon]="step.skippedIcon"
                                          (click)="_$handleItemClick($event,step)"
                                          [ngClass]="{'jigsaw-step-item-overflow': data && index* numInline + ind >= data.length,'jigsaw-step-item-last': data && index* numInline + ind == data.length-1}">
                            <div jigsaw-title>{{step.title}}</div>
                            <div jigsaw-sub-title
                                 trustedHtml="{{step.subTitle}}"
                                 [trustedHtmlContext]="step.context"></div>
                        </jigsaw-step-item>
                    </jigsaw-steps>
                    <div *ngIf="!last" style="width: 100%;height: 50px;position: relative">
                        <div style="width: 2px;height: 100%;position: absolute;" [style.backgroundColor]="_$getColor(item)"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawStepsMultiline), multi: true},
    ]
})
export class JigsawStepsMultiline extends AbstractJigsawComponent {
    constructor() {
        super();
    }

    /**
     * 设置步骤条图标的预设尺寸
     *
     * $demo = steps/basic
     */

    private _presize: 'small' | 'default' | 'large' = "default";

    @Input()
    public get preSize(): 'small' | 'default' | 'large' {
        return this._presize;
    };

    public set preSize(value: 'small' | 'default' | 'large') {
        if (value && value != this._presize) {
            this._presize = value;
            this._setWidth();
        }
    };

    private _data: StepsData[] = [];
    @Input()
    public get data(): StepsData[] {
        return this._data;
    };

    public set data(value: StepsData[]) {
        if (value && value != this._data) {
            this._data = value;
            this._initData();
            this._setWidth();
        }
    };

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
        this._selectedStep = value;
        this.selectChange.emit(value);

    }

    @Output() public selectChange = new EventEmitter<any>();


    /**
     * @internal
     */
    public stepsData: number[] = [];

    /**
     * @internal
     */
    public _$handleItemClick($event, step: any) {
        if ($event.path[0].tagName.toLowerCase() == 'i') {
            this.selectedStep = step;
        }
    }

    private _dataInSteps: StepsData[] = [];

    /**
     * @internal
     */
    public _$getData(index): StepsData[] {
        let stepsItemData = [];
        for (let i = 0; i < this.numInline; i++) {
            if (index * this.numInline + i < this._dataInSteps.length) {
                stepsItemData.push(this._dataInSteps[index * this.numInline + i]);
            }
        }
        return stepsItemData;
    }


    public _$getColor(item): string {
        if (this.data && item < this.stepsData.length - 1) {
            switch (this.data[this.numInline * item + this.numInline - 1].status) {
                case "processing":
                    return "#41ADDC";
                case "waiting":
                    return "#666";
                case "skipped":
                    return "#999999";
                case "done":
                    return "#7ACA6B";
                case "error":
                    return "#E67877";
                case "warning":
                    return "orange";
                default:
                    return "#666";
            }
        }
        return "";
    }

    ngOnInit() {
        this._initData();
    }


    ngAfterViewInit() {
        this._originWidth = parseInt(this._step.nativeElement.offsetWidth);
        this._setWidth();
    }

    private _originWidth: number;

    private _overflow = false;

    @ViewChild('step', {static: false})
    private _step: ElementRef;

    private _initData() {

        this._dataInSteps = [];
        this._dataInSteps.push(...this.data);
        if (this.data && this.data.length > this.numInline) {
            let remainder = this.data.length % this.numInline;
            if (remainder != 0) {
                for (let j = 0; j < this.numInline - remainder; j++) {
                    this._dataInSteps.push(this.data[this.data.length - 1]);
                }
            }
        }

        let row = this.data && this.numInline ? Math.ceil(this._dataInSteps.length / this.numInline) : 1;
        this.stepsData = [];
        for (let i = 0; i < row; i++) {
            this.stepsData.push(i);
        }
    }

    @HostListener('window:resize')
    onResize() {
        this._originWidth = parseInt(this._step.nativeElement.parentElement.offsetWidth);
        this._setWidth();
    }

    private _setWidth() {
        //146是presize为default的最小宽度，140和150分别是presize为small和large的宽度，60是每行起始处的留白
        let minWidth = 146;
        let logWidth = 26;
        if (this.preSize == 'small') {
            minWidth = 140;
            logWidth = 20;
        } else if (this.preSize == 'large') {
            minWidth = 150;
            logWidth = 30;
        }


        if (this._step) {
            if (minWidth * this.numInline + 60 + 60 > this._originWidth) {
                this._step.nativeElement.style.width = minWidth * this.numInline + 60 + 60 + 'px';
                this._overflow = true;
            } else {
                this._step.nativeElement.style.width = this._originWidth + 'px';
                this._overflow = false;
            }

            setTimeout(() => {
                if (this._step.nativeElement.children[0].children[0].children[0].children[this.numInline].offsetWidth == minWidth) {
                    for (let i = 0; i < this._step.nativeElement.children.length; i++) {
                        if (i % 2 == 1) {
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.flex = 0;
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.minWidth = minWidth - logWidth + 'px';

                        }
                    }
                    if (this._step.nativeElement.offsetWidth < this._step.nativeElement.children[1].offsetWidth + 60 && this._overflow) {
                        this._step.nativeElement.style.width = this._step.nativeElement.children[1].offsetWidth + 60 + 'px';
                    }
                } else {
                    for (let i = 0; i < this._step.nativeElement.children.length - 1; i++) {
                        if (i % 2 == 1) {
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.flex = 0.5;
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.minWidth = 60 + 'px';
                        }
                    }
                }

                if (this._step.nativeElement.children[1].children[0].children[0].children[this.numInline].offsetWidth == minWidth) {
                    for (let i = 0; i < this._step.nativeElement.children.length - 1; i++) {
                        if (i % 2 == 0) {
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.flex = 0;
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.minWidth = minWidth - logWidth + 'px';
                        }
                    }
                    if (this._step.nativeElement.offsetWidth < this._step.nativeElement.children[0].offsetWidth + 60 && this._overflow) {
                        this._step.nativeElement.style.width = this._step.nativeElement.children[0].offsetWidth + 60 + 'px';
                    }

                } else {
                    for (let i = 0; i < this._step.nativeElement.children.length - 1; i++) {
                        if (i % 2 == 0) {
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.flex = 0.5;
                            this._step.nativeElement.children[i].children[0].children[0].children[0].style.minWidth = 60 + 'px';
                        }
                    }
                }


                if (this.numInline == 1) {
                    for (let i = 0; i < this._step.nativeElement.children.length - 1; i++) {
                        this._step.nativeElement.children[i].children[1].children[0].style.left = this._step.nativeElement.children[i].children[0].children[0].children[this.numInline].offsetWidth - logWidth / 2 - 1 + 'px';
                    }
                } else {
                    for (let i = 0; i < this._step.nativeElement.children.length - 1; i++) {
                        if (i % 2 == 1) {
                            this._step.nativeElement.children[i].children[1].children[0].style.left = this._step.nativeElement.children[i].children[0].children[0].children[this.numInline].offsetWidth - logWidth / 2 - 2 + 'px';
                        } else {
                            this._step.nativeElement.children[i].children[1].children[0].style.left = '';
                            this._step.nativeElement.children[i].children[1].children[0].style.right = this._step.nativeElement.children[i].children[0].children[0].children[this.numInline].offsetWidth - logWidth / 2 - 2 + 'px';
                        }
                    }
                }
            });
        }
    }
}


@NgModule({
    imports: [CommonModule, JigsawStepsModule, PerfectScrollbarModule, JigsawTrustedHtmlModule],
    declarations: [JigsawStepsMultiline],
    exports: [JigsawStepsMultiline]
})
export class JigsawStepsMultilineModule {

}
