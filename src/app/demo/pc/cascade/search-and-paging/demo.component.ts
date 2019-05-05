import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {CascadeData} from "jigsaw/pc-components/cascade/cascade";
import {AjaxInterceptor} from "../../../../app.interceptor";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeSearchAndPagingDemoComponent implements OnInit {
    constructor(public http: HttpClient) {
    }

    lazyLoadSelectedItems: any[];

    levelInfos = [
        {title: '省/直辖市', field: 'provinceId'},
        {title: '市', field: 'cityId'},
        {title: '区', field: 'districtId'},
    ];

    ngOnInit() {
        // 设置懒加载数据默认选中条目
        const item1 = { id: 10, name: "江苏省", remark: "省份" };
        const item2 = { id: 63, name: "南京市", provinceId: 10 };
        const item3 = { id: 677, name: "雨花台区", cityId: 63 };
        this.lazyLoadSelectedItems = [item1, item2, item3];
    }

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
            list: this.http.get<any[]>('/mock-data/cascade/selected-items/area', {params: params}),
        }
    }

    message: string = '';

    parseMessage(selectedItems) {
        this.message = selectedItems.reduce((result, item) => {
            const districts = [];
            if (item instanceof ArrayCollection || item instanceof Array) {
                item.forEach(district => districts.push(district.name));
            } else {
                districts.push(item.name);
            }
            result.push(districts.join(' & '));
            return result;
        }, []).join(' | ');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo说明如何使用selectedItems属性来预设一组默认选中的条目';
    description: string = '';
}


/* 模拟请求代码 start */

AjaxInterceptor.registerProcessor('/mock-data/cascade/selected-items/area', dealAreaRequest);

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

