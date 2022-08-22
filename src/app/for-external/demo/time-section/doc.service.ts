import { Injectable } from '@angular/core';

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
            ### 水平时间段选择器
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        timeSectionPicker: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./time-section-picker/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./time-section-picker/demo.component.ts').default }
        ],
        weekSectionPicker: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./week-section-picker/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./week-section-picker/demo.component.ts').default }
        ],
        daySectionPicker: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./day-section-picker/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./day-section-picker/demo.component.ts').default }
        ],
        horizontal: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./horizontal/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./horizontal/demo.component.ts').default }
        ],
    }
}
