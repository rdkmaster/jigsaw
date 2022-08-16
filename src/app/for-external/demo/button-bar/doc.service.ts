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

            按钮栏用于在同一个页面空间占用下的内容切换。

            ## 示例
        `,
        objectsArray: `
            ###  对象数组

            按钮栏的数据是对象数组。
        `,
        stringArray: `
            ### 字符串数组

            按钮栏的数据是字符串数组。
        `,
        colorType: `
            ### Color Type
        `,
        icons: `
            ### 带图标按钮栏
        `,
        multipleChoice: `
            ### 可多选
        `,
        setHeight: `
            #### 直接设置height
        `
    }
}
