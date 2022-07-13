import {Component} from "@angular/core";
import {SliderTextService} from "../text.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "update-value-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderUpdateValueComponent {
    rangeMax = 100;
    rangeValue = new ArrayCollection([30, 50, 60]);
    get sortedValue(): string {
        return [...this.rangeValue].sort((a, b) => a - b).join('-');
    }

    updateValue() {
        // max是绑定变量，赋值给组件会有延迟，所以后面刷新视图需要加延迟
        this.rangeMax = 200;
        setTimeout(() => {
            this.rangeValue.set(2, 200);
            this.rangeValue.refresh();
        })
    }
    constructor(public text: SliderTextService) {}

}
