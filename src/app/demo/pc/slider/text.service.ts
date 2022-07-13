import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SliderTextService {
    public text: object = {
        introduction: `
            # Slider 滑动条

            滑动型输入组件，展示当前值和可选范围。

            ## 使用场景

            当用户需要在数值区间/自定义区间内进行选择时使用，可为连续或离散值。

            ## 示例
        `,
        basic: `
            ### 基本滑动条,滑动事件变化
        `,
        setMinMax: `
            ### 设置了min和max的滑动条
        `,
        changeStep: `
            ### 改变step
        `,
        doubleContact: `
            ### 双触点滑动条
        `,
        mark: `
            ### 带标记滑动条
        `,
        vertical: `
            ### 垂直滑动条

            垂直滑动条有默认高度240px
        `,
        update: `
            ### 更新value
        `,
        multiValue: `
            ### 多个值情形

            本demo主要给出如何处理slider多个值的情形。Slider组件本身不会自动处理多个值的顺序，因此多个值可以被拖动改变顺序，这提供了灵活性，但给需要有顺序的场合却带来了一些麻烦，这里给出了处理这个情形问题的几个可能办法。
        `
    }
}
