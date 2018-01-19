import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class RadioTrackItemByDemoComponent {
    public selectedProduct = {pro_name: "魅族", pro_type: "255"};
    products = new ArrayCollection([
        {pro_name: "诺基亚", pro_type: "910"},
        {pro_name: "苹果", pro_type: "110"},
        {pro_name: "魅族", pro_type: "255"},
    ]);

    public radioChange(message: any) {
        console.log(`switch message is: ${message.pro_name}`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

