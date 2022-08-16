import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CascadeTextService {
    public text: object = {
        introduction: `
            # Cascade 级联选择

            级联选择框。

            ## 使用场景

            - 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
            - 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
            - 比起Select组件，可以在同一个浮层中完成选择，有较好的体验。

            ## 示例
        `,
        basic: `
            ### 基础用法

            以行政区选择作为场景，说明如何使用静态数据来实现级联数据的选择。
        `,
        lazyLoad: `
            ### 懒加载数据

            本demo演示了如何通过懒加载的方式加载每一级的数据，一般用于数据量很大的场景。
        `,
        selectedItems: `
            ### 添加默认值

            本demo说明如何使用selectedItems属性来预设一组默认选中的条目。
        `,
        multipleSelect: `
            ### 最后一级支持多选

            本demo演示了如何通过multipleSelect属性设置级联组件最后一级支持多选的方法
        `,
        trackItemBy: `
            ### 区分字段

            trackItemBy用于告诉级联组件通过哪个或者哪些字段来区分所有条目
        `,
        showAll: `
            ### 添加全选

            本demo演示了如何在某一级上添加一个“全选”按钮。
        `,
        withCombo: `
            ### 自带下拉框

            本demo演示了如何通过懒加载的方式加载每一级的数据，一般用于数据量很大的场景。
        `,
        searchAndPaging: `
            ### 搜索与分页

            本demo说明如何使用selectedItems属性来预设一组默认选中的条目fff。

            \`searchable\`为\`true\`时可以搜索；\`pageSize\`默认是\`Infinity\`，即不分页，设置了\`pageSize\`数值即可实现分页。
        `
    }
}
