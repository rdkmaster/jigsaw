import {Component, ViewChild} from "@angular/core";
import {JigsawFormDisplayComponent, TableDataConfig, FormDisplayStyleOptions} from "jigsaw/public_api";
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
    templateUrl: 'demo.component.html'
})
export class FormDisplayUpdateComponent {
    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent;

    public get formData() {
        return this.formComponentInstance.formio;
    }

    public formComponentInstance: { formio: FormlyFieldConfig[] } = {
        formio: [
            {
                fieldGroup: [
                    {type: 'auto-input', templateOptions: {label: "目的表字段", required: true, title: "edw_creat_date"}},
                    {type: 'auto-input', templateOptions: {label: "类型", required: true, title: "string"}},
                    {type: 'auto-input', templateOptions: {label: "字段长度", required: true, title: "33"}},
                ]
            },
            {type: 'auto-input', templateOptions: {label: "字段描述", required: true, title: "很好"}},
            {type: 'auto-input', templateOptions: {label: "业务主题", required: true, title: "AIGO"}},
        ]
    }

    public styleOptions = {
        trStyle: {'border-width': '1px'},
        tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'},
        columnWidths: [{value: 100, unit: 'px'}, {value: 200, unit: 'px'}, {value: 80, unit: 'px'}]
    }

    public changeSource1() {
        this.formComponentInstance.formio[0].fieldGroup = [];
        this.formComponentInstance.formio.push({type: 'auto-input', templateOptions: {label: "字段33", title: "33"}});
        this.jigsawFormDisplayComponent.update(<TableDataConfig[]>this.formComponentInstance.formio);
        this.jigsawFormDisplayComponent.styleOptions = <FormDisplayStyleOptions[]>[
            {
                trStyle: {'border-width': '2px'},
                tdStyle: {'border-width': '2px', 'padding-left': '9px'},
                columnWidths: [50, 50]
            }
        ];
    }

    summary: string = "这个DEMO演示了已awade表单的root_fields做为数据源生成的form-display组件";
    description: string = "";
}
