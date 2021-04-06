import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html"
})
export class RadioLiteTypeDemoComponent {
    public selectedItems;
    cities = [
        "未选中1",
        "未选中2",
        "未选中3",
        { label: "未选中禁用", disabled: true },
        { label: "选中禁用", disabled: false }
    ];

    constructor() {
        this.selectedItems = "选中禁用";
    }

    clearSelectedItems() {
        this.selectedItems = null;
    }

    selectDisabledItem() {
        this.selectedItems = { label: "选中禁用" };
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
