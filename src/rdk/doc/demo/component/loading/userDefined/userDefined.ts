import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService} from "../../../../../service/loading.service"
import {PopupRef} from "../../../../../service/popup.service";
import {DefinedLoading} from "./definedLoading/definedLoading";

@Component({
    templateUrl: 'userDefined.html',
    styleUrls: ['userDefined.scss']
})
export class DefinedLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService) {
    }

    blockLoading: PopupRef;
    globalLoading: PopupRef;

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, DefinedLoading);
        }
    }

    closeBlockLoading() {
        if (this.blockLoading) {
            this.blockLoading.destroy();
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
            this.globalLoading.destroy();
            this.globalLoading = null;
        }
    }
}
