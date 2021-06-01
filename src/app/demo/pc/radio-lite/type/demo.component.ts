import { Component } from "@angular/core";
import { RadiosGroupValue } from 'jigsaw/public_api';

@Component({
    templateUrl: "./demo.component.html"
})
export class RadioLiteTypeDemoComponent {
    public selectedItem: RadiosGroupValue | string;
    public cities: (RadiosGroupValue | string)[] = [
        "普通条目1",
        "普通条目2",
        "普通条目3",
        { label: "禁用1", disabled: true },
        { label: "禁用2", disabled: true }
    ];

    constructor() {
        this.selectDisabledItem(1);
    }

    clearSelectedItem() {
        this.selectedItem = undefined;
    }

    selectDisabledItem(item) {
        this.selectedItem = { label: "禁用" + item };
    }

    get value() {
        return typeof this.selectedItem == 'object' ? this.selectedItem.label : this.selectedItem;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
