import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectBasicDemoComponent {
    selectedCityForSelect: any;
    cityList = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    selectedCityForSelect2: string;
    cityArrayList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    selectedCityName: string;

    public selectChange(selectedItem: any) {
        console.log("select city is:" + selectedItem.label);
        this.selectedCityName = selectedItem.label;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawSelect.data',
        'JigsawSelect.value',
        'JigsawSelect.valueChange',
        'JigsawSelect.placeholder',
    ];
}

