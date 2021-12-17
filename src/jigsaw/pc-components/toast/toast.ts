import { Component, ChangeDetectionStrategy, OnDestroy, NgModule, Input, Optional, Injector, Renderer2, ElementRef, NgZone } from "@angular/core";
import { PopupInfo, PopupEffect, PopupPositionType, PopupPositionValue, PopupService } from 'jigsaw/common/service/popup.service';
import { CommonUtils } from 'jigsaw/common/core/utils/common-utils';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { InternalUtils } from 'jigsaw/common/core/utils/internal-utils';
import { TranslateHelper } from 'jigsaw/common/core/utils/translate-helper';
import { AbstractDialogComponentBase } from "../dialog/dialog";
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

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
    iconType?: 'success' | 'error' | 'warning' | 'info';
}


/**
 * all notification instances, put the list here to make it private
 *
 * @internal
 */
const toastInstances = [];
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
        protected _injector: Injector, private _translateService: TranslateService,
        @Optional() private _router: Router,
        @Optional() private _activatedRoute: ActivatedRoute) {
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
    }

    private _timeout;

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

        // this._popupInfoValue.answer.subscribe(answer => this._$close(answer));
        // this._$onLeave();
    }


    protected getPopupElement(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    public static show(message: string, options?: ToastMessage): PopupInfo {
        if (CommonUtils.isUndefined(message)) {
            return;
        }
        const opt = <ToastMessage>{};
        opt.width = opt.hasOwnProperty('width') ? opt.width : 350;
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
            message: message
        }

        const popupInfo = PopupService.instance.popup(JigsawToast, popupOptions, initData);
        (<JigsawToast>popupInfo.instance)._popupInfo = popupInfo;
        toastInstances.push(popupInfo)

        return popupInfo;
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
            const instances = toastInstances;
            const idx = instances.indexOf(this._popupInfoValue);
            if (idx != -1) {
                instances.splice(idx, 1);
            } else {
                console.error('can find popupInfo in the notification list, this should not happen!');

                this._popupInfoValue = null;
                this._timeout = null;
                this.buttons = null;
                this.renderer = null;
                this.elementRef = null;
            };
        })
    }

    private static _positionReviser(element: HTMLElement): PopupPositionValue {
        const instances = toastInstances;
        let initTop: number = 24;
        const top = instances.reduce(
            (y, popupInfo) => popupInfo.element === element || popupInfo.element.offsetHeight == 0 ? y :
                y + (popupInfo.element.offsetHeight + 12), initTop);

        return { left: 0, top };
    }

    private _routerChangeSubscription: Subscription;

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule],
    declarations: [JigsawToast],
    exports: [JigsawToast],
    providers: [TranslateService]
})
export class JigsawToastModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'toast', {
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
