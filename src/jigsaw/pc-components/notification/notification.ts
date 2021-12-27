import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Injector,
    Input,
    NgModule,
    NgZone, OnDestroy,
    Optional,
    Renderer2
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { filter, map, take } from 'rxjs/operators';
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { AbstractDialogComponentBase, DialogCallback, NoticeLevel } from "../dialog/dialog";
import {
    ButtonInfo,
    PopupEffect,
    PopupInfo,
    PopupPositionType,
    PopupPositionValue,
    PopupService
} from "../../common/service/popup.service";
import { JigsawTrustedHtmlModule } from "../../common/directive/trusted-html/trusted-html"
import { CommonUtils } from "../../common/core/utils/common-utils";
import { JigsawButtonModule } from "../button/button";
import { InternalUtils } from "../../common/core/utils/internal-utils";
import { TranslateHelper } from "../../common/core/utils/translate-helper";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

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
     * 提示框的图标，目前支持Jigsaw自研的@rdkmaster/icon-font符号图标。默认无图标。
     */
    icon?: string;
    /**
     * 提示框所处的位置，目前支持左上、左下、右上、右下4个方向，默认右上角
     */
    position?: NotificationPosition | string;
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
    iconType?: NoticeLevel;
    /**
     * 控制是否在路由变化时提示框是否关闭，默认不关
     */
    disposeOnRouterChanged?: boolean
}

/**
 * all notification instances, put the list here to make it private
 *
 * @internal
 */
const notificationInstances = {
    leftTop: [], leftBottom: [], rightTop: [], rightBottom: []
};

// @dynamic
@Component({
    selector: 'jigsaw-notification,j-notification',
    templateUrl: 'notification.html',
    host: {
        '[class.jigsaw-notification-host]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawNotification extends AbstractDialogComponentBase implements OnDestroy {
    constructor(protected renderer: Renderer2, protected elementRef: ElementRef, protected _zone: NgZone,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector, private _translateService: TranslateService,
        @Optional() private _router: Router,
        @Optional() private _activatedRoute: ActivatedRoute) {
        super(renderer, elementRef, _zone, _injector);
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
        if (!value) {
            return;
        }

        const iconType2Caption = {
            success: 'notification.success',
            error: 'notification.error',
            warning: 'notification.warning',
            info: 'notification.info'
        };

        this.caption = value.caption ? value.caption : (iconType2Caption.hasOwnProperty(value.iconType) ? this._translateService.instant(iconType2Caption[value.iconType]) : undefined)
        this.message = value.message || 'the "message" property in the initData goes here.';
        this.icon = value.icon == undefined ? 'iconfont iconfont-e23e' : value.icon;
        this.buttons = value.buttons;
        this.position = value.position;
        this.innerHtmlContext = value.innerHtmlContext;

        this._callback = value.callback;
        this._callbackContext = value._callbackContext;
        this._timeout = value.timeout;

        this._$iconType = value.iconType;


        if (value && value.hasOwnProperty('disposeOnRouterChanged') && value.disposeOnRouterChanged) {
            this._listenRouterChange();
        }
    }

    /**
     * 需要提示给用户的消息，支持基础html标记，支持附加交互动作。必选。
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public message: string;

    /**
     * 提示框的标题，默认不显示标题
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public caption: string;

    /**
     * 提示框的图标，目前支持Jigsaw自研的@rdkmaster/icon-font符号图标。默认无图标。
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public icon: string;

    /**
     * 给提示框快速设置交互按钮
     *
     * @NoMarkForCheckRequired
     *
     * $demo = notification/full
     */
    @Input()
    public buttons: ButtonInfo[];

    /**
     * 当`message`里包含html交互动作时，`JigsawNotification`在执行给定的回调函数时，会将这个对象作为函数的上下文。
     * 简单的说，这个属性值和回调函数里的`this`是同一个对象。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = notification/full
     */
    @Input()
    public innerHtmlContext: any;

    private _timeout;
    private _timer;
    private _callback: (button: ButtonInfo) => void;
    private _callbackContext: any;
    private _position: NotificationPosition;

    /**
     * 提示框所处的位置，目前支持左上、左下、右上、右下4个方向。
     *
     * @NoMarkForCheckRequired
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

        if (this._popupInfoValue.answer) {
            this._popupInfoValue.answer.unsubscribe();
        }

        this._popupInfoValue.answer.subscribe(answer => this._$close(answer));
        this._$onLeave();
    }

    /**
     * @internal
     */
    public _$getClassObject(classPrefix: string): { [className: string]: boolean } {
        return {
            [`${classPrefix}-success`]: this._$iconType == 'success',
            [`${classPrefix}-error`]: this._$iconType == 'error',
            [`${classPrefix}-warning`]: this._$iconType == 'warning',
            [`${classPrefix}-info`]: this._$iconType != 'success' && this._$iconType != 'error' && this._$iconType != 'warning'
        };
    }

    /**
     * @internal
     */
    public _$iconType: NoticeLevel;

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
                if (!this._popupInfoValue) {
                    return;
                }

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

    private _routerChangeSubscription: Subscription;

    private _listenRouterChange(): void {
        if (this._routerChangeSubscription) {
            this._routerChangeSubscription.unsubscribe();
        }
        if (!this._router) {
            return;
        }
        this._routerChangeSubscription = this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this._activatedRoute),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                })
            )
            .subscribe(() => {
                this._routerChangeSubscription.unsubscribe();
                this._routerChangeSubscription = null;
                this._$close()
            });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._routerChangeSubscription) {
            this._routerChangeSubscription.unsubscribe();
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
    public static _removeResizeListener;

    private static _positionReviser(position: NotificationPosition | string, element: HTMLElement): PopupPositionValue {
        let left = 0;
        if (position == NotificationPosition.rightTop || position == NotificationPosition.rightBottom) {
            left += document.body.clientWidth - element.offsetWidth - 24;
        } else {
            left = 24;
        }

        const instances = notificationInstances[NotificationPosition[position]];
        let initTop: number, flag: number = 0;
        if (position == NotificationPosition.leftBottom || position == NotificationPosition.rightBottom) {
            initTop = document.body.clientHeight - element.offsetHeight - 24;
            flag = -1;
        } else {
            initTop = 24;
            flag = 1;
        }
        const top = instances.reduce(
            (y, popupInfo) => popupInfo.element === element || popupInfo.element.offsetHeight == 0 ? y :
                y + flag * (popupInfo.element.offsetHeight + 12), initTop);

        return { left, top };
    }

    /**
     * 用于重新定位视图上所有的提示框，一般需要在视图上的提示框有变动时调用。
     * `JigsawNotification.show`方法、以及提示框被关掉时，Jigsaw会自动调用此方法，无需应用再次调用。
     *
     * @param position 调整哪个方向上的提示框，可选，默认调试所有4个方向。
     */
    public static reposition(position?: NotificationPosition | string) {
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
            const p = this._positionReviser(position, popupInfo.element);
            const options = { posType: PopupPositionType.fixed, pos: { x: p.left, y: p.top } };
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
     * @param message 消息内容，支持基础html标记的富文本，也支持在html中添交互加动作。
     * @return 返回的是被弹出的`JigsawNotification`组件实例的相关信息
     */
    public static show(message: string): PopupInfo;
    /**
     * @param message
     * @param caption 提示框的标题
     *
     */
    public static show(message: string, caption: string): PopupInfo;
    /**
     * @param message
     * @param options 提示框的所有配置项，对提示做的行为做详细配置
     *
     */
    public static show(message: string, options?: NotificationMessage): PopupInfo;
    /**
     * @internal
     */
    public static show(message: string, options?: string | NotificationMessage): PopupInfo {
        if (CommonUtils.isUndefined(message)) {
            return;
        }
        const opt = <NotificationMessage>(typeof options == 'string' ? { caption: options } : options || {});

        opt.width = opt.hasOwnProperty('width') ? opt.width : 350;
        opt.timeout = +opt.timeout >= 0 ? +opt.timeout : 8000;
        opt.position = typeof opt.position === 'string' ? NotificationPosition[<string>opt.position] : opt.position;
        if (CommonUtils.isUndefined(NotificationPosition[opt.position])) {
            opt.position = NotificationPosition.rightTop;
        }

        const popupOptions = {
            size: { width: opt.width, height: opt.height }, disposeOnRouterChanged: false,
            showEffect: PopupEffect.bubbleIn, hideEffect: PopupEffect.bubbleOut, modal: false,
            posReviser: (pos, element) => this._positionReviser(opt.position, element),
            // `pos` not null to tell PopupService don't add resize event listener
            pos: { x: 0, y: 0 }, posType: PopupPositionType.fixed,
            borderRadius: '3px'
        };
        const initData = {
            message: message, caption: opt.caption, icon: opt.icon, timeout: opt.timeout,
            buttons: opt.buttons instanceof ButtonInfo ? [opt.buttons] : opt.buttons,
            callbackContext: opt.callbackContext, callback: opt.callback, position: opt.position,
            innerHtmlContext: opt.innerHtmlContext, iconType: opt.iconType,
            disposeOnRouterChanged: !!opt.disposeOnRouterChanged,
        };
        const popupInfo = PopupService.instance.popup(JigsawNotification, popupOptions, initData);
        (<JigsawNotification>popupInfo.instance)._popupInfo = popupInfo;
        notificationInstances[NotificationPosition[opt.position]].push(popupInfo);

        const onStableSubscription = InternalUtils.zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            onStableSubscription.unsubscribe();
            this.reposition(opt.position);
        });

        if (!this._removeResizeListener) {
            InternalUtils.zone.runOutsideAngular(() => {
                this._removeResizeListener = InternalUtils.renderer.listen(window, 'resize', () => this.reposition());
            });
        }

        return popupInfo;
    };

    public static showSuccess(message: string, options?: string | NotificationMessage): PopupInfo {
        const opt: NotificationMessage = typeof options == 'string' ? { caption: options } : options ? options : {};
        opt.icon = 'iconfont iconfont-e142';
        opt.iconType = 'success';
        return JigsawNotification.show(message, opt);
    };

    public static showError(message: string, options?: string | NotificationMessage): PopupInfo {
        const opt: NotificationMessage = typeof options == 'string' ? { caption: options } : options ? options : {};
        opt.icon = 'iconfont iconfont-e132';
        opt.iconType = 'error';
        return JigsawNotification.show(message, opt);
    };

    public static showWarn(message: string, options?: string | NotificationMessage): PopupInfo {
        const opt: NotificationMessage = typeof options == 'string' ? { caption: options } : options ? options : {};
        opt.icon = 'iconfont iconfont-e437';
        opt.iconType = 'warning';
        return JigsawNotification.show(message, opt);
    };

    public static showInfo(message: string, options?: string | NotificationMessage): PopupInfo {
        const opt: NotificationMessage = typeof options == 'string' ? { caption: options } : options ? options : {};
        opt.icon = 'iconfont iconfont-e23e';
        opt.iconType = 'info';
        return JigsawNotification.show(message, opt);
    };
}

@NgModule({
    imports: [CommonModule, JigsawButtonModule, JigsawTrustedHtmlModule, PerfectScrollbarModule],
    declarations: [JigsawNotification],
    exports: [JigsawNotification],
    providers: [TranslateService]
})
export class JigsawNotificationModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'notification', {
            zh: {
                success: '成功',
                error: '错误',
                warning: '警告',
                info: '消息'
            },
            en: {
                success: 'Success',
                error: 'Error',
                warning: 'Warning',
                info: 'Information'
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
