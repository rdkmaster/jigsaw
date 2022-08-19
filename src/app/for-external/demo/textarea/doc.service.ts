import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextareaTextService {
    public text = {
        introduction: `
            # Textarea 多行文本框

            用于输入或编辑长字符串的无约束多行文本框，输入框下面有实时计数显示。当超过默认文本域高度时出现垂直滚动条。

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        clearable: `
            ### 关闭清除功能
        `,
        maxLength: `
            ### 最大长度

            限制30个字符（默认不包含回车换行符）
        `,
        resize: `
            ### 文本框可伸缩

            此Demo演示了textarea组件的可动态调整尺寸的效果，在启用动态调整尺寸时，组件的尺寸单位只能支持px和vw/vh，不支持%。
        `,
        select: `
            ### 自动选中文本
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        clearable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./clearable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./clearable/demo.component.ts').default }
        ],
        maxLength: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./max-length/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./max-length/demo.component.ts').default }
        ],
        resize: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./resize/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./resize/demo.component.ts').default }
        ],
        select: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./select/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./select/demo.component.ts').default }
        ],
    }
}
