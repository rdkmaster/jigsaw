import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoadingService, PopupInfo, JigsawBubbleLoading } from "jigsaw/public_api";
import { AsyncDescription } from "../../../template/demo-template/demo-template";

@Component({
    selector: 'loading-bubble',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingBubbleDemoComponent extends AsyncDescription {
    public demoPath = "demo/loading/bubble";

    @ViewChild('block') block: ElementRef;

    public blockLoading: PopupInfo;

    public popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawBubbleLoading);
        }
    }

    constructor(public loadingService: LoadingService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
