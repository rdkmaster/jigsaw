import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FloatTextService {
    public text: object = {
        introduction: `
        # Float
        任意视图下拉
        ## 示例
        `,
        basic: `
        ### 基础
        本demo演示了jigsaw-float指令最简单的用法，所有配置项都用默认
        `,
        initData: `
        ### 初始化数据
        演示了如何使用jigsawFloatInitData来属性初始化jigsawFloat指令的弹出目标
        `,
        multiLevel: `
        ### 多级弹出
        本demo演示了jigsaw-float指令实现多级弹出，当弹出一个区域后，弹出区域再次弹出新的区域
        `,
        position: `
        ### 弹出位置
        演示了弹出位置的效果，一共8个位置
        注意，这个位置是应用给的理想位置，在弹出的时候会自动对理想位置坐修正，避免视图超时浏览器边界的情况
        `,
        target: `
        ### 改变弹出目标
        演示了如何改变jigsawFloat指令的弹出目标
        `,
        trigger: `
        ### 改变触发方式
        演示了如何改变jigsawFloat指令的触发器
        `,
        option: `
        ### 改变偏移量 带阴影 带箭头
        演示了如何改变float option参数
        `,
    }
}
