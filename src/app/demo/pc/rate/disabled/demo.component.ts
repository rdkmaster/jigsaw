import {Component} from "@angular/core";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class RateDisabledComponent {
    disabled:boolean = false;
    selectedValue = 3;
    selectedHalfValue = 2.5;

    selectChange(value: any) {
        console.log(value);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了Rate组件的禁用状态';
    description: string = '';
}
