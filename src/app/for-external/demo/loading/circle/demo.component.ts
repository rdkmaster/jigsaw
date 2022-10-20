import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'loading-circle',
    templateUrl: './demo.component.html'
})
export class LoadingCircleDemoComponent extends AsyncDescription {
    public demoPath = "demo/loading/circle";
    public selectedSize = { size: "medium" };

    @ViewChild('block')
    block: ElementRef;

    public percent: number = 0;

    constructor(public loadingService: LoadingService, http: HttpClient, el: ElementRef) {
        super(http, el);
        setInterval(() => {
            this.percent = (this.percent + Math.random() * 10) % 100;
        }, 500);
    }
}
