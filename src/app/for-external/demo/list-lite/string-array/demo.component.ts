import { Component } from "@angular/core";
import { ListLiteTextService } from "../doc.service";

@Component({
    selector: 'list-lite-string-array',
    templateUrl: './demo.component.html'
})
export class ListLiteStringArrayDemoComponent {
    public goodsArrayList = ['bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece'];

    constructor(public doc: ListLiteTextService) {
    }
}
