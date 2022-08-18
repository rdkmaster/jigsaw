import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlphabeticalTextService {
    public text: object = {
        introduction: `
            # Alphabetical-Index 字母索引

            ## 示例
        `,
        basic: `
            ### 基础文字索引
        `,
        dictionary: `
            ### 配置拼音字典
        `,
        multiTone: `
            ### 多音字的内容索引
        `,
        permanent: `
            ### 常驻状态
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        dictionary: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./dictionary/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./dictionary/demo.component.ts').default }
        ],
        multiTone: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./multi-tone/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./multi-tone/demo.component.ts').default }
        ],
        permanent: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./permanent/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./permanent/demo.component.ts').default }
        ]
    }
}
