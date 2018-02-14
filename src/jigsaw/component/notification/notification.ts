import {
    NgModule, Component, Renderer2, Input, ElementRef
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractDialogComponentBase, DialogCallback} from "../dialog/dialog";
import {
    ButtonInfo,
    PopupService,
    PopupEffect,
    PopupInfo,
    PopupPositionType
} from "../../service/popup.service";
import {JigsawTrustedHtmlModule} from "../../directive/trusted-html/trusted-html"
import {CommonUtils} from "../../core/utils/common-utils";
import {JigsawButtonModule} from "../button/button";

export enum NotificationPosition {
    leftTop = <any>{'justifyContent': 'flex-start', 'alignItems': 'flex-start'},
    leftBottom = <any>{'justifyContent': 'flex-end', 'alignItems': 'flex-start'},
    rightTop = <any>{'justifyContent': 'flex-start', 'alignItems': 'flex-end'},
    rightBottom = <any>{'justifyContent': 'flex-end', 'alignItems': 'flex-end'}
}

export type NotificationMessage = {
    caption?: string, icon?: string,
    position?: NotificationPosition, timeout?: number,
    buttons?: ButtonInfo | ButtonInfo[],
    callback?: DialogCallback, callbackContext?: any,
    height?: string | number, width?: string | number
}

@Component({
    selector: 'jigsaw-notification,j-notification',
    templateUrl: 'notification.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    }
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

        this.message = value.message || 'the "message" property in the initData goes here.';
        this.caption = value.caption;
        this.icon = value.icon;
        this.buttons = value.buttons;
        this.width = value.width;
        this.height = value.height
    }

    @Input() public message: string;
    @Input() public caption: string;
    @Input() public icon: string;
    @Input() public buttons: ButtonInfo[];
    @Input() public width: string;
    @Input() public height: string;

    public static show(message: string): PopupInfo;
    public static show(message: string, caption: string): PopupInfo;
    public static show(message: string, options?: NotificationMessage): PopupInfo;
    public static show(message: string, options?: string | NotificationMessage): PopupInfo {
        if (CommonUtils.isUndefined(message)) {
            return;
        }
        const opt = <NotificationMessage>(typeof options == 'string' ? {caption: options.toString()} : options ? options : {});
        opt.position = opt.hasOwnProperty('position') ? opt.position : NotificationPosition.rightTop;
        opt.timeout = opt.timeout >= 0 ? opt.position : 8000;

        const popupOptions = {
            modal: false,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            posType: PopupPositionType.absolute,
            showBorder: false
        };

        const popEle = PopupService._viewContainerRef.element.nativeElement.parentElement;
        Object.assign(popEle.style, opt.position);

        const popupInfo = PopupService.instance.popup(JigsawNotification, popupOptions,
            {
                message: message,
                caption: opt.caption,
                icon: opt.icon,
                buttons: opt.buttons instanceof ButtonInfo ? [opt.buttons] : opt.buttons,
                callbackContext: opt.callbackContext,
                height: opt.height,
                width: opt.width
            });

        const onClose = answer => {
            CommonUtils.safeInvokeCallback(opt.callbackContext, opt.callback, [answer]);
            popupInfo.answer.unsubscribe();
            popupInfo.dispose();
        };

        popupInfo.answer.subscribe(onClose);

        if (opt.timeout > 0) setTimeout(onClose, opt.timeout);

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
