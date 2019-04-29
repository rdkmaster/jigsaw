import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
  templateUrl: './demo.component.html',
})
export class SelectPresetDemoComponent {
    cityListForSelect = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    selectedCityForSelect = this.cityListForSelect[0];

    selectedCityName: string = this.selectedCityForSelect.label;

    public selectChange(selectedItem:any){
        this.selectedCityName = selectedItem.label;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

