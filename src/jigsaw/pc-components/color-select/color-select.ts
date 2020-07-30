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
    host: {
        '[style.min-width]': 'width',
        '[style.display]': "'inline-block'",
    },
})
export class JigsawColorSelect extends AbstractJigsawComponent implements OnInit {

    /**
     * @NoMarkForCheckRequired
     */
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
    public mode: 'free'|'limited' = 'free';

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public enableConfirm: boolean = true;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public limitedColors: string[] = ['#ba1621','#e43232','#e57409','#ffa940','#f7d216'];

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
}
