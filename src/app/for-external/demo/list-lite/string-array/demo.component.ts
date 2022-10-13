import { Component } from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'list-lite-string-array',
    templateUrl: './demo.component.html'
})
export class ListLiteStringArrayDemoComponent extends AsyncDescription {
    public demoPath = "demo/list-lite/string-array";

    public goodsArrayList = ['bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece'];
}
