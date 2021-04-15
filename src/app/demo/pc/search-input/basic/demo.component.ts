import { Component, ViewChild } from "@angular/core";
import { JigsawSearchInput } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class SearchInputBasicDemoComponent {
    public searchTrigger($event) {
        console.log("demo search event:", $event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
