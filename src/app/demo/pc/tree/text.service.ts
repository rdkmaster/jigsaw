import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TreeTextService {
    public text: object = {
        introduction: `
            # Tree 树形

            树形组件

            ## 使用场景

            树组件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

            ## 示例
        `,
        basic: `
            ### 基础树形
        `,
        dataFromAjax: `
            ### 使用ajax作为树的数据源格式
        `,
        editable: `
            ### 可操作树形
        `,
        async: `
            ### 懒加载

            通过模拟的方式演示了树的懒加载能力，提供了树子节点数据量很大时的一个解决方案。

            点击树节点，每个节点的子节点都从实时从服务端取一次数据，在树节点的数据量很大时非常有用
        `,
        customSettingsCallback: `
            ### 添加click事件

            通过自定义setting来添加click事件。

            如果要取消onEventName类事件的触发，可以通过自定义setting实现的beforeEventName类事件返回false来实现。

            注意如果直接在模板上通过（beforeEventName）绑定beforeEventName类事件，其返回值是无效的，无法干扰onEventName类事件的是否触发。
        `,
        xmlData: `
            ### 使用xml作为树的数据源格式

            使用xml作为树的数据源格式是一个非常好的选择，相比json对象，xml更加简洁和清晰。
        `,
        icon: `
            ### 自定义图标
        `,
        fuzzySearch: `
            ### 模糊搜索
        `
    }
}