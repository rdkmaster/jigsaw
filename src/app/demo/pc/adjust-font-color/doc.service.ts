import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdjustFontColorTextService {
    public text: object = {
        introduction: `
            # Adjust Font Color 自适应文本颜色

            ## 示例
        `,
        basic: `
            ### 基础用法

            展示了文本颜色如何在背景修改时自动调整黑/白，以达到合适的对比度。
        `
    }
}