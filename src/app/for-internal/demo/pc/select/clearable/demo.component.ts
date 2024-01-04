import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class SelectClearableDemoComponent {
    public clearable: boolean = true;
    public selectedCityForSelect: string;
    public cityList: any = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    public selectChange(selectedItem: any) {
        console.log("select city is: " + selectedItem);
    }

    public changeData(has) {
        if (has) {
            this.cityList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安", ""]);
            this.selectedCityForSelect = "南京";
        } else {
            this.cityList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);
            this.selectedCityForSelect = "南京";
        }
    }

    public changeEmptyData() {
        this.cityList = new ArrayCollection([]);
        this.selectedCityForSelect = undefined;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
