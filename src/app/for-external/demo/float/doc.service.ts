import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FloatTextService {
    public text = {
        introduction: `
        # Float 任意视图下拉

        ## 示例
        `,
        basic: `
        ### 基础用法

        本demo演示了jigsaw-float指令最简单的用法，所有配置项都用默认。
        `,
        initData: `
        ### 初始化数据

        演示了如何使用jigsawFloatInitData来属性初始化jigsawFloat指令的弹出目标
        `,
        multiLevel: `
        ### 多级弹出

        本demo演示了jigsaw-float指令实现多级弹出，当弹出一个区域后，弹出区域再次弹出新的区域
        `,
        position: `
        ### 弹出位置

        演示了弹出位置的效果，一共8个位置。

        其中第一个单词表示弹出视图在触发点的哪个位置，第二个单词控制弹出视图的哪个边缘与触发点对齐， 比如'bottomLeft'表示在下面弹出来，并且视图左侧与触发点左侧对齐。

        注意，这个位置是应用给的理想位置，在弹出的时候会自动对理想位置坐修正，避免视图超时浏览器边界的情况。
        `,
        target: `
        ### 改变弹出目标

        演示了如何改变jigsawFloat指令的弹出目标。
        `,
        trigger: `
        ### 改变触发方式

        演示了如何改变jigsawFloat指令的触发器。
        `,
        option: `
        ### 改变偏移量 带阴影 带箭头

        演示了如何改变float option参数。
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        initData: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./init-data/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./init-data/demo.component.ts').default }
        ],
        multiLevel: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./multi-level/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./multi-level/demo.component.ts').default }
        ],
        position: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./position/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./position/demo.component.ts').default }
        ],
        target: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./target/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./target/demo.component.ts').default }
        ],
        trigger: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./trigger/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./trigger/demo.component.ts').default }
        ],
        option: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./option/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./option/demo.component.ts').default }
        ],
    }
}
