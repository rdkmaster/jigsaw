import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutoCompleteInputTextService {
    public text = {
        introduction: `
            # Auto-Complete-Input 提示输入框

            输入框预设数据列表并根据输入内容提供对应的输入建议。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        default: `
            ### 输入框带默认值
        `,
        withGroup: `
            ### 数据列表带分组
        `,
        prefixSuffix: `
            ### 前缀和后缀
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        default: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./default/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./default/demo.component.ts').default }
        ],
        withGroup: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./with-group/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./with-group/demo.component.ts').default }
        ],
        prefixSuffix: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./prefix-suffix/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./prefix-suffix/demo.component.ts').default }
        ]
    }
}
