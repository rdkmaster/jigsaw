import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HeaderTextService {
    public text = {
        introduction: `
            # Header标题

            作为区域内容的标志性文字概括。

            ## 使用场景

            用于内容区域标题。

            ## 示例
        `,
        firstLevel: `
            ### 一级标题

            用于页面标题。每个页面都需要使用页面标题。
        `,
        secondLevel: `
            ### 二级标题

            用于表单或者其他页面内容的分组。
        `,
        thirdLevel: `
            ### 三级标题

            分组标题之内进行再分组时，可使用小标题。
        `
    }

    public codes = {
        firstLevel: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./first-level/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./first-level/demo.component.ts').default }
        ],
        secondLevel: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./second-level/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./second-level/demo.component.ts').default }
        ],
        thirdLevel: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./third-level/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./third-level/demo.component.ts').default }
        ],
    }
}
