import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, JigsawBallLoading, LoadingService, PopupInfo} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'loading-ball',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingBallDemoComponent extends AsyncDescription implements AfterViewInit {
    public demoPath = "demo/loading/ball";

    @ViewChild('block') block: ElementRef;

    public blockLoading: PopupInfo;

    public popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawBallLoading);
        }
    }
    ngAfterViewInit(): void {
        this.popupBlockLoading()
    }

    constructor(public loadingService: LoadingService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
