import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {AbstractDialogComponentBase, DialogCallback} from "../dialog/dialog";
import {ButtonInfo, PopupEffect, PopupService} from "../../service/popup.service";
import {CommonUtils} from "../../core/utils/common-utils";

export enum NotificationPosition {
    leftTop, leftBottom, rightTop = <any>{'right': '0', 'top': '0'}, rightBottom = <any>{'right': '0', 'bttom': 'flex-end'}
}

@Component({
    selector: 'jigsaw-notification, j-notification',
    templateUrl: './notification.component.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
})
export class JigsawNotification extends AbstractDialogComponentBase implements OnInit {
    _icon: string;
    _message: string;
    _timeout: number;

    @Input()
    public get message() {
        return this._message;
    }

    public set message(value: string) {
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
                       position: NotificationPosition = NotificationPosition.rightTop,
                       timeout: number = 8000,
                       buttons?: ButtonInfo[],
                       callback?: DialogCallback,
                       callbackContext?: any): void {
        const po = {
            modal: false,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
        const popupInfo = PopupService.instance.popup(JigsawNotification, po, {
            message: message,
            title: caption,
            icon: icon,
            buttons: buttons,
            callbackContext: callbackContext
        });

        if (timeout){
            setTimeout(popupInfo.dispose, timeout);
        }

        popupInfo.answer.subscribe(answer => {
            CommonUtils.safeInvokeCallback(callbackContext, callback, [answer]);
            popupInfo.answer.unsubscribe();
            popupInfo.dispose();
        });
    }
}
