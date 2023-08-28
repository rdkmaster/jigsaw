import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

class ForeverBusyArrayCollection extends ArrayCollection<any> {
    _busy = true;
}

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css", "./../../assets/demo.common.css"]
})
export class SelectCollapseDemoComponent {
    foreverBusyArray = new ForeverBusyArrayCollection();
    selectedCityForSelect: any;
    disabled: boolean = false;
    valid: boolean = true;
    searchable: boolean = false;

    dataList = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        {
            groupName: "分组标题2",
            data: [
                { label: "禁用选项4", disabled: true },
                { label: "禁用选项5", disabled: true },
                { label: "文本选项6" }
            ]
        },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    singleSelectedOption = [{ groupName: "分组标题1", data: [{ label: "文本选项3" }] }]

    dataListWithoutDisabled = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项4" }, { label: "文本选项5" }, { label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    dataList1 = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项4" }, { label: "" }, { label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "" }] }
    ]);

    selectedOption = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项5" }, { label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }] }
    ]);

    fullSelectedOption = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项4" }, { label: "文本选项5" }, { label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    dataListWithEmptyGroup = new ArrayCollection([
        {}, {groupName: null}, {groupName: null, data: null},
        { groupName: "分组标题", data: [{ label: "文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] }
    ]);

    valueChange($event) {
        console.log($event);
    }

    public openTriggers = ["click","mouseenter","none"];
    public openTrigger = ["mouseenter"];

    public closeTriggers = ["click","mouseleave","none"];
    public closeTrigger = ["mouseleave"];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
