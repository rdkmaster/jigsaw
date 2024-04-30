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
    public clearable = true;

    public showSystemPrompt1(message, type) {
        JigsawSystemPrompt.show(message, this.container1, { type: type, timeout: this.timeout, clearable: this.clearable });
    }
    public showSystemPrompt2(message, type) {
        JigsawSystemPrompt.show(message, this.container2, { type: type, timeout: this.timeout, clearable: this.clearable });
    }
    public showSystemPrompt3(message, type) {
        JigsawSystemPrompt.show(message, this.container3, { type: type, timeout: this.timeout, clearable: this.clearable });
    }

    public showSuccess(message) {
        JigsawSystemPrompt.showSuccess(message, this.container3, this.timeout);
    }
    public showError(message) {
        JigsawSystemPrompt.showError(message, this.container3, this.timeout);
    }
    public showWarning(message) {
        JigsawSystemPrompt.showWarning(message, this.container3, this.timeout);
    }
    public showInfo(message) {
        JigsawSystemPrompt.showInfo(message, this.container3, this.timeout);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
