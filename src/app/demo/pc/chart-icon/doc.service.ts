import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ChartIconTextService {
    public text: object = {
        introduction: `
        # Chart-icon
        ## 示例
        `,
        basic: `
        ### 基础
        本Demo演示了chart-icon的基本用法，注：chart-icon一般尺寸都很小，本demo为了演示方便特意将其做的很大。
        `,
        withButton: `
        ### chart-icon与按钮组合
        本Demo展示了按钮与chart-icon组合使用的各种使用场景。`,
        withTable: `
        ### 结合表格
        本Demo演示了chart-icon组件与表格配合使用的方法
        `,
    }
}
