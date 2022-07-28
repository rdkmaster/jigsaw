import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorSelectTextService {
    public text: object = {
        introduction: `
            # Color Select 颜色选择

            用于对颜色的选取。

            ## 使用场景

            通过移动取色器选取颜色。

            输入色值来定义颜色。

             ## 基本用法
        `,
        basic: `
           ### 自动模式

            这个DEMO详细演示了\`jigsaw-color-select\`组件中自动提交色值的用法。
        `,
        confirm: `
            ### 手动模式

            这个DEMO详细演示了\`jigsaw-color-select\`组件中自动提交色值的用法。
        `,
        limited: `
            ### limited 模式
             这个DEMO详细演示了\`jigsaw-color-select\`组件中limit模式的用法。
        `,
        noAlpha: `
           ### 无透明度
        `,
    }
}
