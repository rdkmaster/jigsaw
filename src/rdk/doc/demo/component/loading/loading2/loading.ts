import {Component, ElementRef, ViewChild} from '@angular/core';
import {PopupDisposer, PopupOptions, PopupPositionType, PopupService} from "../../../../../service/popup.service";
import {RdkLoading} from "../../../../../component/loading/loading";

@Component({
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class Loading2DemoComponent {
    @ViewChild('blockOne') blockOne: ElementRef;
    @ViewChild('blockTwo') blockTwo: ElementRef;

    constructor(public popupService: PopupService) {
    }

    disposeTmpLoading: PopupDisposer;
    disposeCmpLoading: PopupDisposer;
    disposeGlobalLoading: PopupDisposer;

    popupTmpLoading(tp) {
        this.disposeTmpLoading = this.popupService.popup(tp, this.getOptions(this.blockOne));
    }

    closeTmpLoading() {
        if (this.disposeTmpLoading) this.disposeTmpLoading();
    }

    popupCmpLoading(){
        this.disposeCmpLoading = this.popupService.popup(RdkLoading, this.getOptions(this.blockTwo));
    }

    closeCmpLoading(){
        if (this.disposeCmpLoading) this.disposeCmpLoading();
    }

    popupGlobalLoading(){
        this.disposeGlobalLoading = this.popupService.popup(RdkLoading);
        setTimeout(() => {
            this.disposeGlobalLoading();
        }, 3000)
    }

    getOptions(elementRef: ElementRef): PopupOptions {
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
