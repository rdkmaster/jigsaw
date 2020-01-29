import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/component/textarea";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaFocusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaFocusDemoComponent],
    exports: [TextareaFocusDemoComponent],
    imports: [JigsawTextareaModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class TextareaFocusDemoModule {

}
