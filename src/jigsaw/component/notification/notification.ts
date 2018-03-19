import {
    NgModule, Component, Renderer2, Input, ElementRef, NgZone
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractDialogComponentBase, DialogCallback} from "../dialog/dialog";
import {
    ButtonInfo,
    PopupService,
    PopupEffect,
    PopupInfo,
    PopupPositionType,
    PopupPositionValue
} from "../../service/popup.service";
import {JigsawTrustedHtmlModule} from "../../directive/trusted-html/trusted-html"
import {CommonUtils} from "../../core/utils/common-utils";
import {JigsawButtonModule} from "../button/button";

export enum NotificationPosition {
    leftTop, leftBottom, rightTop, rightBottom
}

export class NotificationMessage {
    caption?: string;
    icon?: string;
    position?: NotificationPosition;
    timeout?: number;
    buttons?: ButtonInfo | ButtonInfo[];
    callback?: DialogCallback;
    callbackContext?: any;
    height?: string | number;
    width?: string | number;
    innerHtmlContext?: any;
}

// all notification instances, put the list here to make it private
const notificationInstances = {
    leftTop: [], leftBottom: [], rightTop: [], rightBottom: []
};

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
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    public set initData(value: any) {
        if (!value) return;

        this.message = value.message || 'the "message" property in the initData goes here.';
        this.caption = value.caption;
        this.icon = value.icon;
        this.buttons = value.buttons;
        this.position = value.position;
        this.innerHtmlContext = value.innerHtmlContext;

        this._callback = value.callback;
        this._callbackContext = value._callbackContext;
        this._timeout = value.timeout;
    }

    @Input() public message: string;
    @Input() public caption: string;
    @Input() public icon: string;
    @Input() public buttons: ButtonInfo[];
    @Input() public innerHtmlContext: any;

    private _timeout;
    private _timer;
    private _callback: (button: ButtonInfo) => void;
    private _callbackContext: any;
    private _position: NotificationPosition;

    @Input()
    public get position(): NotificationPosition | string {
        return this._position;
    }

    public set position(value: NotificationPosition | string) {
        const v: string = NotificationPosition[value];
        if (CommonUtils.isUndefined(v)) {
            console.error('invalid NotificationPosition value: ' + value);
            return;
        }
        this._position = NotificationPosition[v];
    }

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

        this._popupInfoValue.answer.subscribe(answer => this._$close(answer));
        this._$onLeave();
    }

    /**
     * @internal
     */
    public _$close(answer?: ButtonInfo) {
        if (this._popupInfoValue) {
            this._popupInfoValue.answer.unsubscribe();
            this._popupInfoValue.dispose();
        }

        if (this._timeout) {
            clearTimeout(this._timeout);
            // set `_timeout` to 0 to make sure `_$onLeave()` do not trigger `_$close` twice!
            this._timeout = 0;
        }

        CommonUtils.safeInvokeCallback(this._callbackContext, this._callback, [answer]);

        const removeListener = this.renderer.listen(this.elementRef.nativeElement, 'animationend',
            () => {
                removeListener();

                JigsawNotification.reposition(this._position);

                const instances = notificationInstances[NotificationPosition[this._position]];
                const idx = instances.indexOf(this._popupInfoValue);
                if (idx != -1) {
                    instances.splice(idx, 1);
                } else {
                    console.error('can find popupInfo in the notification list, this should not happen!');
                }

                const leftTop = notificationInstances[NotificationPosition[NotificationPosition.leftTop]];
                const leftBottom = notificationInstances[NotificationPosition[NotificationPosition.leftBottom]];
                const rightTop = notificationInstances[NotificationPosition[NotificationPosition.rightTop]];
                const rightBottom = notificationInstances[NotificationPosition[NotificationPosition.rightBottom]];

                if (leftTop.length + leftBottom.length + rightTop.length + rightBottom.length == 0) {
                    JigsawNotification._removeResizeListener();
                    JigsawNotification._removeResizeListener = null;
                }

                this._popupInfoValue = null;
                this._timeout = null;
                this._callbackContext = null;
                this._callback = null;
                this.buttons = null;
                this.renderer = null;
                this.elementRef = null;
                this.innerHtmlContext = null;
            });
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
            clearTimeout(this._timer);
            this._timer = setTimeout(() => this._$close(), this._timeout);
        }
    }

    // ===================================================================================
    //  static code section
    // ===================================================================================

    /**
     * @internal
     */
    public static _zone: NgZone;
    /**
     * @internal
     */
    public static _renderer: Renderer2;
    /**
     * @internal
     */
    public static _removeResizeListener;

    private static _positionReviser(position: NotificationPosition, element: HTMLElement): PopupPositionValue {
        let left = 0;
        if (position == NotificationPosition.rightTop || position == NotificationPosition.rightBottom) {
            left += document.body.clientWidth - element.offsetWidth - 24;
        } else {
            left = 24;
        }

        const instances = notificationInstances[NotificationPosition[position]];
        let initTop = 0, flag = 0;
        if (position == NotificationPosition.leftBottom || position == NotificationPosition.rightBottom) {
            initTop = document.body.clientHeight - element.offsetHeight - 24;
            flag = -1;
        } else {
            initTop = 24;
            flag = 1;
        }
        let top = instances.reduce(
            (y, popupInfo) => popupInfo.element === element || popupInfo.element.offsetHeight == 0 ? y :
                y + flag * (popupInfo.element.offsetHeight + 12), initTop);

        return {left, top};
    }

    public static reposition(position?: NotificationPosition) {
        if (CommonUtils.isUndefined(position)) {
            this.reposition(NotificationPosition.leftTop);
            this.reposition(NotificationPosition.rightTop);
            this.reposition(NotificationPosition.leftBottom);
            this.reposition(NotificationPosition.rightBottom);
            return;
        }

        const instances = notificationInstances[NotificationPosition[position]];
        const instancesCopy = instances.concat();
        instances.splice(0, instances.length);
        instancesCopy.forEach(popupInfo => {
            // console.log(popupInfo.element.offsetHeight, popupInfo.element.innerText);
            const p = this._positionReviser(position, popupInfo.element);
            const options = {posType: PopupPositionType.fixed, pos: {x: p.left, y: p.top}};
            PopupService.instance.setPosition(options, popupInfo.element);
            instances.push(popupInfo);
        });
    }

    public static show(message: string): PopupInfo;
    public static show(message: string, caption: string): PopupInfo;
    public static show(message: string, options?: NotificationMessage): PopupInfo;
    public static show(message: string, options?: string | NotificationMessage): PopupInfo {
        if (CommonUtils.isUndefined(message)) {
            return;
        }
        const opt = <NotificationMessage>(typeof options == 'string' ? {caption: options} : options ? options : {});
        opt.width = opt.hasOwnProperty('width') ? opt.width : 350;
        opt.timeout = +opt.timeout >= 0 ? +opt.timeout : 8000;
        opt.position = typeof opt.position === 'string' ? NotificationPosition[<string>opt.position] : opt.position;
        if (CommonUtils.isUndefined(NotificationPosition[opt.position])) {
            opt.position = NotificationPosition.rightTop;
        }

        const popupOptions = {
            size: {width: opt.width, height: opt.height}, disposeOnRouterChanged: false,
            showEffect: PopupEffect.bubbleIn, hideEffect: PopupEffect.bubbleOut, modal: false,
            posReviser: (pos, element) => this._positionReviser(opt.position, element),
            pos: {x: 0, y: 0}, // `pos` not null to tell PopupService don't add resize event listener
            posType: PopupPositionType.fixed
        };
        const initData = {
            message: message, caption: opt.caption, icon: opt.icon, timeout: opt.timeout,
            buttons: opt.buttons instanceof ButtonInfo ? [opt.buttons] : opt.buttons,
            callbackContext: opt.callbackContext, callback: opt.callback, position: opt.position,
            innerHtmlContext: opt.innerHtmlContext
        };
        const popupInfo = PopupService.instance.popup(JigsawNotification, popupOptions, initData);
        popupInfo.instance._popupInfo = popupInfo;
        notificationInstances[NotificationPosition[opt.position]].push(popupInfo);

        if (!this._removeResizeListener) {
            this._zone.runOutsideAngular(() => {
                this._removeResizeListener = this._renderer.listen(window, 'resize', () => this.reposition());
            });
        }

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
