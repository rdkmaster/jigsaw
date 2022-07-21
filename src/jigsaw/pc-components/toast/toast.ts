import { Component, ChangeDetectionStrategy, OnDestroy, NgModule, Input, Optional, Injector, Renderer2, ElementRef, NgZone } from "@angular/core";
import { PopupInfo, PopupEffect, PopupPositionType, PopupPositionValue, PopupService } from '../../common/service/popup.service';
import { CommonUtils } from '../../common/core/utils/common-utils';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { AbstractDialogComponentBase, NoticeLevel } from "../dialog/dialog";
import {WingsTheme} from "../../common/common";

export class ToastMessage {
    /**
     * 提示框的图标，目前支持Jigsaw自研的@rdkmaster/icon-font符号图标。默认无图标。
     */
    icon?: string;
    /**
     * 提示信息超时自动关闭的毫秒数，为0则表示不关闭，默认8000ms
     */
    timeout?: number;
    /**
     * 提示框的高度，单位是px，默认由内容自动撑开
     */
    height?: string | number;
    /**
     * 提示框的默认宽度，单位是px，默认350px
     */
    width?: string | number;
    /**
     * 提示框支持的默认类型
     */
    iconType?: NoticeLevel;
}


/**
 * all notification instances, put the list here to make it private
 *
 * @internal
 */
const toastInstances = [];

@WingsTheme('toast.scss')
@Component({
    selector: 'jigsaw-toast, j-toast',
    templateUrl: 'toast.html',
    host: {
        '[class.jigsaw-toast-host]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawToast extends AbstractDialogComponentBase implements OnDestroy {
    constructor(protected renderer: Renderer2, protected elementRef: ElementRef, protected _zone: NgZone,
        // @RequireMarkForCheck 需要用到，勿删
        protected _injector: Injector) {
        super(renderer, elementRef, _zone, _injector);
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

        this.message = value.message || 'the "message" property in the initData goes here.';
        this.icon = value.icon == undefined ? 'iconfont iconfont-e23e' : value.icon;
        this._timeout = value.timeout;

        this._$iconType = value.iconType;
    }

    private _timeout: number;
    private _timer: number;

    /**
     * @internal
     */
    public _$iconType: NoticeLevel;

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
     * 需要提示给用户的消息，必选。
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public message: string;

    /**
     * 提示框的图标，目前支持Jigsaw自研的@rdkmaster/icon-font符号图标。默认无图标。
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public icon: string;

    private _popupInfoValue: PopupInfo;

    public get popupInfo(): PopupInfo {
        return this._popupInfoValue;
    }

    public set popupInfo(value: PopupInfo) {
        this._popupInfoValue = value;
        if (!this._popupInfoValue) {
            return;
        }

        this._popupInfoValue.answer.subscribe(answer => this._$close());
        this._$onLeave();
    }

    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    public static show(message: string, options?: ToastMessage): PopupInfo {
        if (CommonUtils.isUndefined(message)) {
            return;
        }
        const opt: ToastMessage = options ? options : {};
        opt.width = opt.hasOwnProperty('width') ? (opt.width > 256 ? opt.width : 256) : 256;
        opt.timeout = +opt.timeout >= 0 ? +opt.timeout : 8000;

        const popupOptions = {
            size: { width: opt.width, height: opt.height },
            disposeOnRouterChanged: true,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            borderRadius: '3px',
            posReviser: (pos, element) => this._positionReviser(element),
            pos: { x: 0, y: 0 },
            posType: PopupPositionType.fixed,
        }

        const initData = {
            message: message,
            icon: opt.icon,
            timeout: opt.timeout,
            iconType: opt.iconType
        }

        const popupInfo = PopupService.instance.popup(JigsawToast, popupOptions, initData);
        (<JigsawToast>popupInfo.instance).popupInfo = popupInfo;
        toastInstances.push(popupInfo)

        return popupInfo;
    }

    private static _positionReviser(element: HTMLElement): PopupPositionValue {
        const instances = toastInstances;
        let left = (document.body.clientWidth - element.offsetWidth) / 2
        let initTop: number = 24;
        const top = instances.reduce(
            (y, popupInfo) => popupInfo.element === element || popupInfo.element.offsetHeight == 0 ? y :
                y + (popupInfo.element.offsetHeight + 12), initTop);
        return { left, top };
    }

    public static showSuccess(message: string, options?: ToastMessage): PopupInfo {
        const opt: ToastMessage = options ? options : {};
        opt.icon = 'iconfont iconfont-e142';
        opt.iconType = 'success';
        return JigsawToast.show(message, opt);
    };

    public static showError(message: string, options?: ToastMessage): PopupInfo {
        const opt: ToastMessage = options ? options : {};
        opt.icon = 'iconfont iconfont-e132';
        opt.iconType = 'error';
        return JigsawToast.show(message, opt);
    };

    public static showWarn(message: string, options?: ToastMessage): PopupInfo {
        const opt: ToastMessage = options ? options : {};
        opt.icon = 'iconfont iconfont-e437';
        opt.iconType = 'warning';
        return JigsawToast.show(message, opt);
    };

    public static showInfo(message: string, options?: ToastMessage): PopupInfo {
        const opt: ToastMessage = options ? options : {};
        opt.icon = 'iconfont iconfont-e23e';
        opt.iconType = 'info';
        return JigsawToast.show(message, opt);
    };

    /**
    * 用于重新定位视图上所有的Toast提示框，一般需要在视图上的提示框有变动时调用。
    */
    public static reposition() {
        const instances = toastInstances;
        const instancesCopy = instances.concat();
        instances.splice(0, instances.length);
        instancesCopy.forEach(popupInfo => {
            const p = this._positionReviser(popupInfo.element);
            const options = { posType: PopupPositionType.fixed, pos: { x: p.left, y: p.top } };
            PopupService.instance.setPosition(options, popupInfo.element);
            instances.push(popupInfo);
        });
    }

    /**
     * @internal
     */
    public _$onEnter() {
        if (this._timer) {
            this.clearCallLater(this._timer);
            this._timer = null;
        }
    }

    /**
     * @internal
     */
    public _$close() {
        if (this._popupInfoValue) {
            this._popupInfoValue.answer.unsubscribe();
            this._popupInfoValue.dispose();
        }

        if (this._timeout) {
            this.clearCallLater(this._timeout);
            // set `_timeout` to 0 to make sure `_$onLeave()` do not trigger `_$close` twice!
            this._timeout = 0;
        }
        const removeListener = this.renderer.listen(this.elementRef.nativeElement, 'animationend', () => {
            removeListener();
            if (!this._popupInfoValue) {
                return;
            }
            JigsawToast.reposition();
            const instances = toastInstances;
            const idx = instances.indexOf(this._popupInfoValue);
            if (idx != -1) {
                instances.splice(idx, 1);
                return;
            }
            console.error('can find popupInfo in the notification list, this should not happen!');
            this._popupInfoValue = null;
            this._timeout = null;
            this.buttons = null;
            this.renderer = null;
            this.elementRef = null;
        })
    }

    /**
     * @internal
     */
    public _$onLeave() {
        if (this._timeout > 0) {
            this.clearCallLater(this._timer);
            this._timer = this.callLater(() => this._$close(), this._timeout);
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        if (this._popupInfoValue.answer) {
            this._popupInfoValue.answer.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule],
    declarations: [JigsawToast],
    exports: [JigsawToast],
    providers: [TranslateService]
})
export class JigsawToastModule { }
