import {NgModule} from "@angular/core";
import {JigsawTextareaModule, JigsawCheckBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TextareaSelectDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaSelectDemoComponent],
    exports: [TextareaSelectDemoComponent],
    imports: [JigsawTextareaModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule]
})
export class TextareaSelectDemoModule {

}
