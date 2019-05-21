import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
  templateUrl: './demo.component.html',
})
export class SelectMultipleDemoComponent {
    selectedCity: any;
    cityList = new ArrayCollection([
        {label: "北京"},
        {label: "这是一个上海的标题，非常长，非常长，非常长，非常长，非常长。。。。"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    selectedCityName: string;

    selectChange(selectedItems: any[]) {
        this.selectedCityName = selectedItems.reduce((str, item, index) => {
            return str += item.label + (index == selectedItems.length - 1 ? '' : ' | ')
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

