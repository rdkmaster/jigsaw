import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from "@angular/core";
import {IPopupable, PopupDisposer, PopupOptions, PopupService} from "rdk/service/popup.service";

export class RdkLoadingBase implements IPopupable, OnInit, OnDestroy {
    public disposer: PopupDisposer;
    public initData: any;
    public options: PopupOptions;
    protected removeWindowListener: () => void;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.options) {
                PopupService.setPopup(this.options, this._elementRef.nativeElement, this._renderer);
            }
            //手动显示loading
            this._renderer.addClass(this._elementRef.nativeElement, 'in');
        }, 0);

        //window.history.back的监听
        this.removeWindowListener = this._renderer.listen('window', 'popstate', () => {
            this.disposer();
        })
    }

    ngOnDestroy() {
        this.removeWindowListener();
    }
}

@Component({
    selector: 'rdk-loading',
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class RdkLoading extends RdkLoadingBase {
    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }
}

@Component({
    selector: 'rdk-ball-loading',
    templateUrl: 'loading-ball.html',
    styleUrls: ['loading-ball.scss']
})
export class RdkBallLoading extends RdkLoadingBase {
    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }
}

