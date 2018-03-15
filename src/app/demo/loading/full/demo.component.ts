import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/service/loading.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class LoadingFullDemoComponent {
    @ViewChild('block')
    private _block: ElementRef;

    public isLoading: boolean = false;
    public label:string = 'submit';

    constructor(public loadingService: LoadingService) {
    }

    popupBlockLoading() {
        const blockLoading = this.loadingService.show(this._block);
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
        const globalLoading = this.loadingService.show();
        setTimeout(() => {
            globalLoading.dispose();
        }, 3000)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'LoadingService.show',
        'JigsawLoading'
    ];
}
