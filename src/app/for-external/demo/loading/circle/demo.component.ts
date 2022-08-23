import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingService, PopupInfo, JigsawCircleLoading, ArrayCollection } from "jigsaw/public_api";
import { LoadingTextService } from "../doc.service";

@Component({
    selector: 'loading-circle',
    templateUrl: './demo.component.html'
})
export class LoadingCircleDemoComponent {
    @ViewChild('block') block: ElementRef;

    public percent: number = 0;

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" },
    ]);
    public selectedSize = { label: "中", size: "medium" };
    constructor(public loadingService: LoadingService, public doc: LoadingTextService) {
        setInterval(() => {
            this.percent = (this.percent + Math.random() * 10) % 100;
        }, 500);
    }
}
