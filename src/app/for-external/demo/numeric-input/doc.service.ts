import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumericInputTextService {
    public text: object = {
        introduction: `
            # Numeric Input 数字输入框

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        prefixSuffix: `
            ### 组合数字输入框
        `,
        showOption: `
            ### 上下翻按钮常驻
        `,
        step: `
            ### 粒度
        `
    }
}
