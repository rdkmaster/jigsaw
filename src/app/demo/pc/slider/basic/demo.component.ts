import {Component} from "@angular/core";
import {SliderTextService} from "../text.service";

@Component({
    selector: "basic-slider",
    templateUrl: "./demo.component.html",
    styleUrls: ["../public.css"]
})

export class SliderBasicComponent {
    value: number = 30;
    disabled: boolean = false;

    sliderChange(value) {
        console.info("当前值: " + value);
    }
    constructor(public text: SliderTextService) {}

}
