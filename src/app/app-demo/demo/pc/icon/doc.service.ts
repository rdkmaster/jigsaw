import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IconTextService {
    public text: object = {
        introduction: `
            # Icon 图标

            ## 示例
        `,
        basic: `
            ### 仅图标

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
