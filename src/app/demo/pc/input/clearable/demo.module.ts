import {NgModule} from "@angular/core";
import {JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {InputClearableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputClearableDemoComponent],
    exports: [InputClearableDemoComponent],
    imports: [JigsawInputModule, JigsawDemoDescriptionModule]
})
export class InputClearableDemoModule {

}
