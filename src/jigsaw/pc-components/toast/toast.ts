import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { AbstractDialogComponentBase } from '../../../../dist/@rdkmaster/jigsaw/public_api';
import { PopupInfo, PopupEffect, PopupPositionType, PopupPositionValue, PopupService } from 'jigsaw/common/service/popup.service';
import { CommonUtils } from 'jigsaw/common/core/utils/common-utils';

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

    private static _positionReviser(element: HTMLElement): PopupPositionValue {
        const instances = toastInstances;
        let initTop: number = 24;
        const top = instances.reduce(
            (y, popupInfo) => popupInfo.element === element || popupInfo.element.offsetHeight == 0 ? y :
                y + (popupInfo.element.offsetHeight + 12), initTop);

        return { left: 0, top };
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}