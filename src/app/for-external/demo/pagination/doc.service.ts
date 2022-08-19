import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginationTextService {
    public text = {
        introduction: `
            # Pagination 分页器

            当数据量过多时，使用分页分解数据。

            ## 使用场景

            - 当加载/渲染所有数据将花费很多时间时；
            - 可切换页码浏览数据。

            ## 示例
        `,
        basic: `
            ### 基础用法
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
            ### 没有数据

            此Demo展示了Pagination组件在空数据/数据延迟设置时的表现。
        `
    }
}
