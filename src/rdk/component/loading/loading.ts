import {Component, ElementRef, EventEmitter, NgModule, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {IPopupable, PopupDisposer, PopupOptions, PopupService} from "rdk/service/popup.service";
import {CommonModule} from "@angular/common";

export class RdkLoadingBase implements IPopupable {
    public initData: any;
    public answer: EventEmitter<any>;
}

@Component({
    selector: 'rdk-loading',
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class RdkLoading extends RdkLoadingBase {

}

@Component({
    selector: 'rdk-ball-loading',
    templateUrl: 'loading-ball.html',
    styleUrls: ['loading-ball.scss']
})
export class RdkBallLoading extends RdkLoadingBase {

}

@NgModule({
    imports: [CommonModule],
    declarations: [RdkLoading, RdkBallLoading],
    exports: [RdkLoading, RdkBallLoading]
})
export class RdkLoadingModule {

}

