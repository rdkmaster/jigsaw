import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateTimePickerTextService {
    public text = {
        introduction: `
            # Date Time Picker 日期和时间选择

            输入或选择日期和时间的控件（有时分秒）。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        grSecond: `
            ### 粒度为秒
        `,
        grMinute: `
            ### 粒度为分
        `,
        grItems: `
            ### 粒度选项
        `,
        limit: `
            ### 限制可选日期

            limit采用宏的时候，会实时根据宏计算limit时间，并设置5分钟的误差，即宏时间往前5分钟作为limitStart，往后5分钟作为limitEnd
        `,
        dateTimeSelect: `
            ### 带下拉框模式
        `,
        confirmButton: `
            ### 带有确认按钮

            仅在粒度为 'hour', 'minute', 'second' 时才有效。
        `
    }
}
