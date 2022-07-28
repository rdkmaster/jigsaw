import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutoCompleteInputTextService {
    public text: object = {
        introduction: `
            # Input 预设数据列表

            ## 示例
        `,
        basic: `
            ### 带默认值
        `,
        default: `
            ### 嵌入式警示

            直观显示各个Alert组件默认配置的效果。
        `,
        withGroup: `
            ### 分组
        `,
        prefixSuffix: `
            ### 前后额外信息
        `
    }
}
