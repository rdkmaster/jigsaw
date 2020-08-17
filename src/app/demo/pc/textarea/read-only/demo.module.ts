import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {TextareaReadOnlyDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [TextareaReadOnlyDemoComponent],
    exports: [TextareaReadOnlyDemoComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaReadOnlyDemoModule {

}
