import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import { TimeGr } from "jigsaw/service/time.service";


@Component({
  templateUrl: './app.component.html'
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

