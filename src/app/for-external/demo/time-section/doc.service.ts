import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimeSectionTextService {
    public text = {
        introduction: `
            # Time Section 时段选择器

            进行时间段选择的控件

            ## 使用场景

            适用于不同粒度的时间段、时间周期的选择，可以根据实际情况选择平铺或折叠。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        timeSectionPicker: `
            ### 小时选择器
        `,
        weekSectionPicker: `
            ### 周选择器
        `,
        daySectionPicker: `
            ### 天选择器
        `,
        horizontal: `
            ### 多选
        `,
    }
}
