import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from "@angular/core";
import {AbstractJigsawComponent} from "../../common/common";
import {PopupOptions} from "../../common/service/popup.service";

@Component({
    selector: 'jigsaw-color-select',
    templateUrl: "./color-select.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JigsawColorSelect extends AbstractJigsawComponent implements OnInit {

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public color: string = '#fff';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public enableOpacity: 'enabled'|'disabled' = 'enabled';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public mode: 'free'|'limited' = 'free';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public confirm: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public limitedColors: string[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public preSize: 'large'|'normal'|'small' = "large";

    @Output()
    public colorChange: EventEmitter<any> = new EventEmitter<any>();

    /*
    * @internal
    * */
    public _$colorSelectOpen: boolean;

    private _colorBak: string;

    private _cancelButtonClicked: boolean;

    /*
    * @internal
    * */
    public _$options: PopupOptions = {borderType: "pointer", showBorder: true, size: {minWidth: 232}};

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
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
        } else if (!this.confirm) {
            this.colorChange.emit($event);
        }
    }

    /*
    * @internal
    * */
    public _$colorSelectOpenChange($event) {
        if (this.mode == "free") {
            if ($event) {
                this._colorBak = this.color;
                this._cancelButtonClicked = false;
                return;
            }
            if (this.confirm && !this._cancelButtonClicked) {
                this.color = this._colorBak;
            }
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
        this._cancelButtonClicked = true;
        this._$colorSelectOpen = false;
        this._changeDetectorRef.markForCheck();
    }
}
