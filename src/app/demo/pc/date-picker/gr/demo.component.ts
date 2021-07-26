import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .demo-container h4 {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .demo-container p {
            font-size: 14px;
            margin: 10px 0 20px 0
        }
    `]
})
export class DatePickerGrComponent {
    date = "now";

    gr = ['date'];

    dateChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
