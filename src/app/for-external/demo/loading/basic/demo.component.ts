import { Component, ElementRef, ViewChild } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, LoadingService} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'loading-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/loading/basic";

    @ViewChild('block')
    private _block: ElementRef;

    public isLoading: boolean = false;
    public label: string = '提交';

    public popupBlockLoading() {
        const blockLoading = this.loadingService.show(this._block);
        setTimeout(() => {
            blockLoading.dispose();
        }, 3000)
    }

    public startToLoad() {
        this.isLoading = true;
        this.label = 'Loading...';
        setTimeout(() => {
            this.isLoading = false;
            this.label = 'Submit';
        }, 3000)
    }

    constructor(public loadingService: LoadingService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
