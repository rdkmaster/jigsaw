import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StepsTextService {
    public text: object = {
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
}
