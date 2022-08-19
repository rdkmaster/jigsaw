import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbTextService {
    public text = {
        introduction: `
            # Breadcrumb 面包屑

            包含面包屑和页面标题的功能，面包屑作为系统打开页面超过两级跳转时使用，最末尾级做为页面标题的展示。

            ## 使用场景

            显示当前页面的标题和在系统层级结构中的位置，并能向上返回。

            通过菜单可以跳转的页面，仅显示页面标题，没有面包屑。

            通过菜单无法跳转的页面，显示面包屑/标题。

            ## 示例
        `,
        basic: `
            ### 基础面包屑

            高定制性的面包屑，理论上可以完成任何导航场景，代价是需要自行控制，参考本页面包屑搭配路由这个demo使用自动控制的面包屑。
        `,
        hints: `
            ### 面包屑带提示信息

            面包屑的标签可以配置一些提示信息，带有提示信息的标签右侧会出现一个问号图标
        `,
        multiLevel: `
            ### 面包屑折叠

            面包屑的标签数超过指定数目时进行折叠。

            在组件标签内设置foldThreshold的值，控制面包屑的折叠。一旦面包屑的标签数超过设定的值，会进行折叠。
        `,
        router: `
            ### 面包屑搭配路由

            面包屑与路由搭配，只要设置好各级路由的信息，面包屑会自己根据路由状态生成路径

            #### 关于路由配置里的 \`*\`

            Angular的路由非常强大且灵活，当url的某段是由变量组成时，静态的路由信息无法搞定，此时可以使用 \`*\`
            来替代，如果生成的面包屑的描述信息里需要使用到 \`*\` 匹配到的文本时，可以参考demo的源码，
            提供一个生成面包屑节点信息的函数即可，面包屑组件会把匹配到的参数值文本传递给这个函数，
            从而可以生成一个更加具体、生动的面包屑节点。
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        hints: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./hints/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./hints/demo.component.ts').default }
        ],
        multiLevel: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./multi-level/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./multi-level/demo.component.ts').default }
        ],
        router: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./router/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./router/demo.component.ts').default }
        ],
    }
}
