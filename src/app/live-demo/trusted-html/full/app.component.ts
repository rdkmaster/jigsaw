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
        </a><br>
        <!-- 需要去掉下面js代码框中onBlur()函数的注释才能看到效果 -->
        <input onblur="onBlur()" value="onblur....">
    `);
    jsCode = this.stripPrefixSpaces(`
        function hello(who) {
            alert('hello ' + who);
        }
        // function onBlur() {
        //     alert('the input has lost focus!');
        // }
     `);

    /**
     * 这个context变量是整个demo最需要关注的一部分，我们将它作为 [trustedHtmlContext] 的输入传递给了 trustedHtml 指令
     * [trustedHtmlContext] 被 trustedHtml 指令用做计算所有的回调函数的上下文，并且它也被用做这些回调函数内部this指针的值
     * 这个demo为了方便将 [trustedHtmlContext] 的值设置为一个普通的变量，实际使用时，我们推荐将当前组件的引用直接当做上下文
     * 例如 <div [trustedHtml]="html" [trustedHtmlContext]="this"></div>
     * 我们直接在html模板中使用this作为 [trustedHtmlContext] 的值，在html模板中的this就是组件对应的class的实例。
     * 这样的话，我们在定义html字符串中的回调函数的时候，就可以像定义普通的angular事件的回调函数一样了，是不是非常方便？
     * 为了说明这一点，你可以将JS源码文本框的值改为字符串this，随后点击“say hello to trustedHtml”链接试试看。
     */
    context:any;

    constructor() {
        this.onCodeChange(this.jsCode);
    }

    onCodeChange(code) {
        if (code == 'this') {
            this.context = this;
            return;
        }

        this.context = {};
        const functions = code.match(/^\s*function\s+[_$a-z][_$a-z0-9]*\s*\(.*?\)\s*{[\s\S]*?}/igm);
        functions.forEach(func => {
            const funcName = func.match(/function\s+([_$a-z][_$a-z0-9]*)/i)[1];
            try {
                this.context[funcName] = eval(`(function() { return ${func} })()`);
                console.log(`function "${funcName}" is added to the context`);
            } catch(e) {
                console.log('syntax error:');
                console.log(func.replace(/\n/g, ''));
            }
        });
    }

    stripPrefixSpaces(source: string): string {
        const lines = source.split(/\n/g);
        source = '';
        lines.forEach(line => source += line.substring(8) + '\n');
        return source.trim();
    }

    jigsaw = 'jigsaw';

    hello() {
        // notice that we are referencing a member property of this class!
        alert('great! you are using trustedHtml directive with the best way ' +
            'recommended by the ' + this.jigsaw + ' team.');
    }
}

