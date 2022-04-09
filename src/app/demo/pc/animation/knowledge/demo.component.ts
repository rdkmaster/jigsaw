import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class JigsawAnimationKnowledgeDemoComponent {
    animationProperties = [
        { name: 'animation-name' },
        { name: 'animation-duration' },
        { name: 'animation-timing-function' },
        { name: 'animation-delay' },
        { name: 'animation-iteration-count' },
        { name: 'animation-direction' },
        { name: 'animation-fill-mode' },
        { name: 'animation-play-state' }
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
            answer: "动画名称，动画时间，animation属性和@keyframes规则。"
        }
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