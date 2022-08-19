import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SliderTextService {
    public text = {
        introduction: `
            # Slider 滑动条

            滑动型输入组件，展示当前值和可选范围。

            ## 使用场景

            当用户需要在数值区间/自定义区间内进行选择时使用，可为连续或离散值。

            ## 示例
        `,
        basic: `
            ### 基本用法
        `,
        minMax: `
            ### 设置最值
        `,
        mark: `
            ### 带标记滑动条
        `,
        vertical: `
            ### 垂直滑动条

            垂直滑动条有默认高度240px
        `,
        step: `
            ### 粒度
        `,
        multiValue: `
            ### 多个值情形

            本demo主要给出如何处理slider多个值的情形。Slider组件本身不会自动处理多个值的顺序，因此多个值可以被拖动改变顺序，这提供了灵活性，但给需要有顺序的场合却带来了一些麻烦，这里给出了处理这个情形问题的几个可能办法。
        `
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        minMax: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./min-max/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./min-max/demo.component.ts').default }
        ],
        mark: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./mark/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./mark/demo.component.ts').default }
        ],
        vertical: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./vertical/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./vertical/demo.component.ts').default }
        ],
        step: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./step/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./step/demo.component.ts').default }
        ],
        multiValue: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./multi-value/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./multi-value/demo.component.ts').default }
        ],
    }
}
