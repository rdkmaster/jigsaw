import {Component, ViewChild} from "@angular/core";
import {FloatPosition, JigsawFormDisplayComponent} from "jigsaw/public_api";

@Component({
    templateUrl: 'demo.component.html'
})
export class FormDisplayCellRendererDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent

    public formio = [
        {
            title: '新增数据源',
            data: [
                [
                    {
                        value: '名称',
                        renderer: 'tag',
                        isRequired: true
                    },
                    {value: '名称目的表字段字段长度实业务主题话实说属性标签粒度统计', isRequired: true},
                ],
                [
                    {value: `DwS/dimission`, renderAs: 'tag'},
                    {value: `
                            <div style="display: inline-block; background: grey; width: fit-content; padding: 0 8px 0 8px; margin: 0 4px 0 4px; border-radius: 2px">
                                节能减排管理</div>
                            <div style="display: inline-block; background: grey; width: fit-content; padding: 0 8px 0 8px; margin: 0 4px 0 4px; border-radius: 2px">
                                fdasf</div>`,
                        renderAs: 'html'}
                ],
                ['所属业务', '数据结构'],
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
                ['edw_creat_date', 'string', '300', '---', {
                    value: ['是','否', '确实'],
                    renderAs: 'tag',
                    rendererInitData: {
                        size: 'small',
                        color: 'blue',
                        selectedColor: 'pink'
                    }
                }],
                ['edw_last_update', 'bigint', '300', '---', '是'],
                ['edw_last_source', 'string', '300', '---', '否'],
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
        columnWidths: [200, 100, 100],
        tooltipConfig: {
            enableTooltip: true,
            overflowOnly: true,
            position: <FloatPosition>'top'
        }
    }


    summary: string = "这个DEMO演示了form-display组件单元格使用渲染器。";
    description: string = "";
}
