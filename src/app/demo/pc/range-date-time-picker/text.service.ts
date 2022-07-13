import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RangeDataTimePickerTextService {
    public text: object = {
        introduction: `
            # Date Time (Range) 日期时间范围

            输入或选择日期时间范围的控件。

            ## 使用场景

            适用于日期范围的选择，可以点击开始时间和结束时间两个标准输入框，弹出日期面板进行选择。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        gr: `
            ### 粒度 Gr
        `,
        grItems: `
            ### 粒度选项
        `,
        limit: `
            ### 限制可选日期
        `,
        step: `
            ### step
        `,
        weekStart: `
            ### 自定义起始周期
        `
    }
}
