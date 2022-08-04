import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TabTextService {
    public text: object = {
        introduction: `
            # Tabs 选项卡

            ## 示例
        `,
        basic: `
            ### 基础选项卡

            此demo主要描述tab的基本用法，包括如何使用渲染器来丰富tab头

            #### lazy延迟加载内容

            jigsaw-tab-pane有个\`lazy\`布尔型属性，用来控制内容的加载形式。
             - 为\`true\`时表示延迟加载，即对应的tab激活时，才把内容加载出来；
             - 为\`false\`时，组件初始化时就加载；
             - 默认\`lazy\`的值是\`true\`，即采用延迟加载的形式。

            tab内容被加载后，即使切换到其他tab，内容也不会销毁，数据依旧保留。
        `,
        editable: `
            ### 可编辑的tab
        `,
        background: `
            ### 与背景色融合

            此demo展示通过设置backgroundColor属性，达到页签与背景色完美融合在一起的效果。
        `,
        headless: `
            ### 隐藏tab的页签部分

            将tab的页签部分隐藏起来，在某些场景下，可以实现定制性更高的视图，或者将tab作为一个视图叠加容器来使用
        `,
        hideShow: `
            ### 隐藏Tab
        `,
        titleRenderer: `
            ### 标题渲染器
        `,
        type: `
            ### Tab类型
        `,
        tabBar: `
            ### 独立的tab-bar
        `,
        manySteps: `
            ### 步骤数量极端的情况

            演示当步骤数较多和较少等极端情况下展示效果
        `
    }
}
