import {Component} from "@angular/core";
import {FormTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class FormAllComponent {
    constructor(public text: FormTextService) {}
}

