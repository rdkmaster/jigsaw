import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavigationMenuTextService {
    public text: object = {
        introduction: `
            # Navigation Menu 导航菜单

           为页面和功能提供导航的菜单列表。

            ## 使用场景

            用户通过导航菜单切换不同的页面，完成页面之间的跳转。

            ## 示例
        `,
        menu: `
            ### 一级菜单
        `,
        submenu: `
            ### 二级子菜单
        `,
        fold: `
            ### 默认折叠
        `,
        withBadge: `
            ### 带徽标
        `,
    }
}
