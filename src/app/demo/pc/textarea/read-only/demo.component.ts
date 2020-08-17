import {Component, ViewChild} from "@angular/core";
import {JigsawTextarea} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TextareaReadOnlyDemoComponent {
    textareaValue: any = "this is \na jigsaw textarea \ndemo";

    @ViewChild('myTextarea') myTextarea: JigsawTextarea;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
