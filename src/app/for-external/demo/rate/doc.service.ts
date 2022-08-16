import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RateTextService {
    public text: object = {
        introduction: `
           # Rate 评分

           评分组件

           ## 使用场景

           - 对评价进行展示。
           - 对事物进行快速的评级操作。

           ## 示例
        `,
        basic: `
           ### 基本用法
        `,
        half: `
           ### 支持选中半星
        `,
    }
}
