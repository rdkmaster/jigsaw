import {
    Component, ElementRef, ViewChild, Renderer2, ViewContainerRef
} from "@angular/core";
import {SoftBankLoading} from "./softBankLoading/softBankLoading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupInfo} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class SoftBankLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService,
                public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, SoftBankLoading);
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
            this.globalLoading = this.loadingService.show(SoftBankLoading);
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

    isLoading: boolean = false;
    label:string = 'submit';
    startToLoad() {
        this.isLoading = true;
        this.label = 'loading...';
        setTimeout(() => {
            this.isLoading = false;
            this.label = 'submit';
        }, 3000)
    }
}
