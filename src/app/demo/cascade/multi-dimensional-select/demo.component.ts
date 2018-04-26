import {Component} from "@angular/core";
import {CascadeDateGenerator} from "jigsaw/component/cascade/cascade";
import {HttpClient} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class CascadeMultiDimensionalDemoComponent {
    constructor(public http: HttpClient) {
    }

    selectedData = [];

    selectedArea = [];

    dataGenerator: CascadeDateGenerator = (level: number, selectedItem?: any) => {
        const levelPram = this.getLevelPram(level);
        let list: any = this.http.get('queryCascadingData',
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
        this.selectedArea = selectedData[selectedData.length - 1];
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

