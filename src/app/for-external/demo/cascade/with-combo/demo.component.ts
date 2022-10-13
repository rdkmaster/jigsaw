import {Component, ElementRef} from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { CascadeData } from "jigsaw/public_api";
import { AjaxInterceptor, MockData } from "../../../../libs/app.interceptor";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "cascade-with-combo",
    templateUrl: "./demo.component.html"
})

export class CascadeWithComboComponent extends AsyncDescription {
    public demoPath = "demo/cascade/with-combo";

    public comboValue1: any[];
    public comboValue2: any[];
    public selectedItems1: any[];
    public selectedItems2: any[];
    public levelInfos = [
        { title: '省/直辖市', field: 'provinceId' },
        { title: '市', field: 'cityId' },
        { title: '区', field: 'districtId' },
    ];

    public generator(selectedItem: any, selectedItems: any[], data: any[], level: number): CascadeData {
        const params = {};
        for (let i = 0; i < level; i++) {
            const si = selectedItems[i];
            const field = this.levelInfos[i].field;
            params[field] = si.id;
        }
        const levelInfo = this.levelInfos[level];
        return {
            title: levelInfo.title, noMore: level >= 2,
            list: this.http.get<any[]>('/mock-data/cascade/with-combo/area', { params: params }),
        }
    }

    constructor(public http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}


/* 模拟请求代码 start */

AjaxInterceptor.registerProcessor('/mock-data/cascade/with-combo/area', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>): any {
    const provinces = MockData.get('mock-data/provinces.json');
    const cities = MockData.get('mock-data/cities.json');
    const districts = MockData.get('mock-data/districts.json');

    if (req.params.get('cityId')) {
        return districts.filter(d => d.cityId == req.params.get('cityId')).map(d => ({ ...d }));
    }
    if (req.params.get('provinceId')) {
        return cities.filter(c => c.provinceId == req.params.get('provinceId')).map(c => ({ ...c }));
    }
    return provinces.map(p => ({ ...p }));
}

/* 模拟请求代码 end */

