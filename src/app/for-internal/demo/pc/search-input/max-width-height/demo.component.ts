import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html"
})
export class SearchInputMaxWidthDemoComponent {
    public value: string;
    public maxDropDownWidth: string = '300px';
    public maxDropDownHeight: string = '100px';

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
