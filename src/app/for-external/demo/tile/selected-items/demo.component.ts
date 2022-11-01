import {AfterContentInit, Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'tile-selected-items',
    templateUrl: './demo.component.html'
})
export class TileSelectSelectedItemsComponent extends AsyncDescription implements AfterContentInit {
    public demoPath = "demo/tile/selected-items";

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
}
