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
        this.height = value.height;

        this._callback = value.callback;
        this._callbackContext = value.callbackContext;
        this._timeout = value.timeout;
    }

    @Input() public message: string;
    @Input() public caption: string;
    @Input() public icon: string;
    @Input() public buttons: ButtonInfo[];
    @Input() public width: string;
    @Input() public height: string;


    private _callback: (button: ButtonInfo) => void;
    private _callbackContext: any;
    private _timeout;
    private _timer;
    private _popupInfoValue: PopupInfo;

    /**
     * @internal
     */
    get _popupInfo(): PopupInfo {
        return this._popupInfoValue;
    }

    set _popupInfo(value: PopupInfo) {
        this._popupInfoValue = value;
        if (!this._popupInfoValue) {
            return;
        }

        this._popupInfoValue.answer.subscribe(answer => this._close(answer));
        this._$onLeave();
    }

    private _close(answer?: ButtonInfo) {
        if (!this._popupInfoValue) {
            return;
        }

        this._popupInfoValue.answer.unsubscribe();
        this._popupInfoValue.dispose();
        this._popupInfoValue = null;

        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }

        CommonUtils.safeInvokeCallback(this._callbackContext, this._callback, [answer]);
        this._callbackContext = null;
        this._callback = null;
    }

    /**
     * @internal
     */
    _$onEnter() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    /**
     * @internal
     */
    _$onLeave() {
        if (this._timeout > 0) {
            this._timer = setTimeout(() => this._close(), this._timeout);
        }
    }

    // ===================================================================================

    public static show(message: string): PopupInfo;
    public static show(message: string, caption: string): PopupInfo;
    public static show(message: string, options?: NotificationMessage): PopupInfo;
    public static show(message: string, options?: string | NotificationMessage): PopupInfo {
        if (CommonUtils.isUndefined(message)) {
            return;
        }
        const opt = <NotificationMessage>(typeof options == 'string' ? {caption: options} : options ? options : {});
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

        let popupInfo = PopupService.instance.popup(JigsawNotification, popupOptions,
            {
                message: message,
                caption: opt.caption,
                icon: opt.icon,
                buttons: opt.buttons instanceof ButtonInfo ? [opt.buttons] : opt.buttons,
                callbackContext: opt.callbackContext,
                callback: opt.callback,
                height: opt.height,
                width: opt.width,
                timeout: opt.timeout
            });
        popupInfo.instance._popupInfo = popupInfo;
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
