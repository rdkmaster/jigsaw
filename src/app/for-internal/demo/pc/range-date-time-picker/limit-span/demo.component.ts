import { Component, ChangeDetectorRef } from "@angular/core";
@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class RangeDatePickerLimitSpanDemoComponent {
    gr = [`minute`];
    limitSpan: number = 1440;

    dateChange($event) {
        console.log('dateChange=>', $event)
    }

    constructor(public changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this.changeDetectorRef.detectChanges();
    }

    summary: string = '时间粒度和跨度限制配合来限制时间范围选择器的最大跨度';
    description: string = '';
}
