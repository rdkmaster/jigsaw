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
            ## 基础下拉框

            已选项用蓝色背景标识，中尺寸单选下拉框适用于紧凑型表单，小尺寸单选下拉框适用于表单。
        `,
        async: `
            ## 服务端取数据
        `,
        preset: `
            ## 预设数值
        `,
        optionCount: `
            ## option-count
        `,
        disabled: `
            ## 禁用
        `,
        lineEllipsis: `
            ## 文本溢出

            combo里的tag的最大宽度是76px，文本超出会显示省略号，鼠标移上去会有提示
        `,
        trigger: `
            ## 下拉打开方式
        `,
        multiple: `
            ## 多选

            可试试 maxWidth / maxHeight 对组件尺寸的影响
        `,
        searchable: `
            ## 不知道怎么起名
        `,
        size: `
            ## 尺寸设置

            单选设置尺寸用width;

            多选设置尺寸用minWidth和maxWidth;

            多选设置width，则minWidth和maxWidth都为width值。
        `,
        clearable: `
            ## 清除功能
        `,
        multipleSelect: `
            ## 不知道名字
        `,
        optionWidth: `
            ## 设置下拉列表宽度

            这个Demo演示了通过optionWidth属性来使得下拉列表的宽度变大的效果
        `,
        valueChange: `
            ## 不知道名字
        `,
        valid: `
            ## 不知道名字
        `
    }
}
