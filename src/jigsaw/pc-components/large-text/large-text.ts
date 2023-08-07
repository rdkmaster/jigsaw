import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    Input, NgModule,
    OnChanges,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren,
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";

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
export class JigsawLargeTextComponent extends AbstractJigsawComponent implements OnChanges, OnInit {

    private _value: number | string;

    /**
     * 大字组件的值，可以是number或者string类型
     */
    @Input()
    public get value(): number | string {
        return this._value;
    }

    public set value(value: number | string) {
        // 如果是实际值为数字的字符串，则给转为数字类型
        if (typeof value == 'string') {
            const n = Number(value);
            if (!isNaN(n)) {
                value = n;
            }
        }
        const previousValue = this._translateValueEnum(this._value);
        const currentValue = this._translateValueEnum(value);
        this._setTrend(previousValue, currentValue);
        this._value = value;
    }

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

    @Input()
    public valueMap: { [valueEnum: string]: [number, number] } = null;

    @Input()
    public enableAnimation: boolean = true;

    private _animationDuration: number = 5000;

    /**
     * 用于设置数字动画的时间
     */
    public get animationDuration() {
        return this._animationDuration;
    }

    @Input()
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

    /**
     * @internal
     */
    public _$iconClass: string = null;

    /**
     * @internal
     */
    public _$imgPath: string = null;

    /**
     * @internal
     */
    public _$trendMap: TrendDirection = {trend: '', percentage: ''};

    /**
     * @internal
     */
    public _$valueList: string[] = [];

    /**
     * @internal
     */
    public _$fontSize = CommonUtils.getCssValue(16);

    /**
     * @internal
     */
    public _$fontWidth = CommonUtils.getCssValue(16 * 0.6);


    constructor(protected renderer: Renderer2, private _cdr: ChangeDetectorRef) {
        super();
    }

    private _init() {
        if (this.useRawValue || typeof this._value != 'number') {
            return;
        }
        this._value = this._roundToPrecision(this._value);
        this._translateValue(this._value);
        this._$valueList = this._value.toString().split('');
    }

    private _roundToPrecision(value: number): number {
        if (this.fractionDigits == 0 || CommonUtils.isUndefined(this.fractionDigits)) {
            return Math.round(value);
        }
        const hundredFold = Math.pow(10, this.fractionDigits);
        return Math.round(value * hundredFold) / hundredFold;
    }

    /**
     * @internal
     */
    public _$getCondition(): 'number' | 'picture' | 'icon' | 'unknown' {
        if (this.useRawValue) {
            return 'unknown';
        }
        if (typeof this._value == 'number') {
            if (!this.enableAnimation) {
                return  'unknown';
            }
            return 'number';
        }
        if (/.+\.(jpe?g|png|webp|gif|svg)\s*$/i.test(this._value)) {
            this._$imgPath = this._value;
            return 'picture';
        }
        if (/^\s*iconfont\s+iconfont-\w+\s*$/.test(this._value)) {
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
            return value;
        }
        const valueRange = this.valueMap?.[value] || [NaN, NaN];
        return valueRange[0];
    }

    /**
     * 用于处理value值转换时数字的动画化
     */
    private _setNumberTransform() {
        if (!this._numberInfo) {
            return;
        }
        const numberArr = this._$valueList.filter((item: string) => !isNaN(Number(item)));
        requestAnimationFrame(() => {
            this._numberInfo.forEach((element, index) => {
                element.nativeElement.style.transition = `transform ${this.animationDuration}ms ease-in-out`;
                element.nativeElement.style.transform = `translate(-50%, -${Number(numberArr[index])* 5 + 50}%)`;
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
        if (isNaN(previousValue) || isNaN(currentValue)) {
            return;
        }
        const change = currentValue - previousValue;
        this._$trendMap.trend = change == 0 ? "unchanged" : change > 0 ? "ascending" : "descending";
        this._$trendMap.percentage = Math.abs(change / previousValue * 100).toFixed(1);
    }

    ngOnInit(): void {
        this._init();
    }

    ngAfterViewInit() {
        this._setNumberTransform();
    }

    ngOnChanges() {
        this._init();
        this._setNumberTransform();
    }
}

@NgModule({
    imports: [CommonModule, JigsawCommonModule],
    declarations: [JigsawLargeTextComponent],
    exports: [JigsawLargeTextComponent],
})
export class JigsawLargeTextModule {
}
