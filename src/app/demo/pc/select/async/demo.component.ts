import {Component} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {ArrayCollection} from "jigsaw/public_api";
import {AjaxInterceptor, MockData} from "../../../../app.interceptor";

@Component({
    templateUrl: './demo.component.html',
})
export class SelectAsyncComponent {
    constructor(public http: HttpClient) {
        this.cities = new ArrayCollection();
        this.cities.http = http;
        this.cities.fromAjax({url: '/mock-data/select/async/area', params: {provinceId: '10'}});
        this.cities.onAjaxComplete(() => {
            console.log(this.cities);
        });
    }

    cities: ArrayCollection<any>;
    selectedCity: any;
    selectedCityName: string;

    selectChange(selectedItem: any) {
        this.selectedCityName = selectedItem.name;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}


/* 模拟请求代码 start */

AjaxInterceptor.registerProcessor('/mock-data/select/async/area', dealAreaRequest);

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
