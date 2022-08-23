import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingTextService {
    public text = {
        introduction: `
            # Loading 加载中

            操作时间超过2秒，应有loading提示（不出现完全空白的情况）

            ## 使用场景

            用于页面或其它容器中信息加载进度的反馈。如点击菜单打开某个页面时页面的加载，表格、卡片中数据信息的加载。
            “加载中”与“进度条”的差别：“进度条”用于某个操作后对操作进度的反馈。如上传、导入、导出等；“加载中”用于信息在容器中的加载反馈和显示区域较小的情况下，反馈正在运行的状态。

            ## 示例
        `,
        basic: `
            ### 基础用法
        `,
        ball: `
            ### 球状Loading
        `,
        bubble: `
            ### 冒泡状Loading
        `,
        fontIcon: `
            ### 图标Loading
        `,
        circle: `
            ### 圆形Loading
        `,
        color: `
            ### Loading的颜色
            `,
        customize: `
            ### 定制加载样式
        `,
    }

    public codes = {
        basic: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./basic/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./basic/demo.component.ts').default }
        ],
        ball: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./ball/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./ball/demo.component.ts').default }
        ],
        bubble: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./bubble/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./bubble/demo.component.ts').default }
        ],
        fontIcon: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./font-icon/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./font-icon/demo.component.ts').default }
        ],
        circle: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./circle/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./circle/demo.component.ts').default }
        ],
        color: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./color/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./color/demo.component.ts').default }
        ],
        customize: [
            { label: "HTML", language: 'html', value: require('!!raw-loader!./customize/demo.component.html').default, },
            { label: "Typescript", language: 'typescript', value: require('!!raw-loader!./customize/demo.component.ts').default },
            { label: "defined-loading.css", language: 'css', value: require('!!raw-loader!./customize/defined-loading/defined-loading.css').default },
            { label: "defined-loading.html", language: 'html', value: require('!!raw-loader!./customize/defined-loading/defined-loading.html').default },
            { label: "defined-loading.ts", language: 'typescript', value: require('!!raw-loader!./customize/defined-loading/defined-loading.ts').default },
        ],
    }
}

