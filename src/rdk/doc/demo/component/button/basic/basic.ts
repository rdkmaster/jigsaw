import {Component} from "@angular/core";

@Component({
  selector: 'button-demo',
  templateUrl: 'basic.html',
  styleUrls: []
})
export class ButtonBasicDemoComponent {
    onClick() {
        alert('hello rdk button');
    }
}

