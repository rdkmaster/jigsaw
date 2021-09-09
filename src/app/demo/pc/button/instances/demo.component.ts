import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles:[
        `
            .jigsaw-header-host:not(:first-of-type) {
                margin-top: 20px;
            }
        `
        ]
})
export class ButtonInstancesDemoComponent {
    disabled: boolean = false;

    onClick() {
        alert('Hello Jigsaw Button ^_^');
    }

    public selectedSize;
    sizes = ["small", "default", "large"];

    constructor() {
        this.selectedSize = "default";
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '展示了按钮的3种使用场景。提示：使用button标签的方式可以与`form`结合使用，设置`type="submit"`。';
    description: string = '';
}
