import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ButtonTextService {
    public text = {
        introduction: `
            # Button按钮

            按钮用于开始一个即时操作

            ## 使用场景

            标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

            ## 示例
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

            演示了按钮和Loading组件的无缝配合使用。
        `,
        withChartIcon: `
            ### 与chart-icon组合使用

            展示了按钮与chart-icon组合使用的各种使用场景。
        `,
        functional: `
            ### 功能按钮

            功能按钮一般用于删除等重要操作/不可恢复操作，弹出提示框中的确认操作按钮，参见模态框组件确认框中的使用。
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

    public codes = {
        key: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./key/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./key/demo.component.ts').default }
        ],
        primary: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./primary/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./primary/demo.component.ts').default }
        ],
        common: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./common/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./common/demo.component.ts').default }
        ],
        icon: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./icon/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./icon/demo.component.ts').default }
        ],
        iconText: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./icon-text/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./icon-text/demo.component.ts').default }
        ],
        loading: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./loading/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./loading/demo.component.ts').default }
        ],
        text: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./text/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./text/demo.component.ts').default }
        ],
        withChartIcon: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./with-chart-icon/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./with-chart-icon/demo.component.ts').default }
        ],
        functional: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./functional/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./functional/demo.component.ts').default }
        ],
        directive: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./directive/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./directive/demo.component.ts').default }
        ],
        login: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./login/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./login/demo.component.ts').default }
        ]
    }
}
