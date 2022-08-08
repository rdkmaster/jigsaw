import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuTextService {
    public text: object = {
        introduction: `
            # Menu 菜单

           为页面和功能提供导航的菜单列表。

            ## 使用场景

            用户通过导航菜单切换不同的页面，完成页面之间的跳转。

            ## 示例
        `,
        softmenu: `
            ### 软件菜单

            一般用于屏幕或者对话框顶部，作为功能菜单使用。
        `,
        horizontalNavigation: `
            ### 水平导航菜单

            一般用于屏幕顶部，作为一级水平导航栏使用。
        `,
        inDialog: `
            ### 菜单的弹出与关闭

            本demo主要用于测试上下文菜单在各种弹出场景下自动关闭的效果
        `,
        withButton: `
            ### 与按钮组合

            两种风格：
            -风格1：单击按钮直接弹出菜单
            -风格2：单击按钮直接执行操作，单击箭头出下拉菜单
        `,
        dropDown: `
            ### 下拉菜单

            一般用于视图内部。
        `,
        rightClick: `
            ### 鼠标右击
        `,
        inDrawer: `
            ## 抽屉中使用的二级子菜单
        `,
        navInline: `
            ## 内嵌导航菜单
        `
    }
}
