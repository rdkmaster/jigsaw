import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html"
})
export class RadioLiteTypeDemoComponent {
    public selectedItem;
    cities = [
        "未选中1",
        "未选中2",
        "未选中3",
        { labelField: "未选中禁用", disabled: true },
        { labelField: "选中禁用", disabled: true }
    ];

    constructor() {
        this.selectedItem = "选中禁用";
    }

    clearSelectedItem() {
        this.selectedItem = null;
    }
    
    reset(){
        this.selectedItem = "选中禁用";
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
