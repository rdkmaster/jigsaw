import {Component} from "@angular/core";
import {I18nTextService} from "./text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class I18nDemoAllComponent {
    constructor(public text: I18nTextService) {}
}

