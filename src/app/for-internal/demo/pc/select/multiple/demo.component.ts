import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
  templateUrl: './demo.component.html',
})
export class SelectMultipleDemoComponent {
    selectedCity: any;
    cityList = new ArrayCollection([
        {label: "北京"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "这是一个上海的标题，非常长，非常长，非常长，非常长，非常长。。。。"},
        {label: "西安"}
    ]);

    selectedCity1: any;
    cityList1 = new ArrayCollection([
        {label: "北京"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "这是一个上海的标题，非常长，非常长，非常长，非常长，非常长。。。。"},
        {label: "西安"}
    ]);

    selectedCityName: string;
    selectedCityName1: string;
    enableMaxWidth: boolean = true;
    maxWidth: number = 300;
    enableMaxHeight: boolean = true;
    maxHeight: number = 32;

    selectChange(selectedItems: any[]) {
        console.log(selectedItems);
        this.selectedCityName = selectedItems.reduce((str, item, index) => {
            return str += item.label + (index == selectedItems.length - 1 ? '' : ' | ')
        }, '');
    }

    selectChange1(selectedItems1: any[]) {
        console.log(selectedItems1);
        this.selectedCityName1 = selectedItems1.reduce((str, item, index) => {
            return str += item.label + (index == selectedItems1.length - 1 ? '' : ' | ')
        }, '');
    }

    onItemRemove(removedItem: any): void {
        console.log(removedItem.label, 'was removed!');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
