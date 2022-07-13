import {Component} from "@angular/core";
import {TabBarTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ["./public.css"]
})
export class TabBarAllComponent {
    constructor(public text: TabBarTextService) {}
}

