import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TableRendererTextService {
    public text = {
        introduction: `
            # Table Renderer 表格

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
        cellRender: `
            ### 单元格渲染
        `,
        cellSelectRenderer: `
            ### 单元格下拉框
        `,
        htmlRenderer: `
            ### HTML 渲染
        `,
        renderer: `
            ### 列定义模式

            这个demo展示了表格的列定义模式的多个用法，包括列渲染器、列宽调整、列的宽文本控制，列tooltip等。

            #### 提供给列定义的值
            表格的列定义接受两种类型值：
            - \`ColumnDefine[]\`，在你的表格的列事先已知的场合，推荐使用这个方式提供列定义的方式，多数表格的列都是可以事先可以知道的；
            - \`ColumnDefineGenerator\`，一个产生列定义的函数，可以编写任何复杂的逻辑，因此这个方式往往用于你的表格列事先不知道的场合。
            这个函数的定义为：\`(field: string, index: number) => ColumnDefine\`，本页的动态调整列定义demo就用到了列定义产生器。

            #### \`ColumnDefine\`的结构

            \`ColumnDefine\`的结构如下：

            \`\`\`
            {
                target?: number | string | (number | string)[];
                visible?: boolean;
                width?: string | number;
                header?: {
                    text?: string;
                    renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
                    clazz?: string;
                    sortable?: boolean;
                    sortAs?: SortAs;
                    defaultSortOrder?: SortOrder;
                };
                cell?: {
                    renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
                    clazz?: string;
                    editable?: boolean;
                    editorRenderer?: Type<TableCellRendererBase>;
                    data?: any | TableCellDataGenerator;
                    tooltip?: any;
                };
                group?: boolean;
            }
            \`\`\`

            注意到\`ColumnDefine\`的所有字段都是可选的，你只要提供所需的定义字段即可。这些字段的功能与它的属性名含义一致，因此无需每个都解释一番。
            实在有不清楚的，可以动手试一试。

            #### 列渲染器

            表格和其他控件一样，也是数据驱动的，\`TableData\`（及其子类）中有哪些列，表格就会原原本本的把这些列展示出来。
            但是一般在这些场合下，需要对表格默认的列做出行为上的改变：
            - 数据中的某些列数据是辅助数据，我们不希望将他们展示出来；
            - 在强交互设计下的表格，很多列都需要带有交互性，以满足用户对数据的操作需求；
            - 在强可视化设计下的表格，需要对表格的数据做可视化渲染；
            - 其他场合，例如需要根据列数据改变列宽，修改文本样式以强调数据等等；

            表格的列定义模式就是为了解决上述林林总总的列修饰需求的。

            **列渲染器是列定义中最重要的一个功能**，它则主要用于如下目的：
            - 改变列数据的展示方式；
            - 增强列的交互性

            这个demo中，我们用到了两类列渲染器，一个是列头渲染器（见职位/部门列），一个是单元格渲染器(见部门列）。
            列头渲染器通常是用于对本列数据做过滤，本demo展示了单选过滤（职位列）和多选过滤（部门列）的实现方式。

            单元格渲染器比列头渲染器要更加复杂一些，它有两个状态：
            - **静默状态**：表格默认呈现该单元格的状态，这个状态最典型的用法是改变数据的呈现方式，比如可以用小图标来替代枚举型数据，
                可以用进度条渲染进展，用不同颜色的背景表示数据的状态等等，发挥你的想象力肯定可以想到更多的用法。
                注意这个状态下也是可以带有编辑功能的，参考第二列勾选框列。
            - **激活状态**：当单元格获得焦点的时候的状态，单元格渲染器允许单元格在这个状态下变成另一个形态，参考部门列。
                在Excel中我们可以看到在编辑一个单元格的时候，可以通过下拉选择的方式对单元格编辑的数据有效性做约束，
                本demo的部门列就演示了如何实现这样的功能。

            #### 列宽调整

            表格的列宽原则是：优先给指定了列宽的列分配宽度，然后将剩余的宽度均分给剩余未指定列宽的列。

            表格有如下两种指定列宽的方式：
            - 固定像素，例如 \`width="120"\` 或者 \`width="120px"\`；
            - 固定百分比，例如 \`width="20%"\`，表格将算出当前容器的宽度后乘以这个百分比取得像素值；

            具体设置列宽请看[列宽这个demo](#/demo/table-basic)


            #### 宽文本控制 和 tooltip

            表格在对文本是否换行的原则是：默认文本超过列宽后自动换行，撑开行高。你可以通过给列定义的cell属性增加tooltip属性来让约束
            表格在文本超过之后，自动隐藏，例如本demo在处理desc列的时候，给的定义如下：
            \`\`\`
            {
                target: "desc",
                cell: {
                    tooltip: TableValueGenerators.originCellDataGenerator,
                },
            },
            \`\`\`
            tooltip接收两种值：
            - 字符串值，直接将字符串作为tooltip显示出来，参考本demo表格的最后一列（在\`additionalColumnDefines\`里）
            - 值产生器，例如 \`originCellDataGenerator\` 就是表格预置的一个值产生器，它的作用就是返回当前单元格的值，
                desc列使用这个产生器的作用就是在文本超过列宽的时候，用户可以通过鼠标tooltip看到完整的单元格的值。
                应用也可以自己写自己的值产生器，例如：

            \`\`\`
            cell: {
                tooltip: (tableData, row, col, additionalData) => tableData.data[row][col]
            },
            \`\`\`

            这个产生器的作用和 \`originCellDataGenerator\` 的作用基本类似。

            #### 小结

            前面介绍了表格列定义模式的主要功能，但是仍然没有覆盖表格列定义模式的全部内容，我们可以看到，
            表格的列定义模式可以帮助应用实现很多非常复杂、交互性很强的功能，
            因此仔细阅读Jigsaw有关列定义的所有的demo的源码是非常有必要的。

            虽然表格的列定义模式非常强大，但是也要注意到应用在不了解这个功能之前，仍然能够使用表格的其他功能，
            这一点就是Jigsaw一直秉承的“渐进式”使用模式。包括表格在内，Jigsaw的所有组件都具备高度可定制的能力，
            但是每个可定制能力都有对应的默认行为，因此应用在无需事先了解如何使用这些定制功能就可以用好每个控件，
            当有需要的时候，再学习对应的demo源码，然后再对控件的功能按需定制。
        `,
        headerRender: `
            ### 表头渲染
        `,
        templateRefRenderer: `
            ### 带渲染器的表格单元格
        `,
        switchRenderer: `
            ### 开关渲染器
        `,
        checkboxColumn: `
            ### checkbox渲染器

            这demo介绍table中使用内置checkbox渲染器

            #### 关于\`trackRowBy\`属性

            **啥时候需要使用这个属性？**

            表格在某些特定的场景下需要区分每一行，比如这个demo描述的就是一个典型的场景：给表格的每一行设置了checkbox用于选择多行。
            表格要能够区分每一行才能够在切换了分页之后，依然能够找出哪些行是已经选中，哪些未选中。

            业务上，一个表格的数据往往有一些关键字段（比如id、name等字段）可以用于区分每一行，这些字段往往随着业务的不同而不同，
            表格事先无法获知这些信息，因此需要应用通过\`trackRowBy\`属性来指定，例如：

            \`\`\`
            <jigsaw-table trackRowBy="name">
            </jigsaw-table>
            \`\`\`

            这样就告诉表格控件，可以通过name这一列的数据来区分每一行。

            如果未指定\`trackRowBy\`属性，由于表格事先不知道应该通过哪一列来区分每一行，它只好把每一列的数据拼装在一起得到的字符串来尝试区分每一行。
            这样的做法在列数很多的时候，则需要更多的计算时间，以及占用跟多的内存。因此，在类似场景下，请尽量设置\`trackRowBy\`属性，以提升性能。

            如果业务上需要同时使用多个字段才能区分每一行，则请把这些字段名以英文逗号隔开，例如：\`trackRowBy="name, roomId"\`。

            **特别注意**

            如果你的checkbox列不是通过\`additionalColumnDefine\`属性插入的，而是通过\`columnDefine\`将表格数据的某一列渲染出来的，这个情况下，
            你就**必须**设置\`trackRowBy\`属性。原因是渲染出来的checkbox会直接修改表格的数据，而未设置\`trackRowBy\`属性的时候，
            表格是把每一列的数据都拼在一起尝试区分每一行，表格数据改变了后，所有列拼出来的那个字符串必然和原来不一样了，
            这个时候，表格区分行的算法必然会失败。

            #### 监听数据变化

            配置在\`additionalColumnDefine\`属性里的列都是额外插入到表格中的，这些列的数据被保存在绑定给\`additionalData\`属性的对象里面，
            这些数据与绑定给\`data\`属性的对象是完全隔离的。所以这个demo监听checkbox的数据变化，只能用\`additionalDataChange\`，
            而不能用\`dataChange\`。

            #### 单元格数据是Json对象的时候

            首先表格不可以通过对象的引用去区分每一行，原因很简单，表格数据基本上都是来自于服务端，数据从服务端传输到浏览器之后，对象的引用信息必然丢失。
            因此，**表格只能通过值来区分每一行**。这就导致在单元格的值是对象的时候，表格需要知道这个对象的值是什么。因此，在这个情况下，
            应用就必须给这个对象添加一个\`valueOf()\`方法，用于告诉表格此对象的值，例如：

            \`\`\`
            let obj = {id:'1', label:'Jigsaw'};
            // 这里假设id属性可以代表这个对象的值。
            obj.valueOf = () => obj.id;
            \`\`\`

            表格的单元格值是JSON对象的场景并不多，而且往往出现在非常复杂的数据结构情况下。
        `,
        checkboxColumnObjectCell: `
            ### 单元格数据类型是JSON对象

            这demo介绍table中使用内置checkbox渲染器，并且单元格数据类型是JSON对象。
        `,
        checkboxColumnPageable: `
            ### 分页数据缓存

            这demo介绍table中使用内置checkbox渲染器，并且加入了分页功能。
        `,
        cellEditable: `
            ### 可编辑单元格
        `,
        cellEditableProperty: `
            ### 配置文本框编辑器初始值

            这个Demo主要演示了文本框编辑器的属性初始值如何配置，请点击任何列进入编辑态。
        `,
        mixinTable: `
            ### 表格中的表格
        `,
        calendar: `
            ## 基于Table实现的日历功能
        `,
        sudoku: `
            ## 复杂交互逻辑案例

            通过数独游戏的实现过程来学习如何在表格的渲染器之间进行复杂的交互逻辑
        `,
        swimLaneDiagram: `
            ## 动态调整列定义

            这个demo展示了表格应对事先未知多少列，并且需要动态调整这些列定义的方法。

            #### 关于列定义

            列定义是表格里最重要的一个功能，它是玩转表格的一个重要技巧，详细可以参考本页列定义模式这个demo。

            #### 解释一下列产生器

            本demo中，下面这个方法定义了一个列产生器

            \`\`\`
            columnDefineGenerator(field, index): ColumnDefine {
                return ...;
            }

            \`\`\`

            表格提供了当前列的字段名和索引值，你需要根据这2个值返回对应的列定义。通过这个产生器，就可以应对表格的列事先未知的情况了。

            #### 列产生器的上下文
            表格有一个属性\`columnDefineGeneratorContext\`用于设置列产生器的上下文。列产生器的上下文的作用是确定了列产生器中的\`this\`所指向的对象。
            在本demo中，\`columnDefineGenerator\`方法体内内用到了this了，因此，这里就必须设置 \`columnDefineGeneratorContext\`
            的值。简单的将其设置为this即可：\`[columnDefineGeneratorContext]="this"\`

            反过来，如果\`columnDefineGenerator\`方法体内内没有用到this，那这个上下文可以忽略不设置。

            #### 需要注意的地方

            假设你已经熟悉了表格的列定义，这个demo对你来说，唯一需要注意的地方就是ts代码中的这句话：

            \`\`\`
            changeWidth(width) {
                this.colWidth = width;
                this.table.update();   // <- 强制刷新表格
            }
            \`\`\`

            直接修改\`colWidth\`的值，表格并不能感知到，因此需要调用\`this.table.update()\`来更细表格。

            实际上，如果你了解表格的数据更新机制，还有另一个方法可以强制表格刷新：

            \`\`\`
            this.tableData.refresh();
            \`\`\`

            \`TableData\`及其子类都有这个\`refresh()\`方法，表格注册了这个方法的事件回调，因此这个方法也可以达到相同的目的。
            注意，这个demo没有采用这个方式的原因是，这个方式在语义上并不好，并且有可能给不熟悉表格数据更新机制的同学造成困扰，
            因此本demo采取了一个相对较繁琐，但是语义更清晰的方式。实际开发时，请开发者自行挑选应对方式了。

            最后，值得一提的是，修改列定义是一个耗时操作，因此应该尽量避免修改列定义，建议通过Ux的手段来避免。
        `,
    }

    public codes = {
        cellRender: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./cell-render/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./cell-render/demo.component.ts').default }
        ],
        cellSelectRenderer: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./cell-select-renderer/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./cell-select-renderer/demo.component.ts').default }
        ],
        htmlRenderer: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./html-renderer/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./html-renderer/demo.component.ts').default }
        ],
        renderer: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./renderer/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./renderer/demo.component.ts').default }
        ],
        headerRender: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./header-render/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./header-render/demo.component.ts').default }
        ],
        templateRefRenderer: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./template-ref-renderer/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./template-ref-renderer/demo.component.ts').default }
        ],
        switchRenderer: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./switch-renderer/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./switch-renderer/demo.component.ts').default }
        ],
        checkboxColumn: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./checkbox-column/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./checkbox-column/demo.component.ts').default }
        ],
        checkboxColumnObjectCell: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./checkbox-column-object-cell/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./checkbox-column-object-cell/demo.component.ts').default }
        ],
        checkboxColumnPageable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./checkbox-column-pageable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./checkbox-column-pageable/demo.component.ts').default }
        ],
        cellEditable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./cell-editable/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./cell-editable/demo.component.ts').default }
        ],
        cellEditableProperty: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./cell-editable-property/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./cell-editable-property/demo.component.ts').default }
        ],
        mixinTable: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./mixin-table/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./mixin-table/demo.component.ts').default }
        ],
        calendar: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./calendar/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./calendar/demo.component.ts').default }
        ],
        sudoku: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./sudoku/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./sudoku/demo.component.ts').default }
        ],
        swimLaneDiagram: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./swim-lane-diagram/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./swim-lane-diagram/demo.component.ts').default }
        ]
    }
}
