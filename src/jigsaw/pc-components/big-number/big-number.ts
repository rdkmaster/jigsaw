import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren,
} from '@angular/core';
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";

@WingsTheme('big-number.scss')
@Component({
    selector: 'jigsaw-big-number',
    templateUrl: './big-number.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-big-number-host]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawBigNumberComponent extends AbstractJigsawComponent implements OnChanges, OnInit, OnDestroy {
    private _value: number | string;
    @Input()
    public get value(): number | string {
        return this._value;
    }

    public set value(value: number | string) {
        this._value = value;
    }

    @Input()
    public fractionDigits: number = 2;


    @Input()
    public useRawValue: boolean = true;

    @Input()
    public valueMap: { [valueEnum: string]: [number, number] } = null;

    @Input()
    public enableAnimation: boolean = true;

    private _animationDuration: number = 5000;

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
    @ViewChildren('numberInfo') numberInfo!: QueryList<ElementRef>;

    @Input()
    public unit: string = '';

    @Input()
    public leadingUnit: string = '';

    @Input()
    public trend: boolean | 'percentage' = false;

    public valueList: string[] = [];

    public _$fontSize = 16 + 'px';

    public _$fontWidth = 16*0.6 + 'px';


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
            this.valueList = this._value.toString().split('');
            return;
        }
    }

    private _roundToPrecision(value: number): number {
        if (this.fractionDigits == 0 || CommonUtils.isUndefined(this.fractionDigits)) {
            return  Math.round(value);
        }
        const hundredFold = Math.pow(10, this.fractionDigits);
        return Math.round(value * hundredFold) / hundredFold;
    }

    public _$getCondition(): string {
        if (this.useRawValue || !this.enableAnimation) {
            return "";
        }
        if (typeof this._value == 'number') {
            return 'number';
        }
        if (/.+\.(jpe?g|png|webp|gif|svg)\s*$/i.test(this._value)) {
            return 'picture';
        }
        if (/^iconfont iconfont-/.test(this._value)) {
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

    private _setNumberTransform(){
        if (!this.numberInfo) {
            return;
        }
        const numberArr = this.valueList.filter((item: string) => !isNaN(Number(item)));
        setTimeout(() => {
            this.numberInfo.forEach((element, index) => {
                element.nativeElement.style.transition = `transform ${this.animationDuration}ms ease-in-out`;
                element.nativeElement.style.transform = `translate(-50%, -${Number(numberArr[index])* 5 + 50}%)`;
            });
        })
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

    ngOnDestroy(): void {
    }
}
