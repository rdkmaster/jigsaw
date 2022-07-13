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
        `,
        inDialog: `
            ## 菜单的弹出与关闭

            本demo主要用于测试上下文菜单在各种弹出场景下自动关闭的效果
        `,
        options: `
            ## 多级菜单

            本demo演示了jigsaw-cascading-menu指令实现多级菜单，展示了各个可用配置项及其效果，事件回调效果请查看控制台
        `,
        usage: `
            ## 菜单的典型用法

            本demo主要用于展示菜单的各种典型用法，起到抛砖引玉的目的
        `,
        navigation: `
            ## 可折叠导航菜单

            制作一个可以折叠的导航菜单
        `,
        navInline: `
            ## 内嵌导航菜单
        `
    }
}
