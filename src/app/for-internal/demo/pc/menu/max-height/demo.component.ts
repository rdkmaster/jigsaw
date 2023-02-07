import { Component } from "@angular/core";
import { SimpleTreeData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class MenuMaxHeightDemo {
    public menuData: SimpleTreeData = this.initMenuData();

    private initMenuData(): SimpleTreeData {
        const data = new SimpleTreeData();
        const lotsMenuItems = this._createMenuItems();
        data.fromXML(`
            <node>
                <node label="新建" iconUnicode="e9dd">
                    ${lotsMenuItems}
                </node>
                <node label="打开" subTitle="最近文件">
                    ${lotsMenuItems}
                </node>
                <node label="保存" icon="iconfont iconfont-ea2a" subTitle="Ctrl+S">
                    ${lotsMenuItems}
                </node>
                <node></node>
                <node label="退出"></node>
            </node>
        `);
        return data;
    }

    private _createMenuItems(level: number = 0): string {
        let lotsMenuItems = '';
        for (let i = 0; i < 32; i++) {
            lotsMenuItems += `<node label="菜单${i}" iconUnicode="e5a2" subTitle="Ctrl+Shift+H"></node>`;
            if (i % 5 == 4) {
                if (level < 3) {
                    lotsMenuItems += `<node label="多级菜单">${this._createMenuItems(level+1)}</node>`;
                }
                lotsMenuItems += '<node></node>';
            }
        }
        return lotsMenuItems;
    }

    public menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo主要用于展示菜单项很多的时候，如何通过max-height属性来规避菜单界面太高的问题';
    description: string = '';
}
