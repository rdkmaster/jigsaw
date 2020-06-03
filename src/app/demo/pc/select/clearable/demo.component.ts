import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectClearableDemoComponent {
    selectedCityForSelect: string;
    cityList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    public selectChange(selectedItem: any) {
        console.log("select city is: " + selectedItem);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
