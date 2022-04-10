import { AfterViewInit, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class JigsawAnimationKnowledgeDemoComponent {
    animationPoints = [
        {
            point: 'animation-name',
            exampleIndex: 0,
            className: 'example-1'
        },
        { point: 'animation-duration' },
        { point: 'animation-timing-function' },
        { point: 'animation-delay' },
        { point: 'animation-iteration-count' },
        { point: 'animation-direction' },
        { point: 'animation-fill-mode' },
        { point: 'animation-play-state' }
    ]

    keyframePoints = [
        { point: '起止关键帧可以不设置' },
        { point: '关键帧列表可以合并' },
        { point: '不同的关键帧选择器是无序的' },
        { point: '重复定义的关键帧不是完全被覆盖的' },
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
export class KnowledgeQA {
    @Input()
    index: number = 0;

    animationQA = [
        {
            question: "一个CSS动画效果想要出现，必不可少的基本单元有哪些？",
            answer: "动画名称，动画时间，animation属性和<code>@keyframes</code>规则。"
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
export class KnowledgeTips {
    @Input()
    index: number = 0;

    animationTips = [
        { message: 'animation属性支持同时应用多个动画规则。所以实现多种动画效果时，正确的做法是分隔设置。' }
    ]
}

@Component({
    selector: 'points',
    templateUrl: 'points.html',
})
export class KnowledgePoints {
    @Input()
    points: Array<any>;

    handleAnimation(exampleIndex: number, className?: string) {
        if (exampleIndex === undefined) {
            return
        }
        const ele = <HTMLElement>document.querySelectorAll(".example-box")[exampleIndex];
        ele.classList.remove(className);
        ele.offsetWidth;
        ele.classList.add(className)
        console.log(ele)
    }

}