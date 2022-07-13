import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DatePickerTextService {
    public text: object = {
        introduction: `
            # Date Picker 日期选择

            输入或选择日期时间的控件。

            ## 使用场景

            当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

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
        mark: `
            ### 日期标记图例
        `,
        weekStart: `
            ### 自定义起始周期
        `
    }
}
