import {Component} from '@angular/core';
import {ButtonTextService} from "../text.service";

@Component({
    selector: 'loading-button',
    templateUrl: './demo.component.html',
    styleUrls: ['../public.css']
})
export class ButtonLoadingComponent {
    public disabled: boolean = false;
    public label: string = 'click to load';
    public isLoading = false;
    public selectedLabel = {label: "中", size: "default"};
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
