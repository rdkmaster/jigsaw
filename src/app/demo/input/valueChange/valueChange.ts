import {Component} from "@angular/core";

@Component({
  templateUrl: 'valueChange.html'
})
export class InputValueChangeDemoComponent {
    valueChanged(message: string) {

        console.log(`input value is: ${message}`);
    }
}

