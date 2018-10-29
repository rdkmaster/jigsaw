import {Component} from "@angular/core";

@Component({
  templateUrl: './demo.component.html'
})
export class TextareaValueChangeDemoComponent {
    textareaValue: any;

    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

