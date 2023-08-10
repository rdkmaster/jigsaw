import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    Input, NgModule,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren,
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent, JigsawCommonModule, WingsTheme} from "../../common/common";

type TrendDirection = { trend: string, percentage: string };

interface Style {
    [property: string]: string
}

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
     * @NoMarkForCheckRequired
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
        this._updateView();
    }

    /**
     * value值为number时的数字精度，默认值是2
     * @NoMarkForCheckRequired
     */
    @Input()
    public fractionDigits: number = 2;

    /**
     * 设置组件是否使用原始值，为true时不做任何处理，为false时会自动进行valueMap转换
     * @NoMarkForCheckRequired
     */
    @Input()
    public useRawValue: boolean = true;

    private _valueMap: { [valueEnum: string]: [number, number] } = null;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get valueMap(): { [valueEnum: string]: [number, number] } {
        return this._valueMap;
    }

    public set valueMap(value: { [valueEnum: string]: [number, number] }) {
        this._valueMap = value;
        this._updateView();
    }

    private _enableAnimation: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get enableAnimation(): boolean {
        return this._enableAnimation;
    }

    public set enableAnimation(value: boolean) {
        this._enableAnimation = value;
        this._updateView();
    }

    private _animationDuration: number = 2000;

    /**
     * 用于设置数字动画的时间
     * @NoMarkForCheckRequired
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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public unit: string = '';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public leadingUnit: string = '';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public trend: 'none' | 'percentage' | 'normal' = 'none';

    /**
     * 设置前置单位字体样式、布局
     * {'font-size': 'xx px', 'color': xx, 'align-items': 'center'|'start'|'end'}
     * @NoMarkForCheckRequired
     */
    @Input()
    public leadingUnitStyle: Style = {'font-size': '16px'};

    public _valueStyle: Style = {'font-size': '16px'}

    /**
     * 设置内容为number时的字体样式
     * @NoMarkForCheckRequired
     */
    @Input()
    public get valueStyle() {
        return this._valueStyle;
    }

    public set valueStyle(style: Style) {
        this._valueStyle = style;
        this._setStyle(style);
    }

    /**
     * 设置后缀单位字体样式、布局
     * {'font-size': 'xx px', 'color': xx, 'align-items': 'center'|'start'|'end'}
     * @NoMarkForCheckRequired
     */
    @Input()
    public unitStyle: Style = {'font-size': '16px'};

    private _basicTrendStyle: Style;

    /**
     * 设置上升和下降图标的基础样式。布局
     * 模板：{'font-size': 'xx px'}
     * @NoMarkForCheckRequired
     */
    @Input()
    public get basicTrendStyle() {
        return this._basicTrendStyle;
    }

    public set basicTrendStyle(style: Style) {
        this._basicTrendStyle = style;
        this._$basicStyle = style;
        this._$ascendingStyle = {...this._$ascendingStyle, ...style};
        this._$descendingStyle = {...this._$descendingStyle, ...style};
    }

    private _ascendingTrendStyle: Style;

    /**
     * 设置上升趋势所用图标和颜色
     * 模板：{"ascending-icon": xxx, "ascending-color": xxx}
     * @NoMarkForCheckRequired
     */
    @Input()
    public get ascendingTrendStyle() {
        return this._ascendingTrendStyle;
    }

    public set ascendingTrendStyle(style: Style) {
        this._ascendingTrendStyle = style;
        const icon = this._ascendingTrendStyle['ascending-icon'];
        const color = this._ascendingTrendStyle['ascending-color'];
        this._$ascendingIcon = icon ? icon : 'iconfont iconfont-e032';
        this._$ascendingStyle = {...this._$ascendingStyle, 'color': color ? color : 'green'};
    }

    private _descendingTrendStyle: Style;

    /**
     * 设置下降趋势所使用的图标和图标颜色
     * 模板：{"descending-icon": xxx, "descending-color": xxx}
     * @NoMarkForCheckRequired
     */
    @Input()
    public get descendingTrendStyle() {
        return this._ascendingTrendStyle;
    }

    public set descendingTrendStyle(style: Style) {
        this._descendingTrendStyle = style;
        const icon = this._descendingTrendStyle['descending-icon'];
        const color = this._descendingTrendStyle['descending-color'];
        this._$descendingIcon = icon ? icon : 'iconfont iconfont-e032';
        this._$descendingStyle = {...this._$ascendingStyle, 'color': color ? color : 'red'};
    }

    /**
     * 设置趋势百分比样式
     * 模板：{'font-size': 'xx px', 'color': xx}
     * @NoMarkForCheckRequired
     */
    @Input()
    public trendValueStyle: Style;

    /**
     * @internal
     */
    public _$basicStyle: Style;

    /**
     * @internal
     */
    public _$ascendingIcon: string = 'iconfont iconfont-e032';

    /**
     * @internal
     */
    public _$ascendingStyle: Style = {'font-size': '16px', 'color': 'green'};

    /**
     * @internal
     */
    public _$descendingIcon: string = 'iconfont iconfont-e030';

    /**
     * @internal
     */
    public _$descendingStyle: Style = {'font-size': '16px', 'color': 'red'};

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

    private _setStyle(style: Style) {
        const fontSize = style?.['font-size'];
        const match = fontSize?.match(/^\d+/);
        if (match) {
            this._$fontSize = fontSize;
            const number = match[0];
            this._$fontWidth = fontSize.replace(number, String(Number(number) * 0.6));
        }
    }

    /**
     * @internal
     */
    public _$getCondition(): 'number' | 'image-icon' | 'icon' | 'unknown' {
        if (this.useRawValue) {
            return 'unknown';
        }
        if (typeof this._value == 'number') {
            if (!this.enableAnimation) {
                return 'unknown';
            }
            return 'number';
        }
        if (/.+\.(jpe?g|png|webp|gif|svg)\s*$/i.test(this._value)) {
            this._$imgPath = this._value;
            return 'image-icon';
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
            return this._roundToPrecision(value);
        }
        if (!this.valueMap) {
            this._$trendMap = {trend: '', percentage: ''};
        }
        const valueRange = this.valueMap?.[value] || [NaN, NaN];
        return valueRange[0];
    }

    @ViewChildren('numberInfo')
    private _numberInfo: QueryList<ElementRef>;

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
        if (isNaN(previousValue) || isNaN(currentValue)) {
            return;
        }
        const change = currentValue - previousValue;
        this._$trendMap.trend = change == 0 ? "unchanged" : change > 0 ? "ascending" : "descending";
        const percentage = Math.abs(change / previousValue * 100);
        if (percentage > 9999.9 || !Number.isFinite(percentage)) {
            this._$trendMap.percentage = '';
            return;
        }
        this._$trendMap.percentage = percentage.toFixed(1);
    }

    private _updateView() {
        this._init();
        this._setNumberTransform();
    }

    ngOnInit(): void {
        this._init();
        this._setStyle(this.valueStyle);
    }

    ngAfterViewInit() {
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
