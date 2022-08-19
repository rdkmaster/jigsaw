import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BadgeTextService {
    public text = {
        introduction: `
            # Badge 多功能徽标

            通过醒目的视觉形式吸引用户处理，一般出现在通知图标的右上角。

            ## 示例
        `,
        basic: `
            ### 基础用法

            这个DEMO演示了\`jigsaw-badge\`指令的简单用法，支持将文本、数字、图标等内容作为徽标的内容，也支持边框和背景，还支持偏移微调徽标的位置。
        `,
        mask: `
            ### 角标加背景色

            这个DEMO详细演示了\`jigsaw-badge\`指令角标加背景色的用法和效果，注意区分深浅色。
        `,
        maxValue: `
            ### 封顶数字

            这个DEMO详细演示了\`jigsaw-badge\`指令在输入大于的最大数字限制时如何显示。

            超过数字限制会显示"+"，数字限制可配置。
        `,
        status: `
            ### 状态

            这个DEMO详细演示了jigsaw-badge指令的各种状态。
        `,
        style: `
            ### 样式

            这个DEMO演示了\`jigsaw-badge\`指令的三种样式的使用方法。
        `,
        offset: `
            ### 位置偏移

            这个DEMO详细演示了\`jigsaw-badge\`指令的各个位置的用法。
        `
    }
}
