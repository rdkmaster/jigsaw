import {Component} from "@angular/core";
import {RadioTextService} from "../text.service";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    selector: "basic-radio",
    templateUrl: "./demo.component.html",
})

export class RadioBasicComponent {
    public selectedCity = {label: "北京", id: 0};
    public cities = new ArrayCollection([
        {label: "北京", id: 0},
        {label: "上海", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]);

    constructor(public text: RadioTextService) {}

    public radioChange(message: any) {
        console.log(`switch message is: ${message.label}`);
    }
    clearSelectedCity() {
        this.selectedCity = null;
    }
}
