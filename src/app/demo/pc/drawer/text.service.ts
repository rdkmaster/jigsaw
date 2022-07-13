import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DrawerTextService {
    public text: object = {
        introduction: `
            # Drawer 抽屉

            ## 使用场景

            需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用抽屉在当前页面边缘打开一个弹框，承载相应的操作。与弹出框相比，抽屉承载的操作内容相对较多。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        withDiv: `
            ### Drawer with DIV

            - \`container\`属性可以支持'.className'、'#id'、'[attr]'、'tagName'，向上寻找离抽屉最近的。

            - \`position\`为left或者right时，只有\`offsetTop\`和\`offsetBottom\`能生效； 为top或者bottom时，只有\`offsetLeft\`和\`offsetRight\`能生效。

            - \`width\`属性设置为'auto'，并且\`offsetLeft\`属性或者\`offsetRight\`属性设置有值，
            例如设置为30px，则在抽屉内部，自动会将\`width\`属性的值转为calc(100% - 30px)，如果\`offsetLeft\`
            和\`offsetRight\`属性的值均没有设置，则\`width\`属性当做没有设置处理。对于\`height\`属性
            设置为'auto'的时候，配合\`offsetTop\`与\`offsetBottom\`属性值的设置也做类似处理。
        `,
        withScrollbar: `
            ### 内容撑出滚动条

            注意：容器上是不允许产生滚动条的，如果内容太长出现滚动条，请在内容的外面套一个wrapper，设置滚动样式
        `,
        withTab: `
            ### Drawer with Tabs
        `,
        inDom: `
            ### 文档流中的抽屉

            将抽屉直接放到文档流中，可以实现抽屉拉开始，将旁边的视图挤开
        `,
        drawInDraw: `
            ### Drawer in Drawer
        `
    }
}
