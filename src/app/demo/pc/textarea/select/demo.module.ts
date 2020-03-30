import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/pc-components/textarea";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaSelectDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaSelectDemoComponent],
    exports: [TextareaSelectDemoComponent],
    imports: [JigsawTextareaModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule]
})
export class TextareaSelectDemoModule {

}
