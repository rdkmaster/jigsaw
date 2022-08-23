import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { LoadingService, PopupInfo } from "jigsaw/public_api";
import { DefinedLoading } from "./defined-loading/defined-loading";
import { LoadingTextService } from "../doc.service";

@Component({
    selector: 'loading-customize',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingCustomizeDemoComponent implements AfterViewInit {
    @ViewChild('block') block: ElementRef;

    public blockLoading: PopupInfo;

    public popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, DefinedLoading);
        }
    }

    ngAfterViewInit(): void {
        this.popupBlockLoading()
    }

    constructor(public loadingService: LoadingService, public doc: LoadingTextService) {
    }
}
