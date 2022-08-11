import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TextareaResizeDemoComponent {

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此Demo演示了textarea组件的可动态调整尺寸的效果，在启用动态调整尺寸时，组件的尺寸单位只能支持px和vw/vh，不支持%";
    description: string = "";
}
