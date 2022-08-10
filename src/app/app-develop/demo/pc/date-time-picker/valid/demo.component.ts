import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class DateTimePickerValidDemoComponent {
    selected = ['invalid'];

    get valid(): boolean {
        return this.selected[0] == 'valid';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
