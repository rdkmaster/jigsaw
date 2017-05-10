import {ElementRef, Injectable, OnDestroy} from "@angular/core";
import {PopupOptions, PopupPositionType, PopupService, PopupDisposer} from "./popup.service";
import {RdkLoading} from "../component/loading/loading";

@Injectable()
export class LoadingService implements OnDestroy {

    constructor(private _popupService: PopupService) {
    }

    public show(blockTo?: ElementRef): PopupDisposer
    public show(blockBy?: any): PopupDisposer
    public show(blockTo?: ElementRef, blockBy?: any): PopupDisposer
    public show(blockTo?: ElementRef, blockBy?: any): PopupDisposer {
        let disposer: PopupDisposer;
        if (blockTo instanceof ElementRef) {
            if (blockBy) {
                disposer = this._popupService.popup(blockBy, this._getOptions(blockTo));
            } else {
                disposer = this._popupService.popup(RdkLoading, this._getOptions(blockTo));
            }
        } else if (blockTo) {
            blockBy = blockTo;
            disposer = this._popupService.popup(blockBy);
        } else {
            disposer = this._popupService.popup(RdkLoading);
        }
        return disposer;
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

    ngOnDestroy() {

    }
}


