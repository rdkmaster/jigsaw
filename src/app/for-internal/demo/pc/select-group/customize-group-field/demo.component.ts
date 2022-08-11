import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class SelectGroupCustomizeGroupFieldDemoComponent {
    disabled: boolean = false;

    dataList = new ArrayCollection([
        { myGroup: "分组标题1", data: [{ label: "文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        {
            myGroup: "分组标题2",
            data: [
                { label: "禁用选项4", disabled: true },
                { label: "禁用选项5", disabled: true },
                { label: "文本选项6" }
            ]
        },
        { myGroup: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    selectedOption = new ArrayCollection([
        { myGroup: "分组标题2", data: [{ label: "文本选项6" }] }
    ]);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "本Demo演示了如何定制数据源中的group字段的值，默认是group，可以根据需要定制成任意值";
    description: string = "";
}
