import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/pc-components/textarea";
import {TextareaBasicDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [TextareaBasicDemoComponent],
    exports: [TextareaBasicDemoComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaBasicDemoModule {

}
