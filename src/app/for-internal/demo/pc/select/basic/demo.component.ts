import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

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

    selectedCityForSelect2: string = '北京';

    changeSelectedCityForSelect2() {
        this.selectedCityForSelect2 = '北京';
    }

    cityArrayList = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安"]);

    selectedCityForSelect4: string;
    cityList1 = new ArrayCollection([
        {label: "北京"},
        {label: ""},
        {label: "南京"},
        {label: "深圳"},
    ]);

    selectedCityName: string;

    cityList3 = new ArrayCollection([
        {name: "北京", value: 'bj'},
        {name: "上海", value: 'sh'},
        {name: "南京", value: 'nj'},
        {name: "深圳", value: 'sz'},
        {name: "长沙", value: 'cs'},
        {name: "西安", value: 'xa'}
    ]);
    selectedCityForSelect3 = this.cityList3[0];
    labelField = 'name';
    selectedCityName3: string;

    public changeLabelField() {
        const last = this.labelField;
        this.labelField = 'name' + (+new Date);
        this.cityList3.forEach(item => {
            item[this.labelField] = item[last];
            delete item[last];
        });
        this.cityList3.refresh();
        console.log('the new label field is:', this.labelField);
    }

    public selectChange(selectedItem: any) {
        console.log("the select city is:", selectedItem.label);
        this.selectedCityName = selectedItem.label;
    }

    public selectChange2(selectedItem: any) {
        console.log("the select city is:", selectedItem);
        this.selectedCityForSelect2 = selectedItem;
    }

    public selectChange3(selectedItem: any) {
        console.log("select city is:", selectedItem);
        this.selectedCityName3 = selectedItem.name;
    }

    public selectChange4(selectedItem: any) {
        console.log("select city is:", selectedItem);
        this.selectedCityForSelect4 = selectedItem.label;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
