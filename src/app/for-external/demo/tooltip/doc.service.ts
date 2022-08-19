import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TooltipTextService {
    public text = {
        introduction: `
            # Tooltip 多功能提示

            点击/鼠标移入元素，弹出气泡式的卡片浮层。

            ## 使用场景

            当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现

            ## 示例
        `,
        basic: `
            ### 基础用法

            鼠标移入则显示提示，移出消失，气泡浮层可以承载复杂文本和操作。
        `,
        html: `
            ### 渲染为html

            这个demo演示了Tooltip将内容渲染为html的效果，以及如何在html里添加简单的交互动作
        `,
        trigger: `
            ### 触发方式

            这个demo演示了如何通过编程的方式打开一个tooltip，并跟踪其开关状态
        `,
        scenes: `
            ### 特殊场景
        `
    }
}
