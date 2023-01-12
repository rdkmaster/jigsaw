import {AfterContentInit, Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ButtonBarBasicDemoComponent implements AfterContentInit {
    multiple: boolean = false;

    selectedCityStr: string;
    selectedCity: any[];
    cities = new ArrayCollection([
        {label: "北京", id: 1, title: "首都"},
        {label: "上海-一个很长的地址", id: 2, title: "直辖市"},
        {label: "南京", id: 3, title: "省会"},
        {label: "深圳", id: 4},
        {label: "长沙", id: 5},
        {label: "西安", id: 6}
    ]);
    types = new ArrayCollection([
        {label: "成功", id: 1, icon: 'iconfont iconfont-e142'},
        {label: "错误", id: 2, icon: 'iconfont iconfont-e132'},
        {label: "警告", id: 3, icon: 'iconfont iconfont-e1a5'},
        {label: "信息", id: 4, icon: 'iconfont iconfont-e22c'}
    ]);
    unlabeledTypes = this.types.map(t => ({id: t.id, icon: t.icon, label: ''}));
    selectedTypes = [{id: 4}];

    basicSelectChange(cityArr: ArrayCollection<any>) {
        this.selectedCityStr = cityArr.map(city => city.label).join(',');
    }

    selectedCityStr2: string;
    selectedCity2: any[];
    cities2 = new ArrayCollection(["北京-一个很长的地址", "上海", "南京", "深圳", "长沙", "西安"]);

    basicSelectChange2(cityArr: ArrayCollection<any>) {
        this.selectedCityStr2 = cityArr.join(',');
    }

    colorType: string = 'warning';
    colorTypeList = ['default', 'primary', 'warning', 'danger', 'error'];
    selectedCity3: any[];

    selectedCity4: any[];

    ngAfterContentInit() {
        this.resetSelection();
    }

    resetSelection() {
        this.selectedCity = [{label: "南京", id: 3}];
        this.selectedCityStr = this.selectedCity.map(city => city.label).join(',');
        this.selectedCity2 = ['南京'];
        this.selectedCityStr2 = this.selectedCity2.join(',');
        this.selectedCity3 = ['南京'];
        this.selectedCity4 = ['南京'];
    }

    types5: ArrayCollection<{ label: string, id: number, icon?: string }> = new ArrayCollection([
        {label: "成功", id: 0},
        {label: "错误", id: 1},
        {label: "警告", id: 2},
        {label: "信息", id: 3}
    ]);
    selectedTypes5 = [{label: "成功", id: 1}];
    icons = ['iconfont iconfont-e142', 'iconfont iconfont-e132', 'iconfont iconfont-e1a5', 'iconfont iconfont-e22c'];
    index = 0;

    update() {
        this.types5.forEach(item => delete item.icon);
        const type = this.types5.find(item => item.id == this.index);
        type.icon = this.icons[this.index];
        // 刷新数据
        this.types5.refresh();
        this.index = this.index >= 3 ? 0 : (this.index + 1);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
