import { Component, Input } from "@angular/core";

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