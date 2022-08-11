import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class SelectTriggerDemoComponent {
    selectedCityForSelect: any;
    cityListForSelect = new ArrayCollection([
        { label: "北京" },
        { label: "上海" },
        { label: "南京" },
        { label: "深圳" },
        { label: "长沙" },
        { label: "西安" }
    ]);

    selectedCityName: string;

    public selectChange(selectedItem: any) {
        this.selectedCityName = selectedItem.label;
    }

    openTrigger = "mouseenter";
    closeTrigger = "mouseleave";

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
