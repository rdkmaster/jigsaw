import {Component, OnInit} from "@angular/core";
import {CascadeDateGenerator} from "jigsaw/component/cascade/cascade";
import {HttpClient} from "@angular/common/http";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class CascadeMultiDimensionalFillBackDemoComponent implements OnInit {
    constructor(public http: HttpClient) {
    }

    selectedData = [
        {"ProID": 2, "name": "天津市", "ProSort": 2, "ProRemark": "直辖市"},
        {"CityID": 2, "name": "天津市", "ProID": 2, "CitySort": 2},
        [
            {"Id": 1, "name": "东城区", "CityID": 1, "DisSort": null},
            {"Id": 2, "name": "西城区", "CityID": 1, "DisSort": null},
            {"Id": 36, "name": "蓟县", "CityID": 2, "DisSort": null},
        ]
    ];

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

    ngOnInit() {
        this.selectedArea = <any[]>this.selectedData[this.selectedData.length - 1];
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

