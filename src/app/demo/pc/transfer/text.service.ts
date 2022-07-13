import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TransferTextService {
    public text: object = {
        introduction: `
            # Transfer 穿梭框

            将文件/参数上传到网页。

            ## 使用场景

            穿梭框常用于将多个项目从一边移动到另一边，完成选择性展示；选择选项后，点击相应方向按钮，可以把选中的选项移动到另一边。

            与Picklist列表选择的区别是内容穿梭到右侧后左侧不保留，偏重两侧属性各自展示；Picklist列表选择是穿梭到右侧左侧也保留，偏重最终选择。

            ## 示例
        `,
        basic: `
            ### 普通穿梭框

            适用于列表内容的穿梭展示，搜索框可配；可在穿梭框头部进行全选操作。
        `,
        itemDisabled: `
            ## 随机设置不可操作条目
        `,
        disabled: `
            ## 点击按钮，切换Disabled属性
        `,
        valid: `
            ## valid属性

            从左边列表至少选择一个条目到右边列表中
        `,
        i18n: `
            ## 国际化
        `,
        transferTree: `
            ## 树型穿梭框

            适用于树内容的穿梭展示，左侧为带结构的树，穿梭到右侧后不保留树结构，以列表内容展示；右侧穿梭回左侧，还原到原树结构下。
        `,
        transferTable: `
             ## 表格穿梭框

            适用于表格内容的穿梭展示，表格穿梭框数据量较大默认配置搜索框。
        `,
        transferList: `
            ## transferList不知道名字?

            这个Demo模拟的是采用服务端分页的情形
        `,
        transferListLoaclPageable: `
            ## 本地分页数据？？？

            这个Demo模拟的是采用浏览器内部分页的情形
        `,
        transferTableLocalPageable: `
            ## 本地分页数据(表格=>列表)
        `,
        transferListPageable: `
            ## 服务端分页数据
        `,
        transferTablePageable: `
            ## 服务端分页数据(表格=>列表)
        `
    }
}
