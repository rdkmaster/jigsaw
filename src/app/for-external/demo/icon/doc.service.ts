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
        IconText: `
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
}
