import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TreeTextService {
    public text = {
        introduction: `
            # Tree 树形

            树形组件

            ## 使用场景

            树组件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        editable: `
            ### 可操作树形
        `,
        async: `
            ### 懒加载

            通过模拟的方式演示了树的懒加载能力，提供了树子节点数据量很大时的一个解决方案。

            点击树节点，每个节点的子节点都从实时从服务端取一次数据，在树节点的数据量很大时非常有用。
        `,
        xmlData: `
            ### 使用xml作为树的数据源格式

            使用xml作为树的数据源格式是一个非常好的选择，相比json对象，xml更加简洁和清晰。
        `,
        icon: `
            ### 自定义图标
        `,
        fuzzySearch: `
            ### 模糊搜索
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        editable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./editable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./editable/demo.component.ts').default }
        ],
        async: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./async/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./async/demo.component.ts').default }
        ],
        xmlData: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./xml-data/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./xml-data/demo.component.ts').default }
        ],
        icon: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./icon/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./icon/demo.component.ts').default }
        ],
        fuzzySearch: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./fuzzy-search/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./fuzzy-search/demo.component.ts').default }
        ],
    }
}
