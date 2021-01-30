import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styles: [
        `
            jigsaw-info-alert,
            jigsaw-error-alert {
                margin-left: 20px;
            }

            jigsaw-warning-alert,
            jigsaw-confirm-alert {
                margin-left: 100px;
            }
        `
    ]
})
export class AlertInDomDemoComponent {
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "直观显示各个Alert组件默认配置的效果";
    description: string = "";
}
