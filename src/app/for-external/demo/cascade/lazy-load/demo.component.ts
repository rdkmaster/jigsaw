import {Component} from "@angular/core";
import {CascadeTextService} from "../doc.service";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {CascadeData} from "jigsaw/public_api";
import {AjaxInterceptor, MockData} from "../../../../libs/app.interceptor";

@Component({
    selector: "cascade-lazy-load",
    templateUrl: "./demo.component.html"
})

export class CascadeLazyLoadComponent {
    levelInfos = [
        {title: '省/直辖市', field: 'provinceId'},
        {title: '市', field: 'cityId'},
        {title: '区', field: 'districtId'},
    ];
    generator(selectedItem: any, selectedItems: any[], data: any[], level: number): CascadeData {
        const params = {};
        for (let i = 0; i < level; i++) {
            const si = selectedItems[i];
            const field = this.levelInfos[i].field;
            params[field] = si.id;
        }
        const levelInfo = this.levelInfos[level];
        return {
            title: levelInfo.title, noMore: level >= 2,
            list: this.http.get<any[]>('/mock-data/cascade/lazy-load/area', {params: params}),
        }
    }

    message: string = '--';
    parseMessage(selectedItems) {
        this.message = selectedItems.reduce((result, item) => {
            result.push(item.name);
            return result;
        }, []).join(' | ');
    }
    constructor(public http: HttpClient, public doc: CascadeTextService) {
    }

}

/* 模拟请求代码 start */

AjaxInterceptor.registerProcessor('/mock-data/cascade/lazy-load/area', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>): any {
    const provinces = MockData.get('mock-data/provinces.json');
    const cities = MockData.get('mock-data/cities.json');
    const districts = MockData.get('mock-data/districts.json');

    if (req.params.get('cityId')) {
        return districts.filter(d => d.cityId == req.params.get('cityId')).map(d => ({...d}));
    }
    if (req.params.get('provinceId')) {
        return cities.filter(c => c.provinceId == req.params.get('provinceId')).map(c => ({...c}));
    }
    return provinces.map(p => ({...p}));
}

/* 模拟请求代码 end */
