import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertTextService {
    public text: object = {
        introduction: `
            # Alert 警示框

            警示模态框一般用于删除或确认重要操作，或不可恢复操作。

            危险操作模态框中的内容需要包含操作对象名称，如：确定删除数据“***”吗？

            ## 示例
        `,
        popup: `
            ### 弹出警示

            演示了如何弹出一个Alert组件。
        `,
        inDom: `
            ### 嵌入式警示

            直观显示各个Alert组件默认配置的效果。
        `,
        customized: `
            ### 自定义警示

            使用\`JigsawAlert\`组件自定义一个对话框。
        `
    }

    public codes = {
        popup: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./popup/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./popup/demo.component.ts').default }
        ],
        inDom: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./in-dom/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./in-dom/demo.component.ts').default }
        ],
        customized: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./customized/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./customized/demo.component.ts').default }
        ],
    }
}
