import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonBasicDemoComponent {
    onClick() {
        alert('hello jigsaw button');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '展示了按钮的3种使用场景。提示：使用button标签的方式可以与`form`结合使用，设置`type="submit"`。';
    description: string = '';
}

