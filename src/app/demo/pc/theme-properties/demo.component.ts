import {Component} from "@angular/core";
import {ThemePropertiesTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ThemePropertiesAllComponent {

    constructor(public text: ThemePropertiesTextService) {}
}

