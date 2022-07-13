import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SwitchTextService {
    public text: object = {
        introduction: `
            # Switch 开关

            开关选择器。

            ## 使用场景

            用来打开或关闭选项。由于Switch控件本身就能表现当前的开/关状态，因此相关文案只需表示所控制内容。
            大尺寸开关（默认）适用于较宽裕的界面空间，中尺寸开关适用于表格、卡片等相对狭窄的空间，小尺寸开关适用于紧凑型布局。

            ## 示例
        `,
        basic: `
            ### 基础复选框

            点击方框，实施对方框相应标签项的选择，可多选。
        `
    }
}
