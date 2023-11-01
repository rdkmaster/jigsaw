import {Component, ViewChild} from "@angular/core";
import {JigsawFormDisplayComponent} from "../../../../../../jigsaw/pc-components/form-display/form-display";

@Component({
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.css']
})
export class FormDisplayCommonDemoComponent {

    @ViewChild('jigsawFormDisplayComponent')
    jigsawFormDisplayComponent: JigsawFormDisplayComponent

    public formio = {
        title: '新增数据源',
        titleStyle: {},
        data: [
            [
                {value: '名称', isRequired: true, style: {}},
                {value: '数据层级/类型', style: {}},
            ],
            [
                {value: 'sql_sde_lte_sdcis', style: {}},
                {value: 'DwS/dimission', style: {}}
            ],
            [
                {value: '所属业务', style: {}},
                {value: '数据结构', style: {}},
            ],
            [
                {value: 'LTE base', style: {}},
                {value: 'DDSSiefad', style: {}},
            ],
            [
                {value: '业务域', style: {}},
                {value: '描述', style: {}},
            ],
            [
                {value: 'Lte_Coverage', style: {}},
                {value: 'Ltecover高铁MR覆盖全维度天粒度统计', style: {}},
            ],
            [
                {value: '属性标签', style: {}},
                {value: '附件', style: {}},
            ],
            [
                {value: 'p sdewpresweo', style: {}},
                {value: 'LtecoveNpe', style: {}}
            ]
        ],
        trStyle: {background: '#fff', height: '40px'}, tdStyle: {'text-align': 'left'}
    }


    public formio1 = [{
        title: '任务配置',
        titleStyle: {},
        data: [
            [
                {value: '工作流名称', isRequired: true, style: {}},
                {value: 'fagr',style: {}},
                {value: '任务描述',isRequired: true, style: {}},
                {value: 'XXXXX>OXXX', style: {}},
            ],
            [
                {value: '调度方式',isRequired: true,  style: {}},
                {value: 'DwS/数据驱动', style: {}},
                {value: '执行周期',isRequired: true,  style: {}},
                {value: '1dav', style: {}},
            ],
            [
                {value: '同步任务读写速率',isRequired: true,  style: {}},
                {value: '1MB/S', style: {}},
                {value: '开始时间',isRequired: true,  style: {}},
                {value: '10:30:00', style: {}},
            ],
            [
                {value: '同步任务MEN',isRequired: true,  style: {}},
                {value: '1024M', style: {}},
                {value: '同步任务通道数',isRequired: true,  style: {}},
                {value: '1', style: {}},
            ],
            [
                {value: '计算任务MEN',isRequired: true,  style: {}},
                {value: '1G', style: {}},
                {value: '计算任务核数',isRequired: true,  style: {}},
                {value: '1Core', style: {}},
            ],
            [
                {value: '计算任务执行参数',isRequired: true, colSpan: 2,  style: {}},
                {value: '计算任务提交参数',isRequired: true, colSpan: 2, style: {}},
            ]
        ],
        trStyle: {background: '#fff', height: '40px'}, tdStyle: {'text-align': 'left'}
    },
        {
            title: '基础信息',
            titleStyle: {},
            data: [
                [
                    {value: '中文名称',isRequired: true, style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String', style: {}},
                    {value: '英文名称', style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String', style: {}},
                    {value: '编号', style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String(B开头6位流水码)', style: {}}
                ],
                [
                    {value: '存储状态', style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String(线上线下)', style: {}},
                    {value: '数据类别', style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String(主数据)', colSpan: 3, style: {}}
                ],
                [
                    {value: '创建时间', style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String', style: {}},
                    {value: '更新人', style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String', style: {}},
                    {value: '更新时间', style: {background: '#ccc', 'font-weight': 'bold'}},
                    {value: 'String', style: {}}
                ]
            ],
            trStyle: {background: '#fff',height: '40px', border: '1px black solid'}, tdStyle: {'text-align': 'left', border: '1px black solid'}
        }]

    formioSelected: boolean = true;

    public changeSource() {
        this.formioSelected = !this.formioSelected;
        this.jigsawFormDisplayComponent.formio = this.formioSelected ? this.formio : this.formio1;
    }

    summary: string = "这个DEMO演示了form-display组件通过json转为表格的用法。";
    description: string = "";

}
