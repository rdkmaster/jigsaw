import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TagTextService {
    public text: object = {
        introduction: `
            # Tag 标签

            标记类型、分类和内容的小标签。

            ## 使用场景

            标记事物的属性、维度、类型等。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        presetColor: `
            ### 内置颜色
        `,
        customColor: `
            ### 定制颜色
        `,
        selectable: `
            ### 选中效果

            设置selectedColor属性可以让Tag在选中后，自动切换为此属性指定的颜色，从而形成一种被选中的效果
        `,
        addRemove: `
            ### 添加删除标签

            添加[isAdd]="true"来设置Tag为Add状态，本demo最多可添加5个Tag，注意观察disabled效果
        `,
        withIcon: `
            ### 带图标
        `
    }
}
