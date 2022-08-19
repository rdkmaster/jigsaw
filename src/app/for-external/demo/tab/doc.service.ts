import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TabTextService {
    public text = {
        introduction: `
            # Tabs 选项卡

            选项卡切换组件。提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

            ## 示例
        `,
        basic: `
            ### 基础用法

            此demo主要描述tab的基本用法，包括如何使用渲染器来丰富tab头

            #### lazy延迟加载内容

            jigsaw-tab-pane有个\`lazy\`布尔型属性，用来控制内容的加载形式。
            - 为\`true\`时表示延迟加载，即对应的tab激活时，才把内容加载出来；
            - 为\`false\`时，组件初始化时就加载；
            - 默认\`lazy\`的值是\`true\`，即采用延迟加载的形式。

            tab内容被加载后，即使切换到其他tab，内容也不会销毁，数据依旧保留。
        `,
        editable: `
            ### 可编辑的tab
        `,
        background: `
            ### 与背景色融合

            此demo展示通过设置backgroundColor属性，达到页签与背景色完美融合在一起的效果。
        `,
        headless: `
            ### 隐藏tab的页签部分

            将tab的页签部分隐藏起来，在某些场景下，可以实现定制性更高的视图，或者将tab作为一个视图叠加容器来使用
        `,
        hideShow: `
            ### 隐藏Tab
        `,
        titleRenderer: `
            ### 标题渲染器
        `,
        type: `
            ### Tab类型
        `,
        tabBar: `
            ### 独立的tab-bar
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        editable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./editable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./editable/demo.component.ts').default }
        ],
        background: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./background/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./background/demo.component.ts').default }
        ],
        headless: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./headless/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./headless/demo.component.ts').default }
        ],
        hideShow: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./hide-show/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./hide-show/demo.component.ts').default }
        ],
        titleRenderer: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./title-renderer/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./title-renderer/demo.component.ts').default }
        ],
        type: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./type/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./type/demo.component.ts').default }
        ],
        tabBar: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./tab-bar/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./tab-bar/demo.component.ts').default }
        ]
    }
}
