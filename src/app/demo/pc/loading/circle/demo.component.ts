import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService, PopupInfo, JigsawCircleLoading } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class CircleLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    constructor(public loadingService: LoadingService) {
    }

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawCircleLoading);
            this.blockLoading.instance.size = "medium";
            this.blockLoading.instance.label = "加载中...";
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
            this.globalLoading = this.loadingService.show(JigsawCircleLoading);
            this.globalLoading.instance.size = "large";
            this.globalLoading.instance.label = "加载中...";
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
