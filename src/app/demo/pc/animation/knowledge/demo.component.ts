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
        { point: '关键帧中的样式可以不连续' },
        { point: '!important无效' },
        { point: '优先级最高' },
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
    index: number = 0;

    _$showAnswer: boolean = false;

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
    ]
}

@Component({
    selector: 'tips',
    templateUrl: 'tips.html',
})
export class KnowledgeTips extends KnowledgeToolsBase {
    @Input()
    index: number = 0;

    animationTips = [
        {
            message: `animation属性支持同时应用多个动画规则。<br/>实现多种动画效果时，正确的做法是分隔设置。`,
            action: { exampleIndex: 0, classList: ['example-2'] }
        }
    ]
}

@Component({
    selector: 'points',
    templateUrl: 'points.html',
})
export class KnowledgePoints extends KnowledgeToolsBase {
    @Input()
    points: Array<any>;
}