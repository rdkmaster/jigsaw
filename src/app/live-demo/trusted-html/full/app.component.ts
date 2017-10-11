import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class TrustedHtmlFullComponent {
    showDetail:boolean = false;
    html = this.stripPrefixSpaces(`
        <a onclick="hello('trustedHtml directive')">
            <i class="fa fa-question"></i> say hello to trustedHtml
        </a><br><br>
        <input onblur="onBlur()" value="onblur....">
    `);
    jsCode = this.stripPrefixSpaces(`
        this.context = {
            hello: who => alert('hello ' + who),
            onBlur: () => alert('the input has lost focus!')
        }
     `);

    /**
     * 这个context变量是整个demo最需要关注的一部分，我们将它作为 [trustedHtmlContext] 的输入传递给了 trustedHtml 指令
     * [trustedHtmlContext] 被 trustedHtml 指令用做计算所有的回调函数的上下文，并且它也被用做这些回调函数内部this指针的值
     * 这个demo为了方便将 [trustedHtmlContext] 的值设置为一个普通的变量，实际使用时，我们推荐将当前组件的引用直接当做上下文
     * 例如 <div [trustedHtml]="html" [trustedHtmlContext]="this"></div>
     * 我们直接在html模板中使用this作为 [trustedHtmlContext] 的值，在html模板中的this就是组件对应的class的实例。
     * 这样的话，我们在定义html字符串中的回调函数的时候，就可以像定义普通的angular事件的回调函数一样了，是不是非常方便？
     * 为了说明这一点，你可以将JS源码文本框的值改为字符串"this.context = this"，随后点击“say hello to trustedHtml”链接试试看。
     */
    context:any;

    constructor() {
        this.onCodeChange(this.jsCode);
    }

    onCodeChange(code) {
        try {
            eval(code);
        } catch (e) {
            console.error('syntax error: ' + e);
        }
    }

    stripPrefixSpaces(source: string): string {
        const lines = source.split(/\n/g);
        source = '';
        lines.forEach(line => source += line.substring(8) + '\n');
        return source.trim();
    }

    jigsaw = 'jigsaw';

    /**
     * 将JS源码文本框的值改为字符串"this.context = this"，则会将这个类的实例作为trustedHtml的上下文，那么html文本中的hello()函数
     * 相应的也就指向了下面这个方法了。注意到我们在方法内部还同时引用到了this是的其他属性，这也是没有问题的。
     */
    hello() {
        // notice that we are referencing a member property of this class!
        alert('great! you are using trustedHtml directive with the best way ' +
            'recommended by the ' + this.jigsaw + ' team.');
    }

    onBlur() {
        this.hello();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这是一个指令，用于将一段html文本插入到某个DOM元素中，是 Angular 内置指令 `[innerHtml]` 的火力增强版。';
    description: string = require('!!raw-loader!./readme.md');
}

