import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoadingService, PopupInfo, JigsawBallLoading} from "jigsaw/public_api";
import {LoadingTextService} from "../doc.service";

@Component({
    selector: 'loading-ball',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingBallDemoComponent implements AfterViewInit {
    @ViewChild('block') block: ElementRef;

    blockLoading: PopupInfo;

    constructor(public loadingService: LoadingService,  public doc: LoadingTextService) {
    }

    popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, JigsawBallLoading);
        }
    }
    ngAfterViewInit(): void {
        this.popupBlockLoading()
    }

}
