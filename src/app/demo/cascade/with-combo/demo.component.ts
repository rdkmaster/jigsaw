import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CascadeData} from "jigsaw/component/cascade/cascade";
import {ArrayCollection} from "../../../../jigsaw/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeWithComboDemoComponent {
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


    comboValue1: any[];
    comboValue2: any[];
    selectedItems1: any[];
    selectedItems2: any[];

    parseMessage(selectedItems) {
        const selectedItemStr = selectedItems.reduce((result, item) => {
            result.push(item.name);
            return result;
        }, []).join(' | ');
        this.comboValue1 = [{
            label: selectedItemStr,
            closable: false
        }]
    }

    parseMultipleMessage(selectedItems) {
        const selectedItemsStr = selectedItems.reduce((result, item) => {
            const districts = [];
            if (item instanceof ArrayCollection) {
                item.forEach(district => districts.push(district.name));
            } else {
                districts.push(item.name);
            }
            result.push(districts.join(' & '));
            return result;
        }, []).join(' | ');
        this.comboValue2 = [{
            label: selectedItemsStr,
            closable: false
        }]
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了如何通过懒加载的方式加载每一级的数据，一般用于数据量很大的场景';
    description: string = '';
}
