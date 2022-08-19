import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CheckboxTextService {
    public text = {
        introduction: `
            # Checkbox 复选框

            复选框

            ## 使用场景

            在一组可选项中进行多项选择时。
            一般用于表单中，与提交操作配合。
            部分选中用于树节点的子节点未全部选中时，该树节点的checkbox的样式。

            ## 示例
        `,
        basic: `
            ### 基础复选框

            点击方框，实施对方框相应标签项的选择。
            有三种状态：\`unchecked\` \`checked\` \`indeterminate\`
        `,
        minimalist: `
            ### 极简模式
        `,
        checkall: `
            ### 基础复选框全选

            勾选所有复选框，可实现全选效果。
        `
    }
}
