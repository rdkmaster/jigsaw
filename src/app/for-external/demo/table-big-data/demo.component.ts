import {Component} from "@angular/core";
import {TableBigDataTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class TableBigDataAllComponent {
    constructor(public text: TableBigDataTextService) {}
}

