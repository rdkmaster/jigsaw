import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArrayCollection, LoadingService} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'loading-circle',
    templateUrl: './demo.component.html'
})
export class LoadingCircleDemoComponent extends AsyncDescription {
    public demoPath = "demo/loading/circle";

    @ViewChild('block') block: ElementRef;

    public percent: number = 0;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" },
    ]);
    public selectedSize = { label: "中", size: "medium" };

    constructor(public loadingService: LoadingService, http: HttpClient, el: ElementRef) {
        super(http, el);
        setInterval(() => {
            this.percent = (this.percent + Math.random() * 10) % 100;
        }, 500);
    }
}
