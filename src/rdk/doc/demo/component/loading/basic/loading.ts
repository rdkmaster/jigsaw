import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PopupDisposer} from "../../../../../service/popup.service";
import {LoadingService} from "rdk/service/loading.service";

@Component({
    templateUrl: 'loading.html',
    styleUrls: ['loading.scss']
})
export class LoadingDemoComponent implements OnInit{
    @ViewChild('block') block: ElementRef;

    constructor(public loadingService: LoadingService, public renderer: Renderer2) {
    }

    disposeBlockLoading: PopupDisposer;
    disposeGlobalLoading: PopupDisposer;

    popupBlockLoading() {
        if (!this.disposeBlockLoading) {
            this.disposeBlockLoading = this.loadingService.show(this.block);
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
            this.disposeGlobalLoading = this.loadingService.show();
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
