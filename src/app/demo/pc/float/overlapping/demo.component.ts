import {Component, TemplateRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/common/service/loading.service";
import {JigsawBallLoading} from "jigsaw/pc-components/loading/loading";
import {PopupInfo} from "jigsaw/common/service/popup.service";

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
            padding-left: 32px;
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
    summary: string = '演示了jigsawFloat指令在极端复杂的重叠场景下的表现。' +
        '提示：应该尽量避免设计出3层甚至更多层级下拉的功能来。';
    description: string = '';
}
