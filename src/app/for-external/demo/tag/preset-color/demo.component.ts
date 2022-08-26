import {Component} from "@angular/core";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: "tag-preset-color",
    templateUrl: "./demo.component.html",
    styles: [`
    jigsaw-tag{
        width: 136px;
    }
    `]
})
export class TagPresetColorComponent extends AsyncDescription {
    public demoPath = "demo/tag/preset-color";
    public selectedSize = { size: "medium" };
}
