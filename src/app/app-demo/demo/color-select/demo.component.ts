import {Component} from "@angular/core";
import {ColorSelectTextService} from "./doc.service";

@Component({
    templateUrl: 'demo.component.html',
})
export class ColorSelectDemoComponent {
    constructor(public text: ColorSelectTextService) {
    }
}
