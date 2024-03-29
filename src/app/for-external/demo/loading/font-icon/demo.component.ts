import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoadingService, PopupInfo, JigsawFontLoading } from "jigsaw/public_api";
import { AsyncDescription } from "../../../template/demo-template/demo-template";

@Component({
    selector: 'loading-font-icon',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingFontIconDemoComponent extends AsyncDescription {
    public demoPath = "demo/loading/font-icon";

    @ViewChild('block') block: ElementRef;

    public blockLoading: PopupInfo;
    public globalLoading: PopupInfo;

    public popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawFontLoading);
        }
    }

    constructor(public loadingService: LoadingService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
