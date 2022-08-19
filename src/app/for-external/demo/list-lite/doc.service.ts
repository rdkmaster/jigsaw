import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListLiteTextService {
    public text = {
        introduction: `
            # List Lite 简单列表

            一个轻量的list控件，是在list控件基础上做的封装，做了一些功能的拓展

            - 支持单选和多选
            - 支持同步异步数据，和预设数据
            - 支持设置option显示个数，自动产生滚动条
            - 支持搜索功能
            - 支持文本溢出显示省略号，鼠标移入会有提示信息
            - 可以和combo结合起来使用

            ## 示例
        `,
        singleSelect: `
            ### 单选
        `,
        multipleSelect: `
            ### 多选
        `,
        stringArray: `
            ### 字符串数组
        `,
        lineEllipsis: `
            ### 文本溢出
        `,
        optionCount: `
            ### 显示数量
        `,
        presetValue: `
            ### 预设选中值
        `,
        searchable: `
            ### 搜索功能
        `,
        withCombo: `
            ### 带下拉框
        `,
        withIcon: `
            ### 带有图标的选项

            使用\`icon\`属性来指定一个图标，使用\`suffixIcon\`属性来指定一个副图标。
        `
    }
}
