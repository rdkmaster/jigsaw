import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InputTextService {
    public text = {
        introduction: `
            # Input 输入框

            用于显示、输入、编辑文本或数值。

            ## 使用场景

            文本框（标签+输入框）；主要分两种形式：单行文本框、多行文本框。
            在输入框中单击鼠标会出现插入光标，我们可以直接在输入框中输入文字或文本信息。

            ## 示例
        `,
        basic: `
            ### 基础用法

            单行文本框默认高度为大尺寸32px，长度根据实际内容设定，同一个表单中输入框尽量保持整齐；
            中尺寸单行文本框高度为28px；
            小尺寸单行文本框高度为24px。
        `,
        password: `
            ### 密码输入框

            根据业务需求，可选择使用一般密码输入框或带显示/隐藏密码功能的输入框。
        `,
        clearable: `
            ### 关闭清除功能
        `,
        focus: `
            ### 获取焦点
        `,
        icons: `
            ### 加入图标，并有交互

            使用控件的输入输出属性，设定图标并监听点击事件。
        `,
        prefixSuffix: `
            ### 组合输入框
        `
    }
}
