import {
	AfterContentInit, Component, Renderer2, ViewContainerRef
} from "@angular/core";


@Component({
    templateUrl: './app.component.html',
    styles: [`
        h4{font-size: 20px;margin-bottom: 20px;}
        p{font-size: 14px;margin: 10px 0 20px 0}
    `]
})
export class TimeWeekStartComponent implements AfterContentInit{
    date = "now";

    datas = [{label:"sun"},{label:"mon"},{label:"tue"},
        {label:"wed"},{label:"thu"},{label:"fri"},{label:"sat"}];

    weekStart

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    ngAfterContentInit() {
        this.weekStart= [this.datas[0]];
    }
}

