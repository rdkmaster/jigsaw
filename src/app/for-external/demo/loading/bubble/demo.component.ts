import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingService, PopupInfo, JigsawBubbleLoading } from "jigsaw/public_api";
import { LoadingTextService } from "../doc.service";

@Component({
    selector: 'loading-bubble',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingBubbleDemoComponent implements AfterViewInit {
    @ViewChild('block') block: ElementRef;

    public blockLoading: PopupInfo;

    public popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawBubbleLoading);
        }
    }

    public ngAfterViewInit(): void {
        this.popupBlockLoading()
    }

    constructor(public loadingService: LoadingService, public doc: LoadingTextService) {
    }
}
