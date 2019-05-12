import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/common/service/loading.service";
import {PopupInfo} from "jigsaw/common/service/popup.service";
import {JigsawBallLoading} from "jigsaw/common/components/loading/loading";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class BallLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    constructor(public loadingService: LoadingService) {
    }

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawBallLoading);
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
            this.globalLoading = this.loadingService.show(JigsawBallLoading);
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
    tags: string[] = [
        'LoadingService.show',
        'JigsawBallLoading'
    ];
}
