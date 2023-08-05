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
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


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
        const previousValue = this._translateValueEnum(this._value);
        const currentValue = this._translateValueEnum(value);
        this._setTrend(previousValue, currentValue);
        this._value = value;
    }

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

    /**
     * 值描述关系表，作用
     * （1）对当前值做自动转换
     * （2）辅助计算趋势
     */
    @Input()
    public valueMap: { [valueEnum: string]: [number, number] } = null;


    /**
     * 用于设置是否开启数字的动态变化
     */
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


    /**
     * 用于设置后缀单位
     */
    @Input()
    public unit: string = '';

    /**
     * 用于设置前导单位
     */
    @Input()
    public leadingUnit: string = '';

    /**
     * 用于设置是否显示趋势，percentage时既显示趋势又显示升降比例，比例默认精度1
     */
    @Input()
    public trend: 'none' | 'percentage' | 'normal' = 'none';

    public _$trendMap: TrendDirection = {trend: '', percentage: ''};

    public _$valueList: string[] = [];

    private _condition: string;

    public _$fontSize = CommonUtils.getCssValue(16);

    public _$fontWidth = CommonUtils.getCssValue(16 * 0.6);


    constructor(protected renderer: Renderer2, public _cdr: ChangeDetectorRef) {
        super();
    }

    private _init() {
        if (this.useRawValue) {
            return;
        }
        if (typeof this._value == 'number') {
            this._value = this._roundToPrecision(this._value);
            this._translateValue(this._value);
            this._$valueList = this._value.toString().split('');
            return;
        }
    }

    /**
     * 用于处理fractionDigits对数字精度的方法
     */
    private _roundToPrecision(value: number): number {
        if (this.fractionDigits == 0 || CommonUtils.isUndefined(this.fractionDigits)) {
            return Math.round(value);
        }
        const hundredFold = Math.pow(10, this.fractionDigits);
        return Math.round(value * hundredFold) / hundredFold;
    }

    /**
     * 用于判断当前value值应对应的html
     */
    public _$getCondition(): string {
        if (this.useRawValue) {
            return "";
        }
        if (typeof this._value == 'number') {
            if (!this.enableAnimation) {
                return  '';
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


    /**
     * 用于处理valueMap存在时value值的转换
     * [number, number] ==> valueEnum的转换
     */
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
     * valueEnum ==> [number, number][0]的转换，如果为0需要改为1。
     */
    private _translateValueEnum(value: string | number): number {
        if (typeof value === "number") {
            return value;
        }
        if (!this.valueMap || !this.valueMap[value]) {
            return;
        }
        return this.valueMap[value][0] ? this.valueMap[value][0] : 1;
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
    imports: [CommonModule, FormsModule, JigsawCommonModule],
    declarations: [JigsawLargeTextComponent],
    exports: [JigsawLargeTextComponent],
})
export class JigsawBigNumberModule {

}
