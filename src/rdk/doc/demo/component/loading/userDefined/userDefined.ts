import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService} from "../../../../../service/loading.service"
import {PopupInfo, PopupRef} from "../../../../../service/popup.service";
import {DefinedLoading} from "./definedLoading/definedLoading";

@Component({
    templateUrl: 'userDefined.html',
    styleUrls: ['userDefined.scss']
})
export class DefinedLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService) {
    }

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, DefinedLoading);
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
            this.globalLoading = this.loadingService.show(DefinedLoading);
            setTimeout(() => {
                this.closeGlobalLoading();
            }, 3000)
        }
    }

    closeGlobalLoading() {
        if (this.globalLoading) {
            this.globalLoading.dispose();
            this.globalLoading = null;
        }
    }
}
