import { Component, Directive, Input, ViewEncapsulation } from "@angular/core";

@Directive()
export abstract class KnowledgeToolsBase {
    handleAnimation(exampleIndex: number, classList?: string[]) {
        if (exampleIndex === undefined) {
            return
        }
        const ele = <HTMLElement>document.getElementById(`example-${exampleIndex}`);
        ele.setAttribute("class", "")
        ele.offsetWidth;
        classList.forEach(name => {
            ele.classList.add(name)
        })
        console.log(ele)
    }
}

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class JigsawAnimationKnowledgeDemoComponent extends KnowledgeToolsBase {
    animationPoints = [
        { point: 'animation-name' },
        { point: 'animation-duration' },
        { point: 'animation-timing-function' },
        { point: 'animation-delay' },
        { point: 'animation-iteration-count' },
        { point: 'animation-direction' },
        { point: 'animation-fill-mode' },
        { point: 'animation-play-state' }
    ]

    keyframePoints = [
        {
            point: '起止关键帧可以不设置',
            action: { exampleIndex: 0, classList: ['example-3'] }
        },
        {
            point: '关键帧列表可以合并',
            action: { exampleIndex: 0, classList: ['example-4'] }
        },
        {
            point: '不同的关键帧选择器是无序的',
            action: { exampleIndex: 0, classList: ['example-5'] }
        },
        {
            point: '重复定义的关键帧不是完全被覆盖的',
            action: { exampleIndex: 0, classList: ['example-6'] }
        },
        {
            point: '关键帧中的样式可以不连续',
            action: { exampleIndex: 0, classList: ['example-7'] }
        },
        {
            point: '!important无效',
            action: { exampleIndex: 0, classList: ['example-8'] }
        },
        { point: '优先级最高' },
    ]

    namePoint = [
        {
            point: `命名须符合<code>custom-ident</code>数据类型语法`,
            subpoint: ["任意字母（a~z或A~Z）", "数字（0~9）", "短横线（-）", "下划线（_）", "转义字符（使用反斜杠\\转义）", "Unicode字符"],
            action: { exampleIndex: 0, classList: ['example-9'] }
        },
        {
            point: '不能是CSS属性本身支持的关键字',
            subpoint: [`如：<code>none</code>、<code>unset</code>、<code>initial</code>、<code>inherit</code>`]
        },
        {
            point: '不能以十进制数字开头',
            subpoint: ["如：2333fadeIn"]
        },
        {
            point: '可以使用短横线开头，但是后面不能是十进制数字',
            subpoint: ["如：-fadeIn（合法），-2333fadeIn（不合法）"]
        },
        {
            point: '除了短横线和下划线之外的英文标点字符都需要转义',
            subpoint: ["如：hello\\ world"]
        },
    ]

    delayPoint = [
        {
            point: '<code>animation-delay</code>可以让动画延迟播放',
            action: { exampleIndex: 0, classList: ['example-10'] }
        },
    ]

    delayPoint2 = [
        {
            point: '<code>animation-delay</code>经典应用，波形图的实现',
            action: { exampleIndex: 1, classList: ['example-12'] }
        },
        {
            point: '<code>animation-delay</code>可以设置成负数',
            action: { exampleIndex: 1, classList: ['example-13'] }
        },
    ]

    directionPoint = [
        {
            point: '<code>animation-direction</code>:normal /* 初始值 */',
            action: { exampleIndex: 0, classList: ['example-15'] }
        },
        {
            point: '<code>animation-direction</code>:reverse',
            action: { exampleIndex: 0, classList: ['example-16'] }
        },
        {
            point: '<code>animation-direction</code>:alternate',
            action: { exampleIndex: 0, classList: ['example-17'] }
        },
        {
            point: '<code>animation-direction</code>:alternate-reverse',
            action: { exampleIndex: 0, classList: ['example-18'] }
        },
    ]

    iterationPoint = [
        {
            point: '可以指定动画播放的次数',
            action: { exampleIndex: 0, classList: ['example-19'] }
        },
        {
            point: '可以无限播放',
            action: { exampleIndex: 0, classList: ['example-21'] }
        },
        {
            point: '可以用小数',
            action: { exampleIndex: 0, classList: ['example-20'] }
        },
    ]

    fillPoint = [
        {
            point: '<code>animation-fill-mode</code>:none /* 初始值 */',
            action: { exampleIndex: 2, classList: ['example-22'] }
        },
        {
            point: '<code>animation-fill-mode</code>:forwards',
            action: { exampleIndex: 2, classList: ['example-23'] }
        },
        {
            point: '<code>animation-fill-mode</code>:backwards',
            action: { exampleIndex: 2, classList: ['example-24'] }
        },
        {
            point: '<code>animation-fill-mode</code>:both',
            action: { exampleIndex: 2, classList: ['example-25'] }
        },
    ]

    animationQA = [
        {
            question: "一个CSS动画效果想要出现，必不可少的基本单元有哪些？",
            answer: "动画名称，动画时间，animation属性和<code>@keyframes</code>规则。",
            action: { exampleIndex: 0, classList: ['example-1'] }
        },
        {
            question: `为什么<code>@keyframes</code>后面有个's'？`,
            answer: "动画效果不会只有一个关键帧"
        },
        {
            question: `<code>animation: fadeIn 1s linear -.25s</code> <br> 透明度变化是 0.75->1 还是 0.25->1 ?`,
            answer: "0.25 -> 1",
            action: { exampleIndex: 0, classList: ['example-14'] }
        },
    ]

    animationTips = [
        {
            message: `animation属性支持同时应用多个动画规则。<br/>实现多种动画效果时，正确的做法是分隔设置。`,
            action: { exampleIndex: 0, classList: ['example-2'] }
        },
        {
            message: `如果动画是无限循环的，设置的延时不会跟着循环。`,
            action: { exampleIndex: 0, classList: ['example-11'] }
        },
        {
            message: `属性值不能是负数，但是可以是0。<br/>可以用animation:0来重置animation属性。`
        },
    ]

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}

@Component({
    selector: 'qa',
    templateUrl: 'qa.html'
})
export class KnowledgeQA extends KnowledgeToolsBase {
    @Input()
    data: any;

    _$showAnswer: boolean = false;
}

@Component({
    selector: 'tips',
    templateUrl: 'tips.html',
})
export class KnowledgeTips extends KnowledgeToolsBase {
    @Input()
    data: any;
}

@Component({
    selector: 'points',
    templateUrl: 'points.html',
})
export class KnowledgePoints extends KnowledgeToolsBase {
    @Input()
    points: Array<any>;

    @Input()
    showIndex: boolean = true;
}