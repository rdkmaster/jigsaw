import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class SelectDefaultDemoComponent {
    selectedOptionForSelect: any;
    selectedOptionName: string;
    optionList = new ArrayCollection([
        { label: "文本选项1" },
        { label: "文本选项2" },
        { label: "文本选项3" },
        { label: "文本选项4" },
        { label: "文本选项5" },
        { label: "文本选项6" }
    ]);

    public selectChange(selectedItem: any) {
        this.selectedOptionName = selectedItem.label;
    }

    selectedOptionForSelect2: string;
    optionList2 = new ArrayCollection([
        "字符串选项1",
        "字符串选项2",
        "字符串选项3",
        "字符串选项4",
        "字符串选项5",
        "字符串选项6"
    ]);

    public selectChange2(selectedItem: any) {
        console.log("select city is:" + selectedItem);
        this.selectedOptionForSelect2 = selectedItem;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
