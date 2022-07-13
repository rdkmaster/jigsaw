import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CollapseTextService {
    public text: object = {
        introduction: `
            # Collapse 折叠

            可以折叠/展开的内容区域。

            ## 使用场景

            对复杂区域进行分组和隐藏，保持页面的整洁。

            一般将操作频率稍低和复杂的功能隐藏起来，可保持页面的整洁，突出页面的其他重点功能。

            ## 示例
        `,
        basic: `
            ### 基础用法

            演示了\`JigsawCollapse\`多个属性的基本用法
        `,
        withNgfor: `
            ### 创建多个折叠子页

            演示了如何通过ngFor指令动态创建多个折叠子页
        `,
        full: `
            ### JigsawCollapse的效果

            演示了JigsawCollapse的效果
        `
    }
}
