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

/**
 * 提示框所处的位置，目前支持左上、左下、右上、右下4个方向。
 */
export enum NotificationPosition {
    leftTop, leftBottom, rightTop, rightBottom
}

/**
 * 一个提示消息的额外信息，用于详细配置一个弹出的消息的各种属性，所有属性都是可选的。
 */
export class NotificationMessage {
    /**
     * 提示框的标题，默认不显示标题
     */
    caption?: string;
    /**
     * 提示框的图标，目前仅支持font-awesome就Jigsaw自研的iconfont图标。默认无图标。
     */
    icon?: string;
    /**
     * 提示框所处的位置，目前支持左上、左下、右上、右下4个方向，默认右上角
     */
    position?: NotificationPosition;
    /**
     * 提示信息超时自动关闭的毫秒数，为0则表示不关闭，默认8000ms
     */
    timeout?: number;
    /**
     * 给提示框快速设置交互按钮，默认无按钮
     *
     * $demo = notification/full
     */
    buttons?: ButtonInfo | ButtonInfo[];
    /**
     * `buttons`被单击了后的回调函数
     */
    callback?: DialogCallback;
    /**
     * `callback`执行的上下文
     */
    callbackContext?: any;
    /**
     * 提示框的高度，单位是px，默认由内容自动撑开
     */
    height?: string | number;
    /**
     * 提示框的默认宽度，单位是px，默认350px
     */
    width?: string | number;
    /**
     * 当消息的内容是html片段，并且包含了交互动作时，以此属性值作为这些函数的上下文对象。
     *
     * 例如使用下面的代码弹出一个提示
     *
     * ```
     * JigsawNotification.show('执行xxxx成功啦，单击<a onclick="showDetail()">这里</a>查看详情。');
     * ```
     *
     * 注意到提示内容带了一个超链，并且配置了`showDetail()`作为回调函数，在这个情况下，
     * `innerHtmlContext`这个对象上必须已经定义了`showDetail()`函数，否则在用户单击了链接之后，控制台将报错。
     *
     * 此外，`innerHtmlContext`还作为回调函数中`this`的上下文，再如`showDetail()`函数有如下代码：
     *
     * ```
     * showDetail() {
     *     ...
     *     alert(this.detail)
     * }
     * ```
     *
     * 在这个情况下，`innerHtmlContext`这个对象上必须已经定义了`detail`属性，否则一样报错。
     *
     * $demo = notification/full
     */
    innerHtmlContext?: any;
}

/**
 * all notification instances, put the list here to make it private
 *
 * @internal
 */
const notificationInstances = {
    leftTop: [], leftBottom: [], rightTop: [], rightBottom: []
};

@Component({
    selector: 'jigsaw-notification,j-notification',
    templateUrl: 'notification.html',
    host: {
        '[class.jigsaw-notification-host]': 'true',
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

    /**
     * 初始化数据，应用一般无需使用。
     *
     * @param value
     */
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

    /**
     * 需要提示给用户的消息，支持基础html标记，支持附加交互动作。必选。
     */
    @Input() public message: string;

    /**
     * 提示框的标题，默认不显示标题
     */
    @Input() public caption: string;

    /**
     * 提示框的图标，目前仅支持font-awesome就Jigsaw自研的iconfont图标。默认无图标。
     */
    @Input() public icon: string;

    /**
     * 给提示框快速设置交互按钮
     *
     * $demo = notification/full
     */
    @Input() public buttons: ButtonInfo[];

    /**
     * 当`message`里包含html交互动作时，`JigsawNotification`在执行给定的回调函数时，会将这个对象作为函数的上下文。
     * 简单的说，这个属性值和回调函数里的`this`是同一个对象。
     *
     * $demo = notification/full
     */
    @Input() public innerHtmlContext: any;

    private _timeout;
    private _timer;
    private _callback: (button: ButtonInfo) => void;
    private _callbackContext: any;
    private _position: NotificationPosition;

    /**
     * 提示框所处的位置，目前支持左上、左下、右上、右下4个方向。
     *
     * @return {NotificationPosition | string}
     */
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
            this.clearCallLater(this._timeout);
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
            this.clearCallLater(this._timer);
            this._timer = null;
        }
    }

    /**
     * @internal
     */
    _$onLeave() {
        if (this._timeout > 0) {
            this.clearCallLater(this._timer);
            this._timer = this.callLater(() => this._$close(), this._timeout);
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

    /**
     * 用于重新定位视图上所有的提示框，一般需要在视图上的提示框有变动时调用。
     * `JigsawNotification.show`方法、以及提示框被关掉时，Jigsaw会自动调用此方法，无需应用再次调用。
     *
     * @param {NotificationPosition} position 调整哪个方向上的提示框，可选，默认调试所有4个方向。
     */
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

    /**
     * 方便快速地将一些信息以卡片的方式弹出在视图上，起到通知用户的作用。
     * 这种提示方式相比[alert]($demo=alert/popup)柔和许多，对用户干扰较少，**建议优先使用**。
     * 只有在一些非要用户立即处理不可的通知才通过[alert]($demo=alert/popup)的方式通知用户。
     *
     * $demo = notification/full
     *
     * @param {string} message 消息内容，支持基础html标记的富文本，也支持在html中添交互加动作。
     * @return {PopupInfo} 返回的是被弹出的`JigsawNotification`组件实例的相关信息
     */
    public static show(message: string): PopupInfo;
    /**
     * @param {string} message
     * @param {string} caption 提示框的标题
     * @return {PopupInfo}
     */
    public static show(message: string, caption: string): PopupInfo;
    /**
     * @param {string} message
     * @param {NotificationMessage} options 提示框的所有配置项，对提示做的行为做详细配置
     * @return {PopupInfo}
     */
    public static show(message: string, options?: NotificationMessage): PopupInfo;
    /**
     * @internal
     */
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

        setTimeout(() => this.reposition(opt.position));

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
