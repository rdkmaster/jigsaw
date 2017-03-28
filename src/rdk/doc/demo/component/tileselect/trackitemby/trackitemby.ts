import { Component,AfterContentInit} from "@angular/core";

@Component({
  templateUrl: 'trackitemby.html'
})
export class TileselectTrackitembyDemoComponent implements AfterContentInit{
    public selectedCity:any[];
    citys = [
        {label: "北京",id:1},
        {label: "上海",id:2},
        {label: "南京",id:3},
        {label: "深圳",id:4},
        {label: "长沙",id:5},
        {label: "西安",id:6}
    ];
    constructor(){

    }
    public basicSelectChange(cityArr:any[]){
        cityArr.forEach((city)=> console.log(`tileselect message is: ${city.label}`));
    }
    ngAfterContentInit() {
        this.selectedCity=[{label: "深圳",id:1},{label: "西安",id:6}];
    }
}

