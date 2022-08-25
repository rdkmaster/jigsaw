import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "select-multiple-select",
    templateUrl: "./demo.component.html"
})

export class SelectMultipleSelectDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/multiple-select";

    public dataList = new ArrayCollection([
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

    public dataListWithoutDisabled = new ArrayCollection([
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

    public fullSelectedOption = new ArrayCollection([
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

    public selectedOption = new ArrayCollection([
        { label: "文本选项1" },
        { label: "文本选项2" },
        { label: "文本选项3" },
        { label: "文本选项4" }
    ]);

    public arrayDataList = [
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

    public selectedArrayData = [{ label: "文本选项1" }];
    public selectedArrayData1 = null;
    public selectedArrayData2 = undefined;

    public valueChange($event) {
        console.log($event);
    }

    public sizes: object[] = new ArrayCollection([
        { label: "小", size: "small" },
        { label: "中", size: "medium" },
        { label: "大", size: "large" }
    ]);
    public selectedSize = { label: "中", size: "medium" };
}
