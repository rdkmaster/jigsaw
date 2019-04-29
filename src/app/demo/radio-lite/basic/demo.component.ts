import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class RadioLiteBasicDemoComponent {
    public selectedCity;
    cities = ["北京", "上海", "南京", "深圳", "长沙", "西安"];

    constructor() {
        this.selectedCity = "西安";
    }

    public radioChange(message: any) {
        console.log(`selected city: ${message}`);
    }

    clearSelectedCity(){
        this.selectedCity = null;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

