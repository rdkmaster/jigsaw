import {Component, ElementRef, ViewChild} from "@angular/core";
import {LoadingService, PopupInfo} from "jigsaw/public_api";
import {DefinedLoading} from "./definedLoading/definedLoading";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DefinedLoadingDemoComponent {
    @ViewChild('block', {static: false}) block: ElementRef;

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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
