import {Component} from "@angular/core";
import {BttonTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ButtonAllComponent{
    constructor(public text: BttonTextService) {}
}

