import {Component} from "@angular/core";
import {SelectTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";
import {InternalUtils} from "../../../../../jigsaw/common/core/utils/internal-utils";
class ForeverBusyArrayCollection extends ArrayCollection<any> {
    _busy = true;
}

@Component({
    selector: "value-change-select",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SelectValueChangeComponent {
    public selectedLabel = {label: "中", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);
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
    ]);

    relatedDataList = null;
    relatedValue = null;
    relatedSingleValue = null;

    public relateSelectChange(selectedItem) {
        this.relatedDataList = [];
        this.relatedValue = [];
        const r = InternalUtils.randomNumber(4, 8);
        for (let i = 0; i < r; i++) {
            this.relatedDataList.push({label: selectedItem.label + (i+1)});
            if (InternalUtils.randomNumber(0, 1) == 0) {
                this.relatedValue.push(this.relatedDataList[i]);
            }
        }
        this.relatedSingleValue = this.relatedDataList[InternalUtils.randomNumber(0, this.relatedDataList.length - 1)];
    }

    bindValue = new ArrayCollection([
        { label: "文本选项4" }
    ]);

    public valueChange(selectedItem: any) {
        console.log("valueChange事件触发了", selectedItem);
    }

    public bindValueChange() {
        console.log('双绑valueChange触发')
        this.bindValue = new ArrayCollection([
            { label: "文本选项10" },
            { label: "文本选项11" }
        ]);
    }

    public resetBindValue() {
        this.bindValue = new ArrayCollection([
            { label: "文本选项4" }
        ]);
    }
    constructor(public text: SelectTextService) {}

}
