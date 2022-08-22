import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TagTextService {
    public text = {
        introduction: `
            # Tag 标签

            标记类型、分类和内容的小标签。

            ## 使用场景

            标记事物的属性、维度、类型等。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        presetColor: `
            ### 内置颜色
        `,
        customColor: `
            ### 定制颜色
        `,
        selectable: `
            ### 选中效果

            设置selectedColor属性可以让Tag在选中后，自动切换为此属性指定的颜色，从而形成一种被选中的效果
        `,
        addRemove: `
            ### 添加删除标签

            添加[isAdd]="true"来设置Tag为Add状态，本demo最多可添加5个Tag，注意观察disabled效果
        `,
        withIcon: `
            ### 带图标
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        presetColor: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./preset-color/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./preset-color/demo.component.ts').default }
        ],
        customColor: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./custom-color/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./custom-color/demo.component.ts').default }
        ],
        selectable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./selectable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./selectable/demo.component.ts').default }
        ],
        addRemove: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./add-remove/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./add-remove/demo.component.ts').default }
        ],
        withIcon: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./with-icon/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./with-icon/demo.component.ts').default }
        ],
    }
}
