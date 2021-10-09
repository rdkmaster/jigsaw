import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

class ForeverBusyArrayCollection extends ArrayCollection<any> {
    _busy = true;
}

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class SelectGroupDemoComponent {
    foreverBusyArray = new ForeverBusyArrayCollection();
    selectedCityForSelect: any;
    disabled: boolean = false;
    valid: boolean = true;

    dataList = new ArrayCollection([
        { group: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        {
            group: "分组标题2",
            data: [
                { label: "禁用选项4", disabled: true },
                { label: "禁用选项5", disabled: true },
                { label: "文本选项6" }
            ]
        },
        { group: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    dataListWithEmptyGroup = new ArrayCollection([
        { group: "分组标题1", data: [{ label: "文本选项2" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        {
            group: "分组标题2",
            data: [
                { label: "禁用选项4", disabled: true },
                { label: "禁用选项5", disabled: true },
                { label: "文本选项6" }
            ]
        },
        { group: "分组标题3", data: [] },
        { group: "分组标题4", data: [] },
        { group: "分组标题5", data: [{ label: "文本选项7" }, { label: "文本选项8" }] },
    ]);

    singleSelectedOption = [{ group: "分组标题1", data: [{ label: "文本选项3" }] }]

    dataListWithoutDisabled = new ArrayCollection([
        { group: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { group: "分组标题2", data: [{ label: "文本选项4" }, { label: "文本选项5" }, { label: "文本选项6" }] },
        { group: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    selectedOption = new ArrayCollection([
        { group: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { group: "分组标题2", data: [{ label: "文本选项5" }, { label: "文本选项6" }] },
        { group: "分组标题3", data: [{ label: "文本选项7" }] }
    ]);

    fullSelectedOption = new ArrayCollection([
        { group: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { group: "分组标题2", data: [{ label: "文本选项4" }, { label: "文本选项5" }, { label: "文本选项6" }] },
        { group: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    valueChange($event) {
        console.log($event);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
