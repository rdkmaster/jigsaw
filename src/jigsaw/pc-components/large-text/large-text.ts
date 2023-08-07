import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef, EventEmitter,
    Input, NgModule,
    OnInit, Output,
    QueryList,
    Renderer2,
    ViewChildren,
} from '@angular/core';
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";


type TrendDirection = { trend: string, percentage: string };

@WingsTheme('large-text.scss')
@Component({
    selector: 'jigsaw-large-text',
    templateUrl: './large-text.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-large-text-host]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawLargeTextComponent extends AbstractJigsawComponent implements OnInit {

    private _value: number | string;

    /**
     * 大字组件的值，可以是number或者string类型
     */
    @Input()
    public get value(): number | string {
        return this._value;
    }

    public set value(value: number | string) {
        this._propagateChange(value);
        this._value = value;
        this._updateView();
    }

    @Output()
    public valueChange = new EventEmitter<number | string>();
    protected _propagateChange: Function = (value: number | string) => {
        this.valueChange.emit(value);
    };

    private _valueSubscriptHandle: Subscription;

    public _$iconClass: string = null;

    public _$imgPath: string = null;

    /**
     * value值为number时的数字精度，默认值是2

     */
    @Input()
    public fractionDigits: number = 2;

    /**
     * 设置组件是否使用原始值，为true时不做任何处理，为false时会自动进行valueMap转换
     */
    @Input()
    public useRawValue: boolean = true;

    private _valueMap: { [valueEnum: string]: [number, number] } = null;
    @Input()
    public get valueMap(): { [valueEnum: string]: [number, number] } {
        return this._valueMap;
    }

    public set valueMap(value: { [valueEnum: string]: [number, number] }) {
        this._valueMap = value;
        this._updateView();
    }

    private _enableAnimation: boolean = true;

    @Input()
    public get enableAnimation(): boolean {
        return this._enableAnimation;
    }

    public set enableAnimation(value: boolean) {
        this._enableAnimation = value;
        this._updateView();
    }

    private _animationDuration: number = 5000;

    /**
     * 用于设置数字动画的时间
     */
    @Input()
    public get animationDuration() {
        return this._animationDuration;
    }

    public set animationDuration(animationDuration: number) {
        if (!this.enableAnimation) {
            return;
        }
        if (animationDuration < 0) {
            animationDuration = 0;
        }
        this._animationDuration = animationDuration;
    }

    @ViewChildren('numberInfo')
    private _numberInfo: QueryList<ElementRef>;

    @Input()
    public unit: string = '';

    @Input()
    public leadingUnit: string = '';

    @Input()
    public trend: 'none' | 'percentage' | 'normal' = 'none';

    public _$trendMap: TrendDirection = {trend: '', percentage: ''};

    public _$valueList: string[] = [];

    private _originalValueList: string[] = [];

    public _$fontSize = CommonUtils.getCssValue(16);

    public _$fontWidth = CommonUtils.getCssValue(16 * 0.6);


    constructor(protected renderer: Renderer2, private _cdr: ChangeDetectorRef) {
        super();
    }

    private _init() {
        if (this.useRawValue) {
            return;
        }
        if (typeof this._value == 'number') {
            this._value = this._roundToPrecision(this._value);
            this._translateValue(this._value);
            this._originalValueList = this._$valueList;
            this._$valueList = this._value.toString().split('');
            return;
        }
    }

    private _roundToPrecision(value: number): number {
        if (this.fractionDigits == 0 || CommonUtils.isUndefined(this.fractionDigits)) {
            return Math.round(value);
        }
        const hundredFold = Math.pow(10, this.fractionDigits);
        return Math.round(value * hundredFold) / hundredFold;
    }

    public _$condition: string;

    private _getCondition(): string {
        if (this.useRawValue) {
            return '';
        }
        if (typeof this._value == 'number') {
            if (!this.enableAnimation) {
                return '';
            }
            return 'number';
        }
        if (/.+\.(jpe?g|png|webp|gif|svg)\s*$/i.test(this._value)) {
            this._$imgPath = this._value;
            return 'picture';
        }
        if (/^iconfont iconfont-/.test(this._value)) {
            this._$iconClass = this._value;
            return 'icon';
        }
    }

    private _translateValue(value: number): void {
        if (this.useRawValue || !this.valueMap) {
            return;
        }
        for (const map in this.valueMap) {
            const valueMap = this.valueMap[map];
            if (value >= valueMap[0] && value <= valueMap[1]) {
                this._value = map;
            }
        }
    }

    /**
     * 用于处理valueMap存在时value值的转换
     * valueEnum ==> [number, number][0]的转换。
     */
    private _translateValueEnum(value: string | number): number {
        if (typeof value === "number") {
            return this._roundToPrecision(value);
        }
        if (!this.valueMap || !this.valueMap[value]) {
            return;
        }
        return this.valueMap[value][0];
    }

    /**
     * 用于处理value值转换时数字的动画化
     */
    private _setNumberTransform() {
        if (!this._numberInfo) {
            return;
        }
        const numberArr = this._$valueList.filter((item: string) => !isNaN(Number(item)));
        const originalArr = this._originalValueList.filter((item: string) => !isNaN(Number(item)));
        requestAnimationFrame(() => {
            this._numberInfo.forEach((element, index) => {
                element.nativeElement.style.transition = '';
                element.nativeElement.style.transform = `translate(-50%, -${Number(originalArr[index]) * 5 + 50}%)`;
                element.nativeElement.style.transition = `transform ${this.animationDuration}ms ease-in-out`;
                element.nativeElement.style.transform = `translate(-50%, -${Number(numberArr[index]) * 5 + 50}%)`;
            });
        })
    }

    /**
     * 用于计算趋势
     */
    private _setTrend(previousValue: number, currentValue: number) {
        if (this.trend == 'none') {
            return;
        }
        if (!previousValue || !currentValue) {
            return;
        }
        const change = currentValue - previousValue;
        this._$trendMap.trend = change == 0 ? "unchanged" : change > 0 ? "ascending" : "descending";
        this._$trendMap.percentage = Math.abs(change / previousValue * 100).toFixed(1);
    }

    private _updateView() {
        this._init();
        this._$condition = this._getCondition();
        this._setNumberTransform();
    }

    ngOnInit(): void {
        this._init();
        this._$condition = this._getCondition();
        if (this._valueSubscriptHandle) {
            this._valueSubscriptHandle.unsubscribe();
            this._valueSubscriptHandle = null;
        }
        this._valueSubscriptHandle = this.valueChange.subscribe((value) => {
            const previousValue = this._translateValueEnum(this._value);
            const currentValue = this._translateValueEnum(value);
            this._setTrend(previousValue, currentValue);
            this._cdr.detectChanges();
        })
    }

    ngAfterViewInit() {
        this._setNumberTransform();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawCommonModule],
    declarations: [JigsawLargeTextComponent],
    exports: [JigsawLargeTextComponent],
})
export class JigsawBigNumberModule {

}
