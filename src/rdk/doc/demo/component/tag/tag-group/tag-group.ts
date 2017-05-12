import {Component} from "@angular/core";

@Component({
    template: `
        <rdk-tag-group [data]="citys" height="28px" color="red" labelField="label"></rdk-tag-group>
    `
})
export class TagGroupDemoComponent {
    citys = [
        {label: "北京",closable:true},
        {label: "上海",closable:false},
        {label: "南京",closable:true},
        {label: "深圳",closable:true},
        {label: "长沙",closable:false},
        {label: "西安"}
    ];

    constructor() {

    }

}
