import {Component, ElementRef, Renderer2, ViewChild, ViewContainerRef} from "@angular/core";
import {JigsawInput} from "../../../../jigsaw/component/input/input";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class InputFullComponent {


    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public elementRef: ElementRef) {
    }

    // demo-1
    demo1InputValue: any;

    // demo-2
    demo2InputValue: any = '12345';

    // demo-3
    valueChanged(message: string) {
        this.elementRef.nativeElement.querySelector('.demo-3 .message')
            .innerHTML = `监听到input值变成了<span>${message}</span>`;
    }

    // demo-4
    focusMessage: string;
    @ViewChild('myInput') myInput:JigsawInput;
    focusInput() {
        this.myInput.focus();
    }
    focusHandler(){
        this.focusMessage = 'input component focused'
    }

    // demo-5
    demo5InputValue: string;
    iconClickHandler() {
        alert('你输入的值是 ' + this.demo5InputValue)
    }
}

