import { Component } from "@angular/core";

@Component({
    templateUrl: './demo.component.html'
})
export class ButtonBasicIconDemoComponent {
    public showButton: boolean = true;
    public showButton2: boolean = true;
    public showButton3: boolean = true;
    public showCntr: boolean = true;
    public showCntr2: boolean = true;
    public showCntr3: boolean = true;
    public showCntr4: boolean = true;

    onClick() {
        alert('hello jigsaw button');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
