import {
    AfterContentInit, ChangeDetectorRef, Component, Renderer2, ViewContainerRef
} from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class RangeTimeLimitStartComponent implements AfterContentInit{
    beginDate = "now-1d";

    endDate = "now";

    datas = [{label:"now"},{label:"now-1d"},{label:"now-5d"}];

    limitStart

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this.limitStart= [{label:"now"}];
        this.changeDetectorRef.detectChanges();
    }
}

