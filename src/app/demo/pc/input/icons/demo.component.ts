import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";
import {InputTextService} from "../text.service";

@Component({
    selector: 'icons-input',
    templateUrl: './demo.component.html'
})
export class InputPrefixIconDemoComponent {

    @ViewChild('myInput1') myInput: JigsawInput;

    click() {
        alert('你输入的值是 ' + this.myInput.value)
    }

    public preIcons: string[] = ['iconfont iconfont-ea03', 'iconfont iconfont-ea2a'];

    public backIcon: string = 'iconfont iconfont-e9ee';

    public message: string = '';

    public iconClick(event: string, position: string) {
        console.log(event, position);
        this.message = `${position} icon "${event}" is clicked.`;
    }

    constructor(public text: InputTextService) {
    }
}
