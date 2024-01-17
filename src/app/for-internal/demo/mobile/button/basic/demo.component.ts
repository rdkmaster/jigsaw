import { Component, OnInit, Renderer2 } from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class ButtonBasicDemoComponent implements OnInit {
    constructor(private _renderer: Renderer2) {

    }
    onClick() {
        alert('hello jigsaw button');
    }

    private _removeWindowResizeListener: Function;

    resize() {
        console.log((document.documentElement.clientWidth / 450) * 100);
        document.getElementsByTagName('html')[0].style.fontSize =
            (document.documentElement.clientWidth / 450) * 100 + 'px';
    }

    ngOnInit(): void {
        console.log((document.documentElement.clientWidth / 450) * 100);
        this._removeWindowResizeListener = this._renderer.listen(
            'window', 'resize', () => this.resize());
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '展示了按钮的3种使用场景。提示：使用button标签的方式可以与`form`结合使用，设置`type="submit"`。';
    description: string = '';
}
