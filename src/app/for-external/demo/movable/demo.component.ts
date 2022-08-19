import { Component } from "@angular/core";
import {MovableTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class MovableAllComponent {
    constructor(public doc: MovableTextService) { }
}

