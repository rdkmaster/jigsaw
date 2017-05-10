import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {LoadingService} from "../../../../../service/loading.service"
import {PopupDisposer} from "../../../../../service/popup.service";
import {DefinedLoading} from "./definedLoading/definedLoading";

@Component({
    templateUrl: 'userDefined.html',
    styleUrls: ['userDefined.scss']
})
export class DefinedLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService) {
    }

    disposeBlockLoading: PopupDisposer;
    disposeGlobalLoading: PopupDisposer;

    popupBlockLoading() {
        if (!this.disposeBlockLoading) {
            this.disposeBlockLoading = this.loadingService.show(this.block, DefinedLoading);
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
            this.disposeGlobalLoading = this.loadingService.show(DefinedLoading);
            setTimeout(() => {
                this.disposeGlobalLoading();
                this.disposeGlobalLoading = null;
            }, 3000)
        }
    }
}
