import { Component } from "@angular/core";
import { TileTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TileAllComponent {
    constructor(public doc: TileTextService) { }
}

