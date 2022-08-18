import {Injectable} from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class SelectTextService {
    public text: object = {
        introduction: `
            # Select 下拉选取

            下拉选取用于选择字符串、对象数组中的某一选项或多个选项。

            ## 使用场景

            弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。

            当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio或checkbox 是更好的选择。

            ## 示例

            输入框既做为选项结果呈现，也做为搜索框。

            当选项超过8条时，下拉框出滚动条。
        `,
        basic: `
            ### 基础用法

            已选项用蓝色背景标识，中尺寸单选下拉框适用于紧凑型表单，小尺寸单选下拉框适用于表单。
        `,
        string: `
            ### 数据来自字符串数组
        `,
        optionCount: `
            ### 显示数量
        `,
        lineEllipsis: `
            ### 文本溢出

            combo里的tag的最大宽度是76px，文本超出会显示省略号，鼠标移上去会有提示
        `,
        trigger: `
            ### 下拉打开方式
        `,
        searchable: `
            ### 搜索功能
        `,
        clearable: `
            ### 清除功能
        `,
        multipleSelect: `
            ### 可多选
        `,
        optionWidth: `
            ### 设置下拉列表宽度

            这个Demo演示了通过optionWidth属性来使得下拉列表的宽度变大的效果
        `,
       interaction: `
            ### 联动
       `,
    }
}