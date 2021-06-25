import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class DateTimePickerDisabledDemoComponent {
    disabled = true;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
