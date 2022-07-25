import {Component} from "@angular/core";
import {TagTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TagAllComponent {
    constructor(public text: TagTextService) {}
}

