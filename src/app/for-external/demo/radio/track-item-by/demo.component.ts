import { Component } from "@angular/core";
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'radio-track-item-by',
    templateUrl: './demo.component.html'
})
export class RadioTrackItemByDemoComponent extends AsyncDescription {
    public demoPath = "demo/radio/track-item-by";

    public selectedProduct = { pro_name: "魅族", pro_type: "255" };
    public products = new ArrayCollection([
        { pro_name: "诺基亚", pro_type: "910" },
        { pro_name: "苹果", pro_type: "110" },
        { pro_name: "魅族", pro_type: "255" },
    ]);

    public radioChange(message: any) {
        console.log(`switch message is: ${message.pro_name}`);
    }
}
