import { Component } from '@angular/core';
import { ButtonTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: 'button-loading',
    templateUrl: './demo.component.html'
})
export class ButtonLoadingComponent {
    public disabled: boolean = false;
    public label: string = '点击加载';
    public isLoading = false;
    public onLoading() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? '加载中...' : '点击加载';
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
            this.isLoading = !this.isLoading;
            this.label = this.isLoading ? '加载中...' : '点击加载';
        }, 3000);
    }

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" },
        { label: "默认", size: "default" }
    ]);
    public selectedSize = { label: "默认", size: "default" };
    constructor(public doc: ButtonTextService) { }
}
