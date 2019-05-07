import {ElementRef, Injectable, TemplateRef, Type} from "@angular/core";
import {IPopupable, PopupInfo, PopupOptions, PopupPositionType, PopupService} from "./popup.service";
import {JigsawLoading} from "../components/loading/loading";
import {JigsawBlock} from "../components/block/block";

@Injectable()
export class LoadingService {
    constructor(private _popupService:PopupService) {
    }

    public show(blockTo?: ElementRef): PopupInfo
    public show(blockBy?: Type<IPopupable>): PopupInfo
    public show(blockBy?: TemplateRef<any>): PopupInfo
    public show(blockTo?: ElementRef, blockBy?: Type<IPopupable>): PopupInfo
    public show(blockTo?: ElementRef, blockBy?: TemplateRef<any>): PopupInfo
    public show(blockTo?: ElementRef | Type<IPopupable> | TemplateRef<any>, blockBy?: Type<IPopupable> | TemplateRef<any>): PopupInfo {
        let popupInfo: PopupInfo;
        if (blockTo instanceof ElementRef) {
            //弹出局部Modal，针对loading的特殊处理
            const blockInfo = this._popupService.popup(JigsawBlock, LoadingService._getOptions(blockTo));

            if (blockBy instanceof Type) {
                popupInfo = this._popupService.popup(blockBy, LoadingService._getOptions(blockTo));
            } else if (blockBy instanceof TemplateRef) {
                popupInfo = this._popupService.popup(blockBy, LoadingService._getOptions(blockTo));
            } else {
                popupInfo = this._popupService.popup(JigsawLoading, LoadingService._getOptions(blockTo));
            }

            const dispose = () => {
                blockInfo.dispose();
                popupInfo.dispose();
            };

            return {
                element: popupInfo.element,
                dispose: dispose,
                answer: popupInfo.answer,
                instance: popupInfo.instance
            }
        } else if (blockTo) {
            blockBy = blockTo;
            if (blockBy instanceof Type) {
                popupInfo = this._popupService.popup(blockBy);
            } else if (blockBy instanceof TemplateRef) {
                popupInfo = this._popupService.popup(blockBy);
            }
        } else {
            popupInfo = this._popupService.popup(JigsawLoading);
        }
        return popupInfo;
    }

    private static _getOptions(elementRef: ElementRef): PopupOptions {
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


