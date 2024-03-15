import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { JigsawSystemPrompt } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ['./../../assets/demo.common.css', './demo.component.css']
})
export class JigsawSystemPromptBasicDemoComponent {
    @ViewChild('container1', { read: ViewContainerRef })
    public container1: ViewContainerRef;
    @ViewChild('container2', { read: ViewContainerRef })
    public container2: ViewContainerRef;
    @ViewChild('container3', { read: ViewContainerRef })
    public container3: ViewContainerRef;

    public timeout = 8000;

    public showSystemPromptInCntr1(message, type) {
        JigsawSystemPrompt.show(message, this.container1, { type: type, timeout: this.timeout });
    }
    public showSystemPromptInCntr2(message, type) {
        JigsawSystemPrompt.show(message, this.container2, { type: type, timeout: this.timeout });
    }
    public showSystemPromptInCntr3(message, type) {
        JigsawSystemPrompt.show(message, this.container3, { type: type, timeout: this.timeout });
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
