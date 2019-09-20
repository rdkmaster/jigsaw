import {
    Component, Input, NgModule, EventEmitter, Output, ViewChild, ElementRef, HostListener
} from "@angular/core";

import {CommonModule} from "@angular/common";
import {JigsawStepsModule} from "./index";
import {AbstractJigsawComponent} from "../common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawTrustedHtmlModule} from "../../directive/trusted-html/trusted-html";
import {LoadingService} from "../../service/loading.service";

export type StepsData = {
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
        <div [perfectScrollbar]="{wheelSpeed: 0.5, wheelPropagation: true}" style="width: 100%;height: 100%">
            <div #step>
                <div *ngFor="let rowIndex of _$rowIndexes;odd as odd;even as even; index as index;last as last"
                     style="width: 100%;height: 100%">
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
                                          [ngClass]="{'jigsaw-step-item-overflow': data && index* _$numInlineActual + ind >= data.length,'jigsaw-step-item-last': data && index* _$numInlineActual + ind == data.length-1}">
                            <div jigsaw-title style="white-space:nowrap; text-overflow:ellipsis; overflow:hidden;" [title]="step.title">{{step.title}}</div>
                            <div jigsaw-sub-title
                                 trustedHtml="{{step.subTitle}}"
                                 [trustedHtmlContext]="step.context"></div>
                        </jigsaw-step-item>
                    </jigsaw-steps>
                    <div *ngIf="!last" style="width: 100%;height: 50px;position: relative">
                        <div class="jigsaw-steps-multiline-v" style="width: 2px;height: 100%;position: absolute;"
                             [style.backgroundColor]="_$getColor(rowIndex)"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class JigsawStepsMultiline extends AbstractJigsawComponent {
    constructor(public _elementRef: ElementRef) {
        super();
    }

    private _originWidth: number;
    private _dataInSteps: StepsData[] = [];

    private _preSize: 'small' | 'default' | 'large' = "default";

    /**
     * 设置步骤条图标的预设尺寸
     */
    @Input()
    public get preSize(): 'small' | 'default' | 'large' {
        return this._preSize;
    };

    public set preSize(value: 'small' | 'default' | 'large') {
        if (value && value != this._preSize) {
            this._preSize = value;
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

    private _numInline: number = 5;

    /**
     * 设置一行放置几个item
     */
    @Input()
    public get numInline(): number {
        return this._numInline;
    }

    public set numInline(value: number) {
        if (value == this._numInline || value < 1) {
            return;
        }
        this._numInline = value;
        this._initData();
        this._setWidth();
    }


    /**
     * @internal
     */
    public get _$numInlineActual(): number {
        return this.numInline <= this.data.length ? this.numInline : this.data.length;
    }

    @Output() public select = new EventEmitter<any>();

    /**
     * @internal
     */
    public _$rowIndexes: number[] = [];

    /**
     * @internal
     */
    public _$handleItemClick($event, step: any) {
        if ($event.path[0].tagName.toLowerCase() == 'i') {
            this.select.emit(step);
        }
    }

    /**
     * @internal
     */
    public _$getData(index): StepsData[] {
        let stepsItemData = [];
        for (let i = 0; i < this._$numInlineActual; i++) {
            if (index * this._$numInlineActual + i < this._dataInSteps.length) {
                stepsItemData.push(this._dataInSteps[index * this._$numInlineActual + i]);
            }
        }
        return stepsItemData;
    }

    public _$getColor(rowIndex): string {
        if (this.data && rowIndex < this._$rowIndexes.length - 1) {
            switch (this.data[this._$numInlineActual * rowIndex + this._$numInlineActual - 1].status) {
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

    @ViewChild('step')
    private _step: ElementRef;

    private _initData() {
        this._dataInSteps = [];
        this._dataInSteps.push(...this.data);
        if (this.data && this.data.length > this._$numInlineActual) {
            let remainder = this.data.length % this._$numInlineActual;
            if (remainder != 0) {
                for (let j = 0; j < this._$numInlineActual - remainder; j++) {
                    this._dataInSteps.push(this.data[this.data.length - 1]);
                }
            }
        }

        let row = this.data && this._$numInlineActual ? Math.ceil(this._dataInSteps.length / this._$numInlineActual) : 1;
        this._$rowIndexes = [];
        for (let i = 0; i < row; i++) {
            this._$rowIndexes.push(i);
        }
    }

    @HostListener('window:resize')
    onResize() {
        this._originWidth = parseInt(this._step.nativeElement.parentElement.offsetWidth);
        this._setWidth();
    }

    private _setWidth() {
        // preSize为default的最小宽度
        const DEFAULT_ICON_MIN_WIDTH = 146;
        // preSize为small的最小宽度
        const SMALL_ICON_MIN_WIDTH = 140;
        // preSize为large的最小宽度
        const LARGE_ICON_MIN_WIDTH = 150;
        // 每行起始处的留白
        const MARGIN_WIDTH = 60;

        let minWidth = DEFAULT_ICON_MIN_WIDTH;
        let logoWidth = 26;
        if (this.preSize == 'small') {
            minWidth = SMALL_ICON_MIN_WIDTH;
            logoWidth = 20;
        } else if (this.preSize == 'large') {
            minWidth = LARGE_ICON_MIN_WIDTH;
            logoWidth = 30;
        }

        if (this._step) {
            let overflow = false;
            if (minWidth * this._$numInlineActual + MARGIN_WIDTH * 2 > this._originWidth) {
                this._step.nativeElement.style.width = (minWidth * this._$numInlineActual + MARGIN_WIDTH * 2) + 'px';
                overflow = true;
            } else {
                this._step.nativeElement.style.width = this._originWidth + 'px';
                overflow = false;
            }

            setTimeout(() => {
                let oddStepsSpaces = this._step.nativeElement.querySelectorAll(".jigsaw-steps-multiline-odd .jigsaw-steps-container .jigsaw-step-left-space");
                let evenStepsSpaces = this._step.nativeElement.querySelectorAll(".jigsaw-steps-multiline-even .jigsaw-steps-container .jigsaw-step-left-space");
                let oddSteps = this._step.nativeElement.querySelectorAll(".jigsaw-steps-multiline-odd");
                let evenSteps = this._step.nativeElement.querySelectorAll(".jigsaw-steps-multiline-even");
                let vLines = this._step.nativeElement.querySelectorAll(".jigsaw-steps-multiline-v");
                let oddItems = this._step.nativeElement.querySelectorAll(".jigsaw-steps-multiline-odd .jigsaw-steps-container .jigsaw-step-item");
                let evenItems = this._step.nativeElement.querySelectorAll(".jigsaw-steps-multiline-even .jigsaw-steps-container .jigsaw-step-item");
                let items = this._step.nativeElement.querySelectorAll(".jigsaw-steps-container .jigsaw-step-item");

                if (evenItems[this._$numInlineActual - 1].offsetWidth == minWidth) {
                    oddStepsSpaces && oddStepsSpaces.forEach((space, index) => {
                        space.style.flex = 0;
                        space.style.minWidth = minWidth - logoWidth + 'px';
                    });

                    if (oddSteps && oddSteps.length > 0 && this._step.nativeElement.offsetWidth < oddSteps[0].offsetWidth + MARGIN_WIDTH && overflow) {
                        this._step.nativeElement.style.width = (oddSteps[0].offsetWidth + MARGIN_WIDTH) + 'px';
                    }
                } else {
                    oddStepsSpaces && oddStepsSpaces.forEach((space, index) => {
                        space.style.flex = 0.5;
                        space.style.minWidth = MARGIN_WIDTH + 'px';
                    });
                }

                if (oddItems && oddItems.length > 0) {
                    if (oddItems[this._$numInlineActual - 1].offsetWidth == minWidth) {
                        evenStepsSpaces.forEach((space, index) => {
                            space.style.flex = 0;
                            space.style.minWidth = minWidth - logoWidth + 'px';
                        });
                        if (this._step.nativeElement.offsetWidth < evenSteps[0].offsetWidth + MARGIN_WIDTH && overflow) {
                            this._step.nativeElement.style.width = (evenSteps[0].offsetWidth + MARGIN_WIDTH) + 'px';
                        }

                    } else {
                        evenStepsSpaces.forEach((space, index) => {
                            space.style.flex = 0.5;
                            space.style.minWidth = MARGIN_WIDTH + 'px';
                        });
                    }
                }

                if (this._$numInlineActual == 1) {
                    vLines && vLines.forEach((line, index) => {
                        line.style.left = items[0].offsetWidth - logoWidth / 2 - 1 + 'px';
                    });
                } else {
                    vLines && vLines.forEach((line, index) => {
                        if (index % 2 == 1) {
                            line.style.left = items[index * this._$numInlineActual + this._$numInlineActual - 1].offsetWidth - logoWidth / 2 - 2 + 'px';
                        } else {
                            line.style.left = '';
                            line.style.right = items[index * this._$numInlineActual + this._$numInlineActual - 1].offsetWidth - logoWidth / 2 - 2 + 'px';
                        }
                    });
                }
            });
        }
    }
}

@NgModule({
    imports: [CommonModule, JigsawStepsModule, PerfectScrollbarModule, JigsawTrustedHtmlModule],
    declarations: [JigsawStepsMultiline],
    exports: [JigsawStepsMultiline],
    providers: [LoadingService]
})
export class JigsawStepsMultilineModule {
}
