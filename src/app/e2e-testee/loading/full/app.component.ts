import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/service/loading.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class LoadingFullDemoComponent {
    @ViewChild('block')
    private _block: ElementRef;

    public isLoading: boolean = false;
    public label:string = 'submit';

    popupBlockLoading() {
        const blockLoading = LoadingService.show(this._block);
        setTimeout(() => {
            blockLoading.dispose();
        }, 3000)
    }

    startToLoad() {
        this.isLoading = true;
        this.label = 'loading...';
        setTimeout(() => {
            this.isLoading = false;
            this.label = 'submit';
        }, 3000)
    }

    popupGlobalLoading() {
        const globalLoading = LoadingService.show();
        setTimeout(() => {
            globalLoading.dispose();
        }, 3000)
    }
}
