import {Component} from '@angular/core';
@Component({
    templateUrl: 'editable.html',
    styleUrls: ['editable.scss'],
})
export class ComboSelectEditableDemo{

    editable: boolean = true;

    toggleEditable() {
        this.editable = !this.editable
    }

    public selectedCity = [{label: "北京", closable: false}];
    private citys = [
        {label: "北京", closable: false},
        {label: "上海", closable: false},
        {label: "南京"},
        {label: "深圳"},
        {label: "长沙"},
        {label: "西安"},
        {label: "盐城"},
        {label: "徐州"},
        {label: "连云港"},
        {label: "连云港1"},
        {label: "连云港2"},
        {label: "连云港3"},
        {label: "哈尔滨"}
    ];

}
