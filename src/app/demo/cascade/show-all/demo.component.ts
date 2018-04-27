import {Component} from "@angular/core";
import {CascadeDateGenerator} from "jigsaw/component/cascade/cascade";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {HttpClient} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeShowAllDemoComponent {
    constructor(public http: HttpClient) {
    }

    selectedData = [];
    selectedMessage: string;

    dataGenerator: CascadeDateGenerator = (level: number, selectedItem?: any) => {
        const levelPram = this.getLevelPram(level);
        let list: any = this.http.get('queryCascadingData',
            {params: {level: level + '', parentID: selectedItem ? selectedItem[levelPram.filterKey] : null}});
        return {
            label: levelPram.label,
            cascadingOver: levelPram.cascadingOver,
            showAll: levelPram.showAll,
            list: list
        };
    };

    getLevelPram(level: number): { filterKey: string, label: string, cascadingOver: boolean, showAll: boolean } {
        switch (level) {
            case 0:
                return {filterKey: null, label: '省', cascadingOver: false, showAll: false};
            case 1:
                return {filterKey: 'ProID', label: '市', cascadingOver: false, showAll: true};
            case 2:
                return {filterKey: 'CityID', label: '区', cascadingOver: true, showAll: true};
        }
    }

    parseSelectedData(selectedData: any[]) {
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

