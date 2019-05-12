import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/pc-components/input/input";

@Component({
    templateUrl: './demo.component.html'
})
export class InputSelectDemoComponent {

    select: boolean;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawInput.focus',
    ];
}

