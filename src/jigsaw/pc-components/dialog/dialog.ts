import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2
} from "@angular/core";
import {ButtonInfo, IPopupable} from "../../common/service/popup.service";
import {AbstractJigsawComponent} from "../common";
import {CommonModule} from "@angular/common";
import {JigsawButton, JigsawButtonModule} from "../button/button";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawBlock, JigsawBlockModule} from "../block/block";
import {JigsawMovableModule} from "../../common/directive/movable/index";

export interface IDialog extends IPopupable {
    buttons: ButtonInfo[];
    caption: string;
    dialog: JigsawDialog;
    dispose: (answer?: ButtonInfo) => void;
}

export type DialogCallback = (button: ButtonInfo) => void;

/**
 * 这个类用于应用在需要根据已有的对话框组件派生出该对话框组件的更具体的对话框的时候使用。
 * 对话框组件是具备一定抽象性的，因此他们的API一般会较多较复杂，应用在使用时需要做较多的配置。
 * 已知的对话框组件有 JigsawDialog、JigsawAlert、JigsawNotification
 * 其中，Jigsaw已经基于JigsawAlert这类对话框派生出了4个内置的具体Alert组件，分别是
 * JigsawInfoAlert、JigsawWarningAlert、JigsawErrorAlert、JigsawConfirmAlert
 * 可以看到JigsawAlert使用起来比较麻烦，但是它具体化后的这些组件使用起来就非常简单了。
 */
export abstract class DialogBase implements IDialog, AfterViewInit, OnInit {

    @Input()
    public initData: any;

    abstract get dialog(): JigsawDialog;
    abstract set dialog(value: JigsawDialog);

    private _caption: string = '';

    @Input()
    public get caption(): string {
        return this._caption;
    }

    public set caption(value: string) {
        this._caption = value;
        if (this.dialog) {
            this.dialog.caption = value;
        }
    }

    private _buttons: ButtonInfo[];

    @Input()
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

    public dispose: (answer?: ButtonInfo) => void;

    public ngOnInit() {
        if (this.dialog) {
            this.dialog.buttons = this.buttons;
            this.dialog.caption = this.caption;
        }
    }

    public ngAfterViewInit() {
        if (this.dialog) {
            this.dialog.answer.subscribe(answer => this.answer.emit(answer));
        }
    }
}

/**
 * 这是所有对话框组件的基类，是一个内部，应用一般不应该直接使用这个类。
 * 当需要实现一种新的对话框的时候，则需要继承这个类，已知的对话框组件有JigsawDialog、JigsawAlert、JigsawNotification
 */
export abstract class AbstractDialogComponentBase
    extends AbstractJigsawComponent
    implements IPopupable, AfterContentInit, OnDestroy {

    @Input()
    public buttons: ButtonInfo[];
    @Input()
    public caption: string;
    @Input()
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

    public close: EventEmitter<any>;

    public ngAfterContentInit() {
        this.init();
    }

    public dispose(answer?: ButtonInfo) {
        this.answer.emit(answer);
        if (!answer && this.close) {
            // 单击了叉叉按钮，额外发送close事件
            this.close.emit();
        }
    }

    protected abstract getPopupElement(): HTMLElement;

    protected init() {
        this.popupElement = this.getPopupElement();

        //设置弹框宽度
        if (this.width) {
            this.renderer.setStyle(this.popupElement, 'width', this.width);
        }

        if(this.height) {
            this.renderer.setStyle(this.popupElement, 'height', this.height);
            this.renderer.addClass(this.popupElement, 'jigsaw-dialog-fixed-height');
        }

        //设置弹出位置和尺寸
        this.callLater(() => {
            if (this.top) {
                this.renderer.setStyle(this.popupElement, 'top', this.top);
            }
            if (this.popupElement.style.position != 'fixed' && this.popupElement.style.position != 'absolute') {
                this.renderer.setStyle(this.popupElement.querySelector('.jigsaw-dialog-base-head'), 'cursor', 'inherit');
            }
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.answer.unsubscribe();
    }
}

@Component({
    selector: 'jigsaw-dialog, j-dialog',
    templateUrl: 'dialog.html',
})
export class JigsawDialog extends AbstractDialogComponentBase {
    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    public caption: string;

    /**
     * @internal
     */
    @ContentChildren(JigsawButton)
    public _$inlineButtons:QueryList<JigsawButton>;

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super();
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.renderer.addClass(this.elementRef.nativeElement, 'jigsaw-dialog-host');
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }
}

@NgModule({
    imports: [CommonModule, JigsawButtonModule, JigsawMovableModule, JigsawBlockModule],
    declarations: [JigsawDialog],
    exports: [JigsawDialog],
    entryComponents: [JigsawBlock]
})
export class JigsawDialogModule {
}
