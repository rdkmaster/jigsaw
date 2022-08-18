import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimePickerTextService {
    public text: object = {
        introduction: `
            # Time Picker 时分秒选择

            只适合时间选择。

            该选择器不显示年份、月份以及日期。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        step: `
            ### step
        `,
        gr: `
            ### 粒度 Gr
        `,
        limit: `
            ### 限制可选日期
        `
    }
}
