import { Injectable } from '@angular/core';

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
        object: `
            ### 数据是对象数组

            数据是对象数组时必须输入\`trackItemBy\`。
        `,
        stringArray: `
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

    public codes = {
        object: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./object/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./object/demo.component.ts').default }
        ],
        stringArray: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./string-array/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./string-array/demo.component.ts').default }
        ],
        complexScene: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./complex-scene/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./complex-scene/demo.component.ts').default }
        ],
        trackItemBy: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./track-item-by/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./track-item-by/demo.component.ts').default }
        ],
        radioLite: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./radio-lite/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./radio-lite/demo.component.ts').default }
        ],
    }
}
