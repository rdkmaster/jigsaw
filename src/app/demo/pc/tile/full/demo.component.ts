import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TileSelectFullDemoComponent {
    showBorder = true;

    citys = new ArrayCollection([
        {label: "北京"},
        {label: "上海", disabled: true},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙", disabled: true},
        {label: "西安"}
    ]);

    multipleSelect: boolean;
    selectedItems1 = new ArrayCollection();
    selectedItemsStr1: string;

    handleSelect(selectedItems) {
        this.selectedItemsStr1 = selectedItems.map(item => item.label).toString()
    }

    clearSelectedItems() {
        this.selectedItems1 = new ArrayCollection();
        this.selectedItemsStr1 = '';
    }

    selectedItems2 = [
        {label: "上海"},
        {label: "深圳"},
    ];
    selectedItemsStr2: string;

    handleSelect2(selectedItems) {
        this.selectedItemsStr2 = selectedItems.map(item => item.label).toString()
    }

    selectedItems3 = [
        {label: "南京"},
        {label: "深圳"},
    ];
    selectedItemsStr3: string;

    handleSelect3(selectedItems) {
        this.selectedItemsStr3 = selectedItems.map(item => item.label).toString()
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
