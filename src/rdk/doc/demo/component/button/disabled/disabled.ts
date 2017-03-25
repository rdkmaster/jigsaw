import {Component} from "@angular/core";

@Component({
    templateUrl: 'disabled.html'
})
export class ButtonDisableDemoComponent {
    click() {
        alert('nothing happened!')
    }
}

