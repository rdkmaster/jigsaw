import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnInit,
    Output,
    Renderer2
} from "@angular/core";
import {ButtonInfo, IPopupable} from "../../service/popup.service";
import {RdkDraggableModule} from "../draggable/draggable";
import {AbstractRDKComponent} from "../core";
import {CommonModule} from "@angular/common";
import {RdkButtonModule} from "../button/button";
import {CommonUtils} from "../../core/utils/common-utils";
import {RdkBlock, RdkBlockModule} from "../block/block";

export interface IDialog extends IPopupable {
    buttons: ButtonInfo[];
    title: string;
    dialog: RdkDialog;
}

export abstract class DialogBase implements IDialog, AfterViewInit, OnInit {

    public initData: any;

    abstract get dialog(): RdkDialog;
    abstract set dialog(value: RdkDialog);

    private _title: string = '';

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
        if (this.dialog) {
            this.dialog.title = value;
        }
    }

    private _buttons: ButtonInfo[];

    public get buttons(): ButtonInfo[] {
        return this._buttons;
    }

    public set buttons(value: ButtonInfo[]) {
        this._buttons = value;
        if (this.dialog) {
            this.dialog.buttons = value;
        }
    }

    @Output()
    public answer: EventEmitter<ButtonInfo> = new EventEmitter<ButtonInfo>();

    public dispose(answer?: ButtonInfo): void {
        if (this.dialog) {
            this.dialog.dispose(answer);
        }
    }

    public ngOnInit() {
        if (this.dialog) {
            this.dialog.buttons = this.buttons;
            this.dialog.title = this.title;
        }
    }

    public ngAfterViewInit() {
        if (this.dialog) {
            this.dialog.answer.subscribe(answer => {
                this.answer.emit(answer);
            })
        }
    }
}

export abstract class AbstractDialogComponentBase extends AbstractRDKComponent implements IPopupable, AfterContentInit {
    @Input()
    public buttons: ButtonInfo[];
    @Input()
    public title: string;

    public initData: any;

    protected popupElement: HTMLElement;

    protected renderer: Renderer2;
    protected elementRef: ElementRef;

    private _top: string;
    //设置距离顶部高度
    @Input()
    public get top(): string {
        return this._top
    }

    public set top(newValue: string) {
        this._top = CommonUtils.getCssValue(newValue);
    }

    @Output()
    public answer: EventEmitter<ButtonInfo> = new EventEmitter<ButtonInfo>();

    public ngAfterContentInit() {
        this.init();
    }

    public dispose(answer?: ButtonInfo) {
        this.answer.emit(answer);
    }

    protected abstract getPopupElement(): HTMLElement;

    protected init() {
        this.popupElement = this.getPopupElement();

        //设置弹框宽度
        if (this.width) {
            this.renderer.setStyle(this.popupElement, 'width', this.width);
        }

        //设置弹出位置和尺寸
        setTimeout(() => {
            if (this.top) {
                this.renderer.setStyle(this.popupElement, 'top', this.top);
            }
        }, 0);
    }
}

@Component({
    selector: 'rdk-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss']
})
export class RdkDialog extends AbstractDialogComponentBase {
    constructor(renderer: Renderer2,
                elementRef: ElementRef) {
        super();
        this.renderer = renderer;
        this.elementRef = elementRef;
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }
}

@NgModule({
    imports: [CommonModule, RdkButtonModule, RdkDraggableModule, RdkBlockModule],
    declarations: [RdkDialog],
    exports: [RdkDialog],
    entryComponents: [RdkBlock]
})
export class RdkDialogModule {
}
