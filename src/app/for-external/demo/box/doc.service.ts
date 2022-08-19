import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BoxTextService {
    public text = {
        introduction: `
            # Box 盒子布局器

            用于布局的容器组件，方便快速搭建页面的基本结构。

            ## 示例
        `,
        form: `
            ### 表单布局
        `,
        justify: `
            ### Box的对齐方式

            \`direction\`的值都有简写：
            - \`horizontal\` --> \`h\`;
            - \`horizontal-reverse\` --> \`hr\`;
            - \`vertical\` --> \`v\`;
            - \`vertical-reverse\` --> \`vr\`

            关于box布局器的更多信息，请参考以下布局复杂页面demo。
        `,
        layout: `
            ### 布局复杂页面

            #### 简介

            j-box布局器不仅可以很好的布局水平方向上元素，还可以很好的布局垂直方向上的元素。

            水平方向上的布局功能和bootstrap的栅格功能非常类似，支持多种排列方式和对齐方式，具体参考Box的对齐方式demo。
            也支持嵌套布局，水平上可以继续嵌套另一个垂直布局或者水平布局（请参考本demo的代码）。

            j-box还能够在垂直方向上布局，这是bootstrap的栅格功能所不支持的。相同的，垂直方向上的布局也支持嵌套一个水平或者垂直布局。

            #### 主要属性

            ##### direction
            关于j-box的\`direction\`属性：它用于设置其子级j-box是按照水平排列还是垂直排列，默认值是水平排列，如果需要子级垂直排列，
            则可以设置\`direction="vertical"\`。注意\`vertical\`可以简写为\`v\`

            ##### grow
            关于j-box的\`grow\`属性：它用于设置其子级j-box的宽/高（取决于\`direction\`属性的值）占比，默认\`grow\`是1，即默认
            每个子级j-box会1:1均分宽/高，如需控制子级j-box的宽/高比例，比如1:2，需要将第一个子j-box的\`grow\`设置为1，第二个设置为2。
            grow的值可以有小数点，使比例更精确。

            #### 内容溢出
            j-box内容溢出是自动产生滚动条的，因此，j-box里面的元素请尽量使用相对全局定位，或者把j-box尺寸设的足够大。

            #### 使用建议

            从功能上讲，j-box完全可以使用这个布局器替代栅格系统了，只要给\`grow\`属性一个数字就够了，无需记住bootstrap栅格系统里那么多的class名。
            但是任何事情没有是完美的，毕竟每个j-box背后都有一个组件实例，因此j-box会稍重一些，而栅格系统或者自行通过css实现的布局则是纯css，
            因此比j-box要轻量一些。

            综合起来，我们的建议是：**当视图比较复杂特别是需要在水平&垂直方向上同时进行布局的时候，采用j-box来布局；在视图很简单仅需要水平布局时，
            采用栅格或者自行css布局**，j-box和栅格系统是可以完美嵌套使用的。

            有个特殊情况，如果你不熟悉栅格系统，或者css用的不溜，那就尽管用j-box布局吧，只要适当的将页面切分成子模块，并用路由实现懒加载，
            那单模块视图上的j-box组件数量是有限的，数量控制在一二百个之内，即使在IE11等低性能浏览器上，也几乎没有差别的。
            我们测试过在页面上放6000个box，IE11上大概多花2~3s渲染。

        `,
        middleResizeLine: `
            ### resize-line

            这个demo展示了如何让resize line看起来在两个box中间。
        `
    }

    public codes = {
        form: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./form/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./form/demo.component.ts').default }
        ],
        justify: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./justify/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./justify/demo.component.ts').default }
        ],
        layout: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./layout/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./layout/demo.component.ts').default }
        ],
        middleResizeLine: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./middle-resize-line/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./middle-resize-line/demo.component.ts').default }
        ],
    }
}
