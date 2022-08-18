import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DialogTextService {
    public text: object = {
        introduction: `
            # Dialog 对话框

            需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用弹框承载相应的操作。

            ## PopopService
             \`PopupService\`是[Jigsaw](https://github.com/rdkmaster/jigsaw)的基础弹出服务，所有弹出的场景，都是由这个服务来完成的。

            已知的场景有：
            - [普通对话框](#/demo/dialog)
            - [Alert对话框](#/demo/alert)
            - 菜单
                - 上下文菜单
                - 导航菜单
            - Notification提示框
            - [combo-select组件](#/demo/combo-select)
            - [select组件](#/demo/select)
            - [loading组件](#/demo/loading)
            - tooltip相关功能
                - [tooltip指令](#/demo/tooltip)
                - [tooltip对话框](#/demo/tooltip)

            可以看到\`PopupService\`在[Jigsaw](https://github.com/rdkmaster/jigsaw)中扮演着一个非常重要的角色，
            多多了解\`PopupService\`这个服务对在[Jigsaw](https://github.com/rdkmaster/jigsaw)中处理好弹出场景有很大的帮助。

            #### 用法

            首先，和普通的服务一样，你需要将\`PopupService\`注入到你的组件中去：

            \`\`\`
            constructor(private popupService: PopupService) {
            }
            \`\`\`

            然后你就可以通过\`this.popupService\`变量来使用\`PopupService\`了：

            \`\`\`
            this.popupService.popup(...);
            \`\`\`

            \`PopupService\`只提供了\`popup()\`这一个方法，它接受3个参数：
            - \`what\`：必选参数，被弹出的视图，可以是一个组件，也可以是一个\`ng-template\`对象。**\`what\`参数指定的是一类视图，而不是一个视图的实例**。
            - \`options\`：可选参数，用于控制弹出视图的各种参数，包括是否模态、弹出位置、视图尺寸、弹出动画等等，\`PopupService\`能够覆盖所有弹出场景，
            很大程度上得益于这个参数的强大扩展性，熟悉这个参数的各个属性对是否能够用好\`PopupService\`有着决定性的影响。
            关于这个参数的所有知识，都在[这里](/components/api/class/PopupOptions)。
            - \`initData\`：可选参数，只在\`what\`参数是一个组件时有效。这个对象会被赋值给组件实例中的\`initData\`属性，
            可以参考本页中弹出对话框组件的代码，注意该demo的控制台打印。

            ## 示例
        `,
        component: `
            ### 以组件方式弹出对话框
        `,
        modal: `
            ### 模态框
        `,
        template: `
            ### 以模板方式弹出对话框
        `,
        customize: `
            ### 以自定义方式弹出对话框
        `,
        topOffset: `
            ### 对话框弹出位置

            这个demo演示了如何使用top属性来控制弹出的对话框的位置。

            多数弹出式的对话框不需要精确控制弹出的位置，只要居中即可，某些场景需要水平居中，垂直控制，这个属性就是为了满足这个场景。
            - 不提供这个属性则对话框完全居中，这是多数情况下就够用了；
            - 有时候我们需要控制对话框垂直上的位置，则可以通过这个属性来控制，支持百分比或者像素值；
        `,
        inDom: `
            ### 用在dom中

            jigsaw-dialog也是一个普通的组件，可以直接用在dom中。
        `,
        popupOption: `
            ### 弹框选项
        `,
        basic: `
            ### 普通对话框

            这个demo介绍了弹出对话框四个方位弹出的绝对位置：靠上、靠左、靠右、靠下。
        `,
        point: `
            ### 跟随鼠标的对话框
        `,
    }
}
