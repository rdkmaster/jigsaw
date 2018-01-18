import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class TileSelecItemsChangeComponent {
    selectedCity: ArrayCollection<any>;
    cities = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    basicSelectChange(cityArr: ArrayCollection<any>) {
        cityArr.forEach((city) => console.log(`tileselect message is: ${city.label}`));
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

