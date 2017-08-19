import {AfterViewInit, ChangeDetectorRef, Component, Renderer2, ViewContainerRef} from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class RangeTimeRefreshIntervalComponent implements AfterViewInit{
    beginDate = "now-1d";
    endDate = "now";
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public changeDetectorRef: ChangeDetectorRef) {
    }
    ngAfterViewInit(){
        this.changeDetectorRef.detectChanges();
    }
}

