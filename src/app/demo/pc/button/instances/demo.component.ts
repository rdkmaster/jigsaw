import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles:[`
        .jigsaw-header-host:not(:first-of-type) {
            margin-top: 20px;
        }
    `]
})
export class ButtonInstancesDemoComponent {
    public disabled: boolean = false;
    public selectedSize: string;
    public sizes = ["small", "default", "large"];

    onClick() {
        alert('Hello Jigsaw Button ^_^');
    }

    constructor() {
        this.selectedSize = "default";
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '展示了按钮的各种使用场景，以及各种不同形式。';
    description: string = '';
}
