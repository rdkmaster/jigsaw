import {Component} from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class SearchInputBasicDemoComponent {
    value1: string;
    value2: string;

    clear() {
        this.value1 = '';
        this.value2 = '';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
