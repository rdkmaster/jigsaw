import {
    Component, ElementRef, ViewChild, Renderer2, ViewContainerRef
} from '@angular/core';
import {LoadingService} from "jigsaw/service/loading.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class LoadingFullDemoComponent {
    constructor(public loadingService: LoadingService,
                public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    @ViewChild('block')
    private _block: ElementRef;

    public isLoading: boolean = false;
    public label:string = 'submit';

    popupBlockLoading() {
        const blockLoading = this.loadingService.show(this._block);
        setTimeout(() => {
            blockLoading.dispose();
        }, 3000)
    }

    startToLoad() {
        this.isLoading = !this.isLoading;
        this.label = this.isLoading ? 'load done' : 'submit';
    }

    popupGlobalLoading() {
        const globalLoading = this.loadingService.show();
        setTimeout(() => {
            globalLoading.dispose();
        }, 3000)
    }
}
