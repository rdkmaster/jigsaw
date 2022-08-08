import { Component } from "@angular/core";
import { ListLiteTextService } from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class ListLiteAllComponent {
    constructor(public text: ListLiteTextService) { }
}

