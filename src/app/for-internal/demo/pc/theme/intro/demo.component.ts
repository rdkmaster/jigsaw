import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { JigsawTreeExt, SimpleTreeData } from "jigsaw/public_api";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html'
})
export class IntroComponent implements AfterViewInit {

    @ViewChild('ztree')
    public treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    constructor(http: HttpClient) {
        this.data = new SimpleTreeData();
        this.data.fromObject([
            {
                label: "导航栏",
                nodes: [
                    {
                        label: "比对",
                        nodes: [
                            { label: "文件比对" }, { label: "Gerrit比对" }
                        ]
                    },
                    { label: "插件", },
                    { label: "社区" },
                    { label: "下载" },
                    { label: "提需求/Bug" },
                    { label: "切换皮肤" },
                    { label: "用户信息" },
                ]
            },
            {
                label: "应用列表",
                nodes: [
                    {
                        label: "过滤信息",
                        nodes: [
                            { label: "时间" }, { label: "排列" }, { label: "搜索" }
                        ]
                    },
                    {
                        label: "分组",
                        nodes: [{ label: "分组标签" }, { label: "分组管理" }]
                    },
                    { label: "模板中心" },
                ]
            },
            {
                label: "应用操作",
                nodes: [
                    {
                        label: "新建",
                        nodes: [
                            { label: "模板" },
                            {
                                label: "空白",
                                nodes: [
                                    { label: "大屏" }, { label: "自定义" }
                                ]
                            },
                            { label: "导入" }
                        ]
                    },
                    { label: "设置封面图" },
                    {
                        label: "设置",
                        nodes: [
                            { label: "设置分组" },
                            { label: "设置封面" },
                            { label: "修改名称" },
                            { label: "修改描述" },
                            { label: "删除" },
                            { label: "下架" },
                            { label: "发布/更新" },
                        ]
                    },
                ]
            },
            {
                label: "应用编辑",
                nodes: [
                    {
                        label: "顶部导航栏",
                        nodes: [
                            { label: "Logo" },
                            { label: "当前应用", nodes: [{ label: "编辑" }] },
                            {
                                label: "导出",
                                nodes: [
                                    { label: "导出配置对话框" },
                                    { label: "桩管理" },
                                ]
                            },
                            {
                                label: "变量",
                                nodes: [
                                    { label: "搜索" },
                                    { label: "修改" },
                                ]
                            },
                            {
                                label: "协作",
                                nodes: [
                                    { label: "多人协作管理对话框" },
                                    { label: "解冲突" },
                                ]
                            },
                            { label: "重叠" },
                            {
                                label: "撤销",
                                nodes: [
                                    { label: "历史版本下拉" },
                                    { label: "历史记录管理" },
                                ]
                            },
                            { label: "恢复" },
                            { label: "编译" },
                            { label: "预览" },
                            {
                                label: "菜单",
                                nodes: [
                                    {
                                        label: "导入",
                                        nodes: [
                                            { label: "导入应用文件" },
                                            { label: "导入UX设计稿" },
                                        ]
                                    },
                                    { label: "国际化管理" },
                                    {
                                        label: "图形模板管理",
                                        nodes: [
                                            { label: "复制" },
                                            { label: "重命名" },
                                        ]
                                    },
                                    { label: "桩管理" },
                                    { label: "插件管理" },
                                    { label: "全局交互管理" },
                                    { label: "发布与下架" },
                                    { label: "切换应用皮肤" },
                                    {
                                        label: "自动化测试",
                                        nodes: [
                                            { label: "新建" },
                                        ]
                                    },
                                    { label: "提需求/Bug" },
                                    { label: "图标检索" },
                                    { label: "当前用户" },
                                ]
                            },
                        ]
                    },
                    {
                        label: "左侧导航面板",
                        nodes: [
                            {
                                label: "内容选择",
                                nodes: [
                                    { label: "功能项" },
                                    { label: "更多" }
                                ]
                            },
                            {
                                label: "结构",
                                nodes: [
                                    { label: "搜索" },
                                    {
                                        label: "结构树",
                                        nodes: [
                                            { label: "重命名" }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "组件",
                                nodes: [
                                    { label: "搜索" },
                                    { label: "纵向导航" },
                                    { label: "横向导航" },
                                    { label: "组件图标" }
                                ]
                            },
                            {
                                label: "数据",
                                nodes: [
                                    { label: "数据侧边导航" },
                                    {
                                        label: "数据配置信息",
                                        nodes: [
                                            {
                                                label: "数据列表",
                                                nodes: [
                                                    { label: "数据新增" },
                                                    { label: "数据删除" },
                                                    { label: "数据复制" }
                                                ]
                                            },
                                            {
                                                label: "数据信息",
                                                nodes: [
                                                    {
                                                        label: "Rest服务",
                                                        nodes: [
                                                            { label: "基本信息" },
                                                            {
                                                                label: "数据模型",
                                                                nodes: [
                                                                    { label: "新建字段" },
                                                                    { label: "删除字段" },
                                                                    { label: "修改字段" },
                                                                    { label: "复制模型" },
                                                                    { label: "粘贴模型" },
                                                                    { label: "导入模型" },
                                                                    { label: "下载模型" }
                                                                ]
                                                            },
                                                            { label: "服务实现" }
                                                        ]
                                                    },
                                                    { label: "库文件" },
                                                    {
                                                        label: "数据模型",
                                                        nodes: [
                                                            { label: "新建字段" },
                                                            { label: "删除字段" },
                                                            { label: "修改字段" },
                                                            { label: "复制模型" },
                                                            { label: "粘贴模型" },
                                                            { label: "导入模型" },
                                                            { label: "下载模型" }
                                                        ]
                                                    },
                                                    { label: "其他文件" }
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                label: "状态",
                                nodes: [
                                    {
                                        label: "状态",
                                        nodes: [
                                            { label: "新增状态" },
                                            { label: "删除状态" },
                                            { label: "修改状态" }
                                        ]
                                    },
                                    {
                                        label: "守卫",
                                        nodes: [
                                            { label: "新增守卫" },
                                            { label: "删除守卫" },
                                            { label: "修改守卫" }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "资源",
                                nodes: [
                                    { label: "创建目录" },
                                    { label: "上传文件" },
                                    { label: "下载文件" },
                                    { label: "引用外部文件" },
                                    { label: "删除目录" },
                                    { label: "重命名文件" },
                                    { label: "编辑文件" },
                                    { label: "复制文件" },
                                    { label: "配置文件引入方式" }
                                ]
                            }
                        ]
                    },
                    {
                        label: "右侧配置面板",
                        nodes: [
                            {
                                label: "组件ID",
                                nodes: [
                                    { label: "编辑ID" },
                                ]
                            },
                            {
                                label: "样式外观",
                                nodes: [
                                    { label: "配置" },
                                    { label: "尺寸响应性" },
                                    { label: "布局" },
                                    {
                                        label: "样式",
                                        nodes: [
                                            { label: "状态" },
                                            {
                                                label: "详情",
                                                nodes: [
                                                    {
                                                        label: "文字",
                                                        nodes: [
                                                            { label: "颜色" },
                                                        ]
                                                    },
                                                    {
                                                        label: "外观",
                                                        nodes: [
                                                            { label: "背景填充" },
                                                        ]
                                                    },
                                                    { label: "可见性" },
                                                    { label: "特效" },
                                                    { label: "其他样式" },
                                                ]
                                            },
                                        ]
                                    },
                                    { label: "卡片布局" },
                                    {
                                        label: "卡片样式",
                                        nodes: [
                                            {
                                                label: "边框",
                                                nodes: [
                                                    { label: "无边框" },
                                                    {
                                                        label: "自定义",
                                                        nodes: [
                                                            { label: "上传图片" },
                                                            { label: "收藏" },
                                                            { label: "设置弹性边框" },
                                                            { label: "删除" },
                                                        ]
                                                    },
                                                    { label: "内置" },
                                                ]
                                            },
                                            { label: "无背景" },
                                            { label: "标题" },
                                        ]
                                    },
                                ]
                            },
                            {
                                label: "数据交互",
                                nodes: [
                                    {
                                        label: "属性",
                                        nodes: [
                                            { label: "数据" },
                                            { label: "布尔值" },
                                        ]
                                    },
                                    {
                                        label: "交互动作",
                                        nodes: [
                                            { label: "搜索" },
                                            {
                                                label: "动作列表",
                                                nodes: [
                                                    { label: "程序控制" },
                                                    { label: "事件与数据" },
                                                    { label: "动画" },
                                                    { label: "弹出" },
                                                    { label: "数组操作" },
                                                    { label: "字符串操作" },
                                                    { label: "表单组件操作" },
                                                    { label: "Tab组件操作" },
                                                    { label: "复杂组件操作" },
                                                    { label: "Table组件操作" },
                                                    { label: "图形操作" },
                                                    { label: "时间操作" },
                                                    { label: "进度条操作" },
                                                    { label: "步骤条操作" },
                                                    { label: "上传操作" },
                                                    { label: "树组件操作" },
                                                    { label: "组件其他操作" },
                                                    { label: "表单模块操作" },
                                                    { label: "高级" },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                label: "拓展功能",
                                nodes: [
                                    {
                                        label: "拓展配置",
                                        nodes: [
                                            { label: "添加新拓展" },
                                            {
                                                label: "拓展配置项",
                                                nodes: [
                                                    { label: "属性" },
                                                    { label: "交互动作" },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                label: "图标样式",
                                nodes: [
                                    { label: "图形类型" },
                                    { label: "坐标轴" },
                                    { label: "图例" },
                                    { label: "标题" },
                                ]
                            }
                        ]
                    },
                    {
                        label: "模块导航",
                        nodes: [
                            { label: "导航Tab页" },
                            { label: "新增模块" },
                            { label: "管理" },
                            {
                                label: "底部操作栏",
                                nodes: [
                                    { label: "代码" },
                                    { label: "日志" },
                                    { label: "提示错误按钮" },
                                    { label: "缩放" }
                                ]
                            },
                        ]
                    },
                    { label: "画布" },
                ]
            },
        ])
    }

    ngAfterViewInit(): void {
        this.treeExt.ztree.expandAll(true);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
