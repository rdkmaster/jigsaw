import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RadioTextService {
    public text = {
        introduction: `
            # Radio 单选框

            在一组备选项中进行单选。

            ## 使用场景

            用于在多个备选项中选中单个状态。
            Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

            ## 示例
        `,
        dataIsObejct: `
            ### 数据是对象数组

            数据是对象数组时必须输入\`trackItemBy\`。
        `,
        dataIsStringArray: `
            ### 数据是字符串数组

            数据是对象数组时不需要输入\`trackItemBy\`。
        `,
        complexScene: `
            ### 复杂场景
        `,
        trackItemBy: `
            ### 单选按钮-TrackItemBy
        `,
        radioLite: `
           ### 极简单选框

           基础单选框的极简状态
        `
    }
}
