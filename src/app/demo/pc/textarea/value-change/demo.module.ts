import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaValueChangeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaValueChangeDemoComponent],
    exports: [TextareaValueChangeDemoComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaValueChangeDemoModule {

}
