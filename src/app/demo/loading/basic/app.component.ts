import {
    Component, ElementRef, ViewChild, Renderer2, ViewContainerRef
} from '@angular/core';
import {LoadingService} from "jigsaw/service/loading.service";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class LoadingBasicDemoComponent {
    constructor(public loadingService: LoadingService,
                public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    @ViewChild('block1')
    private _block1: ElementRef;
    @ViewChild('block2')
    private _block2: ElementRef;

    popupBlockLoading(index: number) {
        const block = index == 1 ? this._block1 : this._block2;
        const blockLoading = this.loadingService.show(block);
        setTimeout(() => {
            blockLoading.dispose();
        }, 3000)
    }

    popupGlobalLoading() {
        const globalLoading = this.loadingService.show();
        setTimeout(() => {
            globalLoading.dispose();
        }, 3000)
    }
}
