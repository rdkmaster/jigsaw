import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TileTextService {
    public text = {
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

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        noBorder: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./no-border/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./no-border/demo.component.ts').default }
        ],
        labelField: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./label-field/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./label-field/demo.component.ts').default }
        ],
        multipleSelect: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./multiple-select/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./multiple-select/demo.component.ts').default }
        ],
        selectedItems: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./selected-items/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./selected-items/demo.component.ts').default }
        ],
        tileOptionWidth: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./tile-option-width/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./tile-option-width/demo.component.ts').default }
        ],
        tileLite: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./tile-lite/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./tile-lite/demo.component.ts').default }
        ],
    }
}
