import { Component } from '@angular/core';
import { ArrayCollection } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'combo-select-events',
    templateUrl: './demo.component.html'
})
export class ComboSelectChangeEventsDemoComponent extends AsyncDescription {
    public demoPath = "demo/combo-select/events";

    public selectedCity = new ArrayCollection();
    public cities = [
        { label: '北京', type: '', closable: false },
        { label: '上海', type: '', closable: false },
        { label: '南京', type: '' },
        { label: '深圳', type: '' },
        { label: '长沙', type: '' },
        { label: '西安', type: '' },
        { label: '盐城', type: '' },
        { label: '徐州', type: '' },
        { label: '连云港', type: '' },
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
        this.cities.forEach(btn => btn.type = this.selectedCity.indexOf(btn) == -1 ? '' : 'danger');
        btn.type = 'primary';
    }

    onTagRemove(btn) {
        btn.type = '';
    }
}
