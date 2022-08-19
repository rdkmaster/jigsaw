import {Component} from "@angular/core";
import {ListLiteTextService} from "../doc.service";

@Component({
    selector: 'list-lite-string-array',
    templateUrl: './demo.component.html'
})
export class ListLiteStringArrayDemoComponent {
    goodsArrayList = ['bicycle', 'camera', 'car', 'football', 'book', 'puzzle-piece'];

    selectedItems: string;

    handleSelect(selectedItems: any[], property: string, labelField?: string) {
        this[property] = selectedItems.map(item => labelField ? item[labelField] : item).toString()
    }

    constructor(public doc: ListLiteTextService) {
    }
}
