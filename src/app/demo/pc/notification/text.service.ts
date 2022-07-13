import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationTextService {
    public text: object = {
        introduction: `
            # Notification 通知提醒框

            全局展示操作反馈信息

            ## 使用场景

            可提供成功、信息提示、警告和错误反馈信息。

            ## 示例

            全局提示分为基础全局提示、带操作的全局提示、超长全局提示和内容样式可编辑的全局提示。

            当有多个提示同时出现时，由上向下依次出现，最新的在现有通知的上方，直到浏览器第一屏底部。若超过一屏，用户删除了上面的，下面的往上顶。

            当需要手动关闭的提示数量超过一屏时，顶端显示批量关闭的卡片，告知用户所有提示数量，用户可通过【全部关闭】按钮忽略所有提示。
        `,
        basic: `
            ### 基础用法

            这个demo介绍了通知提醒框的4种基础类型。
        `,
        diposeOnRouterChanged: `
            ### 路由变化的情况

            这个demo介绍了控制是否在路由变化时自动关掉弹出的提示框。

            提示：有的消息框上可能会带有交互逻辑，而这些交互逻辑往往只在某个路由下才有效，当用户离开此路由后，再触发这些交互逻辑则会出现BUG，
            现在只要打开\`disposeOnRouterChanged\`属性，消息框内部会在路由发生变化时自动关闭自身，而无需应用自行实现；
        `,
        full: `
            ### 例子

            这个DEMO详细演示了\`j-notification\`组件的各个参数的效果以及推荐的用法。
        `
    }
}
