import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextareaTextService {
    public text: object = {
        introduction: `
            # Textarea 多行文本框

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        clearable: `
            ### 关闭清除功能
        `,
        maxLength: `
            ### 限制30个字符（默认不包含回车换行符）
        `,
        resize: `
            ### 可伸缩

            此Demo演示了textarea组件的可动态调整尺寸的效果，在启用动态调整尺寸时，组件的尺寸单位只能支持px和vw/vh，不支持%。
        `,
        select: `
            ### 自动选中文本
        `
    }
}
