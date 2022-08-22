import {Component} from "@angular/core";
import {TagTextService} from "./doc.service";

@Component({
    templateUrl: "demo.component.html"
})
export class TagDemoComponent {
    constructor(public doc: TagTextService) {
    }
}
