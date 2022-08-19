import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationTextService {
    public text = {
        introduction: `
            # Notification 通知提醒框

            全局展示操作反馈信息

            ## 使用场景

            可提供成功、信息提示、警告和错误反馈信息。

            ## 示例
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
