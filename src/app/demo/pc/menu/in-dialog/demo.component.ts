import {Component, TemplateRef} from "@angular/core";
import {SimpleTreeData} from "jigsaw/common/core/data/tree-data";
import { PopupService, PopupInfo, JigsawMenu } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .content {
            position: absolute;
            top: 38px;
            left: 230px;
        }

        .context-menu {
            width: 160px;
            height: 160px;
            background-color: #ddd;
        }

        .context-menu p {
            text-align: center;
            padding-top: 68px;
        }
    `]
})
export class MenuInDialogDemo {
    public data: SimpleTreeData;
    public autoDispose: boolean = false;

    constructor(private ps: PopupService) {
        this.data = new SimpleTreeData();
        this.data.fromXML(`
            <node>
                <node label="功能1">
                    <node label="功能11">
                        <node label="功能11"></node>
                        <node label="功能12"></node>
                        <node label="功能13"></node>
                    </node>
                    <node label="功能12">
                        <node label="功能21"></node>
                        <node label="功能22"></node>
                        <node label="功能23"></node>
                    </node>
                </node>
                <node label="功能2">
                    <node label="功能21"></node>
                    <node label="功能22"></node>
                    <node label="功能23"></node>
                    <node label="功能24"></node>
                    <node label="功能25"></node>
                    <node label="功能26"></node>
                </node>
                <node label="功能3"></node>
                <node label="功能4"></node>
            </node>
        `);
    }

    menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    showContext(event: any) {
        JigsawMenu.show(event, {data: this.data, width: 150}, this.menuSelect.bind(this));
    }

    private popupInfo: PopupInfo;

    popup(dialog: TemplateRef<any>) {
        this.popupInfo = this.ps.popup(dialog);
        if (this.autoDispose) {
            setTimeout(() => {
                this.dispose();
            }, 3000);
        }
    }

    dispose() {
        this.popupInfo.dispose();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '可以在文档里里嵌入一个菜单组件，再配合其他组件（如Collapse）就可以形成一个一级导航栏的功能了';
    description: string = '';
}
