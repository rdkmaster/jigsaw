import {Component} from "@angular/core";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class ScrollbarBasicDemoComponent {
    config: PerfectScrollbarConfigInterface = {
        suppressScrollX: true
    };
}

