import {Component, ViewChild} from "@angular/core";
import {GrItem, JigsawRangeDateTimeSelect, RangeTimeDataRanges, Shortcut, TimeGr} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css', './../../assets/demo.common.css']
})
export class RangeDateTimeSelectShowBorderComponent {
    @ViewChild('select8')
    public rangeDateTimeSelect8: JigsawRangeDateTimeSelect;

    @ViewChild('select9')
    public rangeDateTimeSelect9: JigsawRangeDateTimeSelect;

    date = {beginDate: 'now-1d', endDate: 'now'};
    gr = ['date'];
    showBorder:boolean;
  
    dateChange($event) {
        console.log('dateChange=>', $event)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
