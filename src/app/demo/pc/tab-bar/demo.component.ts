import {Component} from "@angular/core";
import {TabBarTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TabBarAllComponent {
    constructor(public text: TabBarTextService) {}
}

