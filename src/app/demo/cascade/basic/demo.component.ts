import {Component} from "@angular/core";
import {CascadeData, CascadeDateGenerator} from "jigsaw/component/cascade/cascade";

const AllData: CascadeData[] = [
    {
        label: '省',
        list: [
            {"ProID": 1, "name": "北京市", "ProSort": 1, "ProRemark": "直辖市"},
            {"ProID": 2, "name": "天津市", "ProSort": 2, "ProRemark": "直辖市"},
            {"ProID": 3, "name": "河北省", "ProSort": 5, "ProRemark": "省份"},
            {"ProID": 4, "name": "山西省", "ProSort": 6, "ProRemark": "省份"},
        ]
    },
    {
        label: '市',
        list: [
            {"CityID": 1, "name": "北京市", "ProID": 1, "CitySort": 1},
            {"CityID": 2, "name": "天津市", "ProID": 2, "CitySort": 2},
            {"CityID": 3, "name": "邯郸市", "ProID": 3, "CitySort": 3},
            {"CityID": 4, "name": "廊坊市", "ProID": 3, "CitySort": 4},
            {"CityID": 5, "name": "保定市", "ProID": 3, "CitySort": 5},
            {"CityID": 6, "name": "承德市", "ProID": 3, "CitySort": 6},
            {"CityID": 7, "name": "唐山市", "ProID": 3, "CitySort": 7},
            {"CityID": 8, "name": "朔州市", "ProID": 4, "CitySort": 8},
            {"CityID": 9, "name": "忻州市", "ProID": 4, "CitySort": 9},
            {"CityID": 10, "name": "太原市", "ProID": 4, "CitySort": 10},
        ]
    }
];

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeBasicDemoComponent {

    dataGenerator: CascadeDateGenerator = (level: number, selectedItem?: any) => {
        const levelData = AllData[level];
        if(!levelData || !(levelData.list instanceof Array)) return null;
        return {
            label: levelData.label,
            list: selectedItem ? levelData.list.filter(item => item['ProID'] == selectedItem['ProID']) : levelData.list
        };
    };

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawCascade'
    ];
}

