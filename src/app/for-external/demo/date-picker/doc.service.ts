import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DatePickerTextService {
    public text = {
        introduction: `
            # Date Picker 日期选择

            输入或选择日期的控件（没有时分秒）。

            ## 示例
        `,
        basic: `
            ### 基础用法
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
        `,
        mark: `
            ### 日期标记图例
        `,
        weekStart: `
            ### 自定义起始周期
        `
    }
}
