import {Injectable} from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ButtonTextService {
    public text: object = {
        introduction: `
            # Button按钮

            按钮用于开始一个即时操作

            ## 使用场景

            标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

            ## 示例

            按钮分为三种尺寸
            标准按钮（默认），用于空间较宽裕，如一般的表格上方操作按钮，表单提交、模态框的按钮等。最小宽度为80px（通过配置样式可去掉按钮的最小宽度），高度为32px。按钮之间左右间隔8px。
            小按钮，用于页面空间相对狭窄，控件较多的情况或轻量级表格（行高50px以上的表格）。最小宽度为60px（通过配置样式可去掉按钮的最小宽度），高度为28px。作为表格中按钮间距4px，其他使用场景间距8px。
            超小按钮，用于排版紧凑的区域或密集型表格（行高40px）中。最小宽度为60px（通过配置样式可去掉按钮的最小宽度），高度为24px。作为表格中按钮间距4px，其他使用场景间距8px。
        `,
        key: `
            ### 关键按钮

            关键按钮在页面中起操作指引的作用。通常在页面标题下方使用。
            操作指引作用：当用户对界面不熟悉或界面数据为空时，将页面中此时用户最需要的按钮设为关键按钮，能起到引导用户操作的作用，目前系统中一般用到的是新建、导入（页面中没有新建功能，需要导入数据才能在页面上呈现内容）功能。
        `,
        primary: `
            ### 重点按钮

            重点按钮一般配合普通按钮作为一组的形式呈现。通常在页面底部。
            重点按钮使有较强的视觉效果突出显示。如表单、模态框中的“确定”、“取消”一组按钮，“确定”使用重点按钮，“取消”使用普通按钮。
        `,
        common: `
            ### 普通按钮

            页面中使用频度一般，常用于一般功能操作按钮。鼠标悬浮时边框有颜色变化；鼠标点击时有颜色变化；按钮有禁用状态。
        `,
        icon: `
            ### 图标按钮

            图标按钮用于功能重要性或使用频率较弱的按钮，视觉层次上弱于普通按钮。按钮使用Tooltip释义。
        `,
        iconText: `
            ### 图标+文字按钮
        `,
        loading: `
            ### Loading按钮

            演示了按钮和Loading组件的无缝配合使用
        `,
        withChartIcon: `
            ### 与chart-icon组合使用

            展示了按钮与chart-icon组合使用的各种使用场景。
        `,
        functional: `
            ### 功能按钮
        `,
        directive: `
            ### 指令按钮
        `,
        text: `
            ### 文字按钮
        `,
        login: `
            ### 登录按钮
        `
    }
}
