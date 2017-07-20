import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
  templateUrl: './app.component.html'
})
export class RadioTrackItemByDemoComponent {
    public selectedProduct={pro_name: "魅族",pro_type:"255"};
    products = new ArrayCollection([
        {pro_name:"诺基亚",pro_type:"910"},
        {pro_name: "苹果",pro_type:"110"},
        {pro_name: "魅族",pro_type:"255"},
    ]);
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    public radioChange(message:any){
        console.log(`switch message is: ${message.pro_name}`);
    }
}

