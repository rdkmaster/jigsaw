import {Component, ViewChild} from "@angular/core";
import {JigsawFormDisplayComponent, StepFieldsConfig} from "jigsaw/public_api";
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
    templateUrl: 'demo.component.html'
})
export class TransFormCommonDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent

    public formio: FormlyFieldConfig[] | StepFieldsConfig[] =  [
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
        const oneStep = [
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
            {label: "SS11111111111", fields: oneStep},
            {label: "SS11222222222", fields: oneStep},
        ];
    }

    summary: string = "这个DEMO演示了已awade表单的root_fields做为数据源生成的form-display组件";
    description: string = "";
}
