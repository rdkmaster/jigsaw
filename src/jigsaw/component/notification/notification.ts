import {
    NgModule, Component, Renderer2, Input, ElementRef
} from "@angular/core";
import {AbstractDialogComponentBase} from "../dialog/dialog";
import {
    ButtonInfo,
    PopupService,
    PopupEffect,
    PopupInfo,
    PopupPositionType
} from "../../service/popup.service";
import {JigsawTrustedHtmlModule} from "../../directive/trusted-html/trusted-html"
import {CommonUtils} from "../../core/utils/common-utils";

import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "../button/button";

export enum NotificationPosition {
    leftTop = <any>{'justifyContent': 'flex-start', 'alignItems': 'flex-start'},
    leftBottom = <any>{'justifyContent': 'flex-end', 'alignItems': 'flex-start'},
    rightTop = <any>{'justifyContent': 'flex-start', 'alignItems': 'flex-end'},
    rightBottom = <any>{'justifyContent': 'flex-end', 'alignItems': 'flex-end'}
}

@Component({
    selector: 'jigsaw-notification,j-notification',
    templateUrl: 'notification.html'
})
export class JigsawNotification extends AbstractDialogComponentBase {

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super();

        this.renderer = renderer;
        this.elementRef = elementRef;
        this.renderer.addClass(this.elementRef.nativeElement, 'jigsaw-notification-host');
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    @Input()
    public set initData(value: any) {
        if (!value) return;
        this.message = value.message ? value.message : 'the "message" property in the initData goes here.';
        this.title = value.title;
        this.icon = value.icon;
        this.buttons = value.buttons ? value.buttons : this.buttons;
    }

    @Input() public message: string;
    @Input() public title: string;
    @Input() public icon: string;

    public static show(message: string,
                       caption?: string,
                       icon?: string,
                       position: NotificationPosition = NotificationPosition.rightTop,
                       timeout: number = 8000,
                       buttons?: ButtonInfo[],
                       callback?: Function,
                       callbackContext?: any): PopupInfo {
        //TODO 按钮

        const popupOptions = {
            modal: false,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            posType: PopupPositionType.absolute,
            showBorder: false
        };

        const popEle = PopupService._viewContainerRef.element.nativeElement.parentElement;
        Object.assign(popEle.style, position);

        const popupInfo = PopupService.instance.popup(JigsawNotification, popupOptions,
            {message: message, title: caption, icon: 'fa fa-' + icon, buttons: buttons});

        popupInfo.answer.subscribe(answer => {
            CommonUtils.safeInvokeCallback(null, callback, [answer]);
            popupInfo.answer.unsubscribe();
            popupInfo.dispose();
        });

        if (timeout) setTimeout(popupInfo.dispose, timeout);

        return popupInfo;
    };
}

@NgModule({
    imports: [CommonModule, JigsawButtonModule, JigsawTrustedHtmlModule],
    declarations: [JigsawNotification],
    exports: [JigsawNotification],
    entryComponents: [JigsawNotification]
})
export class JigsawNotificationModule {
}
