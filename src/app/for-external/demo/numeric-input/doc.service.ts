import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumericInputTextService {
    public text = {
        introduction: `
            # Numeric Input 数字输入框

            通过鼠标或键盘，输入范围内的数值。

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
