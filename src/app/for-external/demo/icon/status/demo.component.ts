import {Component, ViewChild} from "@angular/core";
import {JigsawIcon} from "jigsaw/public_api";
import {IconTextService} from "../doc.service";

@Component({
    selector: 'icon-status',
    templateUrl: './demo.component.html'
})
export class IconStatusDemoComponent {
    fontSize = 12;

    constructor(public doc: IconTextService) {
    }
}
