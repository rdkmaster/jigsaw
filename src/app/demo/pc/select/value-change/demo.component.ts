import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

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
    ])

    relateDataListA = new ArrayCollection([
        { label: "A-1" },
        { label: "A-2" },
        { label: "A-3" },
        { label: "A-4" },
        { label: "A-5" },
        { label: "A-6" },
    ])

    relateValueA = new ArrayCollection([
        { label: "A-1" },
        { label: "A-2" },
        { label: "A-3" },
    ])

    relateSingleValueA = { label: "A-1" };

    relateDataListB = new ArrayCollection([
        { label: "B-1" },
        { label: "B-2" },
        { label: "B-3" },
        { label: "B-4" },
        { label: "B-5" },
        { label: "B-6" },
    ])

    relateValueB = new ArrayCollection([
        { label: "B-2" },
        { label: "B-3" },
        { label: "B-4" },
    ])

    relateSingleValueB = { label: "B-2" };

    relateDataListC = new ArrayCollection([
        { label: "C-1" },
        { label: "C-2" },
        { label: "C-3" },
        { label: "C-4" },
        { label: "C-5" },
        { label: "C-6" },
    ])

    relateValueC = new ArrayCollection([
        { label: "C-3" },
        { label: "C-4" },
        { label: "C-5" },
    ])

    relateSingleValueC = { label: "C-3" };

    relateDataListD = new ArrayCollection([
        { label: "D-1" },
        { label: "D-2" },
        { label: "D-3" },
        { label: "D-4" },
        { label: "D-5" },
        { label: "D-6" },
    ])

    relateValueD = { label: "D-2" };

    relateSingleValueD = "D-4";

    relateDataListE = new ArrayCollection([
        { label: "E-1" },
        { label: "E-2" },
        { label: "E-3" },
        { label: "E-4" },
        { label: "E-5" },
        { label: "E-6" },
    ])

    relateValueE = { label: "E-3" };

    relateSingleValueE = "E-5";

    relatedDataList = this.relateDataListA;
    relatedValue = this.relateValueA;
    relatedSingleValue = this.relateSingleValueA;

    public valueChange(selectedItem: any) {
        console.log("valueChange事件触发了", selectedItem);
    }

    public relateSelectChange(selectedItem) {
        switch (selectedItem.label) {
            case "A":
                this.relatedDataList = this.relateDataListA;
                this.relatedValue = this.relateValueA;
                this.relatedSingleValue = this.relateSingleValueA;
                break;
            case "B":
                this.relatedDataList = this.relateDataListB;
                this.relatedValue = this.relateValueB;
                this.relatedSingleValue = this.relateSingleValueB;
                break;
            case "C":
                this.relatedDataList = this.relateDataListC;
                this.relatedValue = this.relateValueC;
                this.relatedSingleValue = this.relateSingleValueC;
                break;
            case "D":
                this.relatedDataList = this.relateDataListD;
                this.relatedValue = this.relateValueD as any;
                this.relatedSingleValue = this.relateSingleValueD as any;
                break;
            case "E":
                this.relatedDataList = this.relateDataListE;
                this.relatedValue = this.relateValueE as any;
                this.relatedSingleValue = this.relateSingleValueE as any;
                break;
        }
    }

    public relateSelectChange2(selectedItem) {
        console.log(selectedItem)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
