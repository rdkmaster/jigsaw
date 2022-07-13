import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CascadeTextService {
    public text: object = {
        introduction: `
            # Cascader 级联选择

            级联选择

            ## 使用场景

            ## 示例
        `,
        basic: `
            ### 级联选择

            以行政区选择作为场景，说明如何使用静态数据来实现级联数据的选择。
        `,
        lazyLoad: `
            ### 懒加载数据

            本demo演示了如何通过懒加载的方式加载每一级的数据，一般用于数据量很大的场景。
        `,
        selectedItems: `
            ### 默认选中

            本demo说明如何使用selectedItems属性来预设一组默认选中的条目。
        `,
        multipleSelect: `
            ### 最后一级支持多选

            本demo演示了如何通过multipleSelect属性设置级联组件最后一级支持多选的方法
        `,
        trackItemBy: `
            ### 区分条目

            trackItemBy用于告诉级联组件通过哪个或者哪些字段来区分所有条目
        `,
        showAll: `
            ### 全选

            本demo演示了如何在某一级上添加一个“全选”按钮。
        `,
        withCombo: `
            ### 下拉框方式

            本demo演示了如何通过懒加载的方式加载每一级的数据，一般用于数据量很大的场景。
        `,
        searchAndPaging: `
            ### 搜索与分页

            本demo说明如何使用selectedItems属性来预设一组默认选中的条目fff。

            <code>searchable</code>为<code>true</code>时可以搜索；<code>pageSize</code>默认是<code>Infinity</code>，即不分页，设置了<code>pageSize</code>数值即可实现分页。
        `
    }
}
