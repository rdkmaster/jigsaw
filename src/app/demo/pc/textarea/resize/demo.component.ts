import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class TextareaResizeDemoComponent {
    textareaValue: any;
    textareaValue2: any;
    textareaValue3: any;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
