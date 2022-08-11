import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";

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
}
