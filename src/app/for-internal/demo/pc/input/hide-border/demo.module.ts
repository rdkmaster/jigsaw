import {NgModule} from "@angular/core";
import {JigsawInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {InputHideBorderComponent} from "./demo.component";

@NgModule({
    declarations: [InputHideBorderComponent],
    exports: [InputHideBorderComponent],
    imports: [JigsawInputModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class InputHideBorderModule {
}
