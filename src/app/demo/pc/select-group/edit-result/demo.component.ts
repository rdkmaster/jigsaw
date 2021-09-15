import { Component, ChangeDetectorRef } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class SelectGroupEditResultDemoComponent {
    public constructor(
        protected _changeDetector: ChangeDetectorRef
    ) { }

    disabled: boolean = false;

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

    selectedOption = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }] }
    ]);

    valueChange($event) {
        console.log($event);
    }

    editResult() {
        this.selectedOption.forEach((groupItem, i) => {
            groupItem.data.forEach((item, j) => {
                item.label = '修改结果' + i + j
                this._changeDetector.markForCheck();
            })
        })
    }

    changeData() {
        // 把第一数据更新
        this.dataList[0].data[0].label = "修改数据";
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
