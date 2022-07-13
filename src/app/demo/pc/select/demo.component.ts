import {Component} from "@angular/core";
import {SelectTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectAllComponent {
    constructor(public text: SelectTextService) {}
}

