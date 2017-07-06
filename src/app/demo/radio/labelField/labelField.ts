import { Component } from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
  templateUrl: 'labelField.html'
})
export class RadioLabelFieldDemoComponent {
    public selectedCity={name: "西安",id:"6"};
    citys = new ArrayCollection([
        {name: "北京",id:"1"},
        {name: "上海",id:"2"},
        {name: "南京",id:"3"},
        {name: "深圳",id:"4"},
        {name: "长沙",id:"5"},
        {name: "西安",id:"6"}
    ]);
    constructor(){
    }
    public radioChange(message:any){
        console.log(`switch message is: ${message.name}`);
    }
}

