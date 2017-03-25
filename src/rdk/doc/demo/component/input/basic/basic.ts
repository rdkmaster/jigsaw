import {Component} from "@angular/core";

@Component({
  templateUrl: 'basic.html',
  styleUrls: []
})
export class InputBasicDemoComponent {
    // inputValue=10;
    valueChanged(message: string) {

        console.log(`input value is: ${message}`);
    }
}

