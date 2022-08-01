import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/public_api";
import {LoadingTextService} from "../doc.service";

@Component({
    selector: 'loading-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingBasicDemoComponent {
    @ViewChild('block')
    private _block: ElementRef;

    public isLoading: boolean = false;
    public label:string = '提交';

    constructor(public loadingService: LoadingService, public text: LoadingTextService) {
    }

    popupBlockLoading() {
        const blockLoading = this.loadingService.show(this._block);
        setTimeout(() => {
            blockLoading.dispose();
        }, 3000)
    }

    startToLoad() {
        this.isLoading = true;
        this.label = 'Loading...';
        setTimeout(() => {
            this.isLoading = false;
            this.label = 'Submit';
        }, 3000)
    }

    // popupGlobalLoading() {
    //     const globalLoading = this.loadingService.show();
    //     setTimeout(() => {
    //         globalLoading.dispose();
    //     }, 3000)
    // }
}
