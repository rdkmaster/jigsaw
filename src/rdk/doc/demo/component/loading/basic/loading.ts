import {Component, ElementRef, ViewChild} from '@angular/core';
import {PopupDisposer} from "../../../../../service/popup.service";
import {LoadingService} from "rdk/service/loading.service";

@Component({
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class LoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService) {
    }

    disposeBlockLoading: PopupDisposer;
    disposeGlobalLoading: PopupDisposer;

    popupBlockLoading() {
        if (!this.disposeBlockLoading) {
            this.disposeBlockLoading = this.loadingService.show(this.block);
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
            this.disposeGlobalLoading = this.loadingService.show();
            setTimeout(() => {
                this.disposeGlobalLoading();
                this.disposeGlobalLoading = null;
            }, 3000)
        }
    }

}
