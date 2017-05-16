import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {IPopupable, PopupDisposer, PopupOptions, PopupService} from "rdk/service/popup.service";

export class RdkLoadingBase implements IPopupable, OnInit, OnDestroy {
    public initData: any;
    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    protected removeWindowListener: () => void;

    constructor(private _renderer: Renderer2) {
    }

    ngOnInit() {
        //window.history.back的监听
        this.removeWindowListener = this._renderer.listen('window', 'popstate', () => {
            this.close.emit();
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
    constructor(renderer: Renderer2) {
        super(renderer);
    }
}

@Component({
    selector: 'rdk-ball-loading',
    templateUrl: 'loading-ball.html',
    styleUrls: ['loading-ball.scss']
})
export class RdkBallLoading extends RdkLoadingBase {
    constructor(renderer: Renderer2) {
        super(renderer);
    }
}

