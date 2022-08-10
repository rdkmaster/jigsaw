import {NgModule} from "@angular/core";
import {JigsawTextareaModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {TextareaFocusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaFocusDemoComponent],
    exports: [TextareaFocusDemoComponent],
    imports: [JigsawTextareaModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class TextareaFocusDemoModule {

}
