import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class TrustedHtmlTextService {
    public text = {
        introduction: `
        # Trusted Html 富文本渲染器

        ## 用途
        这个指令一般用于可复用复杂组件的内部，将组件外部输入的富文本展示到页面上。与 \`[innerHtml] 不同的是，
        \`[trustedHtml]\` 指令不对html文本的安全性做校验，保留了所有可能有安全隐患的属性和功能，
        得益于此，就可以将输入的html中的事件的回调函数保留下来，从而让组件具备更多用户自定义的能力。
        这是一个高级功能，如果你需要定义一个可复用的组件，那么你可能会需要用到这个指令，否则，一般不需要使用到它。

        需要注意的是，由于绕过了安全检查而直接将html直接插入页面里，这给黑客对我们发起XSS攻击制造了便利，
        因此，请务必确认输入的html文本的来源是可信的之后再使用此指令。这也就是这个指令名字中trusted单词的本意所在了。

        下面这个demo演示了一段带有回调函数的html文本（即这就是组件的输入），并且如何将回调函数与当前组件的内部逻辑绑定的过程。
        你可以直接编辑html文本以及对应的回调函数，测试一下效果。注意html中的所有回调函数都是以 \`[trustedHtmlContext]\`
        的对象实例里作为计算上下文的。建议你打开这个demo的源码看看，应该对你理解这些话会有所裨益。
        你可以在下方js文本框中多定义几个函数，然后在html框中试着去调用他们。

        ## 关于 \`[trustedHtmlContext]\` 属性
        \`[trustedHtmlContext]\` 被 trustedHtml 指令用做计算所有的回调函数的上下文，并且它也被用做这些回调函数内部this指针的值
        这个demo为了方便将 \`[trustedHtmlContext]\` 的值设置为一个普通的变量，实际使用时，我们推荐将当前组件的引用直接当做上下文
        例如：
        \`\`\`
       <div [trustedHtml]="html" [trustedHtmlContext]="this"></div>
        \`\`\`
        我们直接在html模板中使用this作为 \`[trustedHtmlContext]\` 的值，在html模板中的this就是组件对应的class的实例。
        这样的话，我们在定义html字符串中的回调函数的时候，就可以像定义普通的angular事件的回调函数一样了，是不是非常方便？
        为了说明这一点，你可以将JS源码文本框的值改为字符串
        \`\`\`
        this.context = this
        \`\`\`
        随后点击“say hello to trustedHtml”链接试试看。

        ## 示例
        `,
        basic: `
        ### 基本用法

        这是一个指令，用于将一段html文本插入到某个DOM元素中，是 Angular 内置指令 \`[innerHtml]\` 的火力增强版。`,

    }
}
