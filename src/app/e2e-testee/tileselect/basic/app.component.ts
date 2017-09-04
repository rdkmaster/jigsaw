import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import { ArrayCollection } from "jigsaw/core/data/array-collection";

@Component({
  templateUrl: './app.component.html'
})
export class TileselectBasicDemoComponent{

    citys = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }

    multipleSelect: boolean;
    selectedItemsStr1: string;

    handleSelect(selectedItems){
        this.selectedItemsStr1 = selectedItems.map(item => {return item.label}).toString()
    }

    selectedItems2 = [
        {label: "上海"},
        {label: "深圳"},
    ];
    selectedItemsStr2: string;
    handleSelect2(selectedItems){
        this.selectedItemsStr2 = selectedItems.map(item => {return item.label}).toString()
    }
}

