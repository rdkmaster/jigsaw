import {Component} from "@angular/core";
import {FloatPosition} from "../../../../../../jigsaw/common/directive/float/float";
@Component({
    templateUrl: './demo.component.html'
})
export class FormDisplayColumnWidthTypeDemoComponent {
    public formio = [
        {
            title: '百分比列宽做到不同分辨率下自适应',
            data: [
                ['所属业务','数据结构如同一篇精美的散文，为所属业务提供了清晰的表达', '数据结构', '数据结构的巧妙运用，让所属业务展现出独特的风采'],
                ['所属业务','数据结构如同一篇精美的散文，为所属业务提供了清晰的表达', '数据结构', '数据结构的巧妙运用，让所属业务展现出独特的风采'],
                ['所属业务','数据结构如同一篇精美的散文，为所属业务提供了清晰的表达', '数据结构', '数据结构的巧妙运用，让所属业务展现出独特的风采'],
                ['所属业务','数据结构如同一篇精美的散文，为所属业务提供了清晰的表达', '数据结构', '数据结构的巧妙运用，让所属业务展现出独特的风采'],
                ['所属业务', {value: '数据结构的巧妙运用，让所属业务展现出独特的风采', colSpan: 3}],
                ['所属业务','数据结构如同一篇精美的散文，为所属业务提供了清晰的表达', '数据结构', '数据结构的巧妙运用，让所属业务展现出独特的风采']
            ]
        },
        {
            title: '固定值列宽不随分辨率改变宽度',
            data: [
                [
                    {value: '目的表字段', isHeader: true, isRequired: true},
                    {value: '目的表字段字段长度实业务主题话实说属性标签粒度统计', isHeader: true, isRequired: true},
                    {value: '字段长度', isHeader: true, isRequired: true},
                    {value: '字段描述', isHeader: true, isRequired: true},
                    {value: '业务主题', isHeader: true, isRequired: true},
                ],
                ['edw_last_update', 'bigint', '300', '---', '是'],
                ['edw_last_source', 'string', '300', '---', '否'],
                ['edw_valid_flag', 'bigint', '---', '---', '是'],
                ['edw_last_source', 'string', '300', '---', '是'],
                ['edw_valid_flag', 'bigint', '---', '---', '否'],
                ['edw_last-source', 'string', '300', '---', '否']

            ]
        }
    ]

    public formStyleOption = [
        {
            trStyle: {'border-width': '1px'},
            tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'},
            columnWidths: [10, 40, 10, 40],
            columnWidthType: "percentage",
            tooltipConfig: {
                enableTooltip: true,
                overflowOnly: true,
                position: <FloatPosition>'top'
            }
        },
        {
            trStyle: {'border-width': '1px'},
            tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'},
            columnWidths: [200, 100, 100, 100, 100],
            columnWidthType: "fixed",
            tooltipConfig: {
                enableTooltip: true,
                overflowOnly: true,
                position: <FloatPosition>'top'
            }
        }
    ]

    summary: string = "这个DEMO演示了form-display组件设置列宽";
    description: string = "columnWidths 设置有个规则： 当columnWidths的总和小于组件整体的宽度时，如果每列都设置了宽度此时其实是按照百分比分割宽度；" +
        "如果设置的不全，宽度优先基于给予前几列，剩余宽度被剩余列百分比分割";
}
