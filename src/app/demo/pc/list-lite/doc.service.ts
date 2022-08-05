import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListLiteTextService {
    public text: object = {
        introduction: `
            # List Lite 简单列表

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
            ### Option Count
        `,
        presetValue: `
            ### 预设选中值
        `,
        searchable: `
            ### 搜索功能
        `,
        withCombo: `
            ### 与combo-select组合使用
        `,
        withIcon: `
            ### 带有图标的选项

            使用\`icon\`属性来指定一个图标，使用\`suffixIcon\`属性来指定一个副图标。
        `
    }
}
