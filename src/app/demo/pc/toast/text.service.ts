import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastTextService {
    public text: object = {
        introduction: `
            # Toast 及时消息

            前台操作反馈，与后台无交互的场景使用（如可视化编辑等）。

            ## 使用场景

            提供成功、信息提示、警告、错误四种类型的反馈信息。

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        toastSet: `
            ### Toast配置
        `
    }
}
