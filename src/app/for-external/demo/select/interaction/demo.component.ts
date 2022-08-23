import { Component } from "@angular/core";
import { SelectTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";
import { InternalUtils } from "jigsaw/public_api";

@Component({
    selector: "select-interaction",
    templateUrl: "demo.component.html",
})
export class SelectInteractionDemoComponent {
    public simpleDataList = new ArrayCollection([
        { label: "A" },
        { label: "B" },
        { label: "C" },
        { label: "D" },
        { label: "E" },
    ]);
    public relatedDataList = null;
    public relatedValue = null;
    public relatedSingleValue = null;

    public relateSelectChange(selectedItem) {
        this.relatedDataList = [];
        this.relatedValue = [];
        const r = InternalUtils.randomNumber(4, 8);
        for (let i = 0; i < r; i++) {
            this.relatedDataList.push({ label: selectedItem.label + (i + 1) });
            if (InternalUtils.randomNumber(0, 1) == 0) {
                this.relatedValue.push(this.relatedDataList[i]);
            }
        }
        this.relatedSingleValue = this.relatedDataList[InternalUtils.randomNumber(0, this.relatedDataList.length - 1)];
    }
    public valueChange(selectedItem: any) {
        console.log("valueChange事件触发了", selectedItem);
    }

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
    constructor(public doc: SelectTextService) {
    }
}
