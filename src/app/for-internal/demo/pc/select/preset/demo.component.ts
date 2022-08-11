import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectPresetDemoComponent {
    cities = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    selectedCity = this.cities[0];

    get selectedCityName(): string {
        return this.selectedCity?.label;
    }

    public changePreset() {
        this.selectedCity = this.cities[Math.floor(Math.random() * this.cities.length)];
    }

    public selectNone() {
        this.selectedCity = undefined;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
