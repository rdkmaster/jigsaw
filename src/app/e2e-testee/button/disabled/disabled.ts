import {Component} from "@angular/core";

@Component({
    templateUrl: 'disabled.html'
})
export class ButtonDisableDemoComponent {
    disabled: boolean;
    click() {
        alert('nothing happened!')
    }
}

