import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class SelectFullComponent {
    constructor(public http: HttpClient) {
        this.citys2 = new ArrayCollection();
        this.citys2.http = http;
        this.citys2.fromAjax('mock-data/cities');
        this.citys2.onAjaxComplete(() => {
            console.log(this.citys2);
        });
    }

    citys2: ArrayCollection<any>;
    selectedCity2: any;
    selectedCityName2: string;

    selectChange2(message: any) {
        this.selectedCityName2 = message.name;
    }

    selectedCityName: string;
    citys = new ArrayCollection([
        {label: "北京"},
        {label: "上海"},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"}
    ]);
    selectedCity = this.citys[1];

    selectChange(message: any) {
        this.selectedCityName = message.label;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawSelect',
    ];
}

