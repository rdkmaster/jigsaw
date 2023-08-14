import {Component, ViewChild} from "@angular/core";
import {GrItem, JigsawDateTimeSelect, MarkDate, TimeGr} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class DateTimeSelectShowBorderDemoComponent {
    date1='now';
    showBorder:boolean;
    gr = ['date'];

    onDateChange($event) {
        console.log('dateChange=>', $event);
    }
    
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    
    summary: string = '';
    description: string = '';
}
