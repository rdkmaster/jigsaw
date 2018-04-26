import {Component} from "@angular/core";
import {CascadeDateGenerator} from "jigsaw/component/cascade/cascade";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {AjaxInterceptor} from "../../../app.interceptor";
import {HttpClient} from "@angular/common/http";

AjaxInterceptor.registerProcessor('queryData', req => {
    const Provinces = require('mock-data/cascade-provinces.json');
    const Cities = require('mock-data/cascade-cities.json');
    const Areas = require('mock-data/cascade-areas.json');
    if (req.method == 'GET') {
        const level = req.params.get('level');
        switch (level) {
            case '0': return Provinces;
            case '1': return Cities.filter(city => city['ProID'] == req.params.get('parentID'));
            case '2': return Areas.filter(city => city['CityID'] == req.params.get('parentID'));
        }
    }
});

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeBasicDemoComponent {
    constructor(public http: HttpClient) {
    }

    selectedData = [];
    selectedMessage: string;

    dataGenerator: CascadeDateGenerator = (level: number, selectedItem?: any) => {
        const levelPram = this.getLevelPram(level);
        let list: any = this.http.get('queryData',
            {params: {level: level + '', parentID: selectedItem ? selectedItem[levelPram.filterKey] : null}});
        return {
            label: levelPram.label,
            cascadingOver: levelPram.cascadingOver,
            list: list
        };
    };

    getLevelPram(level: number): {filterKey: string, label: string, cascadingOver: boolean} {
        switch (level) {
            case 0:
                return {filterKey: null, label: '省', cascadingOver: false};
            case 1:
                return {filterKey: 'ProID', label: '市', cascadingOver: false};
            case 2:
                return {filterKey: 'CityID', label: '区', cascadingOver: true};
        }
    }

    selectedDataChange(selectedData: any[]) {
        console.log(selectedData);
        this.selectedMessage = selectedData.reduce((str, item, index) => {
            if (item instanceof ArrayCollection || item instanceof Array) {
                item.forEach((it, idx) => {
                    str += `${it.name}` + (idx == item.length - 1 ? `` : ` ; `);
                })
            } else {
                str += `${item.name}` + (index == selectedData.length - 1 ? `` : ` | `);
            }
            return str;
        }, '');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawCascade'
    ];
}

