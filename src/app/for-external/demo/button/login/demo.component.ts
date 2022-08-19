import {Component} from '@angular/core';
import {ButtonTextService} from "../doc.service";


@Component({
    selector: 'button-login',
    templateUrl: './demo.component.html'
})
export class ButtonLoginComponent {
    onClick() {
        alert('Hello Jigsaw Button ^_^');
    }

    constructor(public doc: ButtonTextService) {}
}
