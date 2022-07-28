import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlphabeticalTextService {
    public text: object = {
        introduction: `
            # 字母索引 Alphabetical-Index

            ## 示例
        `,
        basic: `
            ### 基础文字索引
        `,
        dictionary: `
            ### 配置了拼音字典的基础文字索引
        `,
        multiTone: `
            ### 多音字的内容索引
        `,
        inDom: `
            ### 嵌入

            常驻状态
        `,
    }
}
