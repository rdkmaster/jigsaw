import {Component} from "@angular/core";
import {SliderTextService} from "../text.service";
import {ArrayCollection} from "../../../../../jigsaw/common/core/data/array-collection";

@Component({
    selector: "multi-value-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderMultiValueComponent {
    rangeValue1 = new ArrayCollection([20, 50, 80]);
    rangeValue2 = new ArrayCollection([20, 50, 80]);

    get sortedValue(): string {
        return [...this.rangeValue1].sort((a, b) => a - b).join('-');
    }

    handleChange() {
        this.rangeValue2.sort((a, b) => a - b);
    }
    constructor(public text: SliderTextService) {}

}
