import {ElementRef, Injectable, TemplateRef, Type} from "@angular/core";
import {PopupOptions, PopupPositionType, PopupService, IPopupable, PopupRef} from "./popup.service";
import {RdkLoading} from "../component/loading/loading";

@Injectable()
export class LoadingService {

    constructor(private _popupService: PopupService) {
    }

    public show(blockTo?: ElementRef): PopupRef
    public show(blockBy?: Type<IPopupable>): PopupRef
    public show(blockBy?: TemplateRef<any>): PopupRef
    public show(blockTo?: ElementRef, blockBy?: Type<IPopupable>): PopupRef
    public show(blockTo?: ElementRef, blockBy?: TemplateRef<any>): PopupRef
    public show(blockTo?: ElementRef|Type<IPopupable>|TemplateRef<any>, blockBy?: Type<IPopupable>|TemplateRef<any>): PopupRef {
        let ref: PopupRef;
        if (blockTo instanceof ElementRef) {
            if (blockBy instanceof Type) {
                ref = this._popupService.popup(blockBy, this._getOptions(blockTo)).popupRef;
            } else if (blockBy instanceof TemplateRef) {
                ref = this._popupService.popup(blockBy, this._getOptions(blockTo)).popupRef;
            } else {
                ref = this._popupService.popup(RdkLoading, this._getOptions(blockTo)).popupRef;
            }
        } else if (blockTo) {
            blockBy = blockTo;
            if (blockBy instanceof Type) {
                ref = this._popupService.popup(blockBy).popupRef;
            } else if (blockBy instanceof TemplateRef) {
                ref = this._popupService.popup(blockBy).popupRef;
            }
        } else {
            ref = this._popupService.popup(RdkLoading).popupRef;
        }
        return ref;
    }

    private _getOptions(elementRef: ElementRef): PopupOptions {
        let element = elementRef.nativeElement;
        return {
            modal: false, //是否模态
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


