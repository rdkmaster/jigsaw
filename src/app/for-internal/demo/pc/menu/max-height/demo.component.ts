import { Component } from "@angular/core";
import { SimpleTreeData, JigsawMenu } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: [`./demo.component.css`]
})
export class MenuMaxHeightDemo {
    public menuData: any[] = this.initMenuData();

    private initMenuData(): any[] {
        const data = [
            {
                "label": "文件", data: new SimpleTreeData()
            },
            {
                "label": "编辑", data: new SimpleTreeData()
            },
            {
                "label": "视图", data: new SimpleTreeData()
            },
            {
                "label": "导航", data: new SimpleTreeData()
            }
        ];
        data[0].data.fromXML(`
            <node>
                <node label="新建" iconUnicode="e9dd">
                    <node label="工程..." subTitle="Ctrl+Shift+P"></node>
                    <node></node>
                    <node label="HTML文件" iconUnicode="e5a2" subTitle="Ctrl+Shift+H"></node>
                    <node label="CSS文件" iconUnicode="e5a1" subTitle="Ctrl+Shift+C"></node>
                    <node label="JS文件" iconUnicode="e6a6" subTitle="Ctrl+Shift+J"></node>
                    <node></node>
                    <node label="退出"></node>
                </node>
                <node label="打开..." icon="iconfont iconfont-e4e4"></node>
                <node label="打开" subTitle="最近文件">
                    <node label="project1" icon="iconfont iconfont-e40d"></node>
                    <node label="project2" icon="iconfont iconfont-e40d"></node>
                    <node label="project3" icon="iconfont iconfont-e40d"></node>
                    <node></node>
                    <node label="file1.js" icon="iconfont iconfont-e6a6"></node>
                    <node label="file2.html" icon="iconfont iconfont-e5a2"></node>
                    <node label="file3.css" icon="iconfont iconfont-e5a1"></node>
                </node>
                <node label="保存" icon="iconfont iconfont-ea2a" subTitle="Ctrl+S"></node>
                <node label="另存为..." subTitle="Ctrl+Shift+S"></node>
                <node></node>
                <node label="退出"></node>
            </node>
        `);
        data[1].data.fromXML(`
            <node>
                <node label="撤回" icno="iconfont iconfont-e40f"></node>
                <node label="重做" icno="iconfont iconfont-e341"></node>
                <node></node>
                <node label="剪切" icon="iconfont iconfont-e161" subTitle="Ctrl+X"></node>
                <node label="拷贝" icon="iconfont iconfont-e9c1" subTitle="Ctrl+C"></node>
                <node label="粘贴" subTitle="Ctrl+V"></node>
                <node></node>
                <node label="搜索" icon="iconfont iconfont-e91a"></node>
                <node label="替换"></node>
            </node>
        `);
        data[2].data.fromXML(`
            <node>
                <node label="窗口">
                    <node label="工程" icon="iconfont iconfont-e140"></node>
                    <node label="最爱"></node>
                    <node label="Debug" icon="iconfont iconfont-e140"></node>
                </node>
                <node></node>
                <node label="工具栏" icon="iconfont iconfont-e140"></node>
                <node label="状态栏"></node>
            </node>
        `);
        data[3].data.fromXML(`
            <node>
                <node label="类..."></node>
                <node label="文件..."></node>
                <node label="符号..."></node>
                <node></node>
                <node label="后退" icon="iconfont iconfont-e9c5"></node>
                <node label="前进" icon="iconfont iconfont-e9c6"></node>
                <node></node>
                <node label="书签" icon="iconfont iconfont-e101"></node>
            </node>
        `);

        return data;
    }

    public menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo主要用于展示菜单的各种典型用法，起到抛砖引玉的目的';
    description: string = '';
}
