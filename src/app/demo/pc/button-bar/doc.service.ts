import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ButtonBarTextService {
    public text: object = {
        introduction: `
            # Button-bar 按钮栏

            为页面和功能提供导航的列表。

            ## 使用场景

            分段选择器用于在同一个页面空间占用下的内容切换。

            ## 示例
        `,
        objectsArray: `
            ###  对象数组
        `,
        stringArray: `
            ### 字符串数组
        `,
        colorType: `
            ### color-type
        `,
        icons: `
            ### 带图标按钮栏
        `,
        multipleChoice: `
            ### 多选
        `,
        setHeight: `
            #### 直接设置height
        `
    }
}
