import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BadgeTextService {
    public text: object = {
        introduction: `
            # Badge 徽标

            图标右上角的图形徽标数字。

            ## 使用场景

            通过醒目的视觉形式吸引用户处理，一般出现在通知图标的右上角。

            ## 示例
        `,
        basic: `
            ### 基础徽标

            这个DEMO演示了\`jigsaw-badge\`指令的简单用法，支持将文本、数字、图标等内容作为徽标的内容，也支持边框和背景，还支持偏移微调徽标的位置。
        `,
        mask: `
            ### 角标加背景色

            这个DEMO详细演示了\`jigsaw-badge\`指令角标加背景色的用法和效果，注意区分深浅色。
        `,
        maxValue: `
            ### 输入大于最大数字限制的情况

            这个DEMO详细演示了jigsaw-badge指令在输入大于的最大数字限制时如何显示。
        `,
        position: `
            ### 位置

            这个DEMO详细演示了jigsaw-badge指令的各个位置的用法
        `,
        status: `
            ### 状态

            这个DEMO详细演示了jigsaw-badge指令的各种状态
        `,
        move: `
            ### move

            当一个对象既可以拖动又可以单击时，需要一些技巧来这两个操作带来的避免冲突。
        `,
        style: `
            ### 样式

            这个DEMO演示了\`jigsaw-badge\`指令的三种样式的使用方法。
        `,
        offset: `
            ### offset

            这个DEMO详细演示了\`jigsaw-badge\`指令的各个位置的用法。
        `
    }
}
