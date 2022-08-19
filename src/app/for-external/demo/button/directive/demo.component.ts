import {Component} from "@angular/core";
import {ButtonTextService} from "../doc.service";

@Component({
    selector: 'button-directive',
    templateUrl: './demo.component.html'
})
export class ButtonDirectiveDemoComponent {
    public size: string = "";
    constructor(public doc: ButtonTextService) {}
    onClick() {
        alert('hello jigsaw button');
    }
    changeSize(type?: string) {
        this.size = type;
    }
}
