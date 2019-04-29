/**
 * Created by 10177553 on 2017/4/10.
 */
import {Component} from '@angular/core';
import {ArrayCollection} from "jigsaw/common/core/data/array-collection";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何利用事件将下拉视图与`JigsawComboSelect`组件实现无缝融合';
    description: string = require('!!raw-loader!./readme.md');
    tags: string[] = [
        'JigsawComboSelect.select',
        'JigsawComboSelect.remove',
        'JigsawComboSelect.value',
        'JigsawComboSelect.valueChange',
        'JigsawComboSelect.showBorder'
    ];
}
