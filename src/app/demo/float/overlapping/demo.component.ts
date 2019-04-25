import {Component, TemplateRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/service/loading.service";
import {JigsawBallLoading} from "jigsaw/component/loading/loading";
import {PopupInfo} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .fa-bars {
            margin: 100px
        }

        .jigsawFloatArea {
            width: 360px;
            height: 180px;
            padding-top: 30px;
            background: #e4d7c0;
            text-align: center;
        }
    `]
})
export class FloatOverlappingDemo {
    globalLoading: PopupInfo;
    @ViewChild('jigsawFloatArea2') block: TemplateRef<any>;
    openTrigger = "mouseenter";
    closeTrigger = "mouseleave";
    public open: boolean = false;

    public openFloat() {
        this.open = true;
    }

    public closeFloat() {
        this.open = false;
    }

    constructor(private loadingService: LoadingService) {
    }

    popupGlobalLoading(event) {
        if (!this.globalLoading && event) {
            this.globalLoading = this.loadingService.show(JigsawBallLoading);
            setTimeout(() => {
                this.closeGlobalLoading();
            }, 3000)
        }
    }

    closeGlobalLoading() {
        if (this.globalLoading) {
            this.globalLoading.dispose();
            this.globalLoading = null;
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了jigsawFloat指令在复杂的重叠场景下的表现';
    description: string = '';
}
