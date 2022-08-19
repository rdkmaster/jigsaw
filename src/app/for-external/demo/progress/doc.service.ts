import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressTextService {
    public text = {
        introduction: `
            # Progress 进度条

            展示操作的当前进度。

            ## 使用场景

            在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

            当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时。

            “进度条”与“加载中”的差别：“进度条”用于某个操作后对操作进度的反馈。如上传、导入、导出等；“加载中”用于信息在容器中的加载反馈。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        functional: `
            ### 四种状态
         `,
        textTop: `
            ### 文字在顶部
        `,
        textFollow: `
            ### 用于卡片的巨型进度条
        `,
        circle: `
            ## 圆形进度条
        `,
    }
}
