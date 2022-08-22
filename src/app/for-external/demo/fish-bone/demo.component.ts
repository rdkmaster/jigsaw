import {Component} from "@angular/core";
import {FishBoneTextService} from "./doc.service";

@Component({
    templateUrl: './demo.component.html',
})
export class FishBoneAllComponent {
    constructor(public doc: FishBoneTextService) {}
}

