import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TableBasicTextService {
    public text = {
        introduction: `
            # Table Basic 表格

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
        basic: `
            ### 基础用法

            适用于一般数据的展示。
        `,
        noData: `
            ### 没有数据
        `,
        fixedHeader: `
            ### 滚动条与全局浮动表头
        `,
        hideHeader: `
            ### 隐藏表头
        `,
        sortable: `
            ### 可排序
        `,
        indexColumn: `
            ### 索引列
        `,
        indexColumnWithPaging: `
            ### 索引列带分页
        `,
        pageable: `
            ### 分页

            分页的默认搜索是没有防抖功能的。searchDebounce属性会给搜索增加一个防抖功能，并增加enter回车立刻搜索。将searchDebounce改成1000试试。
        `,
        pageableReady: `
            ### 分页数据

            ready为true时，在设置pagingInfo的pageSize，或者currentPage属性，会触发查询；ready为false时，pagingInfo的pageSize，或者currentPage属性则不会触发查询
        `,
        localPagingData: `
            ### 本地分页
        `,
        progress: `
            ### 进度条

            提示：单元格的值有如下选项

            - 0~100的数值时：显示正常的进度条
            - 为字符串success，或大于100的数字时，显示成功状态
            - 为字符串warning时，显示警告状态
            - 为字符串finish时，显示完成状态
            - 为字符串disabled时，显示不可用状态
            - 为字符串error或其他情况时，显示错误状态
        `,
        treeTable: `
            ### 树形表格
        `,
        contentWidth: `
            ### 列宽

            这个demo展示了如何使用contentWidth控制表格的列宽。

            #### \`contentWidth\`的作用

            用于设置表格控件的内容部分的宽度，而非用于设置表格控制的宽度。

            #### \`contentWidth\`接受的值

            ##### 常量值\`auto\`
            表格会根据单元格内容计算列宽和内容的总宽度。

            我们设计的表格列宽默认是不支持随内容自适应的，当给表格设置\`contentWidth='auto'\`，表格会暂时放开让列宽随内容适应，
            然后根据表头和表体自适应后的宽度综合计算出每一列的宽度。\`contentWidth\`的默认值是\`'auto'\`，也就是表格组件默认会自适应内容。

            需要注意的是，\`contentWidth='auto'\`计算出来的table总宽度大于组件宽度时，是会自动产生滚动条的。

            ##### 具体的数值
            将表格的内容部分的宽度设置为该值，如果该值超过表格控件的宽度，则表格控件会自动出现水平滚动条。表格会按照各列内容的比例分配这些宽度。
            这个方式一般用于\`contentWidth='auto'\`的排版过于紧凑的情况，强制表格控件给内容分配更多的宽度，从而让表格的每一列的占用更多的宽度。

            #### 其他控制表格列宽的方式
            除了可以通过\`contentWidth\`来设置列宽，我们还可以通过\`columnDefines\`的\`width\`属性设置列宽。

            这两种调整列宽的方式的差别在于：
            - \`contentWidth\`约束了表格的总体宽度，然后通过内容来计算每一列的比例，最终得到每一列的宽度。简单的说，这个方式下，列宽是由内容计算得到的。
            - \`columnDefines\`的\`width\`属性对列宽的控制更加精确，并且优先级比\`contentWidth\`的优先级更高。简单的说，这个方式下，列宽是应用编码指定。

            一般用于某列内容的长度已知的情况，比如序号列、操作列、日期列等，这些列可以把\`columnDefines\`的\`width\`属性列宽设为某个固定值来实现。
            具体的可以参考[这个demo](#/pc/table/renderer)的说明中的“**列宽调整**”部分。

            #### 最佳列宽设置建议

            我们的建议是：优先使用\`contentWidth\`自动计算的列宽，然后对局部一些列的宽度通过\`columnDefines\`的\`width\`属性做微调。

            通过\`columnDefines\`的\`width\`属性设置的列宽优先级更好，可以覆盖掉\`contentWidth\`的计算结果。
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        noData: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./no-data/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./no-data/demo.component.ts').default }
        ],
        fixedHeader: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./fixed-header/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./fixed-header/demo.component.ts').default }
        ],
        hideHeader: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./hide-header/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./hide-header/demo.component.ts').default }
        ],
        sortable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./sortable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./sortable/demo.component.ts').default }
        ],
        indexColumn: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./index-column/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./index-column/demo.component.ts').default }
        ],
        indexColumnWithPaging: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./index-column-with-paging/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./index-column-with-paging/demo.component.ts').default }
        ],
        pageable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./pageable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./pageable/demo.component.ts').default }
        ],
        pageableReady: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./pageable-ready/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./pageable-ready/demo.component.ts').default }
        ],
        localPagingData: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./local-paging-data/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./local-paging-data/demo.component.ts').default }
        ],
        progress: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./progress/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./progress/demo.component.ts').default }
        ],
        treeTable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./tree-table/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./tree-table/demo.component.ts').default }
        ],
        contentWidth: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./content-width/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./content-width/demo.component.ts').default }
        ],
    }
}
