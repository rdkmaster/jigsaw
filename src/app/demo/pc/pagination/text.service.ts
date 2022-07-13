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
            ### 基础分页器
        `,
        withPageInfo: `
            ### 分页数据信息
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
