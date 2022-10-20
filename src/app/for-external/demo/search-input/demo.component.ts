import { Component } from "@angular/core";
import {DemoSetBase} from "../../demo-template/demo-template";

@Component({
    templateUrl: './demo.component.html',
})
export class SearchInputAllComponent extends DemoSetBase {
    public demoPath = "demo/search-input";
    public docPath = ['component/JigsawSearchInput'];
}

