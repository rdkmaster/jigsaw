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

    selectedarrayData = [{ label: "文本选项1" }]

    valueChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
