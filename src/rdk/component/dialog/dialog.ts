import {
    AfterContentInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    Renderer2
} from "@angular/core";

import {ButtonInfo, IPopupable, PopupService} from "../../service/popup.service";

import {fadeIn} from "../animations/fade-in";
import {bubbleIn} from "../animations/bubble-in";
import {AbstractRDKComponent} from "../core";


export interface IDialog extends IPopupable {
    buttons: ButtonInfo[];
    title: string;
}

export abstract class DialogBase extends AbstractRDKComponent implements IDialog, AfterContentInit, OnDestroy {
    @Input()
    public buttons: ButtonInfo[];
    @Input()
    public title: string;
    @Input()
    public popupId: number;
    public initData: any;

    protected state: String = 'active';
    protected removeResizeEvent: Function;
    protected popupElement: HTMLElement;
    protected modal: boolean;

    protected popupService: PopupService;
    protected renderer: Renderer2;
    protected elementRef: ElementRef;

    private _top: string;
    //设置距离顶部高度
    @Input()
    public get top(): string {
        return this._top
    }

    public set top(newValue: string) {
        const match = newValue ? newValue.match(/^\s*\d+%|px\s*$/) : null;
        this._top = match ? newValue : newValue + 'px';
    }


    @Output()
    public close: EventEmitter<void> = new EventEmitter<void>();

    public dispose() {
        this.state = 'void';
        this.close.emit();
    }

    public ngAfterContentInit() {
        this.init();
    }

    public ngOnDestroy() {
        //销毁resize事件
        this.removeResizeEvent();
    }

    protected abstract getPopupElement():HTMLElement;

    protected init() {
        this.popupElement = this.getPopupElement();

        //设置弹框宽度
        if (this.width) {
            this.renderer.setStyle(this.popupElement, 'width', this.width);
        }

        const options = this.popupService.getOptions(this.popupId);
        this.modal = options && options.modal;

        if (this.modal) {
            //设置默认位置
            this.setDefaultPosition();
        } else {
            this.popupService.setPopupPos(this.popupId, this.renderer, this.popupElement);
        }

        this.resetPosition();
    }

    protected setDefaultPosition(): void {
        //弹框居中
        this.renderer.setStyle(this.popupElement, 'left', (window.innerWidth / 2 - this.popupElement.offsetWidth / 2) + 'px');
        if (this.top) {
            //居上显示
            this.renderer.setStyle(this.popupElement, 'top', this.top);
        } else {
            //居中显示
            this.renderer.setStyle(this.popupElement, 'top', (window.innerHeight / 2 - this.popupElement.offsetHeight / 2) + 'px');
        }
    }

    protected resetPosition() {
        //resize居中
        this.removeResizeEvent = this.renderer.listen('window', 'resize', () => {
            this.renderer.setStyle(this.popupElement, 'left', (window.innerWidth / 2 - this.popupElement.offsetWidth / 2) + 'px');
            !this.top && this.renderer.setStyle(this.popupElement, 'top', (window.innerHeight / 2 - this.popupElement.offsetHeight / 2) + 'px');
        })
    }

    protected animationDone($event){
        if($event.toState == 'void'){
            this.popupService.removePopup(this.popupId);
        }
    }

}

@Component({
    selector: 'rdk-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.scss'],
    animations: [
        fadeIn,
        bubbleIn
    ]
})
export class RdkDialog extends DialogBase {

    constructor(popupService: PopupService,
                renderer: Renderer2,
                elementRef: ElementRef) {
        super();
        this.popupService = popupService;
        this.renderer = renderer;
        this.elementRef = elementRef;
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement.querySelector('.rdk-dialog');
    }
}

