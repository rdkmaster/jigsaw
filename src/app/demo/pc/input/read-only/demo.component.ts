import {Component, ViewChild} from "@angular/core";
import {JigsawInput} from "jigsaw/public_api";

@Component({
  templateUrl: './demo.component.html'
})
export class InputReadOnlyDemoComponent {
    inputValue: any = "this is a jigsaw input demo" ;

    @ViewChild('myInput') myInput:JigsawInput;
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
