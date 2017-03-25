import {Component} from "@angular/core";

@Component({
  templateUrl: 'scroll.html',
  styleUrls: ['scroll.css']
})
export class SelectScrollDemoComponent {
    cityListForSelect = [
    {label: "北京"},
    {label: "上海"},
    {label: "南京"},
    {label: "深圳"},
    {label: "长沙"},
    {label: "西安"}
    ];
    public selectChange(message:any){
        console.log("select city is:"+ message.label);
    }
}

