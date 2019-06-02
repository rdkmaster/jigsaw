import {Component, ElementRef, ViewChild} from "@angular/core";
import {JigsawMobileInput} from "jigsaw/mobile-components/input/input";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class InputFullComponent {
    constructor(public elementRef: ElementRef) {
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
    @ViewChild('myInput', {static: false}) myInput:JigsawMobileInput;
    focusInput() {
        this.myInput.focus();
    }
    focusHandler(event){
        console.log(event);
        this.focusMessage = 'input component focused'
    }

    // demo-5
    demo5InputValue: string;
    iconClickHandler() {
        alert('你输入的值是 ' + this.demo5InputValue)
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawMobileInput',
    ];
}

