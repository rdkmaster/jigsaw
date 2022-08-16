import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RangeDataTimePickerTextService {
    public text: object = {
        introduction: `
            # Date Time (Range) 日期时间范围选择

            输入或选择日期时间范围的控件。

            ## 使用场景

            适用于日期时间范围的选择，可以点击开始时间和结束时间两个标准输入框，弹出日期时间面板进行选择。

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        grWeek: `
            ### 粒度为周
        `,
        grMonth: `
            ### 粒度为月
        `,
        grItems: `
            ### 粒度选项
        `,
        limit: `
            ### 限制可选日期

            limit采用宏的时候，会实时根据宏计算limit时间，并设置5分钟的误差，即宏时间往前5分钟作为limitStart，往后5分钟作为limitEnd。
        `,
        rangeDateTimeSelect: `
            ### 下拉框模式
        `,
        weekStart: `
            ### 自定义起始周期
        `
    }
}
