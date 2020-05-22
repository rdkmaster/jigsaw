import {Component, ViewChild, EventEmitter} from "@angular/core";
import {JigsawMenu, MenuTheme, SimpleNode, SimpleTreeData, PopupService} from 'jigsaw/public_api';


@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .menu {
            margin: 100px;
            border: 1px solid #999;
            padding: 2px 10px;
            border-radius: 3px;
            cursor: pointer;
        }

        p {
            margin-bottom: 8px;
        }
    `]
})
export class CascadingMenuDemo {

    public data: SimpleTreeData;
    public theme: string[] = ['dark'];
    public width: number = 150;
    public height: number = 0;
    public maxHeight: number = 250;

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

    menuSelect(node: SimpleNode) {
        console.log("Dropdown menu selected, node =", node);
    }

    openChange($event) {
        if ($event) {
            console.log(`menu is open!`);
        } else {
            console.log(`menu is closed!`);
        }
    }

    contextMenu(event: MouseEvent) {
        JigsawMenu.show(event, {
            data: this.data,
            width: this.width,
            height: this.height,
            maxHeight: this.maxHeight,
            theme: this.theme[0] as MenuTheme,
        }, node => {
            console.log("Context menu selected, node =", node);
        });
    }

    @ViewChild('tpDialog1', {static: false})
    dialog;

    info;
    openDialog() {
        this.info = this.ps.popup(this.dialog);
    }

    closeDialog() {
        this.info.dispose();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-cascading-menu指令实现多级菜单，输入为一个simpleTree类型的菜单数据，实现多级菜单弹出和点击的功能';
    description: string = '';
}
