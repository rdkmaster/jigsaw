import {Component, ViewChild} from "@angular/core";
import {JigsawFormDisplayComponent, StepFieldsConfig, FormDisplayStyleOptions} from "jigsaw/public_api";
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
    templateUrl: 'demo.component.html'
})
export class TransFormCommonDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent

    public formio: FormlyFieldConfig[] | StepFieldsConfig[] = [
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
    ];

    public styleOptions = {
        trStyle: {'border-width': '1px'},
        tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'},
        columnWidths: [100, 200, 80]
    }

    public changeSource() {
        this.formio = [
            {
                fieldGroup: [
                    {type: 'auto-input', templateOptions: {label: "字段11", title: undefined}},
                    {type: 'auto-input', templateOptions: {label: "字段22", required: true, title: "33"}},
                    {type: 'auto-input', templateOptions: {label: "字段33", required: true, title: "33"}},
                ]
            },
            {type: 'auto-input', templateOptions: {label: "字段33", required: true, title: "33"}},
            {type: 'auto-input', templateOptions: {label: "字段33", required: true, title: "33"}},
            {type: 'auto-input', templateOptions: {label: "字段33", required: true, title: "33"}},
        ];
        this.jigsawFormDisplayComponent.styleOptions = <FormDisplayStyleOptions>this.styleOptions;
    }

    public changeSource1() {
        const oneStep = [
            {
                fieldGroup: [
                    {type: 'auto-input', templateOptions: {label: "目的表字段", required: true, title: "edw_creat_date"}},
                    {type: 'auto-input', templateOptions: {label: "类型", required: true, title: "string"}},
                    {type: 'auto-input', templateOptions: {label: "字段长度", required: true, title: "33"}},
                ]
            },
            {type: 'auto-input', templateOptions: {label: "字段描述", required: true, title: "很好"}},
            {type: 'auto-input', templateOptions: {label: "业务主题", required: true, title: "AIGO"}},
        ];
        this.formio = [
            {label: "SS11111111111", fields: oneStep},
            {label: "SS11222222222", fields: oneStep},
        ];
        this.jigsawFormDisplayComponent.styleOptions = <FormDisplayStyleOptions[]> [
            this.styleOptions,
            {
                trStyle: {'border-width': '2px'},
                tdStyle: {'border-width': '2px', 'padding-left': '9px'},
                columnWidths: [100, 150, 100]
            }
        ];
    }

    summary: string = "这个DEMO演示了已awade表单的root_fields做为数据源生成的form-display组件";
    description: string = "";
}
