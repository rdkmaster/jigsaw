import { Component } from "@angular/core";

@Component({
  templateUrl: 'trackItemBy.html'
})
export class RadioTrackItemByDemoComponent {
    public selectedProduct:{};
    products = [
        {pro_name:"诺基亚",pro_type:"910"},
        {pro_name: "苹果",pro_type:"110"},
        {pro_name: "魅族",pro_type:"255"},
    ];
    constructor(){
        this.selectedProduct={pro_name: "魅族",pro_type:"255"};
    }
    public radioChange(message:any){
        console.log(`switch message is: ${message.pro_name}`);
    }
}

