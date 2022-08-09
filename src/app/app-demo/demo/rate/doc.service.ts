import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RateTextService {
    public text: object = {
        introduction: `
           # Rate

              打分

           ## 示例
        `,
        basic: `
           ### 基本

           基本用法
        `,
        half: `
           ### 半星

           支持选中半星
        `,
    }
}
