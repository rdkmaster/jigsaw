import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingService, PopupInfo, JigsawCircleLoading, ArrayCollection } from "jigsaw/public_api";
import { LoadingTextService } from "../doc.service";

@Component({
    selector: 'loading-circle',
    templateUrl: './demo.component.html'
})
export class LoadingCircleDemoComponent {
    @ViewChild('block') block: ElementRef;

    percent: number = 0;
    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    constructor(public loadingService: LoadingService, public doc: LoadingTextService) {
        setInterval(() => {
            this.percent = (this.percent + Math.random() * 10) % 100;
        }, 500);
    }
    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" },
    ]);
    public selectedSize = { label: "中", size: "medium" };
    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block);
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
        if (!!this.globalLoading) {
            return;
        }

        this.globalLoading = this.loadingService.show();
        const loading: JigsawCircleLoading = <JigsawCircleLoading>this.globalLoading.instance;
        loading.size = "large";
        loading.label = "加载中...";
        loading.percent = 0;

        const interval = setInterval(() => {
            loading.percent += 20;
            if (loading.percent >= 100) {
                this.closeGlobalLoading();
                clearInterval(interval);
            }
        }, 1000);
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
