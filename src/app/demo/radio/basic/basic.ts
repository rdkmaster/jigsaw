import { Component } from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
  templateUrl: 'basic.html'
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
    constructor(){
        // 三种设置值的方式;
        // 1 根据名字设置默认值;(默认, 根据label设置值)
        // this.selectedCity={label: "西安",id: 6};


        // 2. 根据trackItemBy 字段设置对象设置值.(如果设置trackItemBy)
        // this.selectedCity={id: 3};

        // 3 根据trackItemBy值设置默认值;
        this.selectedCity=5;

    }
    public radioChange(message:any){
        console.log(`switch message is: ${message.label}`);
    }
}

