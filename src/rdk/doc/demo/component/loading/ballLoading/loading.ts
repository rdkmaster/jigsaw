import {Component, ElementRef, ViewChild} from '@angular/core';
import {PopupInfo, PopupRef} from "../../../../../service/popup.service";
import {LoadingService} from "rdk/service/loading.service";
import {RdkBallLoading} from "../../../../../component/loading/loading";

@Component({
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class BallLoadingDemoComponent{
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService) {
    }

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, RdkBallLoading);
        }
    }

    closeBlockLoading() {
        if (this.blockLoading) {
            this.blockLoading.dispose();
            this.blockLoading = null;
        }
    }

    popupGlobalLoading() {
        if (!this.globalLoading) {
            this.globalLoading = this.loadingService.show(RdkBallLoading);
            setTimeout(() => {
                this.closeGlobalLoading();
            }, 3000)
        }
    }

    closeGlobalLoading(){
        if(this.globalLoading){
            this.globalLoading.dispose();
            this.globalLoading = null;
        }
    }
}
