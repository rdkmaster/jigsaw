import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RateTextService {
    public text = {
        introduction: `
            # Rate 评分

            评分组件

            ## 使用场景

            - 对评价进行展示。
            - 对事物进行快速的评级操作。

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        half: `
            ### 支持选中半星
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        half: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./half/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./half/demo.component.ts').default }
        ]
    }
}
