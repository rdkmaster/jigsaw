import {Component} from "@angular/core";
import {
    JigsawMenu, MenuTheme, SimpleNode, SimpleTreeData,
    PopupService
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .menu {
            margin: 16px 0 8px 216px;
            border: 1px solid #999;
            padding: 2px 10px;
            border-radius: 3px;
            cursor: pointer;
            display: inline-block;
        }

        .context-menu {
            width: 500px;
            height: 100px;
            background-color: var(--bg-container);
        }

        .context-menu p {
            text-align: center;
            padding-top: 40px;
        }

        .message {
            margin-bottom: 8px;
        }
    `]
})
export class MenuOptionsDemo {

    public data: SimpleTreeData;
    public theme: string[] = ['dark'];
    public width: number = 150;
    public height: number = 0;

    constructor( private ps: PopupService) {
        this.data = new SimpleTreeData();
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-cascading-menu指令实现多级菜单，展示了各个可用配置项及其效果，事件回调效果请查看控制台';
    description: string = '';
}
