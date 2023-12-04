import {Component, ViewChild} from "@angular/core";
import {FloatPosition, JigsawFormDisplayComponent} from "jigsaw/public_api";

@Component({
    templateUrl: 'demo.component.html'
})
export class FormDisplayTooltipDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent;

    public _$tooltipEnable: boolean = true;

    public _$updateTooltipEnable() {
        this.formStyleOption["tooltipConfig"].enableTooltip = this._$tooltipEnable;
        this.jigsawFormDisplayComponent.styleOptions = this.formStyleOption;
    }

    public formio = [
        {
            title: '新增数据源',
            data: [
                [
                    {value: '名称', isRequired: true},
                    {value: '名称目的表字段字段长度实业务主题话实说属性标签粒度统计'},
                ],
                [
                    {value: 'sql_sde_lte_sdcis'},
                    {value: 'DwS/dimension'}
                ],
                ['所属业务名称目的表字段字段长度实业务主题话实说属性标签粒度统计', '数据结构名称目的表字段字段长度实业务主题话实说属性标签粒度统计'],
                ['LTE base', 'DDSSiefad'],
                ['业务域', '描述'],
                ['Lte_Coverage', 'Ltecover高铁MR覆盖全维度天粒度统计'],
                ['属性标签', '附件'],
                ['p sdewpresweo', 'LtecoveNpe']
            ]
        },
        {
            title: '目的表字段',
            data: [
                [
                    {value: '目的表字段', isHeader: true, isRequired: true},
                    {value: '目的表字段字段长度实业务主题话实说属性标签粒度统计', isHeader: true, isRequired: true},
                    {value: '字段长度', isHeader: true, isRequired: true},
                    {value: '字段描述', isHeader: true, isRequired: true},
                    {value: '业务主题', isHeader: true, isRequired: true},
                ],
                ['数据结构名称目的表字段字段长度实业务主题话实说属性标签粒度统计', 'string', '300', '---', '是'],
                ['edw_last_update edw_last_update edw_last_update', 'bigint', '300', '---', '是'],
                ['edw_last_source edw_last_sourceedw_last_sourceedw_last_source', 'string', '300', '---', '否'],
                ['edw_valid_flag', 'bigint', '---', '---', '是'],
                ['edw_last_source', 'string', '300', '---', '是'],
                ['edw_valid_flag', 'bigint', '---', '---', '否'],
                ['edw_last-source', 'string', '300', '---', '否']

            ]
        }
    ]

    public formStyleOption = {
        trStyle: {'border-width': '1px'},
        tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'},
        columnWidths: [300, 200, 100],
        tooltipConfig: {
            enableTooltip: this._$tooltipEnable,
            overflowOnly: true,
            position: <FloatPosition>'top'
        }
    }

    summary: string = "这个DEMO演示了form-display组件通过json转为表格的用法。";
    description: string = "";
}
