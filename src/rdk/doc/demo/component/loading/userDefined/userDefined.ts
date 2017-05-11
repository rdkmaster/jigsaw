import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {LoadingService} from "../../../../../service/loading.service"
import {PopupDisposer} from "../../../../../service/popup.service";
import {DefinedLoading} from "./definedLoading/definedLoading";

@Component({
    templateUrl: 'userDefined.html',
    styleUrls: ['userDefined.scss']
})
export class DefinedLoadingDemoComponent implements OnInit {
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService, public renderer: Renderer2) {
    }

    disposeBlockLoading: PopupDisposer;
    disposeGlobalLoading: PopupDisposer;

    popupBlockLoading() {
        if (!this.disposeBlockLoading) {
            this.disposeBlockLoading = this.loadingService.show(this.block, DefinedLoading);
        }
    }

    closeBlockLoading() {
        if (this.disposeBlockLoading) {
            this.disposeBlockLoading();
            this.disposeBlockLoading = null;
        }
    }

    popupGlobalLoading() {
        if (!this.disposeGlobalLoading) {
            this.disposeGlobalLoading = this.loadingService.show(DefinedLoading);
            setTimeout(() => {
                this.closeGlobalLoading();
            }, 3000)
        }
    }

    closeGlobalLoading(){
        if(this.disposeGlobalLoading){
            this.disposeGlobalLoading();
            this.disposeGlobalLoading = null;
        }
    }

    ngOnInit(){
        //window.history.back的监听
        this.renderer.listen('window', 'popstate', () => {
            this.closeBlockLoading();
            this.closeGlobalLoading();
        })
    }
}
