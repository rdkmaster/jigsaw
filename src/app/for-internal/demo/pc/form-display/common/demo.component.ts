import {Component, ViewChild} from "@angular/core";
import {JigsawFormDisplayComponent, TableDataConfig} from "jigsaw/public_api";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.css']
})
export class FormDisplayCommonDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent

    public formio = [
        {
            title: '新增数据源',
            titleStyle: {},
            data: [
                [
                    {value: '名称', isRequired: true},
                    {value: '数据层级/类型'},
                ],
                [
                    {value: 'sql_sde_lte_sdcis'},
                    {value: 'DwS/dimission'}
                ],
                ['所属业务', '数据结构'],
                ['LTE base', 'DDSSiefad'],
                ['业务域', '描述'],
                ['Lte_Coverage', 'Ltecover高铁MR覆盖全维度天粒度统计'],
                ['属性标签', '附件'],
                ['p sdewpresweo', 'LtecoveNpe']
            ],
            trStyle: {}, tdStyle: {'text-align': 'left', 'width': '80px'}
        },
        {
            title: '目的表字段',
            titleStyle: {},
            data: [
                [
                    {value: '目的表字段', isHeader: true, isRequired: true},
                    {value: '类型', isHeader: true, isRequired: true},
                    {value: '字段长度', isHeader: true, isRequired: true},
                    {value: '字段描述', isHeader: true, isRequired: true},
                    {value: '业务主题', isHeader: true, isRequired: true},
                ],
                ['edw_creat_date', 'string', '300', '---', '是'],
                ['edw_last_update', 'bigint', '300', '---', '是'],
                ['edw_last_source', 'string', '300', '---', '否'],
                ['edw_valid_flag', 'bigint', '---', '---', '是'],
                ['edw_last_source', 'string', '300', '---', '是'],
                ['edw_valid_flag', 'bigint', '---', '---', '否'],
                ['edw_last-source', 'string', '300', '---', '否']

            ],
            trStyle: {'border-width': '1px'},
            tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'}
        }
    ]

    public formio1 = [
        {
            title: '任务配置',
            titleStyle: {},
            data: [
                [
                    {value: '工作流名称', isRequired: true},
                    {value: 'fagr'},
                    {value: '任务描述', isRequired: true},
                    {value: 'XXXXX>OXXX'},
                ],
                [
                    {value: '调度方式', isRequired: true},
                    {value: 'DwS/数据驱动'},
                    {value: '执行周期', isRequired: true},
                    {value: '1dav'},
                ],
                [
                    {value: '同步任务读写速率', isRequired: true},
                    {value: '1MB/S'},
                    {value: '开始时间', isRequired: true},
                    {value: '10:30:00'},
                ],
                [
                    {value: '同步任务MEN', isRequired: true},
                    {value: '1024M'},
                    {value: '同步任务通道数', isRequired: true},
                    {value: '1'},
                ],
                [
                    {value: '计算任务MEN', isRequired: true},
                    {value: '1G'},
                    {value: '计算任务核数', isRequired: true},
                    {value: '1Core'},
                ],
                [
                    {value: '计算任务执行参数', isRequired: true, colSpan: 2},
                    {value: '计算任务提交参数', isRequired: true, colSpan: 2},
                ]
            ],
            trStyle: {}, tdStyle: {'text-align': 'left'}
        },
        {
            title: '基础信息',
            titleStyle: {},
            data: [
                [
                    {value: '中文名称', isRequired: true, style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String'},
                    {value: '英文名称', style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String'},
                    {value: '编号', style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String(主数据)'}
                ],
                [
                    {value: '存储状态', style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String(线上线下)'},
                    {value: '数据类别', style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String(B开头6位流水码)', colSpan: 3}
                ],
                [
                    {value: '创建时间', style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String'},
                    {value: '更新人', style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String'},
                    {value: '更新时间', style: {'font-weight': '500'}, isHeader: true},
                    {value: 'String'}
                ]
            ],
            trStyle: {'border-width': '1px'},
            tdStyle: {'text-align': 'left', 'border-width': '1px', 'padding-left': '9px'}
        }];

    formioSelected: boolean = true;

    public changeSource() {
        this.formioSelected = !this.formioSelected;
        this.jigsawFormDisplayComponent.data = <TableDataConfig><unknown>(this.formioSelected ? this.formio : this.formio1);
    }

    summary: string = "这个DEMO演示了form-display组件通过json转为表格的用法。";
    description: string = "";
}
