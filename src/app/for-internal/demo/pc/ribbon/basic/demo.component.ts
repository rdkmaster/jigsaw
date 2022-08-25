import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class JigsawRibbonBasicDemoComponent {
    public inputValue: string = '已发布';
    valueChanged(message: string) {
        console.log(`input value is: ${message}`);
    }
    public length: number = 1;
    public color: string = `#32e4ba`;
    public selectedPosition = ['rightTop'];
    public selectedSize = ['normal']
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
