import {Component} from "@angular/core";
import {TextareaTextService} from "../doc.service";

@Component({
    selector: 'textarea-clearable',
    templateUrl: './demo.component.html'
})
export class TextareaClearableDemoComponent {
    textareaValue: any;
    constructor(public text: TextareaTextService) {
    }
}