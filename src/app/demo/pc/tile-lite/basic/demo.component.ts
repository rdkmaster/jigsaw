import {AfterContentInit, Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html'
})
export class TileLiteBasicDemoComponent implements AfterContentInit {
    selectedCityStr: string;
    selectedCity: ArrayCollection<any>;
    cities = new ArrayCollection([
        {label: "北京", id: 1},
        {label: "上海", id: 2},
        {label: "南京", id: 3},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]);

    basicSelectChange(cityArr: ArrayCollection<any>) {
        this.selectedCityStr = cityArr.map(city => city.label).join(',');
    }

    selectedCityStr2: string;
    selectedCity2: ArrayCollection<any>;
    cities2 = new ArrayCollection(["北京", "上海", "南京", "深圳", "长沙", "西安",]);

    basicSelectChange2(cityArr: ArrayCollection<any>) {
        this.selectedCityStr2 = cityArr.join(',');
    }

    ngAfterContentInit() {
        this.selectedCity = new ArrayCollection([{label: "深圳", id: 1}, {label: "西安", id: 6}]);
        this.selectedCityStr = this.selectedCity.map(city => city.label).join(',');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTile.trackItemBy',
    ];
}

