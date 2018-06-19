import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class RadioLiteBasicDemoComponent {
    public selectedCity;
    cities = new ArrayCollection([
        {label: "北京", id: 0},
        {label: "上海", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]);

    constructor() {
        this.selectedCity = {id: 6, label: "西安"};
    }

    public radioChange(message: any) {
        console.log(`switch message is: ${message.label}`);
    }

    clearSelectedCity(){
        this.selectedCity = null;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawRadioGroup.value',
        'JigsawRadioGroup.valueChange',
        'JigsawRadioOption.value',
    ];
}

