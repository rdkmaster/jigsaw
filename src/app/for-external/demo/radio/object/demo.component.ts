import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "radio-group-data",
    templateUrl: "./demo.component.html",
})

export class RadioDataIsObjectComponent extends AsyncDescription {
    public demoPath = "demo/radio/object";

    public selectedCity = { name: "北京" };
    public cities = [
        { name: "北京", id: "1" },
        { name: "上海", id: "2" },
        { name: "南京", id: "3" },
        { name: "深圳", id: "4" },
        { name: "长沙", id: "5" },
        { name: "西安", id: "6" }
    ];
    public selectedProduct = { pro_name: "魅族", pro_type: "255" };
    public products = new ArrayCollection([
        { pro_name: "诺基亚", pro_type: "910" },
        { pro_name: "苹果", pro_type: "110" },
        { pro_name: "魅族", pro_type: "255" },
    ]);
    public radioChange(message: any) {
        console.log(`switch message is: ${message.name}`);
    }
    public radioChange2(message: any) {
        console.log(`switch message is: ${message.pro_name}`);
    }
}
