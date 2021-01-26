import {Component} from "@angular/core";
import {SimpleTreeData, JigsawMenu} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: [`./demo.component.css`]
})
export class MenuUsageDemo {
    public menuData: any[] = this.initMenuData();
    public topBarData: any[] = this.initTopBarData();
    public dropdownData: SimpleTreeData = this.initDropdownData();
    public navData: SimpleTreeData = this.initNavData();

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
                <node label="新建" icon="iconfont iconfont-e4f0-o">
                    <node label="工程..." subTitle="Ctrl+Shift+P"></node>
                    <node></node>
                    <node label="HTML文件" icon="fa fa-html5" subTitle="Ctrl+Shift+H"></node>
                    <node label="CSS文件" icon="fa fa-css3" subTitle="Ctrl+Shift+C"></node>
                    <node label="JS文件" icon="fa fa-code" subTitle="Ctrl+Shift+J"></node>
                    <node></node>
                    <node label="退出"></node>
                </node>
                <node label="打开..." icon="iconfont iconfont-e1ee-open-o"></node>
                <node label="打开" subTitle="最近文件">
                    <node label="project1" icon="fa fa-television"></node>
                    <node label="project2" icon="fa fa-television"></node>
                    <node label="project3" icon="fa fa-television"></node>
                    <node></node>
                    <node label="file1.js" icon="fa fa-code"></node>
                    <node label="file2.html" icon="fa fa-html5"></node>
                    <node label="file3.css" icon="fa fa-css3"></node>
                </node>
                <node label="保存" icon="fa fa-floppy-o" subTitle="Ctrl+S"></node>
                <node label="另存为..." subTitle="Ctrl+Shift+S"></node>
                <node></node>
                <node label="退出"></node>
            </node>
        `);
        data[1].data.fromXML(`
            <node>
                <node label="撤回" icno="fa fa-undo"></node>
                <node label="重做" icno="fa fa-repeat"></node>
                <node></node>
                <node label="剪切" icon="fa fa-scissors" subTitle="Ctrl+X"></node>
                <node label="拷贝" icon="iconfont iconfont-e4f0s-o" subTitle="Ctrl+C"></node>
                <node label="粘贴" subTitle="Ctrl+V"></node>
                <node></node>
                <node label="搜索" icon="fa fa-binoculars"></node>
                <node label="替换"></node>
            </node>
        `);
        data[2].data.fromXML(`
            <node>
                <node label="窗口">
                    <node label="工程" icon="iconfont iconfont-e13f-square-o"></node>
                    <node label="最爱"></node>
                    <node label="Debug" icon="iconfont iconfont-e13f-square-o"></node>
                </node>
                <node></node>
                <node label="工具栏" icon="iconfont iconfont-e13f-square-o"></node>
                <node label="状态栏"></node>
            </node>
        `);
        data[3].data.fromXML(`
            <node>
                <node label="类..."></node>
                <node label="文件..."></node>
                <node label="符号..."></node>
                <node></node>
                <node label="后退" icon="fa fa-backward"></node>
                <node label="前进" icon="fa fa-forward"></node>
                <node></node>
                <node label="书签" icon="fa fa-bookmark-o"></node>
            </node>
        `);

        return data;
    }

    private initTopBarData(): any[] {
        const data = [
            {
                "label": "首页", data: new SimpleTreeData()
            },
            {
                "label": "分类", data: new SimpleTreeData()
            },
            {
                "label": "百科", data: new SimpleTreeData()
            },
            {
                "label": "合作", data: new SimpleTreeData()
            }
        ];
        data[0].data.fromXML(`
            <node>
                <node label="返回首页"></node>
                <node label="关于"></node>
            </node>
        `);
        data[1].data.fromXML(`
            <node>
                <node label="人文与自然">
                    <node label="人文科学"></node>
                    <node label="社会科学"></node>
                    <node label="自然科学"></node>
                </node>
                <node label="体育与艺术">
                    <node label="竞技体育"></node>
                    <node label="大众健身"></node>
                    <node></node>
                    <node label="听觉艺术"></node>
                    <node label="视觉艺术"></node>
                    <node label="视听艺术"></node>
                </node>
                <node></node>
                <node label="社会与人物"></node>
                <node label="经济与文化"></node>
                <node label="历史与地理"></node>
            </node>
        `);
        data[2].data.fromXML(`
            <node>
                <node label="历史上的今天"></node>
                <node label="数字博物馆"></node>
                <node label="城市百科">
                    <node>北京</node>
                    <node>南京</node>
                    <node>上海</node>
                    <node>深圳</node>
                    <node>杭州</node>
                </node>
                <node label="科学百科">
                    <node label="物理百科"></node>
                    <node label="化学百科"></node>
                    <node label="数学百科"></node>
                    <node></node>
                    <node label="科普视频"></node>
                    <node label="科普文章"></node>
                    <node label="科普人物"></node>
                </node>
            </node>
        `);
        data[3].data.fromXML(`
            <node>
                <node>合作模式</node>
                <node>常见问题</node>
                <node>联系方式</node>
            </node>
        `);
        return data;
    }

    private initDropdownData(): SimpleTreeData {
        const data = new SimpleTreeData();
        data.fromXML(`
            <node>
                <node label="新建" icon="iconfont iconfont-e4f0-o">
                    <node label="工程..." subTitle="Ctrl+Shift+P"></node>
                    <node></node>
                    <node label="HTML文件" icon="fa fa-html5" subTitle="Ctrl+Shift+H"></node>
                    <node label="CSS文件" icon="fa fa-css3" subTitle="Ctrl+Shift+C"></node>
                    <node label="JS文件" icon="fa fa-code" subTitle="Ctrl+Shift+J"></node>
                    <node></node>
                    <node label="退出"></node>
                </node>
                <node label="打开..." icon="iconfont iconfont-e1ee-open-o"></node>
                <node label="打开" subTitle="最近文件">
                    <node label="project1" icon="fa fa-television"></node>
                    <node label="project2" icon="fa fa-television"></node>
                    <node label="project3" icon="fa fa-television"></node>
                    <node></node>
                    <node label="file1.js" icon="fa fa-code"></node>
                    <node label="file2.html" icon="fa fa-html5"></node>
                    <node label="file3.css" icon="fa fa-css3"></node>
                </node>
                <node label="保存" icon="fa fa-floppy-o" subTitle="Ctrl+S"></node>
                <node label="另存为..." subTitle="Ctrl+Shift+S"></node>
                <node></node>
                <node label="退出"></node>
            </node>
        `);
        return data;
    }

    private initNavData(): SimpleTreeData {
        const data = new SimpleTreeData();
        data.fromXML(`
            <node>
                <node label="当前告警" icon="fa fa-bell-o" isActive="true" selected="true">
                    <node label="告警监控" selected="true"></node>
                    <node label="告警统计"></node>
                    <node label="定时导出"></node>
                    <node label="告警同步"></node>
                    <node label="告警提示"></node>
                </node>
                <node label="历史告警" icon="fa fa-bell">
                    <node label="告警查询"></node>
                </node>
                <node label="通知" icon="fa fa-bullhorn">
                    <node label="通知监控"></node>
                </node>
                <node label="告警设置" icon="fa fa-cog"></node>
            </node>
        `);
        return data;
    }

    menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    showContext(event: any) {
        JigsawMenu.show(event, {data: this.dropdownData, width: 250}, this.menuSelect.bind(this));
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo主要用于展示菜单的各种典型用法，起到抛砖引玉的目的';
    description: string = '';
}
