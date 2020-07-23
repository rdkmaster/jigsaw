import {Component, NgModule} from '@angular/core';
import {JigsawCheckBoxModule} from "../checkbox";

@Component({
    selector: 'jigsaw-time-selection-picker, j-time-selection-picker',
    template: `
        <div class="jigsaw-tsp-am-select">
            <j-checkbox></j-checkbox>
            <ul>
                <li *ngFor="$amHourData"></li>
            </ul>
        </div>
        <div class="jigsaw-tsp-pm-select">
            <j-checkbox></j-checkbox>
        </div>

    `
})
export class JigsawTimeSelectionPicker {
    public $amHourData = Array.from(new Array(13)).map((item, i) => `${i < 10 ? '0' : ''}${i}:00`);
    public $pmHourData = Array.from(new Array(13)).map((item, i) => `${i + 13}:00`);
}

@Component({
    selector: 'jigsaw-week-selection-picker, j-week-selection-picker',
    template: ``
})
export class JigsawWeekSelectionPicker {

}

@Component({
    selector: 'jigsaw-month-selection-picker, j-month-selection-picker',
    template: ``
})
export class JigsawMonthSelectionPicker {

}

@Component({
    selector: 'jigsaw-time-selection, j-time-selection',
    templateUrl: 'time-selection.html'
})
export class JigsawTimeSelection {

}

@NgModule({
    declarations: [JigsawTimeSelection, JigsawTimeSelectionPicker, JigsawWeekSelectionPicker, JigsawMonthSelectionPicker],
    imports: [
        JigsawCheckBoxModule
    ],
    exports: [JigsawTimeSelection, JigsawTimeSelectionPicker, JigsawWeekSelectionPicker, JigsawMonthSelectionPicker]
})
export class JigsawTimeSelectionModule {

}
