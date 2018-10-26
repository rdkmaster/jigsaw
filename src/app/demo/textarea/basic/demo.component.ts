import {Component, ViewChild} from "@angular/core";
import {JigsawTextarea} from "jigsaw/component/textarea/textarea";

@Component({
    templateUrl: './demo.component.html'
})
export class TextareaBasicDemoComponent {
    textareaValue: any;

    valueChanged(message: string) {
        console.log(`textarea value is: ${message}`);
    }

    @ViewChild('myTextarea') myTextarea: JigsawTextarea;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTextarea.value',
        'JigsawTextarea.placeholder',
    ];
}

