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
export class TimeLimitEndComponent implements AfterContentInit{
    date = "now";

    datas = [{label:"now"},{label:"now+1d"},{label:"now+5d"}];

    limitEnd

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    ngAfterContentInit() {
        this.limitEnd = [{label:"now"}];
    }
}

