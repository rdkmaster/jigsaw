import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
  templateUrl: './app.component.html'
})
export class RadioBasicDemoComponent {
    public selectedCity;
    cities = new ArrayCollection([
        {label: "北京", id: 0},
        {label: "上海", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]);

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
        this.selectedCity={label: "西安",id: 6};
    }
    public radioChange(message:any){
        console.log(`switch message is: ${message.label}`);
    }
}

