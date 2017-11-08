import {AfterContentInit, Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html'
})
export class TileSelectSelectedItemsComponent implements AfterContentInit {
    selectedCity: ArrayCollection<any>;

    cities = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);

    ngAfterContentInit() {
        this.selectedCity = new ArrayCollection([{label: "深圳"}]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

