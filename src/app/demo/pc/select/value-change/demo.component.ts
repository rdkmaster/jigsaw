import { Component } from "@angular/core";
import {ArrayCollection, InternalUtils} from "jigsaw/public_api";

class ForeverBusyArrayCollection extends ArrayCollection<any> {
    _busy = true;
}

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class SelectValueChangeDemoComponent {
    foreverBusyArray = new ForeverBusyArrayCollection();

    dataList = new ArrayCollection([
        { label: "文本选项1" },
        { label: "文本选项2" },
        { label: "禁用选项3", disabled: true },
        { label: "文本选项4" },
        { label: "文本选项5" },
        { label: "文本选项6" },
        { label: "禁用选项7", disabled: true },
        { label: "文本选项8" },
        { label: "文本选项9" },
        { label: "文本选项10" },
        { label: "文本选项11" }
    ]);

    dataListWithoutDisabled = new ArrayCollection([
        { label: "文本选项1" },
        { label: "文本选项2" },
        { label: "文本选项3" },
        { label: "文本选项4" },
        { label: "文本选项5" },
        { label: "文本选项6" },
        { label: "文本选项7" },
        { label: "文本选项8" },
        { label: "文本选项9" },
        { label: "文本选项10" },
        { label: "文本选项11" }
    ]);

    fullSelectedOption = new ArrayCollection([
        { label: "文本选项1" },
        { label: "文本选项2" },
        { label: "文本选项3" },
        { label: "文本选项4" },
        { label: "文本选项5" },
        { label: "文本选项6" },
        { label: "文本选项7" },
        { label: "文本选项8" },
        { label: "文本选项9" },
        { label: "文本选项10" },
        { label: "文本选项11" }
    ]);

    selectedOption = new ArrayCollection([
        { label: "文本选项1" },
        { label: "文本选项2" },
        { label: "文本选项3" },
        { label: "文本选项4" }
    ]);

    simpleDataList = new ArrayCollection([
        { label: "A" },
        { label: "B" },
        { label: "C" },
        { label: "D" },
        { label: "E" },
    ]);

    relatedDataList = null;
    relatedValue = null;
    relatedSingleValue = null;

    public relateSelectChange(selectedItem) {
        this.relatedDataList = [];
        this.relatedValue = [];
        const r = InternalUtils.randomNumber(4, 8);
        for (let i = 0; i < r; i++) {
            this.relatedDataList.push({label: selectedItem.label + (i+1)});
            if (InternalUtils.randomNumber(0, 1) == 0) {
                this.relatedValue.push(this.relatedDataList[i]);
            }
        }
        this.relatedSingleValue = this.relatedDataList[InternalUtils.randomNumber(0, this.relatedDataList.length - 1)];
    }

    bindValue = new ArrayCollection([
        { label: "文本选项4" }
    ]);

    public valueChange(selectedItem: any) {
        console.log("valueChange事件触发了", selectedItem);
    }

    public bindValueChange() {
        console.log('双绑valueChange触发')
        this.bindValue = new ArrayCollection([
            { label: "文本选项10" },
            { label: "文本选项11" }
        ]);
    }

    public resetBindValue() {
        this.bindValue = new ArrayCollection([
            { label: "文本选项4" }
        ]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
