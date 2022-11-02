import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tile-basic',
    templateUrl: './demo.component.html'
})
export class TileSelectBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/tile/basic";

    public cities = new ArrayCollection([
        { label: "北京" },
        { label: "上海", disabled: true },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙", disabled: true },
        { label: "西安" }
    ]);

    public multipleSelect: boolean;
    public selectedItems1 = new ArrayCollection();
    public selectedItemsStr1: string;

    public handleSelect(selectedItems) {
        this.selectedItemsStr1 = selectedItems.map(item => item.label).toString()
    }

    public clearSelectedItems() {
        this.selectedItems1 = new ArrayCollection();
        this.selectedItemsStr1 = '';
    }

    public selectedItems2 = [
        { label: "上海" },
        { label: "深圳" },
    ];
    public selectedItemsStr2: string;

    public handleSelect2(selectedItems) {
        this.selectedItemsStr2 = selectedItems.map(item => item.label).toString()
    }

    public selectedItems3 = [
        { label: "南京" },
        { label: "深圳" },
    ];
    public selectedItemsStr3: string;

    public handleSelect3(selectedItems) {
        this.selectedItemsStr3 = selectedItems.map(item => item.label).toString()
    }
}
