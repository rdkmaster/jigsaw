import { Component } from "@angular/core";

@Component({
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class SearchInputDebounceDemoComponent {
    public debounceTime: number = 0;
    public searchKey: string = "暂无";
    
    public searchTrigger($event) {
        console.log("demo search event:", $event);
        this.searchKey = $event;
    }


    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
