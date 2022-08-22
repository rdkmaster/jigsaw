import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimePickerTextService {
    public text = {
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

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        step: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./step/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./step/demo.component.ts').default }
        ],
        gr: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./gr/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./gr/demo.component.ts').default }
        ],
        limit: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./limit/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./limit/demo.component.ts').default }
        ]
    }
}
