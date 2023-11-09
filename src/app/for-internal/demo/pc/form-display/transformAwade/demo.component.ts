import {Component, ViewChild} from "@angular/core";
import {JigsawFormDisplayComponent} from "jigsaw/public_api";
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
    templateUrl: 'demo.component.html'
})
export class TransFormCommonDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent

    public formio: FormlyFieldConfig[] =  [
        {fieldGroup:[
                {type:'auto-input',templateOptions: {label: "字段11", title: undefined}},
                {type:'auto-input',templateOptions: {label: "字段22", title: "33"}},
                {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
            ]},
        {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
        {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
        {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
    ];

    public changeSource() {
        this.formio = [
            {
                fieldGroup: [
                    {type: 'auto-input', templateOptions: {label: "字段11", title: undefined}},
                    {type: 'auto-input', templateOptions: {label: "字段22", title: "33"}},
                    {type: 'auto-input', templateOptions: {label: "字段33", title: "33"}},
                ]
            },
            {type: 'auto-input', templateOptions: {label: "字段33", title: "33"}},
            {type: 'auto-input', templateOptions: {label: "字段33", title: "33"}},
            {type: 'auto-input', templateOptions: {label: "字段33", title: "33"}},
        ]
    }

    public changeSource1() {
        const noStep = [
            {fieldGroup:[
                    {type:'auto-input',templateOptions: {label: "字段11", title: undefined}},
                    {type:'auto-input',templateOptions: {label: "字段22", title: "33"}},
                    {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
                ]},
            {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
            {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
            {type:'auto-input',templateOptions: {label: "字段33", title: "33"}},
        ];
        this.formio = [
            {label: "SS11111111111", fields: noStep},
            {label: "SS11222222222", fields: noStep},
        ];
    }

    summary: string = "这个DEMO演示了form-display组件通过json转为表格的用法。";
    description: string = "";
}
