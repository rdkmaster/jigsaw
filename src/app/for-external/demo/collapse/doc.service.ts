import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CollapseTextService {
    public text = {
        introduction: `
            # Collapse 折叠

            可以折叠/展开的内容区域。

            ## 使用场景

            对复杂区域进行分组和隐藏，保持页面的整洁。

            一般将操作频率稍低和复杂的功能隐藏起来，可保持页面的整洁，突出页面的其他重点功能。

            ## 示例
        `,
        basic: `
            ### 基础用法

            演示了\`JigsawCollapse\`多个属性的基本用法
        `,
        rightArrow: `
            ### 箭头靠右
        `,
        accordion: `
            ### 手风琴

            手风琴，每次只打开一个tab。默认打开第一个。
        `,
        titleAndContent: `
            ### 标题和内容

            标题如果是纯文本，可以用\`header\`属性。

            标题不是纯文本，使用\`j-title j-body\`。
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        rightArrow: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./right-arrow/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./right-arrow/demo.component.ts').default }
        ],
        accordion: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./accordion/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./accordion/demo.component.ts').default }
        ],
        titleAndContent: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./title-and-content/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./title-and-content/demo.component.ts').default }
        ],
    }
}
