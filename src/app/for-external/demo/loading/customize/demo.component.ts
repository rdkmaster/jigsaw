import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { LoadingService, PopupInfo } from "jigsaw/public_api";
import { DefinedLoading } from "./defined-loading/defined-loading";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'loading-customize',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingCustomizeDemoComponent extends AsyncDescription implements AfterViewInit {
    public demoPath = "demo/loading/customize";

    @ViewChild('block')
    block: ElementRef;

    public blockLoading: PopupInfo;

    public popupBlockLoading() {
        if (!this.blockLoading) {
            this.blockLoading = this.loadingService.show(this.block, DefinedLoading);
        }
    }

    ngAfterViewInit(): void {
        this.popupBlockLoading()
    }

    constructor(public loadingService: LoadingService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
