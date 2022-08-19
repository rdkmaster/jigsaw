import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastTextService {
    public text = {
        introduction: `
            # Toast 及时消息

            前台操作反馈，与后台无交互的场景使用（如可视化编辑等）。

            ## 使用场景

            提供成功、信息提示、警告、错误四种类型的反馈信息。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        functional: `
            ### 快捷用法
        `,
        longText: `
            ### 长文本提示框
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        functional: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./functional/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./functional/demo.component.ts').default }
        ],
        longText: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./long-text/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./long-text/demo.component.ts').default }
        ],
    }
}
