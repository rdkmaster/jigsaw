import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginationTextService {
    public text: object = {
        introduction: `
            # Pagination 分页器

            ## 使用场景

            中尺寸行高28px，小尺寸行高24px。

            ## 示例
        `,
        basic: `
            ### 默认模式
        `,
        fold: `
            ### 折叠模式
        `,
        simple: `
            ### 简约模式
        `,
        withSearchBox: `
            ### 带搜索框
        `,
        hidden: `
            ### 隐藏元素
        `,
        bigData: `
            ### 巨大分页数量的情况
        `,
        noData: `
            ### Pagination空数据

            此Demo展示了Pagination组件在空数据/数据延迟设置时的表现。
        `
    }
}
