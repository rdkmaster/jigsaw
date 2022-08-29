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
    public offset: number = 1;
    public color: string = `#32e4ba`;
    public selectedPosition = ['rightTop'];
    public selectedSize = ['normal']
    public enablePointerCursor: boolean = true;

    public echo(event, msg) {
        event.stopPropagation();
        alert(msg)
    }

    public links = new Array(48);

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
