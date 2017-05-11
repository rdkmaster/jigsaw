import {Component, ElementRef, ViewChild} from '@angular/core';
import {PopupDisposer} from "../../../../../service/popup.service";
import {LoadingService} from "rdk/service/loading.service";
import {RdkBarLoading} from "../../../../../component/loading/loading";

@Component({
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class BarLoadingDemoComponent{
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService) {
    }

    disposeBlockLoading: PopupDisposer;
    disposeGlobalLoading: PopupDisposer;

    popupBlockLoading() {
        if (!this.disposeBlockLoading) {
            this.disposeBlockLoading = this.loadingService.show(this.block, RdkBarLoading);
        }
    }

    closeBlockLoading() {
        if (this.disposeBlockLoading) {
            this.disposeBlockLoading();
            this.disposeBlockLoading = null;
        }
    }

    popupGlobalLoading() {
        if (!this.disposeGlobalLoading) {
            this.disposeGlobalLoading = this.loadingService.show(RdkBarLoading);
            setTimeout(() => {
                this.closeGlobalLoading();
            }, 3000)
        }
    }

    closeGlobalLoading(){
        if(this.disposeGlobalLoading){
            this.disposeGlobalLoading();
            this.disposeGlobalLoading = null;
        }
    }
}
