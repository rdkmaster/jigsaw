import {
    AfterContentInit, ChangeDetectorRef, Component, Renderer2, ViewContainerRef
} from "@angular/core";


@Component({
  templateUrl: './app.component.html',
    styles: [`
        h4{font-size: 20px;margin-bottom: 20px;}
        h5{font-size: 16px;margin-bottom: 10px}
        p{font-size: 14px;margin: 10px 0 20px 0}
    `]
})
export class RangeTimeGrComponent implements AfterContentInit {
    beginDate = "now-1d";

    endDate = "now";

    datas = [{label:"second"},{label:"minute"},{label:"hour"},
        {label:"date"},{label:"week"},{label:"month"}];

    gr

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this.gr= [this.datas[3]];
        this.changeDetectorRef.detectChanges();
    }

}

