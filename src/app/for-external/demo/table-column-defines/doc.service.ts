import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TableColumnDefinesTextService {
    public text = {
        introduction: `
            # Table Column Defines 表格

            展示行列数据。

            ## 使用场景

            当有大量结构化的数据需要展现时。

            当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

            当数据量较大时，可使用基础表格，数据较少可使用轻量级表格。

            ## 规范

            ### 表格中序号的使用规范

            - 不推荐使用序号。尤其是在数据有ID、名称之类的惟一标识时，一般更关心业务数据主键而不是序号，所以不推荐使用序号。

            - 如果有特殊要求，可以破例使用。比如大数据量，信令跟踪等情况下，对序号有需求的场景下可以使用。

            ### 翻页组件中当页显示条数的可选项设置规范

            - 针对设置固定高度的表格（滚动条在表格内部）：翻页组件下拉列表中显示：20、50、100、200。

            - 小数据表格（如任务类表格）默认选择50。

            - 大数据表格（如告警、性能类数据表格）默认选择100。

            ### 表格列筛选和表头筛选的区分规范

            - 如果表格的列70%及以上的列都能筛选，选用列筛选；否则选用表头筛选。

            ### 大小写敏感规范

            - 默认筛选都为大小写不敏感，只有业务特殊需求才使用大小写敏感。

            ### 操作列对齐规范

            - 操作列需要左对齐，列统一配置组件提供的class，如下：class: 'plx-table-operation'。

            ### 其他

            - 除复选框列、序号列和操作列，建议表格列数不超过7个，其余内容放入详情中。详情可用链接、操作列按钮或向下推开表格展示。
            详情内容较少时推荐使用向下推开表格展示详情，详情内容较多时推荐使用点击链接或操作列按钮方式打开详情页面。

            - 表格上面的按钮较多时可分为左右两部分排列，重要程度或使用频度更高的放在左边，其次的放右边。

            - 表格上下空间富余、数据较多的表格可上下方都配置翻页组件，提升易用性。翻页组件与表格和上方按钮的的间距为8px。

            - 表格与上下其他组件的间距为8px。

            - 一般文字内容列、操作列为左对齐，checkbox列、详情（图标）列、序号列为中对齐。

            - 数据量大时，通常搭配搜索使用。

            - 序号、复选框、详情（箭头）、操作列固定不能列定制。

            ## 示例
        `,
        alignContent: `
            ### 对齐方式
        `,
        columnVisible: `
            ### 显示列
        `,
        updateAdditionalColumnDefines: `
            ### 更新额外列定义
        `,
        updateColumnDefine: `
            ### 更新列定义
        `,
        updateColumnDefines: `
            ### 更新列定义表头
        `,
        headerClass: `
            ### 设置表头class
        `,
        setCellClass: `
            ### 设置列class
        `,
        columnGroup: `
            ### 列单元格合并
        `
    }

    public codes = {
        alignContent: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./align-content/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./align-content/demo.component.ts').default }
        ],
        columnVisible: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./column-visible/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./column-visible/demo.component.ts').default }
        ],
        updateAdditionalColumnDefines: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./update-additional-column-defines/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./update-additional-column-defines/demo.component.ts').default }
        ],
        updateColumnDefine: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./update-column-define/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./update-column-define/demo.component.ts').default }
        ],
        updateColumnDefines: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./update-column-defines/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./update-column-defines/demo.component.ts').default }
        ],
        headerClass: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./header-class/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./header-class/demo.component.ts').default }
        ],
        setCellClass: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./set-cell-class/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./set-cell-class/demo.component.ts').default }
        ],
        columnGroup: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./column-group/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./column-group/demo.component.ts').default }
        ],
    }
}
