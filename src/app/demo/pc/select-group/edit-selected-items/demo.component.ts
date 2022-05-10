import { Component, ViewChild } from "@angular/core";
import { ArrayCollection, JigsawSelectGroup } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class SelectGroupEditResultDemoComponent {
    @ViewChild('selectGroup')
    private _selectGroup: JigsawSelectGroup;

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

    dataList2 = new ArrayCollection([
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

    selectedOptions = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项6" }] }
    ]);

    selectedOption = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项2" }] }
    ]);

    valueChange($event) {
        console.log($event);
    }

    editSelectedItems(type) {
        let data;
        switch (type) {
            case 'single':
                data = this.selectedOption;
                break;
            case 'multiple':
            default:
                data = this.selectedOptions;
        }
        data.forEach((groupItem, i) => {
            groupItem.data.forEach((item, j) => {
                item.label = `修改结果-${i}-${j}`;
            });
        });
        data.refresh();
    }

    clearSelectedItems() {
        this.selectedOptions = undefined;
    }

    changeSelectedItems(type) {
        switch (type) {
            case 'single':
                this.selectedOption = new ArrayCollection([
                    { groupName: "分组标题3", data: [{ label: "文本选项7" }] }
                ]);
                break;
            case 'multiple':
            default:
                this.selectedOptions = new ArrayCollection([
                    { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
                ]);
        }
    }

    resetData(type: string) {
        switch (type) {
            case 'single':
                this.dataList2 = new ArrayCollection([
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
                break;
            case 'multiple':
            default:
                this.dataList = new ArrayCollection([
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
        }
    }

    index = 0;

    changeData() {
        // 数据更新
        this.index++;
        this.dataList[0].data[0].label = "数据已修改1-" + this.index;
        this.dataList[0].data[0].disabled = !!(this.index % 2);
        this.dataList[0].data[1].label = "数据已修改2-" + this.index;
        this.dataList[0].data[1].disabled = !!(this.index % 2);
        this.dataList[0].groupName = "标题已修改 " + this.index;
        this.dataList.push({ groupName: "新增分组 " + this.index, data: [{ label: "新增选项10" }, { label: "新增选项11" }] });
        this.dataList.refresh();
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "带分组或者折叠的下拉选项数据结构会复杂一些，这个demo演示了如何修改输入数据和选中的条目数据";
    description: string = "";
}
