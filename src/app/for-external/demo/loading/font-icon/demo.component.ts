import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService, PopupInfo, JigsawFontLoading} from "jigsaw/public_api";
import {LoadingTextService} from "../doc.service";

@Component({
    selector: 'loading-font-icon',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingFontIconDemoComponent implements AfterViewInit{
    @ViewChild('block') block: ElementRef;

    blockLoading: PopupInfo;
    globalLoading: PopupInfo;

    constructor(public loadingService: LoadingService, public doc: LoadingTextService) {
    }

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawFontLoading);
        }
    }

    ngAfterViewInit(): void {
        this.popupBlockLoading()
    }
}
