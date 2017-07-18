import {Component} from "@angular/core";

@Component({
    templateUrl: './app.component.html'
})
export class ButtonBasicDemoComponent {
    onClick() {
        alert('hello jigsaw button');
    }
}

