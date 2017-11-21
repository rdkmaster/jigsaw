import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {AbstractDialogComponentBase, DialogCallback} from "../dialog/dialog";
import {ButtonInfo} from "../../service/popup.service";

export enum NotificationPosition {
    leftTop, leftBottom, rightTop, rightBottom
}

@Component({
    selector: 'jigsaw-notification, j-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class JigsawNotification extends AbstractDialogComponentBase implements OnInit {
    _icon: string;
    _message: string;
    _timeout: number;

    @Input()
    public get message() {
        return this._message;
    }

    public set message(value: string){
        this._message = value;
    }

    @Input()
    public get timeout() {
        return this._timeout;
    }

    public set timeout(value: number) {
        this._timeout = value;
    }

    @Input()
    public get icon(): string {
        return this._icon;
    }

    public set icon(value: string) {
        this._icon = value;
    }

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super();
        this.renderer = renderer;
        this.elementRef = elementRef;
    }

    ngOnInit() {
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement.parentElement;
    }

    public static show(message: string,
                       caption?: string,
                       icon?: string,
                       position?: NotificationPosition,
                       timeout?: number,
                       buttons?: ButtonInfo[],
                       callback?: DialogCallback,
                       callbackContext?: any):void{

    }
}
