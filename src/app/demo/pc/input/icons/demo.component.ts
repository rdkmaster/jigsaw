import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class InputPrefixIconDemoComponent {

    @ViewChild('myInput1') myInput: JigsawInput;

    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }

    public preIcons: string[] = ['iconfont iconfont-ea03', 'fa fa-save'];

    public backIcon: string = 'fa fa-question';

    public message: string = '';

    public iconClick(event: string, position: string) {
        console.log(event, position);
        this.message = `${position} icon "${event}" is clicked.`;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '左右侧可以有多个图标，并且有交互';
    description: string = '';
}
