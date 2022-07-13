import {Component} from "@angular/core";
import {SliderTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "double-contact-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderDoubleContactComponent {
    rangeValue = new ArrayCollection([30, 50, 60]);

    handleValueChange(value) {
        console.log("传递出来的对象:");
        console.log(value);
    }
    constructor(public text: SliderTextService) {}

}
