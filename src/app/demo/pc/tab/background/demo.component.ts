import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TabsBackgroundDemoComponent {
    editable: boolean = true;

    show(msg) {
        alert(msg);
    }

    add(tab, content) {
        tab.addTab("new tab", content);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "此demo主要展示通过设置tab组件的background属性，达到更改组件背景色的功能。";
    description: string = "";
}
