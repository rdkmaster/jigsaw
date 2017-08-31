import {ElementRef, Injectable, TemplateRef, Type} from "@angular/core";
import {IPopupable, PopupInfo, PopupOptions, PopupPositionType, PopupService} from "./popup.service";
import {JigsawLoading} from "../component/loading/loading";
import {JigsawBlock} from "../component/block/block";

@Injectable()
export class LoadingService {
    public static show(blockTo?: ElementRef): PopupInfo
    public static show(blockBy?: Type<IPopupable>): PopupInfo
    public static show(blockBy?: TemplateRef<any>): PopupInfo
    public static show(blockTo?: ElementRef, blockBy?: Type<IPopupable>): PopupInfo
    public static show(blockTo?: ElementRef, blockBy?: TemplateRef<any>): PopupInfo
    public static show(blockTo?: ElementRef | Type<IPopupable> | TemplateRef<any>, blockBy?: Type<IPopupable> | TemplateRef<any>): PopupInfo {
        let popupInfo: PopupInfo;
        if (blockTo instanceof ElementRef) {
            //弹出局部Modal，针对loading的特殊处理
            const blockInfo = PopupService.instance.popup(JigsawBlock, LoadingService._getOptions(blockTo));

            if (blockBy instanceof Type) {
                popupInfo = PopupService.instance.popup(blockBy, LoadingService._getOptions(blockTo));
            } else if (blockBy instanceof TemplateRef) {
                popupInfo = PopupService.instance.popup(blockBy, LoadingService._getOptions(blockTo));
            } else {
                popupInfo = PopupService.instance.popup(JigsawLoading, LoadingService._getOptions(blockTo));
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
                popupInfo = PopupService.instance.popup(blockBy);
            } else if (blockBy instanceof TemplateRef) {
                popupInfo = PopupService.instance.popup(blockBy);
            }
        } else {
            popupInfo = PopupService.instance.popup(JigsawLoading);
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


