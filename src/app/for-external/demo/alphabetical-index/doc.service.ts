import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlphabeticalTextService {
    public text: object = {
        introduction: `
            # Alphabetical-Index 字母索引

            ## 示例
        `,
        basic: `
            ### 基础文字索引
        `,
        dictionary: `
            ### 配置拼音字典
        `,
        multiTone: `
            ### 多音字的内容索引
        `,
        permanent: `
            ### 常驻状态
        `
    }
}
