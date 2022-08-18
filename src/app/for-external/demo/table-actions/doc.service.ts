import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TableActionsTextService {
    public text: object = {
        introduction: `
            # Table Actions 表格

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
        autoFillUp: `
            ### 自动填充

            此Demo展示了表格在不同数据场景，设置高度属性后，自动填满空白行的功能。
        `,
        autoPageSizing: `
            ### 自动设置分页页数

            此demo展示了根据容器高度来自动设置分页页数的功能，目前仅支持表格所有记录都等高的情况。

            提示：在表格的\`columnDefines\`属性里添加一个cell.tooltip属性可以让对应的列保持不换行，避免表格中某些行文本过多导致的意外换行，
            从而造成自动计算的当前也条数错误的问题，参考[这个demo](#/pc/table/renderer)的源码。
        `,
        addColumn: `
            ### 增加列
        `,
        dataChange: `
            ### 改变数据
        `,
        draggableTable: `
            ### 行可拖动

            将可拖动的单元格拖到另一行中间时松开鼠标可实现两行交换，在某一行的上方或者下方松开鼠标可实现两行间所有行的整体移动。
        `,
        selectRow: `
            ### 选择行
        `,
        resize: `
            ### 动态改变table宽度

            #### JigsawTable的\`width\`属性

            \`\`\`
            <j-table [width]='tableWidth'></j-table>
            \`\`\`

            通过修改上述代码中的\`tableWidth\`的值可以动态改变table的宽度，并且table的单元格宽度和水平滚动条也会自动刷新。

            #### JigsawTable的\`height\`和\`maxHeight\`属性

            通过设置\`height\`和\`maxHeight\`属性，可以控制table的高度，并且自动生成垂直滚动条。

            #### 窗口resize事件

            更改浏览器窗口大小时，table会自动刷新单元格宽度和水平滚动条。

            #### table的父元素尺寸变化

            由于元素尺寸不变化没有resize事件发出，因此如果需要在父元素尺寸变化时，table也跟着变化，需要调用table的\`resize()\`方法手工同步尺寸。

            \`\`\`
            @ViewChild('tableCmp') tableCmp: JigsawTable;

            changeTableParentWidth() {
                this.tableParent.style.width = '50%';
                this.tableCmp.resize();
            }
            \`\`\`
        `,
        expandPageable: `
            ### 展开行
        `,
        withPopup: `
            ### 弹出表格
        `,
        autoSave: `
            ### 自动保存

            点击按钮打开表单，尝试编辑表单，在单元格不失去焦点的情况下点击修改按钮，即可看到数据已经修改的提示。
        `
    }
}