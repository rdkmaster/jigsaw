import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ButtonBarTextService {
    public text = {
        introduction: `
            # Button-bar 按钮栏

            为页面和功能提供导航的列表。

            ## 使用场景

            按钮栏用于在同一个页面空间占用下的内容切换。

            ## 示例
        `,
        objectsArray: `
            ###  对象数组

            按钮栏的数据是对象数组。
        `,
        stringArray: `
            ### 字符串数组

            按钮栏的数据是字符串数组。
        `,
        colorType: `
            ### Color Type
        `,
        icons: `
            ### 带图标按钮栏
        `,
        multiple: `
            ### 可多选
        `,
        setHeight: `
            ### 直接设置height
        `
    }

    public codes = {
        objectsArray: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./objects-array/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./objects-array/demo.component.ts').default }
        ],
        stringArray: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./string-array/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./string-array/demo.component.ts').default }
        ],
        colorType: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./color-type/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./color-type/demo.component.ts').default }
        ],
        icons: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./icons/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./icons/demo.component.ts').default }
        ],
        multiple: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./multiple/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./multiple/demo.component.ts').default }
        ],
        setHeight: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./set-height/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./set-height/demo.component.ts').default }
        ],
    }
}
