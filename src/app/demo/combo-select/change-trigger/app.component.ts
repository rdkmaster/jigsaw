/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component} from '@angular/core';
import {DropDownTrigger} from "jigsaw/component/combo-select/combo-select";
import {ArrayCollection} from "jigsaw/core/data/array-collection";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class ComboSelectChangeTriggerDemo {
    selectedCity = new ArrayCollection();
    cities = [
        {label: '北京', type: '', closable: false},
        {label: '上海', type: '', closable: false},
        {label: '南京', type: ''},
        {label: '深圳', type: ''},
        {label: '长沙', type: ''},
        {label: '西安', type: ''},
        {label: '盐城', type: ''},
        {label: '徐州', type: ''},
        {label: '连云港', type: ''},
    ];

    onCityClick(city) {
        const index = this.selectedCity.indexOf(city);
        if (index == -1) {
            city.type = 'danger';
            this.selectedCity.push(city);
        } else {
            city.type = '';
            this.selectedCity.splice(index, 1);
        }
        this.selectedCity.refresh();
    }

    onTagSelect(btn) {
        this.cities.forEach(btn => btn.type = this.selectedCity.indexOf(btn) == -1 ? '': 'danger');
        btn.type = 'primary';
    }

    onTagRemove(btn) {
        btn.type = '';
    }

    openTrigger = DropDownTrigger.mouseenter;
    closeTrigger = DropDownTrigger.mouseleave;

    changeTrigger() {
        if (this.openTrigger === DropDownTrigger.click) {
            this.openTrigger = DropDownTrigger.mouseenter;
            this.closeTrigger = DropDownTrigger.mouseleave;
        } else {
            this.openTrigger = DropDownTrigger.click;
            this.closeTrigger = DropDownTrigger.click;
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo展示了如何修改触发下拉的方式，以及如何通过`select`等事件实现下拉部分与combo组件的良好交互。';
    description: string = require('!!raw-loader!./readme.md');
}
