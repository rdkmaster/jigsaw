import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RangeDataTimePickerTextService {
    public text = {
        introduction: `
            # Date Time (Range) 日期时间范围选择

            输入或选择日期时间范围的控件。

            ## 使用场景

            适用于日期时间范围的选择，可以点击开始时间和结束时间两个标准输入框，弹出日期时间面板进行选择。

            ## 示例
        `,
        basic: `
            ### 基本用法

            时间配置支持时间宏 s(秒),m(分钟),h(小时),d(天),w(周),M(月),y(年) 并且支持计算 如 now-10d now+10m
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
        rangeDateTimeSelect: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./range-date-time-select/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./range-date-time-select/demo.component.ts').default }
        ],
        weekStart: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./week-start/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./week-start/demo.component.ts').default }
        ],
    }
}
