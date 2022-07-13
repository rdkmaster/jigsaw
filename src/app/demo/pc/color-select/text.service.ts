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
        `,
        basic: `
            ## 基本用法

            这个DEMO详细演示了\`jigsaw-color-select\`组件的各个参数的效果以及推荐的用法。
        `,
        mode: `
            ## 选色模式

            这个DEMO详细演示了\`jigsaw-color-select\`组件的两种不同选择颜色的模式
        `
    }
}
