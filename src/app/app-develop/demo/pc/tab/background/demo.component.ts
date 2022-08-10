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
    summary: string = "此demo展示通过设置backgroundColor属性，达到页签与背景色完美融合在一起的效果。";
    description: string = "";
}
