import {Component} from "@angular/core";
import {ArrayCollection, InternalUtils} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "select-interaction",
    templateUrl: "demo.component.html",
})
export class SelectInteractionDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/interaction";
    public selectedSize = { size: "medium" };

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
}
