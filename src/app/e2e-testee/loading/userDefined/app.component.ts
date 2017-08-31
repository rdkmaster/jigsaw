import {
    Component, ElementRef, ViewChild, Renderer2, ViewContainerRef
} from "@angular/core";
import {DefinedLoading} from "./definedLoading/definedLoading";
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupInfo} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class DefinedLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService) {
    }

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = LoadingService.show(this.block, DefinedLoading);
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
            this.globalLoading = LoadingService.show(DefinedLoading);
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
