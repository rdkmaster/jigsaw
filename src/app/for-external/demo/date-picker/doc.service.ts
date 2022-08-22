import { Injectable } from '@angular/core';

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

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        grWeek: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./gr-week/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./gr-week/demo.component.ts').default }
        ],
        grMonth: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./gr-month/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./gr-month/demo.component.ts').default }
        ],
        grItems: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./gr-items/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./gr-items/demo.component.ts').default }
        ],
        limit: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./limit/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./limit/demo.component.ts').default }
        ],
        mark: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./mark/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./mark/demo.component.ts').default }
        ],
        weekStart: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./week-start/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./week-start/demo.component.ts').default }
        ],
    }
}
