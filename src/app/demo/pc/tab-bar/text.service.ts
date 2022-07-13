import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TabBarTextService {
    public text: object = {
        introduction: `
            # Tab 选项卡

            为页面和功能提供导航的列表。

            ## 使用场景

            选项卡用于在同一个页面空间占用下的内容切换，分为页签、标签两种。
            Jigsaw的Tab页签可以脱离tab容器，独立出来使用。

            ## 示例
        `,
        basicTab: `
            #### 基础选项卡

            页签选项卡、标签选项卡为一级选项卡。
        `,
        textInBasic: `
             这里演示的是独立的 tab bar 与一个独立的tab容器配合使用的方法，tab bar与tab容器相互独立后，就可以做出更加复杂灵活的布局效果了，甚至你可以把tab bar放在tab容器的下面，达成页签在下容器在上的效果
        `,
        editable: `
            #### 新增选项卡
        `,
        type: `
            #### 选项卡类型
        `,
        background: `
            #### 设置背景颜色

            此demo展示通过设置backgroundColor属性，达到页签与背景色完美融合在一起的效果。
        `
    }
}
