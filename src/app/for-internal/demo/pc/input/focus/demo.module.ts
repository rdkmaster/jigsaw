import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputFocusDemoComponent} from "./demo.component";

@NgModule({
    declarations: [InputFocusDemoComponent],
    exports: [InputFocusDemoComponent],
    imports: [JigsawInputModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class InputFocusDemoModule {

}
