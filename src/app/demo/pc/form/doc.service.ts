import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormTextService {
    public text: object = {
        introduction: `
            # Form 表单

            具有数据收集、校验和提交功能的元素组合。

            ## 使用场景

            用于数据收集、校验和提交。

            ## 示例
        `,
        basic: `
            ### 基础表单
        `
    }
}
