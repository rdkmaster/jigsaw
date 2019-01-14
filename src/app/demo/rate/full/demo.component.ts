import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class RateFullComponent {

    selectedValue = 3;
    selectedHalfValue = 2.5;

    selectChange(value: any) {
        console.log(value);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了Rate组件的多种用法';
    description: string = '';
}

