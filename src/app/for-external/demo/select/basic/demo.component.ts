import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

class ForeverBusyArrayCollection extends ArrayCollection<any>{
    _busy = true;
}

@Component({
    selector: "select-basic",
    templateUrl: "./demo.component.html"
})

export class SelectBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/select/basic";
    public selectedSize = { size: "medium" };

    public foreverBusyArray = new ForeverBusyArrayCollection();
    public selectedCityForSelect: any;
    public disabled: boolean = false;
    public valid: boolean = true;

    public dataList = new ArrayCollection([
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
    public valueChange($event) {
        console.log($event);
    }
}
