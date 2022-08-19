import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumericInputTextService {
    public text = {
        introduction: `
            # Numeric Input 数字输入框

            通过鼠标或键盘，输入范围内的数值。

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        prefixSuffix: `
            ### 组合数字输入框
        `,
        showOption: `
            ### 上下翻按钮常驻
        `,
        step: `
            ### 步数

            允许定义递增递减的步数控制
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        prefixSuffix: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./prefix-suffix/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./prefix-suffix/demo.component.ts').default }
        ],
        showOption: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./show-option/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./show-option/demo.component.ts').default }
        ],
        step: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./step/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./step/demo.component.ts').default }
        ],
    }
}
