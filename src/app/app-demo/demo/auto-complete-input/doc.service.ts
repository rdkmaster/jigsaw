import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutoCompleteInputTextService {
    public text: object = {
        introduction: `
            # Input 提示输入框

            输入框预设数据列表并根据输入内容提供对应的输入建议。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        default: `
            ### 输入框带默认值
        `,
        withGroup: `
            ### 数据列表带分组
        `,
        prefixSuffix: `
            ### 前缀和后缀
        `
    }
}
