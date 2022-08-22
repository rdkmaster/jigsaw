import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IconTextService {
    public text = {
        introduction: `
            # Icon 图标

            语义化的矢量图形。

            ## 示例
        `,
        basic: `
            ### 基础用法

            只有图标，没有文字。
        `,
        iconText: `
            ### 图文都有

            既有图标，又有文字。
        `,
        similarHyperlink: `
            ### 类似超链
        `,
        position: `
            ### 图标位置
        `,
        status: `
            ### 状态
        `,
        customizeStatus: `
            ### 自定义状态
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        iconText: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./icon-text/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./icon-text/demo.component.ts').default }
        ],
        similarHyperlink: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./similar-hyperlink/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./similar-hyperlink/demo.component.ts').default }
        ],
        position: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./position/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./position/demo.component.ts').default }
        ],
        status: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./status/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./status/demo.component.ts').default }
        ],
        customizeStatus: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./customize-status/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./customize-status/demo.component.ts').default }
        ],
    }
}
