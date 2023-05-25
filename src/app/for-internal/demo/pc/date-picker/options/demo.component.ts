import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class DatePickerBasicDemoComponent {
    date;

    public clearable = false;

    public clear(){
        this.date = undefined;
    };
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
