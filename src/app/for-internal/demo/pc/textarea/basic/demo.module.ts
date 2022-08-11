import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {TextareaBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [TextareaBasicDemoComponent],
    exports: [TextareaBasicDemoComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaBasicDemoModule {

}
