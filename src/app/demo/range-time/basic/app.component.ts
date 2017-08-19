import {
    AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Renderer2,
    ViewContainerRef
} from "@angular/core";


@Component({
  templateUrl: './app.component.html'
})
export class RangeTimeBasicDemoComponent implements AfterViewInit{
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public changeDetectorRef: ChangeDetectorRef) {
    }
    beginDate = "now-1d";
    endDate = "now";

    ngAfterViewInit(){
        this.changeDetectorRef.detectChanges();
    }
}

