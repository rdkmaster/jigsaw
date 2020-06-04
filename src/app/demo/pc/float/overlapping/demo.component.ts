import {Component, TemplateRef, ViewChild} from '@angular/core';
import {
    SimpleTreeData, PopupInfo, JigsawBallLoading, LoadingService,
    JigsawMenu
} from "jigsaw/public_api";

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

        .context-menu {
            width: 80px;
            height: 149px;
            background-color: #ddd;
            position: absolute;
            right: 16px;
            top: 16px;
        }

        .context-menu p {
            text-align: center;
            margin-top: 56px;
        }
    `]
})
export class FloatOverlappingDemo {
    globalLoading: PopupInfo;
    @ViewChild('jigsawFloatArea2', {static: false}) block: TemplateRef<any>;
    openTrigger = "mouseenter";
    closeTrigger = "mouseleave";
    public open: boolean = false;
    public menuData: SimpleTreeData;

    public openFloat() {
        this.open = true;
    }

    public closeFloat() {
        this.open = false;
    }

    constructor(private loadingService: LoadingService) {
        this.menuData = new SimpleTreeData();
        this.menuData.fromXML(`
            <node>
                <node label="File">
                    <node label="New">
                        <node label="Project"></node>
                        <node label="File"></node>
                        <node label="Directory"></node>
                    </node>
                    <node label="Open"></node>
                    <node label="Save As"></node>
                </node>
                <node label="Edit">
                    <node label="Cut"></node>
                    <node label="Copy">
                        <node label="Copy Reference"></node>
                        <node label="Copy Path"></node>
                    </node>
                    <node label="Paste" disabled="true"></node>
                    <!-- 无labe属性的node节点表示这是一个分隔符 -->
                    <node></node>
                    <node label="Delete"></node>
                </node>
                <node label="Run" >
                    <node label="Run" icon="fa fa-play" subTitle="Shift+F10"></node>
                    <node label="Debug" icon="fa fa-bug" subTitle="Shift+F9"></node>
                </node>
                <!-- 无labe属性的node节点表示这是一个分隔符 -->
                <node></node>
                <node label="Exit"></node>
            </node>
        `);
    }

    public showContext(event) {
        JigsawMenu.show(event, {data: this.menuData, width: 150});
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
