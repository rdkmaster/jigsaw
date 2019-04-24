import {Component, TemplateRef, ViewChild} from '@angular/core';
import {LoadingService} from "jigsaw/service/loading.service";
import {JigsawBallLoading} from "jigsaw/component/loading/loading";
import {PopupInfo} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
               .fa-bars{
                     margin:100px
               }
               .jigsawFloatArea{
                   width:200px;
                   height:360px;
                   padding-top:30px;
                   background:orange;
                   text-align:center;
               }
    `]
})
export class FloatComplexDemo {
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

    public _$dropdownData = ['点击发送事件', '滚动页面', '发送事件到事件总线', '更新变量', '等待弹出关闭', '自定义代码块'];

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
    summary: string = '演示了如何改变jigsawFloat指令的触发器';
    description: string = '';
    tags: string[] = [
        'JigsawFloat.jigsawFloatOpenTrigger',
        'JigsawFloat.jigsawFloatCloseTrigger',
    ];
}
