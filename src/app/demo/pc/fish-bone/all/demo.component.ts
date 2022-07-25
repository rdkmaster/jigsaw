import {Component} from "@angular/core";
import {FishBoneTextService} from "../text.service";

@Component({
    templateUrl: './demo.component.html',
})
export class FishBoneAllComponent {
    constructor(public text: FishBoneTextService) {}
}

