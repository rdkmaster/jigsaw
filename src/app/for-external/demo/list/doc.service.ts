import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListTextService {
    public text = {
        introduction: `
            # List 列表

            最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        withComponent: `
            ### 多组件复合用法
        `,
        withComboSelect: `
            ### 带下拉框
        `,
        menu: `
            ### 伪装成菜单
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        withComponent: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./with-component/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./with-component/demo.component.ts').default }
        ],
        withComboSelect: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./with-combo-select/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./with-combo-select/demo.component.ts').default }
        ],
        menu: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./menu/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./menu/demo.component.ts').default }
        ],
    }
}
