import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TileTextService {
    public text: object = {
        introduction: `
            # Tile 平铺

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        noBorder: `
            ### 无边框
        `,
        labelField: `
            ### labelField
        `,
        multipleSelect: `
            ### 多选
        `,
        selectedItems: `
            ### 初始选中值
        `,
        tileOptionWidth: `
            ### 设置宽度
        `,
        tileLite: `
            ### 简易平铺
        `
    }
}
