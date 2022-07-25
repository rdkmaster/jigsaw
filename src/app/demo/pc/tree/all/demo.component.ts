import {Component} from "@angular/core";
import {TreeTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TreeAllComponent {
    constructor(public text: TreeTextService) {}
}

