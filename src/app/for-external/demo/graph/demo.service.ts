import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GraphTextService {
    public text: object = {
        introduction: `
        # Graph 图形

        ## 示例
        `,
        basic: `
        ### 基础用法
        `,
        bar: `
        ### 柱状图

        这个demo展示了如何使用柱状图。
        `,
        boxPlot: `
        ### 箱线图
        `,
        doughnut: `
        ### 环形图

        这个demo展示了如何使用环形图。
        `,
        funnelPlot: `
        ### 漏斗图
        `,
        gauge: `
        ### 仪表盘
        `,
        heat: `
        ### 热力图
        `,
        kLine: `
        ### K线图
        `,
        line: `
        ### 折线图
        `,
        map: `
        ### 模拟迁徙
        `,
        noData: `
        ### 没有数据
        `,
        pie: `
        ### 饼图
        `,
        provinceMap: `
        ### 省份地图
        `,
        radar: `
        ### 雷达图
        `,
        scatter: `
        ### 散点图
        `,
        stackArea: `
        ### 堆叠区域图
        `,
        strip: `
        ### 条形图
        `,
    }
}
