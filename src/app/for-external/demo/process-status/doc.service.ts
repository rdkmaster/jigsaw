import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ProcessStatusTextService {
    public text = {
        introduction: `
            # Progress Status 流程图

            用于在界面上显示一个流程状态，并且可以实时更新各个状态，需要配合JigsawProcessStatusItem组件一起使用。

            ## 示例
        `,
        basic: `
            ### 基本用法

            本demo演示了jigsaw-process-status组件最简单的用法，所有配置项都用默认
        `,
        customIcons: `
            ### 自定义图标
            本demo演示了jigsaw-steps组件自定义状态ICON图的方法
        `,
        statusInteractive: `
            ### 含交互
            本demo演示了如何配合trustedHtml对用户提供交互的例子
        `,
        statusMultiline: `
            ### 多线的状态
            本demo演示了 jigsaw-process-status-multiline 组件最简单的用法
        `,
        vertical: `
            ### 垂直排列
            本demo演示了 jigsaw-process-status 垂直排列的效果
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        customIcons: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./custom-icons/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./custom-icons/demo.component.ts').default }
        ],
        statusInteractive: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./status-interactive/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./status-interactive/demo.component.ts').default }
        ],
        statusMultiline: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./status-multiline/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./status-multiline/demo.component.ts').default }
        ],
        vertical: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./vertical/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./vertical/demo.component.ts').default }
        ],
    }
}
