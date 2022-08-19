import { Component } from "@angular/core";
import { SliderTextService } from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "slider-multi-value",
    templateUrl: "./demo.component.html"
})

export class SliderMultiValueDemoComponent {
    rangeValue = new ArrayCollection([30, 50, 60]);

    handleValueChange(value) {
        console.log("传递出来的对象:");
        console.log(value);
    }
    constructor(public doc: SliderTextService) { }

}
