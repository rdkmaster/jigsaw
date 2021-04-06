import { Component } from "@angular/core";
import { RadiosGroupValue } from 'jigsaw/public_api';

@Component({
    templateUrl: "./demo.component.html"
})
export class RadioLiteTypeDemoComponent {
    public selectedItem: string | RadiosGroupValue;
    cities = [
        "未选中1",
        "未选中2",
        "未选中3",
        { label: "未选中禁用", disabled: true },
        { label: "选中禁用", disabled: false }
    ];

    constructor() {
        this.selectedItem = "选中禁用";
    }

    clearSelectedItem() {
        this.selectedItem = null;
    }

    selectDisabledItem() {
        this.selectedItem = { label: "选中禁用" };
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
