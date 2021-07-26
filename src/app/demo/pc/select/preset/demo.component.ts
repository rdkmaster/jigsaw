import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

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

    public changePreset(){
        this.selectedCityForSelect = this.cityListForSelect[Math.floor(Math.random()*this.cityListForSelect.length)];
    }
    
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
