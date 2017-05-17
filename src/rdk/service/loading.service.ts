import {ElementRef, Injectable, TemplateRef, Type} from "@angular/core";
import {IPopupable, PopupInfo, PopupOptions, PopupPositionType, PopupService} from "./popup.service";
import {RdkLoading} from "../component/loading/loading";

@Injectable()
export class LoadingService {

    constructor(private _popupService: PopupService) {
    }

    public show(blockTo?: ElementRef): PopupInfo
    public show(blockBy?: Type<IPopupable>): PopupInfo
    public show(blockBy?: TemplateRef<any>): PopupInfo
    public show(blockTo?: ElementRef, blockBy?: Type<IPopupable>): PopupInfo
    public show(blockTo?: ElementRef, blockBy?: TemplateRef<any>): PopupInfo
    public show(blockTo?: ElementRef | Type<IPopupable> | TemplateRef<any>, blockBy?: Type<IPopupable> | TemplateRef<any>): PopupInfo {
        let popupInfo: PopupInfo;
        if (blockTo instanceof ElementRef) {
            if (blockBy instanceof Type) {
                popupInfo = this._popupService.popup(blockBy, this._getOptions(blockTo));
            } else if (blockBy instanceof TemplateRef) {
                popupInfo = this._popupService.popup(blockBy, this._getOptions(blockTo));
            } else {
                popupInfo = this._popupService.popup(RdkLoading, this._getOptions(blockTo));
            }
        } else if (blockTo) {
            blockBy = blockTo;
            if (blockBy instanceof Type) {
                popupInfo = this._popupService.popup(blockBy);
            } else if (blockBy instanceof TemplateRef) {
                popupInfo = this._popupService.popup(blockBy);
            }
        } else {
            popupInfo = this._popupService.popup(RdkLoading);
        }
        return popupInfo;
    }

    private _getOptions(elementRef: ElementRef): PopupOptions {
        let element = elementRef.nativeElement;
        return {
            modal: true, //是否模态
            pos: elementRef, //插入点
            posOffset: { //偏移位置
                top: 0,
                left: 0
            },
            posType: PopupPositionType.absolute, //定位类型
            size: {width: element.offsetWidth, height: element.offsetHeight}
        };
    }
}


