import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/service/loading.service";
import {PopupInfo} from "jigsaw/service/popup.service";
import {JigsawFontLoading} from "jigsaw/component/loading/loading";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class FontLoadingDemoComponent {
    @ViewChild('block') block: ElementRef;

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    constructor(public loadingService: LoadingService) {
    }

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawFontLoading);
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
            this.globalLoading = this.loadingService.show(JigsawFontLoading);
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

    public isLoading: boolean = false;
    public label: string = 'submit';

    startToLoad() {
        this.isLoading = true;
        this.label = 'loading...';
        setTimeout(() => {
            this.isLoading = false;
            this.label = 'submit';
        }, 3000)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
