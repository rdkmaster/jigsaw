import {Component} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {CascadeData} from "jigsaw/component/cascade/cascade";
import {AjaxInterceptor} from "../../../app.interceptor";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeLazyLoadDemoComponent {
    constructor(public http: HttpClient) {
    }

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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了如何通过懒加载的方式加载每一级的数据，一般用于数据量很大的场景';
    description: string = '';
}


/* 模拟请求代码 start */

AjaxInterceptor.registerProcessor('/mock-data/cascade/lazy-load/area', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>): any {
    const provinces = require('mock-data/provinces.json');
    const cities = require('mock-data/cities.json');
    const districts = require('mock-data/districts.json');

    if (req.params.get('cityId')) {
        return districts.filter(d => d.cityId == req.params.get('cityId')).map(d => ({...d}));
    }
    if (req.params.get('provinceId')) {
        return cities.filter(c => c.provinceId == req.params.get('provinceId')).map(c => ({...c}));
    }
    return provinces.map(p => ({...p}));
}

/* 模拟请求代码 end */
