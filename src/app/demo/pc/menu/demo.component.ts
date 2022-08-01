import {Component} from "@angular/core";
import {MenuTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class MenuAllComponent {
    constructor(public text: MenuTextService) {}
}

