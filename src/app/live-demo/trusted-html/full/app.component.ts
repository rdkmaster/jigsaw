import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class TrustedHtmlFullComponent {
    html = this.stripPrefixSpaces(`
        <a onclick="hello('trustedHtml directive')">
            <i class="fa fa-question"></i> say hello to trustedHtml
        </a><br>
        <!-- 需要去掉下面js代码框中onFocus()函数的注释才能看到效果 -->
        <input onblur="onBlur()" value="focus this input and then make it lose focus">
    `);
    jsCode = this.stripPrefixSpaces(`
        function hello(who) {
            alert('hello ' + who);
        }
        // function onBlur() {
        //     alert('the input has focused!');
        // }
     `);
    context = {};

    constructor() {
        this.onCodeChange(this.jsCode);
    }

    onCodeChange(code) {
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
            console.log(this.context);
        });
    }

    stripPrefixSpaces(source: string): string {
        const lines = source.split(/\n/g);
        source = '';
        lines.forEach(line => source += line.substring(8) + '\n');
        return source.trim();
    }
}

