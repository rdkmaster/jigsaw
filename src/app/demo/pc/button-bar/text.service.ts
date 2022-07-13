import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ButtonBarTextService {
    public text: object = {
        introduction: `
            # Button-bar 分段选择器

            为页面和功能提供导航的列表。

            ## 使用场景

            分段选择器用于在同一个页面空间占用下的内容切换。

            ## 示例
        `,
        basic: `
            #### 基础分段选择器

            分段选择器作为二级选项卡使用，也用于单选场景。
        `,
        blue: `
            #### 蓝底分段选择器

            适用于类似gis场景，背景影响分段选择器选中状态的可识别性的时候，可使用蓝底分段选择器。
        `,
        height: `
            #### 直接设置height
        `
    }
}
