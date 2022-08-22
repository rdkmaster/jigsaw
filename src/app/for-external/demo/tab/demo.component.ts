import {Component} from "@angular/core";
import {TabTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TabAllComponent {
    constructor(public doc: TabTextService) {}
}

