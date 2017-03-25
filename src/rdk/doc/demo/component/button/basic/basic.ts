import {Component} from "@angular/core";

@Component({
    templateUrl: 'basic.html'
})
export class ButtonBasicDemoComponent {
    onClick() {
        alert('hello rdk button');
    }
}

