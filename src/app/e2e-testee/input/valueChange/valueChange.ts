import {Component} from "@angular/core";

@Component({
  templateUrl: 'valueChange.html'
})
export class InputValueChangeDemoComponent {
    inputValue: any;
    valueChanged(message: string) {

        console.log(`input value is: ${message}`);
    }
}

