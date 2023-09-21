import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class MultipleSelectDemoComponent {
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

    arrayDataList = [
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
    ]

    selectedArrayData = [{ label: "文本选项1" }, { label: "文本选项2" }, { label: "禁用选项3", disabled: true }];
    selectedArrayData1 = null;
    selectedArrayData2 = undefined;
    selectedArrayData3 = [{ label: "禁用选项3", disabled: true }, { label: "禁用选项7", disabled: true }]

    textDataList = ["1", "2", "3", "4", "5"];
    textValueList = ["1", "2", "3", "4", "5"];

    clearSelection() {
        this.selectedArrayData = null;
        this.selectedArrayData1 = null;
        this.selectedArrayData2 = null;
        this.selectedArrayData3 = null;
        this.selectedOption = null;
        this.fullSelectedOption = null;
    }

    toggleDisabled() {
        this.dataList.forEach(i => i.disabled = !i.disabled);
    }

    valueChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
