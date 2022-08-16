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
        `,
        functional: `
            ### 基础全局提示

            这个demo介绍了通知提醒框的5种基础类型。
        `,
        advanced: `
            ### 带操作的全局提示
        `
    }
}
