import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ProcessStatusTextService {
    public text: object = {
        introduction: `
            # Progress Status流程图

            ## 示例
        `,
        basic: `
            ### 基本用法

            本demo演示了jigsaw-process-status组件最简单的用法，所有配置项都用默认
        `,
        customIcons: `
            ### 自定义图标
            本demo演示了jigsaw-steps组件自定义状态ICON图的方法
         `,
        statusInteractive: `
            ### 含交互
            本demo演示了如何配合trustedHtml对用户提供交互的例子
        `,
        statusMultiline: `
            ### 多线的状态
            本demo演示了 jigsaw-process-status-multiline 组件最简单的用法
        `,
        vertical: `
            ### 垂直排列
            本demo演示了 jigsaw-process-status 垂直排列的效果
        `,
    }
}