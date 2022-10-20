import {Component} from "@angular/core";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: "tag-custom-color",
    templateUrl: "./demo.component.html",
    styles: [`
    jigsaw-tag{
        width: 62px;
    }
    `]
})
export class TagCustomColorComponent extends AsyncDescription {
    public demoPath = "demo/tag/custom-color";
    public selectedSize = { size: "medium" };
}
