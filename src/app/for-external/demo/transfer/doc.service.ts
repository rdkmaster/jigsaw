import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TransferTextService {
    public text = {
        introduction: `
            # Transfer 穿梭框

            穿梭框常用于将多个项目从一边移动到另一边，完成选择性展示；选择选项后，点击相应方向按钮，可以把选中的选项移动到另一边。

            ## 示例
        `,
        basic: `
            ### 基本用法

            适用于列表内容的穿梭展示，搜索框可配；可在穿梭框头部进行全选操作。
        `,
        itemDisabled: `
            ### 随机设置不可操作条目
        `,
        transferTree: `
            ### 树型穿梭框

            适用于树内容的穿梭展示，左侧为带结构的树，穿梭到右侧后不保留树结构，以列表内容展示；右侧穿梭回左侧，还原到原树结构下。
        `,
        transferTable: `
            ### 表格穿梭框

            适用于表格内容的穿梭展示，表格穿梭框数据量较大默认配置搜索框。
        `,
        transferList: `
            ### 列表穿梭框

            这个Demo模拟的是采用服务端分页的情形
        `,
        transferListLocalPageable: `
            ### 列表穿梭框带分页

            这个Demo模拟的是采用浏览器内部分页的情形
        `,
        transferTableLocalPageable: `
            ### 表格穿梭框带分页
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        itemDisabled: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./item-disabled/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./item-disabled/demo.component.ts').default }
        ],
        transferTree: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./transfer-tree/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./transfer-tree/demo.component.ts').default }
        ],
        transferTable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./transfer-table/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./transfer-table/demo.component.ts').default }
        ],
        transferList: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./transfer-list/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./transfer-list/demo.component.ts').default }
        ],
        transferListLocalPageable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./transfer-list-local-pageable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./transfer-list-local-pageable/demo.component.ts').default }
        ],
        transferTableLocalPageable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./transfer-table-local-pageable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./transfer-table-local-pageable/demo.component.ts').default }
        ]
    }
}