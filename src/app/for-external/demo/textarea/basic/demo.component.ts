import {Component, ViewChild} from "@angular/core";
import {JigsawTextarea} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'textarea-basic',
    templateUrl: './demo.component.html'
})
export class TextareaBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/textarea/basic";

    textareaValue: any;

    @ViewChild('myTextarea')
    myTextarea: JigsawTextarea;
}
