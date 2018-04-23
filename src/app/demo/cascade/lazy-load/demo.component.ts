import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CascadeData} from "jigsaw/component/cascade/cascade";

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
            list: this.http.get<any[]>('/mock-service/area', {params: params}),
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
