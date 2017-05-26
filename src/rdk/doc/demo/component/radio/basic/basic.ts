import { Component } from "@angular/core";

@Component({
  templateUrl: 'basic.html'
})
export class RadioBasicDemoComponent {
    public selectedCity:{};
    citys = [
        {label: "北京", id: 0},
        {label: "上海", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ];
    constructor(){
        // 根据名字设置默认值;
        // this.selectedCity={label: "西安",id: 6};

        // 根据id设置默认值;
        this.selectedCity=5;

    }
    public radioChange(message:any){
        console.log(`switch message is: ${message.label}`);
    }
}

