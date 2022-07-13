import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DialogTextService {
    public text: object = {
        introduction: `
            # Dialog 对话框

            包含模态与非模态弹出框。

            ## 使用场景

            需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用弹出框在当前页面正中打开一个浮层，承载相应的操作。

            ## 规范
            - 弹出框始终悬浮于页面之上，模态弹出框的下方产生半透明的蒙层(color:#666 opacity:0.5)，关闭弹出框后，弹出框和蒙层消失。非模态弹出框中无须遮罩，且可以在弹框下层界面操作。
            - 普通弹出框宽度最小为480px，最大为1000px。
            - 使用表单时，需在弹出框底部区域（.modal-footer）设置表单按钮，请查看普通对话框，提供了外部按钮触发表单校验以及获取表单数据的方法示例。
            - 弹出框中使用下拉选取，日期（范围）选择器组件时，需设置dropdownContainer="body"和scrollSelectors=[".modal-body"]，保证下拉面板不被遮挡。

            ## PopopService
             \`PopupService\`是[Jigsaw](https://github.com/rdkmaster/jigsaw)的基础弹出服务，所有弹出的场景，都是由这个服务来完成的。

            已知的场景有：
            - [普通对话框](#/pc/dialog/buttons)
            - [Alert对话框](#/pc/alert/popup)
            - 菜单
                - 上下文菜单
                - 导航菜单
            - Notification提示框
            - [como-select组件](#/pc/combo-select/full)
            - [select组件](#/pc/select/basic)
            - [loading组件](#/pc/loading/full)
            - tooltip相关功能
                - [tooltip指令](#/pc/tooltip/inline)
                - [tooltip对话框](#/pc/tooltip/dialog)

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
            可以参考[这个demo](#/pc/dialog/misc)中弹出对话框组件的代码，注意该demo的控制台打印。

            ## 示例
        `,
        misc: `
            ### 弹出的三种方式

            这个demo介绍了弹出对话框的3种主要方式：组件、模板、自定义
        `,
        title: `
            ### 设置对话框标题
        `,
        buttons: `
            ### 利用PopupService弹出一个对话框
        `,
        top: `
            ### 控制对话框位置

            这个demo演示了如何使用top属性来控制弹出的对话框的位置。

            多数弹出式的对话框不需要精确控制弹出的位置，只要居中即可，某些场景需要水平居中，垂直控制，这个属性就是为了满足这个场景。
            - 不提供这个属性则对话框完全居中，这是多数情况下就够用了；
            - 有时候我们需要控制对话框垂直上的位置，则可以通过这个属性来控制，支持百分比或者像素值；
        `,
        popupOption: `
            ### 选项设置
        `,
        inDom: `
            ### 用在dom中
        `,
        height: `
            ### 设置对话框高度

            这个demo演示了如何使用height属性来控制弹出的对话框的高度。

            一般dialog不设高度，dialog会随内容撑开，设置了高度，用户可以在自定义的content中加\`style="height: 100%"\`，使内容撑满dialog-content
        `,
        absolutePosition: `
            ### 对话框弹出的绝对位置

            这个demo介绍了弹出对话框四个方位弹出的绝对位置：靠上、靠左、靠右、考下
        `
    }
}
