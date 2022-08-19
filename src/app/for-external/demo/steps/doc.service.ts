import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StepsTextService {
    public text = {
        introduction: `
            # Steps 步骤条

            引导用户按照流程完成任务的导航条。

            ## 使用场景

            当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

            一般在3个步骤（含3个）以上使用。

            ## 示例
        `,
        horizontal: `
            ### 横向步骤条
        `,
        vertical: `
            ### 纵向步骤条
        `,
        status: `
            ### 状态
        `,
        overLength: `
            ### 标题和描述过长时的表现
        `,
        manySteps: `
            ### 步骤数量极端的情况

            演示当步骤数较多和较少等极端情况下展示效果
        `
    }

    public codes = {
        horizontal: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./horizontal/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./horizontal/demo.component.ts').default }
        ],
        vertical: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./vertical/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./vertical/demo.component.ts').default }
        ],
        status: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./status/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./status/demo.component.ts').default }
        ],
        overLength: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./over-length/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./over-length/demo.component.ts').default }
        ],
        manySteps: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./many-steps/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./many-steps/demo.component.ts').default }
        ],
    }
}
