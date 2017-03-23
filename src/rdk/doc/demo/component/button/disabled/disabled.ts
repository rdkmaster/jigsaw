import {Component} from "@angular/core";

@Component({
  templateUrl: 'disabled.html',
  styleUrls: []
})
export class ButtonDisableDemoComponent {
    click() {
        alert('nothing happened!')
    }
}

