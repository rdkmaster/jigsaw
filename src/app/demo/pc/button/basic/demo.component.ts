import {Component, Inject, AfterViewInit} from "@angular/core";
import { DOCUMENT } from '@angular/common';

@Component({
    templateUrl: "./demo.component.html",
    styles: [
        `
            #demo-text {
                color: var(--color-font-general);
            }
        `
    ]
})
export class ButtonBasicDemoComponent implements AfterViewInit {
    constructor(@Inject(DOCUMENT) private document: Document) {}
    textColor: string;
    flag: boolean = true;

    onClick() {
        alert("hello jigsaw button");
    }

    changeColor() {
        let oldColor = getComputedStyle(document.documentElement).getPropertyValue("--color-font-general");
        console.log(oldColor)
        let newColor = this.flag ? "#1a93ff" : "#333333";
        this.textColor = newColor;
        document.documentElement.style.setProperty("--color-font-general", newColor);
        this.flag = !this.flag;
    }

    ngAfterViewInit() {
        setTimeout(() => {
        this.textColor = getComputedStyle(document.documentElement).getPropertyValue("--color-font-general");
        console.log(this.textColor);
        }, 300);
    }

    
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '展示了按钮的3种使用场景。提示：使用button标签的方式可以与`form`结合使用，设置`type="submit"`。';
    description: string = "";
}
