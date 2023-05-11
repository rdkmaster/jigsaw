import { Component } from "@angular/core";
import {
    JigsawMenu, MenuTheme, SimpleNode, SimpleTreeData,
    PopupService
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class MenuOptionsDemo {

    public data: SimpleTreeData;
    public theme: string[] = ['dark'];
    public dataType: string[] = ['normal'];
    public width: number = 150;
    public height: number = 0;
    public options = {};
    public units = ['px', '%'];
    public unit = 'px';

    constructor(private ps: PopupService) {
        this.data = new SimpleTreeData();
        this.changeData('normal');
    }

    menuSelect(node: SimpleNode) {
        console.log("Dropdown menu selected, node =", node);
    }

    contextMenu(event: MouseEvent) {
        JigsawMenu.show(event, {
            data: this.data,
            width: this.width,
            height: this.height,
            theme: this.theme[0] as MenuTheme,
        }, node => {
            console.log("Context menu selected, node =", node);
        });
    }

    public changeData(type) {
        if (type == 'normal') {
            this.data.fromXML(`
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
                    <!-- 无label属性的node节点表示这是一个分隔符 -->
                    <node></node>
                    <node label="Delete"></node>
                </node>
                <node label="Run" >
                    <node label="Run" icon="iconfont iconfont-e314" subTitle="Shift+F10"></node>
                    <node label="Debug" icon="iconfont iconfont-e5e0" subTitle="Shift+F9"></node>
                </node>
                <!-- 无label属性的node节点表示这是一个分隔符 -->
                <node></node>
                <node label="Exit"></node>
            </node>
        `);
        } else if (type == 'long') {
            this.data.fromXML(`
        <node>
            <node label="业务域">
                <node label="domain_auto_ods_level1">
                    <node label="domain_auto_ods_level2" icon="iconfont iconfont-e314" subIcon="iconfont iconfont-e314" subTitle="Shift+F10">
                        <node label="domain_auto_ods_level3" id="809846288656924672"></node>
                    </node>
                </node>
                <node label="domain_auto_all_level1">
                    <node label="domain_auto_all_level2">
                        <node label="domain_auto_all_level3" id="809846223259336704"></node>
                    </node>
                </node>
                <node label="test_111" id="809847919838527488"></node>
                <node label="rfat">
                    <node label="crfat">
                        <node label="ccrfat" id="809837662907170816"></node>
                    </node>
                </node>
                <node label="test_222" id="809847969868185600"></node>
            </node>
        </node>
        `);
        }
    }

    public autoTargetWidth: boolean = true;

    public autoTargetWidthChange() {
        this.options = this.autoTargetWidth ? {} : { size: { minWidth: null } }
    }

    public unitChange($event){
        this.unit = $event;
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-cascading-menu指令实现多级菜单，展示了各个可用配置项及其效果，事件回调效果请查看控制台';
    description: string = '';
}
