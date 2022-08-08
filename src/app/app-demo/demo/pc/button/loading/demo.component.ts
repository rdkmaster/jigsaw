import {Component} from '@angular/core';
import {ButtonTextService} from "../doc.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: 'button-loading',
    templateUrl: './demo.component.html'
})
export class ButtonLoadingComponent {
    public disabled: boolean = false;
    public label: string = 'click to load';
    public isLoading = false;
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"},
        {label: "默认", size: "default"}
    ]);
    public selectedLabel = {label: "默认", size: "default"};

    constructor(public text: ButtonTextService) {}
    onLoading() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'loading...' : 'click to load';
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
            this.isLoading = !this.isLoading;
            this.label = this.isLoading ? 'loading...' : 'click to load';
        }, 3000);
    }

}
