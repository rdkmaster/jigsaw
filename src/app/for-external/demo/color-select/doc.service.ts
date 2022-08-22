import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorSelectTextService {
    public text = {
        introduction: `
            # Color Select 颜色选择

            用于对颜色的选取。

            ## 使用场景

            通过移动取色器选取颜色。

            输入色值来定义颜色。

            ## 基本用法
        `,
        autoCommit: `
            ### 自动提交色值

            这个DEMO详细演示了\`jigsaw-color-select\`组件中自动提交色值的用法。
        `,
        manualCommit: `
            ### 手动提交色值

            这个DEMO详细演示了\`jigsaw-color-select\`组件中手动提交色值的用法。
        `,
        limited: `
            ### limited 模式

            这个DEMO详细演示了\`jigsaw-color-select\`组件中limit模式的用法。
        `,
        removeTransparency: `
            ### 取消透明度
        `,
    }

    public codes = {
        autoCommit: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./auto-commit/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./auto-commit/demo.component.ts').default }
        ],
        manualCommit: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./manual-commit/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./manual-commit/demo.component.ts').default }
        ],
        limited: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./limited/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./limited/demo.component.ts').default }
        ],
        removeTransparency: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./remove-transparency/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./remove-transparency/demo.component.ts').default }
        ]
    }
}
