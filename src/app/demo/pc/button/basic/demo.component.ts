import {Component} from "@angular/core";
import {ButtonTextService} from "../text.service";

@Component({
    selector: 'basic-button',
    templateUrl: './demo.component.html'
})
export class ButtonBasicDemoComponent {
    public selectedLabel = {label: "中", size: "default"};
    constructor(public text: ButtonTextService) {}
    onClick() {
        alert('hello jigsaw button');
    }
}
