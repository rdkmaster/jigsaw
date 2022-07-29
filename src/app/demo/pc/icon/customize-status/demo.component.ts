import {Component, ViewChild} from "@angular/core";
import {JigsawIcon} from "jigsaw/public_api";
import {IconTextService} from "../doc.service";

@Component({
    selector: 'icon-customize-status',
    templateUrl: './demo.component.html'
})
export class IconCustomizeStatusDemoComponent {
    fontSize = 12;

    constructor(public text: IconTextService) {
    }
}
