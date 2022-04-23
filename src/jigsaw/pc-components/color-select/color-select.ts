import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ElementRef,
    Injector
} from "@angular/core";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {PopupOptions} from "../../common/service/popup.service";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

@WingsTheme('color-select.scss')
@Component({
    selector: 'jigsaw-color-select',
    templateUrl: "./color-select.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-color-select-host]': 'true',
        '[class.jigsaw-color-select-size-small]': "preSize === 'small'",
        '[class.jigsaw-color-select-size-large]': "preSize === 'large'",
        '[class.jigsaw-color-select-size-normal]': "preSize === 'normal'"
    },
})
export class JigsawColorSelect extends AbstractJigsawComponent implements OnInit {

    @RequireMarkForCheck()
    @Input()
    public color: string = '#10aeff';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public enableOpacity: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public mode: 'free' | 'limited' = 'free';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public enableConfirm: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public limitedColors: string[] = ['#ba1621', '#e43232', '#e57409', '#ffa940', '#f7d216'];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public preSize: 'large' | 'normal' | 'small' = "large";

    private _optionCount: number = 5;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get optionCount(): number {
        return this._optionCount;
    }

    public set optionCount(value: number) {
        value = parseInt(<any>value);
        if (isNaN(value)) {
            return;
        }
        this._optionCount = value;
        this._$dropdownHeight = value * 24 + 'px';
    }

    /**
     * @internal
     */
    public _$dropdownHeight = this._optionCount * 24 + 'px';

    @Output()
    public colorChange: EventEmitter<any> = new EventEmitter<any>();

    /*
    * @internal
    * */
    public _$colorSelectOpen: boolean;

    private _colorBak: string;

    /*
    * @internal
    * */
    public _$options: PopupOptions = {borderType: "pointer", showBorder: true, size: {minWidth: 232}};

    constructor(private _changeDetectorRef: ChangeDetectorRef, private _elementRef: ElementRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
    }

    /*
    * @internal
    * */
    public _$colorSelect($event) {
        this.color = $event;
        this._changeDetectorRef.markForCheck();
        if (this.mode == "limited") {
            this._$colorSelectOpen = false;
            this.colorChange.emit($event);
        } else if (!this.enableConfirm) {
            this.colorChange.emit($event);
        }
    }

    /*
    * @internal
    * */
    public _$colorSelectOpenChange(open: boolean) {
        if (this.mode != "free") {
            return;
        }
        if (open) {
            this._colorBak = this.color;
            return;
        }
        if (this.enableConfirm) {
            this.color = this._colorBak;
        }
    }

    /*
    * @internal
    * */
    public _$confirm() {
        if (this._colorBak != this.color) {
            this.colorChange.emit(this.color);
            this._colorBak = this.color;
        }
        this._$colorSelectOpen = false;
        this._changeDetectorRef.markForCheck();
    }

    /*
    * @internal
    * */
    public _$cancel() {
        this.color = this._colorBak;
        this._$colorSelectOpen = false;
        this._changeDetectorRef.markForCheck();
    }

    ngAfterViewInit() {
        if (this._elementRef.nativeElement.offsetWidth < 24) {
            this._elementRef.nativeElement.style.minWidth = "24px";
        }
    }
}
