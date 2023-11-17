import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class GroupSelectClearableDemoComponent {
    public clearable: boolean = true;
    public selectedCityForSelect;
    public cityList: any = new ArrayCollection([
        { groupName: "城市1", data: [{ label: "北京" }, { label: "上海" }, { label: "南京" }] },
        { groupName: "城市2", data: [{ label: "深圳" }, { label: "长沙" }, { label: "西安" }] }
    ]);

    public selectChange(selectedItem: any) {
        console.log("select city is: ", selectedItem);
    }

    public changeData(has) {
        if (has) {
            this.cityList = new ArrayCollection([
                { groupName: "城市1", data: [{ label: "北京" }, { label: "上海" }, { label: "南京" }, { label: "" }] },
                { groupName: "城市2", data: [{ label: "深圳" }, { label: "长沙" }, { label: "西安" }] }
            ]);
            this.selectedCityForSelect = [{ groupName: "城市1", data: [{ label: "南京" }] }];
        } else {
            this.cityList = new ArrayCollection([
                { groupName: "城市1", data: [{ label: "北京" }, { label: "上海" }, { label: "南京" }] },
                { groupName: "城市2", data: [{ label: "深圳" }, { label: "长沙" }, { label: "西安" }] }
            ]);
            this.selectedCityForSelect = [{ groupName: "城市1", data: [{ label: "南京" }] }];
        }
    }

    public changeEmptyData() {
        this.cityList = new ArrayCollection([]);
        this.selectedCityForSelect = undefined;
    }

    public changeValue(empty) {
        if (empty) {
            this.selectedCityForSelect = [{ groupName: "城市1", data: [{ label: "" }] }];
        } else {
            this.selectedCityForSelect = [{ groupName: "城市1", data: [{ label: "南京" }] }];
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
