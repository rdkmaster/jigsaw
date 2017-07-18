import {Component} from "@angular/core";

@Component({
  templateUrl: './app.component.html'
})
export class InputValueChangeDemoComponent {
    inputValue: any;
    valueChanged(message: string) {

        console.log(`input value is: ${message}`);
    }
}

