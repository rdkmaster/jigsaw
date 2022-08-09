import {Component} from "@angular/core";
import {TextareaTextService} from "../doc.service";

@Component({
    selector: 'textarea-select',
    templateUrl: './demo.component.html'
})
export class TextareaSelectDemoComponent {

    select: boolean = true;

    constructor(public text: TextareaTextService) {
    }

}
