import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GraphTextService {
    public text = {
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

        数据的一列为一个系列情形，请使用 LineBarGraphData
        作为数据。这个和一般的数据库表的结构非常契合，推荐优先使用。
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

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        bar: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./bar/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./bar/demo.component.ts').default }
        ],
        boxPlot: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./box-plot/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./box-plot/demo.component.ts').default }
        ],
        doughnut: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./doughnut/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./doughnut/demo.component.ts').default }
        ],
        funnelPlot: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./funnel-plot/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./funnel-plot/demo.component.ts').default }
        ],
        gauge: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./gauge/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./gauge/demo.component.ts').default }
        ],
        heat: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./heat/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./heat/demo.component.ts').default }
        ],
        kLine: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./k-line/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./k-line/demo.component.ts').default }
        ],
        line: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./line/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./line/demo.component.ts').default }
        ],
        map: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./map/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./map/demo.component.ts').default }
        ],
        noData: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./no-data/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./no-data/demo.component.ts').default }
        ],
        pie: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./pie/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./pie/demo.component.ts').default }
        ],
        provinceMap: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./province-map/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./province-map/demo.component.ts').default }
        ],
        radar: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./radar/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./radar/demo.component.ts').default }
        ],
        scatter: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./scatter/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./scatter/demo.component.ts').default }
        ],
        stackArea: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./stack-area/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./stack-area/demo.component.ts').default }
        ],
        strip: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./strip/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./strip/demo.component.ts').default }
        ],
    }
}
