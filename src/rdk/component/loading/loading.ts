import {Component, ElementRef, OnInit, Renderer2} from "@angular/core";
import {IPopupable, PopupDisposer, PopupOptions, PopupService} from "rdk/service/popup.service";

@Component({
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class RdkLoading implements IPopupable, OnInit {
    public disposer: PopupDisposer;
    public initData: any;
    public options: PopupOptions;
    protected state: string = 'void';

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


