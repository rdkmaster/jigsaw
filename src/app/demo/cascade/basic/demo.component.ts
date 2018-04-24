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
            {"CityID": 5, "name": "邯郸市", "ProID": 3, "CitySort": 5},
            {"CityID": 7, "name": "保定市", "ProID": 3, "CitySort": 7},
            {"CityID": 9, "name": "承德市", "ProID": 3, "CitySort": 9},
            {"CityID": 16, "name": "朔州市", "ProID": 4, "CitySort": 16},
            {"CityID": 17, "name": "忻州市", "ProID": 4, "CitySort": 17},
        ]
    },
    {
        label: '区',
        list: [
            {"Id": 1, "name": "东城区", "CityID": 1, "DisSort": null},
            {"Id": 2, "name": "西城区", "CityID": 1, "DisSort": null},
            {"Id": 3, "name": "崇文区", "CityID": 1, "DisSort": null},
            {"Id": 36, "name": "蓟县", "CityID": 2, "DisSort": null},
            {"Id": 19, "name": "和平区", "CityID": 2, "DisSort": null},
            {"Id": 20, "name": "河东区", "CityID": 2, "DisSort": null},
            {"Id": 104, "name": "涉县", "CityID": 5, "DisSort": null},
            {"Id": 105, "name": "磁县", "CityID": 5, "DisSort": null},
            {"Id": 147, "name": "唐县", "CityID": 7, "DisSort": null},
            {"Id": 153, "name": "易县", "CityID": 7, "DisSort": null},
            {"Id": 180, "name": "双桥区", "CityID": 9, "DisSort": null},
            {"Id": 271, "name": "应县", "CityID": 16, "DisSort": null},
            {"Id": 277, "name": "代县", "CityID": 17, "DisSort": null},
            {"Id": 274, "name": "忻府区", "CityID": 17, "DisSort": null},
        ]
    }
];

@Component({
    templateUrl: './demo.component.html'
})
export class CascadeBasicDemoComponent {

    selectedData = [];
    selectedMessage: string;

    dataGenerator: CascadeDateGenerator = (level: number, selectedItem?: any) => {
        const levelData = AllData[level];
        if (!levelData || !(levelData.list instanceof Array)) return null;
        const filterKey = this.getFilterKey(level);
        return {
            label: levelData.label,
            list: selectedItem ? levelData.list.filter(item => item[filterKey] == selectedItem[filterKey]) : levelData.list
        };
    };

    getFilterKey(level: number): string {
        switch (level) {
            case 0:
                return null;
            case 1:
                return 'ProID';
            case 2:
                return 'CityID';
        }
    }

    selectedDataChange(selectedData: any[]) {
        console.log(selectedData);
        this.selectedMessage = selectedData.reduce((str, item, index) => {
            str += `${item.name}` + (index == selectedData.length - 1 ? `` : ` | `);
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

