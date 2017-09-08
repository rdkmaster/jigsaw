import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {Http} from "@angular/http";

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class SelectLiveDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public http: Http) {
        this.citys2 = new ArrayCollection();
        this.citys2.http = http;
        this.citys2.fromAjax('mock-data/array-collection/citys.json');
        this.citys2.onAjaxComplete(() => {
            console.log(this.citys2);
        });
    }

    citys2: ArrayCollection<any>;
    selectedCity2: any;
    selectedCityName2: string;
    public selectChange2(message:any){
        this.selectedCityName2 = message.name;
    }

    selectedCity: any;
    selectedCityName: string;
    citys = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    public selectChange(message:any){
        this.selectedCityName = message.label;
    }
}

