import {Component} from "@angular/core";
import {TagTextService} from "../doc.service";
import { ArrayCollection } from "jigsaw/public_api";

@Component({
    selector: "tag-custom-color",
    templateUrl: "./demo.component.html",
    styles: [`
    jigsaw-tag{
        width: 62px;
    }
    `]
})

export class TagCustomColorComponent {
    public selectedLabel = {label: "大", size: "medium"};
    public data: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "大", size: "medium"},
    ]);
    constructor(public text: TagTextService) {}
}