import {Component, ElementRef, NgModule, OnInit, Renderer2} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IPopupable, PopupDisposer, PopupOptions, PopupService} from "rdk/service/popup.service";

@Component({
    selector: 'rdk-loading',
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class RdkLoading implements IPopupable, OnInit {
    public disposer: PopupDisposer;
    public initData: any;
    public options: PopupOptions;
    private state: string = 'void';

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.options) {
                PopupService.setPopup(this.options, this._elementRef.nativeElement, this._renderer);
            }
            this.state = 'in';
        }, 0)
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkLoading],
    exports: [RdkLoading]
})
export class RdkLoadingModule {
}
