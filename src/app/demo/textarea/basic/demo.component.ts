import {Component, ViewChild} from "@angular/core";
import {JigsawTextarea} from "jigsaw/component/textarea/textarea";

@Component({
    templateUrl: './demo.component.html'
})
export class TextareaBasicDemoComponent {
    textareaValue: any;

    @ViewChild('myTextarea') myTextarea: JigsawTextarea;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

