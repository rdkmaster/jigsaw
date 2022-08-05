import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListTextService {
    public text: object = {
        introduction: `
            # List 列表

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        withComponent: `
            ### 多组件复合用法
        `,
        withComboSelect: `
            ### 与combo-select组合使用
        `,
        menu: `
            ### 伪装成菜单
        `
    }
}
