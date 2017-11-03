import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {TimeGr, TimeService} from "jigsaw/service/time.service";
import {ArrayCollection} from "jigsaw/core/data/array-collection";


@Component({
    templateUrl: './app.component.html'
})
export class ComboSelectDemoComponent {
    date:string = 'now';
    singleTimeComboValue = new ArrayCollection([{label: TimeService.getFormatDate(this.date, TimeGr.date), closable: false}]);

    beginDate:string = 'now-7d';
    endDate:string = 'now';
    rangeTimeComboValue = new ArrayCollection([
        {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
        {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
    ]);

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    handleDateChange(value){
        this.singleTimeComboValue[0].label = this.date;
        this.singleTimeComboValue.refresh();
    }

    handleRangeDateChange(){
        this.rangeTimeComboValue[0].label = this.beginDate;
        this.rangeTimeComboValue[1].label = this.endDate;
        this.rangeTimeComboValue.refresh();
    }
}

