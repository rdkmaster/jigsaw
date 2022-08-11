import {Component, ViewChild} from "@angular/core";
import {JigsawMobileInput} from "jigsaw/mobile_public_api";

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
