import {Component, ViewChild} from "@angular/core";
import {JigsawTextarea} from "jigsaw/public_api";
import {TextareaTextService} from "../doc.service";

@Component({
    selector: 'textarea-basic',
    templateUrl: './demo.component.html'
})
export class TextareaBasicDemoComponent {
    textareaValue: any;

    @ViewChild('myTextarea') myTextarea: JigsawTextarea;

    constructor(public doc: TextareaTextService) {
    }
}
