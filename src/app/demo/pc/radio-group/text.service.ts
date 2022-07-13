import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RadioTextService {
    public text: object = {
        introduction: `
            # Radio 单选框

            单选框

            ## 使用场景

            用于在多个备选项中选中单个状态。
            Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

            ## 示例
        `,
        basic: `
            ### 基础单选框

            点击圆圈，实施对圆圈对应的标签项的选择，只能单选，可以通过设置<code>value</code>的值取消单选。
        `,
        dataIsObejct: `
            ### 数据是对象数组

            数据是对象数组时必须输入<code>trackItemBy</code>。
        `,
        dataIsStringArray: `
            ### 数据是字符串数组

            数据是对象数组时不需要输入<code>trackItemBy</code>。
        `,
        complexScene: `
            ### 复杂的场景
        `
    }
}
