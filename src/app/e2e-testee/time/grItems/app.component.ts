import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import { TimeGr } from "jigsaw/service/time.service";


@Component({
    templateUrl: './app.component.html',
    styles: [`
        h4{font-size: 20px;margin-bottom: 20px;}
        p{font-size: 14px;margin: 10px 0 20px 0}
    `]
})
export class TimeGrItemsComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    date = new Date();

    grItems = [
        {label: "Day", value: TimeGr.date},
        {label: "Week", value: TimeGr.week},
        {label: "Month", value: TimeGr.month}];
}

